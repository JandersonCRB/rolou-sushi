"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import WelcomeHero from "@/components/WelcomeHero";
import { STRINGS } from "@/lib/constants";
import { useAppStore } from "@/store/useAppStore";

export default function Home() {
  const router = useRouter();
  const { username, groupId } = useAppStore();
  const hasSession = username && groupId;

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <WelcomeHero />

        <motion.p
          className="text-center text-lg text-sushi-gray"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {STRINGS.welcome.subtitle}
        </motion.p>

        <motion.div
          className="flex w-full flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => router.push("/username?action=create")}
            className="w-full rounded-full bg-sushi-pink py-4 text-lg font-bold text-white transition-transform active:scale-95"
          >
            {STRINGS.welcome.createGroup}
          </button>

          <button
            onClick={() => router.push("/username?action=join")}
            className="w-full rounded-full border-2 border-sushi-pink bg-white py-4 text-lg font-bold text-sushi-pink transition-transform active:scale-95"
          >
            {STRINGS.welcome.joinGroup}
          </button>

          {hasSession && (
            <button
              onClick={() => router.push(`/group/${groupId}`)}
              className="w-full rounded-full bg-sushi-mint/30 py-3 text-base font-bold text-sushi-dark transition-transform active:scale-95"
            >
              {STRINGS.welcome.continueSession}
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
