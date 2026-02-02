"use client";

import ErrorDisplay from "@/components/ErrorDisplay";

export default function Error({ reset }: { reset: () => void }) {
  return <ErrorDisplay onRetry={reset} />;
}
