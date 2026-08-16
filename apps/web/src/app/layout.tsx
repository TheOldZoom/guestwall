import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Container, ToastProvider } from "@/components/ui";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
});
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jetBrainsMono.className} suppressHydrationWarning>
      <body>
        <ToastProvider>
          <Container className="py-8 sm:py-12">
            <main className="mx-auto max-w-5xl px-6 bg-background text-foreground min-h-screen flex flex-col">
              <div className="flex-1">{children}</div>
            </main>
          </Container>
        </ToastProvider>
      </body>
    </html>
  );
}
