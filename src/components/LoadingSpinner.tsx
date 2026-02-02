"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES, STRINGS } from "@/lib/constants";

export default function LoadingSpinner() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Image
          src={IMAGES.spinner}
          alt="Carregando"
          width={80}
          height={80}
          priority
        />
      </motion.div>
      <p className="text-sushi-gray font-semibold">{STRINGS.loading}</p>
    </div>
  );
}
