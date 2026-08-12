"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import type { IconType } from "react-icons";
import { Dropdown } from "./Dropdown";

export interface FooterSocial {
  name: string;
  url: string;
  icon: IconType;
}

export interface FooterLinkGroupItem {
  name: string;
  url: string;
}

export interface FooterLinkGroup {
  triggerIcon: ReactNode;
  ariaLabel: string;
  links: FooterLinkGroupItem[];
}

export interface FooterProps {
  name: string;
  email?: string;
  tagline?: string;
  socials?: FooterSocial[];
  linkGroup?: FooterLinkGroup;
  privacyHref?: string;
  termsHref?: string;
  className?: string;
}

export function Footer({
  name,
  email,
  tagline,
  socials = [],
  linkGroup,
  privacyHref,
  termsHref,
  className = "",
}: FooterProps) {
  return (
    <footer
      className={["mt-12 border-t border-border/40 py-16", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em]">{name}</p>
            {email && (
              <a
                href={`mailto:${email}`}
                className="mt-2 block text-xs text-muted transition hover:text-foreground"
              >
                {email}
              </a>
            )}
          </div>

          {(socials.length > 0 || linkGroup) && (
            <div className="flex items-center gap-6 text-muted">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 hover:text-foreground"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}

              {linkGroup && (
                <Dropdown
                  ariaLabel={linkGroup.ariaLabel}
                  triggerIcon={linkGroup.triggerIcon}
                  options={linkGroup.links.map((link) => ({
                    id: link.url,
                    label: link.name,
                  }))}
                  onChange={(url) =>
                    window.open(url, "_blank", "noopener,noreferrer")
                  }
                />
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          {tagline && <p className="text-xs text-muted">{tagline}</p>}

          <div className="flex items-center gap-2 text-xs text-muted">
            <span>© {new Date().getFullYear()} · All rights reserved</span>
            {privacyHref && (
              <>
                <span>·</span>
                <Link
                  href={privacyHref}
                  className="transition hover:text-foreground"
                >
                  Privacy
                </Link>
              </>
            )}
            {termsHref && (
              <>
                <span>·</span>
                <Link
                  href={termsHref}
                  className="transition hover:text-foreground"
                >
                  Terms
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
