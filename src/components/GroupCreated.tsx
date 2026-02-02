"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { QRCode } from "react-qrcode-logo";
import { IMAGES, STRINGS } from "@/lib/constants";

interface GroupCreatedProps {
  groupCode: string;
  groupName: string;
  onContinue: () => void;
}

export default function GroupCreated({
  groupCode,
  groupName,
  onContinue,
}: GroupCreatedProps) {
  const [copied, setCopied] = useState(false);
  const inviteUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/join-group?code=${groupCode}`
      : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(groupCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="flex w-full flex-col items-center gap-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Image
        src={IMAGES.celebration}
        alt="Celebracao"
        width={180}
        height={180}
      />

      <h2 className="text-2xl font-bold text-sushi-dark">
        {STRINGS.createGroup.success}
      </h2>
      <p className="text-sushi-gray">{groupName}</p>

      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-sushi-gray">
          {STRINGS.createGroup.shareMessage}
        </p>
        <p className="text-4xl font-extrabold tracking-widest text-sushi-pink">
          {groupCode}
        </p>
      </div>

      <QRCode
        value={inviteUrl}
        size={160}
        bgColor="#FFF8F0"
        fgColor="#2D1B14"
        qrStyle="dots"
        eyeRadius={8}
      />

      <button
        onClick={handleCopy}
        className="w-full rounded-full bg-sushi-mint/20 py-3 font-bold text-sushi-dark transition-colors hover:bg-sushi-mint/40"
      >
        {copied ? STRINGS.createGroup.copied : STRINGS.createGroup.copyCode}
      </button>

      <button
        onClick={onContinue}
        className="w-full rounded-full bg-sushi-pink py-4 text-lg font-bold text-white transition-transform active:scale-95"
      >
        {STRINGS.createGroup.goToGroup}
      </button>
    </motion.div>
  );
}
