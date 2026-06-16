import type { Metadata } from "next";
import { Heebo } from "next/font/google";
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
      <body className="flex min-h-screen flex-col font-sans">{children}</body>
    </html>
  );
}
