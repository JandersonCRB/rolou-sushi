"use client";

import { useState, useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Member } from "@/lib/types";

interface AppState {
  username: string;
  groupId: string;
  groupCode: string;
  groupName: string;
  members: Member[];
  setUsername: (username: string) => void;
  setGroup: (groupId: string, groupCode: string, groupName: string) => void;
  setMembers: (members: Member[]) => void;
  clearSession: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      username: "",
      groupId: "",
      groupCode: "",
      groupName: "",
      members: [],
      setUsername: (username) => set({ username }),
      setGroup: (groupId, groupCode, groupName) =>
        set({ groupId, groupCode, groupName }),
      setMembers: (members) => set({ members }),
      clearSession: () =>
        set({
          username: "",
          groupId: "",
          groupCode: "",
          groupName: "",
          members: [],
        }),
    }),
    {
      name: "rolou-sushi-storage",
      partialize: (state) => ({
        username: state.username,
        groupId: state.groupId,
        groupCode: state.groupCode,
        groupName: state.groupName,
      }),
    }
  )
);

export function useHydration() {
  const [hydrated, setHydrated] = useState(
    useAppStore.persist.hasHydrated()
  );

  useEffect(() => {
    if (hydrated) return;
    const unsub = useAppStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );
    return unsub;
  }, [hydrated]);

  return hydrated;
}
