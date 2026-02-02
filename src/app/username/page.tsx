"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import UsernameInput from "@/components/UsernameInput";
import { useAppStore } from "@/store/useAppStore";

function UsernamePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get("action") || "create";
  const code = searchParams.get("code") || "";
  const setUsername = useAppStore((s) => s.setUsername);

  const handleSubmit = (username: string) => {
    setUsername(username);
    if (action === "join") {
      router.push(`/join-group${code ? `?code=${code}` : ""}`);
    } else {
      router.push("/create-group");
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        <UsernameInput onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default function UsernamePage() {
  return (
    <Suspense>
      <UsernamePageContent />
    </Suspense>
  );
}
