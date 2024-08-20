import {NextUIProvider} from "@nextui-org/react";

import type {Metadata} from 'next'
import {Inter} from 'next/font/google'

import './globals.css'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'David | Full-Stack Developer Portfolio',
    description: 'Explore David’s personal portfolio showcasing skills and experience in full-stack development, with expertise in various modern technologies.',
    keywords: 'David, Full-Stack Developer, Software Engineer, Web Development, Backend, Frontend, CSIS Student',
    openGraph: {
        title: 'David | Full-Stack Developer Portfolio',
        description: 'Explore David’s portfolio, highlighting his expertise in full-stack development across a range of modern technologies.',
        url: 'https://dvh.sh',
        siteName: 'David Portfolio',
        locale: 'en_US',
        type: 'website',
    }
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>

            <link
                rel="preload"
                href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
                as="style"
            />

            <noscript>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"/>
            </noscript>

            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta name="robots" content="index, follow"/>
            <link rel="canonical" href="https://dvh.sh"/>
            <meta name="description"
                  content="Explore David’s personal portfolio showcasing skills and experience in full-stack development, with expertise in various modern technologies."/>
            <meta name="keywords"
                  content="David, Full-Stack Developer, Software Engineer, Web Development, Backend, Frontend, CSIS Student"/>
            <meta name="author" content="David"/>
            <meta property="og:title" content="David | Full-Stack Developer Portfolio"/>
            <meta property="og:description"
                  content="Explore David’s portfolio, highlighting his expertise in full-stack development across a range of modern technologies."/>
            <meta property="og:url" content="https://dvh.sh"/>
            <meta property="og:site_name" content="David Portfolio"/>
            <meta property="og:type" content="website"/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:site" content="@HaruHoldings"/>
            <meta name="twitter:title" content="David | Full-Stack Developer Portfolio"/>
            <meta name="twitter:description"
                  content="Explore David’s portfolio, highlighting his expertise in full-stack development across a range of modern technologies."/>
        </head>
        <body className={`${inter.className}`}>
        <NextUIProvider>
            <main className="flex-grow">{children}</main>
        </NextUIProvider>
        </body>
        </html>
    );
}

// path: src/app/layout.tsx
