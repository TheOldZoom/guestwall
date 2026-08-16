"use client";
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import type { ComponentProps } from "react";
export const NavigationMenu = NavigationMenuPrimitive.Root;
export const NavigationMenuList = NavigationMenuPrimitive.List;
export const NavigationMenuItem = NavigationMenuPrimitive.Item;
export function NavigationMenuTrigger({
  className = "",
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      className={[
        "px-3 py-2 text-[10px] uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
export function NavigationMenuContent({
  className = "",
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      className={["border border-border bg-background p-3", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
export const NavigationMenuLink = NavigationMenuPrimitive.Link;
