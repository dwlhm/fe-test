import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MainNavbar } from "@/components/navbars";
import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@/constant";
import { LoginResponse } from "@/login/actions";
import { ReactQueryContextProvider } from "@/lib/react-query/provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Projects",
  description: "Get the projects done",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie_raw = await cookies();
  const cookie = cookie_raw.get(AUTH_COOKIE);

  const auth: LoginResponse = !cookie
    ? undefined
    : JSON.parse(cookie?.value as string);

  return (
    <ReactQueryContextProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {auth ? <MainNavbar auth={auth} /> : <></>}
          {children}
        </body>
      </html>
    </ReactQueryContextProvider>
  );
}
