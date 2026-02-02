"use client";

import { motion } from "framer-motion";

const QUICK_VALUES = [1, 2, 5, 10];

interface AddCountDialogProps {
  onAdd: (count: number) => void;
  onClose: () => void;
}

export default function AddCountDialog({ onAdd, onClose }: AddCountDialogProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-md rounded-t-3xl bg-white px-6 pb-8 pt-6"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex justify-center">
          <div className="h-1.5 w-12 rounded-full bg-sushi-gray/20" />
        </div>
        <h3 className="mb-4 text-center text-lg font-bold text-sushi-dark">
          Adicionar Sushis
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {QUICK_VALUES.map((n) => (
            <button
              key={n}
              onClick={() => onAdd(n)}
              className="rounded-2xl bg-sushi-pink/10 py-4 text-xl font-bold text-sushi-pink transition-colors hover:bg-sushi-pink hover:text-white active:scale-95"
            >
              +{n}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
