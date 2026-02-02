"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { IMAGES, STRINGS } from "@/lib/constants";

interface UsernameInputProps {
  onSubmit: (username: string) => void;
}

export default function UsernameInput({ onSubmit }: UsernameInputProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError(STRINGS.username.validation);
      return;
    }
    onSubmit(trimmed);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Image
        src={IMAGES.counter}
        alt="Sushi character"
        width={150}
        height={150}
      />
      <h1 className="text-2xl font-bold text-sushi-dark">
        {STRINGS.username.title}
      </h1>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
        placeholder={STRINGS.username.placeholder}
        maxLength={20}
        className="w-full rounded-2xl border-2 border-sushi-pink/30 bg-white px-5 py-4 text-center text-lg font-semibold text-sushi-dark outline-none transition-colors placeholder:text-sushi-gray/50 focus:border-sushi-pink"
        autoFocus
      />
      {error && (
        <p className="text-sm text-sushi-coral">{error}</p>
      )}
      <button
        type="submit"
        className="w-full rounded-full bg-sushi-pink py-4 text-lg font-bold text-white transition-transform active:scale-95"
      >
        {STRINGS.username.continue}
      </button>
    </motion.form>
  );
}
