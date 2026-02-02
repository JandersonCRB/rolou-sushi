"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createGroup } from "@/lib/firestore";
import { STRINGS } from "@/lib/constants";
import { useAppStore } from "@/store/useAppStore";
import GroupCreated from "@/components/GroupCreated";

export default function CreateGroupPage() {
  const router = useRouter();
  const { username, hydrated, setGroup } = useAppStore();
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState<{
    groupId: string;
    groupCode: string;
  } | null>(null);

  useEffect(() => {
    if (hydrated && !username) router.push("/");
  }, [hydrated, username, router]);

  if (!hydrated || !username) return null;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = groupName.trim();
    if (!name) return;

    setLoading(true);
    try {
      const result = await createGroup(name, username);
      setGroup(result.groupId, result.groupCode, name);
      setCreated(result);
    } catch {
      alert(STRINGS.errors.generic);
    } finally {
      setLoading(false);
    }
  };

  if (created) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-6">
        <div className="w-full max-w-md">
          <GroupCreated
            groupCode={created.groupCode}
            groupName={groupName}
            onContinue={() => router.push(`/group/${created.groupId}`)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6">
      <motion.form
        onSubmit={handleCreate}
        className="flex w-full max-w-md flex-col items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-sushi-dark">
          {STRINGS.createGroup.title}
        </h1>

        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder={STRINGS.createGroup.namePlaceholder}
          maxLength={40}
          className="w-full rounded-2xl border-2 border-sushi-pink/30 bg-white px-5 py-4 text-center text-lg font-semibold text-sushi-dark outline-none transition-colors placeholder:text-sushi-gray/50 focus:border-sushi-pink"
          autoFocus
        />

        <button
          type="submit"
          disabled={!groupName.trim() || loading}
          className="w-full rounded-full bg-sushi-pink py-4 text-lg font-bold text-white transition-transform disabled:opacity-50 active:scale-95"
        >
          {loading ? STRINGS.loading : STRINGS.createGroup.create}
        </button>
      </motion.form>
    </div>
  );
}
