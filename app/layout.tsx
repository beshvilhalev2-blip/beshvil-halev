import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import AiAssistantLazy from "@/app/components/ai-assistant/ai-assistant-lazy";
import SiteAtmosphereGate from "@/app/components/site-atmosphere-gate";
import { HOME_ATMOSPHERE_BASE } from "@/app/components/home-page-atmosphere";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "בשביל הלב | מדריך טיולים למשפחות",
  description:
    "להיות בתנועה זאת התרופה — מדריך טיולים למשפחות. מקומות, ציוד ותכנון שיעזרו לכם לצאת לטבע בקצב שלכם.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} h-full antialiased`}
    >
      <body
        className="flex min-h-screen flex-col font-sans"
        style={{ backgroundColor: HOME_ATMOSPHERE_BASE }}
      >
        <SiteAtmosphereGate />
        <div className="relative z-10 flex min-h-screen flex-1 flex-col">{children}</div>
        <AiAssistantLazy />
      </body>
    </html>
  );
}
