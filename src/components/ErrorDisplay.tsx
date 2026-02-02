"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES, STRINGS } from "@/lib/constants";

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorDisplay({
  message = STRINGS.errors.generic,
  onRetry,
}: ErrorDisplayProps) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Image
          src={IMAGES.error}
          alt="Erro"
          width={200}
          height={200}
        />
      </motion.div>
      <p className="text-center text-lg font-semibold text-sushi-dark">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-full bg-sushi-pink px-8 py-3 font-bold text-white transition-transform active:scale-95"
        >
          {STRINGS.errors.tryAgain}
        </button>
      )}
    </div>
  );
}
