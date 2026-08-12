"use client";

import { useState } from "react";
import Image from "next/image";
import { User, Music2 } from "lucide-react";

type AvatarFallback = "user" | "music" | "none";

interface AvatarProps {
  src?: string | null;
  alt: string;
  size?: number;
  fallback?: AvatarFallback;
  rounded?: boolean;
  className?: string;
}

export function Avatar({
  src,
  alt,
  size = 40,
  fallback = "user",
  rounded = false,
  className = "",
}: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showFallback = !src || failed;

  return (
    <div
      className={[
        "shrink-0 overflow-hidden bg-border/10 flex items-center justify-center",
        rounded ? "rounded-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ width: size, height: size }}
    >
      {showFallback ? (
        fallback === "user" ? (
          <User className="h-1/3 w-1/3 text-muted" aria-hidden="true" />
        ) : fallback === "music" ? (
          <Music2 className="h-1/3 w-1/3 text-muted" aria-hidden="true" />
        ) : null
      ) : (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          loading="lazy"
          className={[
            "h-full w-full object-cover",
            rounded ? "rounded-full" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
