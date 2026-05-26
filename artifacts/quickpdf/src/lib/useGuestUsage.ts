import { useState, useCallback } from "react";

const STORAGE_KEY = "quickpdf_guest_uses";
const MAX_GUEST_USES = 2;

function getGuestUses(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const n = parseInt(raw ?? "0", 10);
    return isNaN(n) ? 0 : n;
  } catch {
    return 0;
  }
}

function incrementGuestUses(): number {
  try {
    const next = getGuestUses() + 1;
    localStorage.setItem(STORAGE_KEY, String(next));
    return next;
  } catch {
    return MAX_GUEST_USES + 1;
  }
}

export function useGuestUsage() {
  const [uses, setUses] = useState(() => getGuestUses());

  const remainingUses = Math.max(0, MAX_GUEST_USES - uses);
  const hasGuestUsesLeft = uses < MAX_GUEST_USES;

  const consumeGuestUse = useCallback((): boolean => {
    const current = getGuestUses();
    if (current >= MAX_GUEST_USES) {
      return false;
    }
    const next = incrementGuestUses();
    setUses(next);
    return true;
  }, []);

  return { uses, remainingUses, hasGuestUsesLeft, consumeGuestUse, maxUses: MAX_GUEST_USES };
}
