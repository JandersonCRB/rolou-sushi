"use client";

import { useEffect } from "react";
import { logEvent } from "@/lib/analytics";

// Inicializa o Firebase Analytics ao carregar o app (page_view automático do GA4).
export default function AnalyticsInit() {
  useEffect(() => {
    logEvent("app_open");
  }, []);
  return null;
}
