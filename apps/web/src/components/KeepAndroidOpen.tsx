"use client";
/**
 * Keep Android Open – Countdown Banner
 * Licensed under the GNU General Public License v3.0
 * SPDX-License-Identifier: GPL-3.0-only
 *
 * A self-contained, embeddable script that injects a countdown banner into any
 * web page. No external dependencies.
 */
import { useEffect, useMemo, useState } from "react";
import { TriangleAlert } from "lucide-react";
import { Banner } from "./ui/Banner";

const STORAGE_KEY = "kao-banner-hidden";
const DISMISS_DAYS = 30;
const TARGET_DATE = new Date("Jan 01, 2027 00:00:00").getTime();

const messages: Record<string, string> = {
  fa: "اندروید، یک سکّوی بسته خواهد شد!",
  ar: "سيصبح نظام أندرويد منصة مغلقة في",
  he: "אנדרואיד תהפוך לפלטפורמה נעולה בעוד",
  en: "Android will become a locked-down platform in",
  ca: "Android es convertir\u00E0 en una plataforma tancada",
  cs: "Android se stane uzamčenou platformou za",
  de: "Android wird eine geschlossene Plattform werden.",
  da: "Android vil blive en lukket platform om",
  nl: "Android zal een gesloten platform worden over",
  el: "\u03A4\u03BF Android \u03B8\u03B1 \u03B3\u03AF\u03BD\u03B5\u03B9 \u03BC\u03AF\u03B1 \u03BA\u03BB\u03B5\u03B9\u03C3\u03C4\u03AE \u03C0\u03BB\u03B1\u03C4\u03C6\u03CC\u03C1\u03BC\u03B1",
  es: "Android se convertir\u00E1 en una plataforma cerrada en",
  fr: "Android va devenir une plateforme ferm\u00E9e dans",
  id: "Android akan menjadi platform yang terkunci.",
  it: "Android diventer\u00E0 una piattaforma bloccata",
  ko: "Android\uAC00 \uD3D0\uC1C4\uB41C \uD50C\uB7AB\uD3FC\uC774 \uB418\uAE30\uAE4C\uC9C0 \uB0A8\uC740 \uC2DC\uAC04:",
  pl: "Android stanie si\u0119 platform\u0105 zamkni\u0119t\u0105 za",
  "pt-BR": "O Android se tornar\u00E1 uma plataforma fechada em",
  ru: "Android \u0441\u0442\u0430\u043D\u0435\u0442 \u0437\u0430\u043A\u0440\u044B\u0442\u043E\u0439 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u043E\u0439 \u0447\u0435\u0440\u0435\u0437",
  sk: "Android sa stane uzamknutou platformou",
  th: "Android\u0E08\u0E30\u0E40\u0E1B\u0E47\u0E19\u0E41\u0E1E\u0E25\u0E15\u0E1F\u0E2D\u0E23\u0E4C\u0E21\u0E17\u0E35\u0E48\u0E16\u0E39\u0E01\u0E25\u0E47\u0E2D\u0E01",
  tr: "Android k\u0131s\u0131tl\u0131 bir platform haline gelecek.",
  uk: "Android \u0441\u0442\u0430\u043D\u0435 \u0437\u0430\u043A\u0440\u0438\u0442\u043E\u044E \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u043E\u044E",
  "zh-CN": "\u5B89\u5353\u5C06\u6210\u4E3A\u4E00\u4E2A\u5C01\u95ED\u5E73\u53F0",
  "zh-TW": "Android \u5C07\u6210\u70BA\u4E00\u500B\u5C01\u9589\u5E73\u53F0",
  ja: "Androidは閉鎖的なプラットフォームになろうとしています",
  fi: "Androidista tulee suljettu alusta",
  hu: "Az Android egy lezárt platform lesz",
  vi: "Android sẽ trở thành một hệ điều hành đóng",
  bg: "Android ще стане заключена платформа след",
  be: "Android \u0441\u0442\u0430\u043d\u0435 \u0437\u0430\u043a\u0440\u044b\u0442\u0430\u0439 \u043f\u043b\u0430\u0444\u0442\u043e\u0440\u043c\u0430\u0439",
  hi: "Android एक बंद इकोसिस्टम बन जाएगा",
};

function resolveLocale(tag: string | null | undefined): string {
  if (!tag) return "en";
  if (messages[tag]) return tag;
  const lower = tag.toLowerCase();
  for (const key of Object.keys(messages)) {
    if (key.toLowerCase() === lower) return key;
  }
  const base = lower.split("-")[0];
  for (const key of Object.keys(messages)) {
    if (key.toLowerCase() === base) return key;
  }
  for (const key of Object.keys(messages)) {
    if (key.toLowerCase().split("-")[0] === base) return key;
  }
  return "en";
}

export function KeepAndroidOpenBanner() {
  const [mounted, setMounted] = useState(false);
  const [locale, setLocale] = useState("en");
  const [display, setDisplay] = useState("");

  useEffect(() => {
    setMounted(true);
    setLocale(
      resolveLocale(document.documentElement.lang || navigator.language),
    );
  }, []);

  const formatters = useMemo(
    () => ({
      day: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "day",
        unitDisplay: "narrow",
      }),
      hour: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "hour",
        unitDisplay: "narrow",
      }),
      minute: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "minute",
        unitDisplay: "narrow",
      }),
      second: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "second",
        unitDisplay: "narrow",
      }),
    }),
    [locale],
  );

  useEffect(() => {
    if (!mounted) return;

    function update() {
      const distance = TARGET_DATE - Date.now();
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const parts: string[] = [];
      if (days > 0) parts.push(formatters.day.format(days));
      if (parts.length || hours > 0) parts.push(formatters.hour.format(hours));
      if (parts.length || minutes > 0)
        parts.push(formatters.minute.format(minutes));
      parts.push(formatters.second.format(seconds));

      setDisplay(parts.join(" "));
    }

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [mounted, formatters]);

  if (!mounted) return null;

  const message = messages[locale] ?? messages.en;
  const linkUrl =
    locale === "en"
      ? "https://keepandroidopen.org"
      : `https://keepandroidopen.org/${locale}/`;

  return (
    <Banner
      storageKey={STORAGE_KEY}
      dismissDays={DISMISS_DAYS}
      icon={TriangleAlert}
      message={message}
      trailing={display}
      href={linkUrl}
      external={true}
    />
  );
}
