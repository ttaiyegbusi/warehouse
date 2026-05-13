"use client";

import { useEffect, useState } from "react";

/**
 * Returns `true` while loading, `false` after `delay` ms.
 * Re-fires every time the component mounts (i.e., every page navigation).
 */
export function useSkeletonLoad(delay = 900) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    const t = setTimeout(() => setLoaded(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return !loaded;
}
