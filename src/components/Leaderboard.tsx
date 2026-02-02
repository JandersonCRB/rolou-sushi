"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES, STRINGS } from "@/lib/constants";
import type { Member } from "@/lib/types";

const RANK_BADGES: Record<number, string> = {
  0: IMAGES.badgeLegend,
  1: IMAGES.badgeMaster,
  2: IMAGES.badgeFirst,
};

interface LeaderboardProps {
  members: Member[];
  currentUser: string;
}

export default function Leaderboard({ members, currentUser }: LeaderboardProps) {
  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <Image src={IMAGES.empty} alt="Vazio" width={120} height={120} />
        <p className="text-sushi-gray font-semibold">
          {STRINGS.leaderboard.empty}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="mb-4 text-center text-lg font-bold text-sushi-dark">
        {STRINGS.leaderboard.title}
      </h2>
      <div className="flex flex-col gap-2">
        {members.map((member, index) => {
          const isCurrentUser = member.username === currentUser;
          const badge = RANK_BADGES[index];
          const sushiLabel =
            member.sushiCount === 1
              ? STRINGS.leaderboard.sushiSingular
              : STRINGS.leaderboard.sushi;

          return (
            <motion.div
              key={member.username}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${
                isCurrentUser
                  ? "bg-sushi-pink/10 ring-2 ring-sushi-pink/30"
                  : "bg-white"
              }`}
            >
              <span className="w-8 text-center text-lg font-bold text-sushi-gray">
                {index + 1}
              </span>

              {badge && (
                <Image src={badge} alt="Badge" width={28} height={28} />
              )}

              <span className="flex-1 font-semibold text-sushi-dark">
                {member.username}
                {isCurrentUser && (
                  <span className="ml-1 text-sm text-sushi-pink">
                    {STRINGS.leaderboard.you}
                  </span>
                )}
              </span>

              <span className="font-bold text-sushi-coral">
                {member.sushiCount}{" "}
                <span className="text-sm font-normal text-sushi-gray">
                  {sushiLabel}
                </span>
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
