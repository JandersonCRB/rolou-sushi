"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { QRCode } from "react-qrcode-logo";
import { STRINGS } from "@/lib/constants";

interface InviteDialogProps {
  groupCode: string;
  groupName: string;
  onClose: () => void;
}

export default function InviteDialog({
  groupCode,
  groupName,
  onClose,
}: InviteDialogProps) {
  const [copied, setCopied] = useState(false);
  const inviteUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/join-group?code=${groupCode}`
      : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${groupName} - Rolou Sushi`,
        text: `Entre no grupo "${groupName}" no Rolou Sushi!`,
        url: inviteUrl,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-sm rounded-3xl bg-white p-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-center text-xl font-bold text-sushi-dark">
          {STRINGS.invite.title}
        </h2>

        <div className="mb-4 flex flex-col items-center gap-2">
          <p className="text-sm text-sushi-gray">{STRINGS.invite.code}</p>
          <p className="text-3xl font-extrabold tracking-widest text-sushi-pink">
            {groupCode}
          </p>
        </div>

        <div className="mb-4 flex justify-center">
          <QRCode
            value={inviteUrl}
            size={180}
            bgColor="#FFF8F0"
            fgColor="#2D1B14"
            qrStyle="dots"
            eyeRadius={8}
          />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleCopy}
            className="w-full rounded-full bg-sushi-mint/20 py-3 font-bold text-sushi-dark transition-colors hover:bg-sushi-mint/40"
          >
            {copied ? STRINGS.createGroup.copied : STRINGS.invite.copyLink}
          </button>
          <button
            onClick={handleShare}
            className="w-full rounded-full bg-sushi-pink py-3 font-bold text-white transition-transform active:scale-95"
          >
            {STRINGS.invite.share}
          </button>
          <button
            onClick={onClose}
            className="text-sm font-semibold text-sushi-gray"
          >
            Fechar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
