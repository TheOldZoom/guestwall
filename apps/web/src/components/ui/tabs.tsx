"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import type { ComponentProps } from "react";

type TabsProps = ComponentProps<typeof TabsPrimitive.Root>;

export function Tabs({ defaultValue, ...props }: TabsProps) {
  return <TabsPrimitive.Root defaultValue={defaultValue} {...props} />;
}

export function TabsList({ className = "", ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={["relative flex gap-2 border-b border-border/40", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {props.children}
      <TabsPrimitive.Indicator className="absolute bottom-0 left-0 h-[2px] w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] bg-foreground" />
    </TabsPrimitive.List>
  );
}

export function TabsTrigger({
  className = "",
  ...props
}: ComponentProps<typeof TabsPrimitive.Tab>) {
  return (
    <TabsPrimitive.Tab
      className={[
        "relative border-b border-transparent px-3 py-2 text-[10px] uppercase tracking-[0.15em] text-muted outline-none",
        "data-[selected]:text-foreground",
        "focus-visible:text-foreground",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

export function TabsContent({
  className = "",
  ...props
}: ComponentProps<typeof TabsPrimitive.Panel>) {
  return (
    <TabsPrimitive.Panel
      className={["pt-4 outline-none", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
