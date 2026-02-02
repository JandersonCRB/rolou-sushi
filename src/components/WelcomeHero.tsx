"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/constants";

export default function WelcomeHero() {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={IMAGES.logo}
          alt="Rolou Sushi"
          width={220}
          height={80}
          priority
        />
      </motion.div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Image
          src={IMAGES.welcomeHero}
          alt="Sushi hero"
          width={300}
          height={300}
          priority
        />
      </motion.div>
    </div>
  );
}
