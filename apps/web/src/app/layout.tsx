import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import { KeepAndroidOpenBanner } from "@/components/KeepAndroidOpen";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={jetBrainsMono.className}
      suppressHydrationWarning
    >
      <body>
        <KeepAndroidOpenBanner />
        <main className="mx-auto max-w-5xl px-6 bg-background text-foreground min-h-screen flex flex-col">
          <div className="flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
