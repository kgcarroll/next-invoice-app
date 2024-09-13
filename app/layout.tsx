import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";

// Global App metadata
export const metadata: Metadata = {
  title: {
    template: "%s | PayMe Dashboard",
    default: "PayMe Dashboard",
  },
  description:
    "The official Dashboard that helped Kevin learn things, built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
