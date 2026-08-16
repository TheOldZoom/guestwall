"use client";
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";
import type { ComponentProps } from "react";
export function Menubar({ className = "", ...props }: ComponentProps<typeof MenubarPrimitive>) {
  return (
    <MenubarPrimitive
      className={["flex border border-border/40", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
