import { NextUIProvider } from "@nextui-org/react";

import type { Metadata }  from 'next'
import      { Inter    }  from 'next/font/google'

import Header             from "@container/header/Header";
import Footer             from "@container/footer/Footer";

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title       : 'dvh.sh',
  description : 'personal developer portfolio',
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <NextUIProvider>
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-grow">
                    {children}
                </div>
                <Footer />
            </div>
        </NextUIProvider>
        </body>
        </html>
    )
}

// path: src/app/layout.tsx
