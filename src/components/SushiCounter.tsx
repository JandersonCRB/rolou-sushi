"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IMAGES, STRINGS } from "@/lib/constants";
import { updateSushiCount } from "@/lib/firestore";
import AddCountDialog from "./AddCountDialog";

interface SushiCounterProps {
  groupId: string;
  username: string;
  count: number;
}

export default function SushiCounter({
  groupId,
  username,
  count,
}: SushiCounterProps) {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const lastClick = useRef(0);

  const handleDelta = useCallback(
    (delta: number) => {
      const now = Date.now();
      if (now - lastClick.current < 300) return;
      lastClick.current = now;
      updateSushiCount(groupId, username, delta);
    },
    [groupId, username]
  );

  return (
    <>
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-sushi-gray">
          {STRINGS.counter.title}
        </p>

        <div className="flex items-center gap-6">
          <button
            onClick={() => handleDelta(-1)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md transition-transform active:scale-90"
            aria-label="Remover 1 sushi"
          >
            <Image
              src={IMAGES.iconMinus}
              alt="Menos"
              width={32}
              height={32}
            />
          </button>

          <motion.div
            key={count}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="flex h-28 w-28 items-center justify-center rounded-full bg-sushi-pink shadow-lg"
          >
            <span className="text-4xl font-extrabold text-white">{count}</span>
          </motion.div>

          <button
            onClick={() => handleDelta(1)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md transition-transform active:scale-90"
            aria-label="Adicionar 1 sushi"
          >
            <Image
              src={IMAGES.iconPlus}
              alt="Mais"
              width={32}
              height={32}
            />
          </button>
        </div>

        <button
          onClick={() => setShowQuickAdd(true)}
          className="rounded-full bg-sushi-mint/20 px-6 py-2 text-sm font-bold text-sushi-dark transition-colors hover:bg-sushi-mint/40"
        >
          {STRINGS.counter.quickAdd}
        </button>
      </motion.div>

      <AnimatePresence>
        {showQuickAdd && (
          <AddCountDialog
            onAdd={(n) => {
              handleDelta(n);
              setShowQuickAdd(false);
            }}
            onClose={() => setShowQuickAdd(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
