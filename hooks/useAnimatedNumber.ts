"use client";

import { useEffect, useState } from "react";

export function useAnimatedNumber(
  target: number,
  duration = 300
) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    const start = value;
    const difference = target - start;

    if (difference === 0) return;

    const startTime = performance.now();

    function animate(now: number) {
      const progress = Math.min(
        (now - startTime) / duration,
        1
      );

      const current =
        start + difference * progress;

      setValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [target]);

  return value;
}