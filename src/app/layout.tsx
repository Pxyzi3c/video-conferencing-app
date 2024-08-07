import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import 'primereact/resources/themes/lara-dark-teal/theme.css'
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';

const inter = Inter({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"]  });

export const metadata: Metadata = {
    title: "Video Conferencing App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-dark-2`}>{children}</body>
        </html>
    );
}
