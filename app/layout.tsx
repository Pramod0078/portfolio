import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pramod-chakraworty-portfolio.nayan-idealit.chatgpt.site"),
  title: "Pramod Chakraworty — React Native & Next.js Developer",
  icons: { icon: "/icon.svg" },
  description: "Software developer in Indore, India. I build thoughtful mobile, web, and desktop experiences with React Native, Next.js, and TypeScript. Explore my work, experience, and skills.",
  openGraph: {
    title: "Pramod Chakraworty — Thoughtful code. Real-world impact.",
    description: "React Native & Next.js developer. Cross-platform experiences. 50k users.",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/opengraph-image.svg", width: 1200, height: 630, alt: "Pramod Chakraworty — Software Developer" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#f5f5f0" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
