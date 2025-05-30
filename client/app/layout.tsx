import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UserProvider from "@/providers/UserProvider";
import { Toaster } from "react-hot-toast";

import Header from "./Components/Header/Header";
import MiniSidebar from "./Components/MiniSidebar/MiniSidebar";
import MainContentLayout from "@/providers/MainContentLayout";
import SidebarProvider from "@/providers/SidebarProvider";
import MainLayout from "@/providers/MainLayout";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
console.log('redirect function');
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={inter.className}>
        <UserProvider>
        <Toaster position="top-center" />

        <div className="h-full flex overflow-hidden">
          <MiniSidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <MainContentLayout>
              <MainLayout>{children}</MainLayout>
              <SidebarProvider /> 
            </MainContentLayout>
          </div>
        </div>
        </UserProvider>
      </body>
    </html>
  );
}