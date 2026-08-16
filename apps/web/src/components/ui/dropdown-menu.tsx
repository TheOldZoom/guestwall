"use client";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import type { ComponentProps } from "react";
export const DropdownMenu = MenuPrimitive.Root;
export const DropdownMenuTrigger = MenuPrimitive.Trigger;
export function DropdownMenuContent({
  className = "",
  children,
  ...props
}: ComponentProps<typeof MenuPrimitive.Popup>) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner sideOffset={6}>
        <MenuPrimitive.Popup
          className={[
            "z-50 min-w-40 border border-border bg-background p-1 outline-none",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {children}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}
export function DropdownMenuItem({
  className = "",
  ...props
}: ComponentProps<typeof MenuPrimitive.Item>) {
  return (
    <MenuPrimitive.Item
      className={[
        "flex w-full cursor-pointer items-center px-2 py-1.5 text-sm text-muted outline-none transition-colors data-[highlighted]:bg-foreground data-[highlighted]:text-background",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
export const DropdownMenuSeparator = MenuPrimitive.Separator;
export const DropdownMenuCheckboxItem = MenuPrimitive.CheckboxItem;
export const DropdownMenuRadioGroup = MenuPrimitive.RadioGroup;
export const DropdownMenuRadioItem = MenuPrimitive.RadioItem;
