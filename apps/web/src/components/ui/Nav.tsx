"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { MoreHorizontal } from "lucide-react";
import { Dropdown } from "./Dropdown";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  icon?: ReactNode;
}

export interface NavProps {
  name: string;
  href?: string;
  links?: NavLink[];
  maxVisibleLinks?: number;
  overflowTriggerIcon?: ReactNode;
  overflowAriaLabel?: string;
  className?: string;
}

const linkClass =
  "text-xs uppercase tracking-[0.2em] text-muted transition hover:text-foreground";

function NavLinkItem({ link }: { link: NavLink }) {
  const content = (
    <span className="inline-flex items-center gap-1.5">
      {link.icon}
      {link.label}
    </span>
  );

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={link.href} className={linkClass}>
      {content}
    </Link>
  );
}

export function Nav({
  name,
  href = "/",
  links = [],
  maxVisibleLinks = 4,
  overflowTriggerIcon,
  overflowAriaLabel = "More links",
  className = "",
}: NavProps) {
  const router = useRouter();

  const visibleLinks = links.slice(0, maxVisibleLinks);
  const overflowLinks = links.slice(maxVisibleLinks);

  return (
    <header
      className={["flex items-center justify-between py-8", className]
        .filter(Boolean)
        .join(" ")}
    >
      <Link href={href} className="text-sm uppercase tracking-[0.3em]">
        {name}
      </Link>

      <div className="flex items-center gap-6">
        {visibleLinks.map((link) => (
          <NavLinkItem key={link.href} link={link} />
        ))}

        {overflowLinks.length > 0 && (
          <Dropdown
            ariaLabel={overflowAriaLabel}
            triggerIcon={
              overflowTriggerIcon ?? <MoreHorizontal className="size-4" />
            }
            options={overflowLinks.map((link) => ({
              id: link.href,
              label: link.label,
            }))}
            onChange={(href) =>
              overflowLinks.find((l) => l.href === href)?.external
                ? window.open(href, "_blank", "noopener,noreferrer")
                : router.push(href)
            }
          />
        )}
      </div>
    </header>
  );
}
