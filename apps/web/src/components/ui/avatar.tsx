"use client";

import Image from "next/image";
import { Disc3, Music2, User } from "lucide-react";
import { useState } from "react";

type AvatarFallback = "user" | "music" | "cover" | "kw" | "artist" | "none";

export interface AvatarProps {
  src?: string | null;
  alt: string;
  size?: number;
  fallback?: AvatarFallback;
  className?: string;
}

export function Avatar({ src, alt, size = 40, fallback = "user", className = "" }: AvatarProps) {
  const [failed, setFailed] = useState(false);

  const showFallback = !src || failed;

  return (
    <div
      className={[
        "flex shrink-0 items-center justify-center overflow-hidden border border-border/40 bg-border/10",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        width: size,
        height: size,
      }}
    >
      {showFallback ? (
        <>
          {fallback === "user" && <User className="h-1/3 w-1/3 text-muted" aria-hidden="true" />}

          {fallback === "music" && <Music2 className="h-1/3 w-1/3 text-muted" aria-hidden="true" />}

          {fallback === "cover" && <Disc3 className="h-1/3 w-1/3 text-muted" aria-hidden="true" />}

          {fallback === "artist" && (
            <span
              className="text-[35%] font-medium uppercase tracking-[0.15em] text-muted"
              aria-hidden="true"
            >
              ART
            </span>
          )}

          {fallback === "kw" && (
            <span className="text-[35%] font-semibold tracking-tight text-muted" aria-hidden="true">
              KW
            </span>
          )}
        </>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
