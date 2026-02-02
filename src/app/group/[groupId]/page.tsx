"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { subscribeToMembers, getGroup } from "@/lib/firestore";
import { IMAGES, STRINGS } from "@/lib/constants";
import { useAppStore } from "@/store/useAppStore";
import SushiCounter from "@/components/SushiCounter";
import Leaderboard from "@/components/Leaderboard";
import InviteDialog from "@/components/InviteDialog";
import ConfettiAnimation from "@/components/ConfettiAnimation";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function GroupPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.groupId as string;
  const { username, hydrated, groupCode, groupName, members, setMembers, setGroup } =
    useAppStore();
  const [showInvite, setShowInvite] = useState(false);
  const [loading, setLoading] = useState(true);
  const prevCountRef = useRef(0);

  useEffect(() => {
    if (!hydrated) return;
    if (!username) {
      router.push("/");
      return;
    }

    // Fetch group details if not in store
    if (!groupName) {
      getGroup(groupId).then((g) => {
        if (g) setGroup(groupId, g.groupCode, g.groupName);
      });
    }

    const unsub = subscribeToMembers(groupId, (data) => {
      setMembers(data);
      setLoading(false);
    });

    return () => unsub();
  }, [groupId, username, hydrated]);

  const currentMember = members.find((m) => m.username === username);
  const currentCount = currentMember?.sushiCount ?? 0;

  useEffect(() => {
    prevCountRef.current = currentCount;
  }, [currentCount]);

  if (!hydrated || !username) return null;
  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex min-h-dvh flex-col items-center px-4 pb-8 pt-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={IMAGES.logoIcon}
              alt="Rolou Sushi"
              width={36}
              height={36}
            />
            <div>
              <h1 className="text-lg font-bold text-sushi-dark leading-tight">
                {groupName}
              </h1>
              <p className="text-xs text-sushi-gray">
                {members.length} {members.length === 1 ? "membro" : "membros"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowInvite(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-sushi-pink/10 transition-colors hover:bg-sushi-pink/20"
            aria-label="Convidar amigos"
          >
            <Image
              src={IMAGES.iconShare}
              alt="Compartilhar"
              width={24}
              height={24}
            />
          </button>
        </div>

        {/* Counter */}
        <div className="mb-8">
          <SushiCounter
            groupId={groupId}
            username={username}
            count={currentCount}
          />
        </div>

        {/* Leaderboard */}
        <Leaderboard members={members} currentUser={username} />
      </div>

      {/* Invite Dialog */}
      <AnimatePresence>
        {showInvite && (
          <InviteDialog
            groupCode={groupCode}
            groupName={groupName}
            onClose={() => setShowInvite(false)}
          />
        )}
      </AnimatePresence>

      {/* Confetti */}
      <ConfettiAnimation
        count={currentCount}
        previousCount={prevCountRef.current}
      />
    </div>
  );
}
