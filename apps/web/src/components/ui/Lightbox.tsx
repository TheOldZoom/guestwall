"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ImageOff } from "lucide-react";

export type GalleryImage = {
  src: string;
  caption?: string;
};

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  touchHandlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
  };
}

export function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
  touchHandlers,
}: LightboxProps) {
  const active = images[index];
  const hasMultiple = images.length > 1;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [index]);

  useEffect(() => closeButtonRef.current?.focus(), []);

  useEffect(() => {
    if (!hasMultiple) return;
    [
      images[(index - 1 + images.length) % images.length],
      images[(index + 1) % images.length],
    ].forEach((img) => {
      const preload = new window.Image();
      preload.src = img.src;
    });
  }, [index, images, hasMultiple]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={active?.caption ?? "Image viewer"}
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-between border-b border-border/40 p-4"
      >
        <span aria-live="polite" className="font-mono text-xs text-muted">
          {index + 1} / {images.length}
        </span>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="cursor-pointer p-1.5 text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-4 sm:px-16"
        onTouchStart={touchHandlers.onTouchStart}
        onTouchEnd={touchHandlers.onTouchEnd}
      >
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              aria-label="Previous image"
              className="absolute inset-y-0 left-0 z-10 w-1/2 cursor-pointer sm:hidden"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="Next image"
              className="absolute inset-y-0 right-0 z-10 w-1/2 cursor-pointer sm:hidden"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              aria-label="Previous image"
              className="absolute left-2 hidden cursor-pointer p-2 text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:left-4 sm:block"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="Next image"
              className="absolute right-2 hidden cursor-pointer p-2 text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:right-4 sm:block"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        <div
          onClick={(e) => e.stopPropagation()}
          className="relative h-full w-full"
        >
          {failed ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted">
              <ImageOff className="h-6 w-6" aria-hidden="true" />
              <span className="text-xs">Image failed to load.</span>
            </div>
          ) : (
            <Image
              key={active?.src}
              src={active?.src}
              alt={active?.caption ?? ""}
              fill
              sizes="100vw"
              className="object-contain"
              onError={() => setFailed(true)}
            />
          )}
        </div>
      </div>

      {active?.caption && (
        <p
          onClick={(e) => e.stopPropagation()}
          className="border-t border-border/40 p-4 text-center text-xs text-muted"
        >
          {active.caption}
        </p>
      )}
    </div>
  );
}
