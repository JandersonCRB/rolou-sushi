"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { STRINGS } from "@/lib/constants";

interface JoinGroupFormProps {
  initialCode?: string;
  onSubmit: (code: string) => void;
  error?: string;
  loading?: boolean;
}

export default function JoinGroupForm({
  initialCode = "",
  onSubmit,
  error,
  loading,
}: JoinGroupFormProps) {
  const [code, setCode] = useState(initialCode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (trimmed.length === 6) {
      onSubmit(trimmed);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-2xl font-bold text-sushi-dark">
        {STRINGS.joinGroup.title}
      </h1>

      <input
        type="text"
        value={code}
        onChange={(e) =>
          setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))
        }
        placeholder={STRINGS.joinGroup.codePlaceholder}
        maxLength={6}
        className="w-full rounded-2xl border-2 border-sushi-pink/30 bg-white px-5 py-4 text-center text-2xl font-bold tracking-widest text-sushi-dark outline-none transition-colors placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-sushi-gray/50 focus:border-sushi-pink"
        autoFocus
      />

      {error && (
        <p className="text-sm font-semibold text-sushi-coral">{error}</p>
      )}

      <button
        type="submit"
        disabled={code.length !== 6 || loading}
        className="w-full rounded-full bg-sushi-pink py-4 text-lg font-bold text-white transition-transform disabled:opacity-50 active:scale-95"
      >
        {loading ? STRINGS.loading : STRINGS.joinGroup.join}
      </button>
    </motion.form>
  );
}
