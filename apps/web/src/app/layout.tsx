import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "InterPrep - AI Interview Coach",
  description: "Ace your next interview with AI-powered prep tools.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <Header /> 
          <main>{children}</main> 
        </ConvexClientProvider>
      </body>
    </html>
  );
}