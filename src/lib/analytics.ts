import { logEvent as firebaseLogEvent } from "firebase/analytics";
import { initAnalytics } from "./firebase";

let analyticsPromise: ReturnType<typeof initAnalytics> | null = null;

function getAnalytics() {
  if (!analyticsPromise) {
    analyticsPromise = initAnalytics();
  }
  return analyticsPromise;
}

export async function logEvent(name: string, params?: Record<string, string | number>) {
  try {
    const analytics = await getAnalytics();
    if (analytics) {
      firebaseLogEvent(analytics, name, params);
    }
  } catch {
    // Analytics not available
  }
}
