import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  onSnapshot,
  orderBy,
  increment,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { customAlphabet } from "nanoid";
import { db } from "./firebase";
import type { Group, Member } from "./types";

const nanoid = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 6);

export function generateGroupCode(): string {
  return nanoid();
}

export async function createGroup(
  groupName: string,
  username: string
): Promise<{ groupId: string; groupCode: string }> {
  const groupCode = generateGroupCode();
  const groupRef = doc(collection(db, "groups"));
  const groupId = groupRef.id;

  const groupData: Group = {
    groupId,
    groupCode,
    groupName,
    createdAt: Date.now(),
    createdBy: username,
    memberUsernames: [username],
  };

  await setDoc(groupRef, groupData);

  const memberRef = doc(db, "groups", groupId, "members", username);
  const memberData: Member = {
    username,
    sushiCount: 0,
    joinedAt: Date.now(),
    lastUpdated: Date.now(),
  };
  await setDoc(memberRef, memberData);

  return { groupId, groupCode };
}

export async function getGroupByCode(
  code: string
): Promise<(Group & { id: string }) | null> {
  const q = query(
    collection(db, "groups"),
    where("groupCode", "==", code.toUpperCase())
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const docSnap = snap.docs[0];
  return { id: docSnap.id, ...(docSnap.data() as Group) };
}

export async function getGroup(
  groupId: string
): Promise<Group | null> {
  const docSnap = await getDoc(doc(db, "groups", groupId));
  if (!docSnap.exists()) return null;
  return docSnap.data() as Group;
}

export async function addMember(
  groupId: string,
  username: string
): Promise<void> {
  const memberRef = doc(db, "groups", groupId, "members", username);
  const existing = await getDoc(memberRef);
  if (existing.exists()) return;

  const memberData: Member = {
    username,
    sushiCount: 0,
    joinedAt: Date.now(),
    lastUpdated: Date.now(),
  };
  await setDoc(memberRef, memberData);
  await updateDoc(doc(db, "groups", groupId), {
    memberUsernames: arrayUnion(username),
  });
}

export async function updateSushiCount(
  groupId: string,
  username: string,
  delta: number
): Promise<void> {
  const memberRef = doc(db, "groups", groupId, "members", username);

  if (delta < 0) {
    const snap = await getDoc(memberRef);
    if (snap.exists()) {
      const current = (snap.data() as Member).sushiCount;
      if (current + delta < 0) return;
    }
  }

  await updateDoc(memberRef, {
    sushiCount: increment(delta),
    lastUpdated: Date.now(),
  });
}

export function subscribeToMembers(
  groupId: string,
  callback: (members: Member[]) => void,
  onError?: (error: Error) => void
): () => void {
  const q = query(
    collection(db, "groups", groupId, "members"),
    orderBy("sushiCount", "desc")
  );
  return onSnapshot(
    q,
    (snap) => {
      const members = snap.docs.map((d) => d.data() as Member);
      callback(members);
    },
    (err) => {
      console.error("subscribeToMembers error:", err);
      onError?.(err);
    }
  );
}
