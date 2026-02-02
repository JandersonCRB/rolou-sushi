"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getGroupByCode, addMember } from "@/lib/firestore";
import { STRINGS } from "@/lib/constants";
import { useAppStore } from "@/store/useAppStore";
import JoinGroupForm from "@/components/JoinGroupForm";

function JoinGroupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("code") || "";
  const { username, hydrated, setGroup } = useAppStore();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hydrated && !username) {
      const action = `join${initialCode ? `&code=${initialCode}` : ""}`;
      router.push(`/username?action=${action}`);
    }
  }, [hydrated, username, router, initialCode]);

  if (!hydrated || !username) return null;

  const handleJoin = async (code: string) => {
    setError("");
    setLoading(true);
    try {
      const group = await getGroupByCode(code);
      if (!group) {
        setError(STRINGS.joinGroup.notFound);
        return;
      }

      await addMember(group.id, username);
      setGroup(group.id, group.groupCode, group.groupName);
      router.push(`/group/${group.id}`);
    } catch {
      setError(STRINGS.errors.generic);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        <JoinGroupForm
          initialCode={initialCode}
          onSubmit={handleJoin}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default function JoinGroupPage() {
  return (
    <Suspense>
      <JoinGroupContent />
    </Suspense>
  );
}
