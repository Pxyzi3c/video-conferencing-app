import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Video Conferencing App",
    description: "Generated by create next app",
    icons: {
        icon: '@public/logo.svg',
    }
};

const RootLayout = ({ children }: { children: React.ReactNode}) => {
    return (
        <main>
            <StreamVideoProvider>
                {children}
            </StreamVideoProvider>
        </main>
    )
}

export default RootLayout