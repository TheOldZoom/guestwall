"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SWIPE_THRESHOLD_PX = 50;

export function useGalleryLightbox(count: number) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const open = useCallback((index: number, trigger?: HTMLElement | null) => {
    triggerRef.current = trigger ?? null;
    setOpenIndex(index);
  }, []);

  const close = useCallback(() => {
    setOpenIndex(null);
    triggerRef.current?.focus();
    triggerRef.current = null;
  }, []);

  const showPrev = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i - 1 + count) % count));
  }, [count]);

  const showNext = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % count));
  }, [count]);

  useEffect(() => {
    if (openIndex === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openIndex, close, showPrev, showNext]);

  useEffect(() => {
    if (openIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
      const delta = endX - touchStartX.current;
      touchStartX.current = null;

      if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
      if (delta > 0) showPrev();
      else showNext();
    },
    [showPrev, showNext],
  );

  return {
    openIndex,
    isOpen: openIndex !== null,
    open,
    close,
    showPrev,
    showNext,
    touchHandlers: { onTouchStart, onTouchEnd },
  };
}
