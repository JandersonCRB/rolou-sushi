"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IMAGES, MILESTONES, STRINGS } from "@/lib/constants";

interface ConfettiAnimationProps {
  count: number;
  previousCount: number;
}

export default function ConfettiAnimation({
  count,
  previousCount,
}: ConfettiAnimationProps) {
  const [milestone, setMilestone] = useState<number | null>(null);

  useEffect(() => {
    const hit = MILESTONES.find(
      (m) => count >= m && previousCount < m
    );
    if (hit) {
      setMilestone(hit);
      const timer = setTimeout(() => setMilestone(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [count, previousCount]);

  return (
    <AnimatePresence>
      {milestone !== null && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMilestone(null)}
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="flex flex-col items-center gap-4"
          >
            <Image
              src={IMAGES.confetti}
              alt="Confetti"
              width={200}
              height={200}
            />
            <div className="rounded-2xl bg-white px-8 py-4 text-center shadow-xl">
              <p className="text-4xl font-extrabold text-sushi-pink">
                {milestone}!
              </p>
              <p className="mt-1 text-lg font-bold text-sushi-dark">
                {STRINGS.milestones[milestone]}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
