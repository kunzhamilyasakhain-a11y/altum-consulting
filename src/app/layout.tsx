import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/lib/config";
import "./globals.css";
export const metadata: Metadata = {
  ...(siteConfig.url ? { metadataBase: new URL(siteConfig.url) } : {}),
  title: "ALTUM Consulting — образовательные и цифровые решения для бизнеса",
  description:
    "Разрабатываем электронные курсы, корпоративные программы обучения и бизнес-игры. Создаём сайты, digital-продукты и решения на основе искусственного интеллекта.",
  openGraph: {
    title: "ALTUM Consulting — Digital in Motion",
    description: "Агентство образовательных и цифровых решений для бизнеса",
    locale: "ru_KZ",
    type: "website",
  },
  ...(siteConfig.url ? { alternates: { canonical: siteConfig.url } } : {}),
  robots: { index: Boolean(siteConfig.url), follow: Boolean(siteConfig.url) },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbf8f5",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
