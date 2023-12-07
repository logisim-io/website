import '@/styles/global.sass';

import { Inter, Roboto_Mono } from 'next/font/google';

const interFont = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter'
});

const robotoMonoFont = Roboto_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto-mono'
});

export const metadata = {
    title: 'Logisim.io - An advanced digital logic simulator',
    description: 'An advanced but simple-to-use digital logic simulator - with an account system, sharable logic gates, and much more.',
    metadataBase: new URL('https://logisim.io'),
    openGraph: {
        title: 'Logisim.io - An advanced digital logic simulator',
        description: 'An advanced but simple-to-use digital logic simulator - with an account system, sharable logic gates, and much more.',
        url: '/',
        siteName: 'Logisim.io',
        images: [
            {
                url: '/img/icon.png',
                width: 300,
                height: 300
            }
        ],
        locale: 'en-US',
        type: 'website'
    },
    robots: {
        index: true,
        follow: true
    },
    icons: {
        icon: [
            { url: '/img/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/img/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/img/android-chrome-36x36.png', sizes: '36x36', type: 'image/png' },
            { url: '/img/android-chrome-48x48.png', sizes: '48x48', type: 'image/png' },
            { url: '/img/android-chrome-72x72.png', sizes: '72x72', type: 'image/png' },
            { url: '/img/android-chrome-96x96.png', sizes: '96x96', type: 'image/png' },
            { url: '/img/android-chrome-144x144.png', sizes: '144x144', type: 'image/png' },
            { url: '/img/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
            { url: '/img/android-chrome-256x256.png', sizes: '256x256', type: 'image/png' },
            { url: '/img/android-chrome-384x384.png', sizes: '384x384', type: 'image/png' },
            { url: '/img/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
        apple: [
            { url: '/img/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
            { url: '/img/apple-touch-icon-57x57.png', sizes: '57x57', type: 'image/png' },
            { url: '/img/apple-touch-icon-60x60.png', sizes: '60x60', type: 'image/png' },
            { url: '/img/apple-touch-icon-72x72.png', sizes: '72x72', type: 'image/png' },
            { url: '/img/apple-touch-icon-76x76.png', sizes: '76x76', type: 'image/png' },
            { url: '/img/apple-touch-icon-114x114.png', sizes: '114x114', type: 'image/png' },
            { url: '/img/apple-touch-icon-120x120.png', sizes: '120x120', type: 'image/png' },
            { url: '/img/apple-touch-icon-144x144.png', sizes: '144x144', type: 'image/png' },
            { url: '/img/apple-touch-icon-152x152.png', sizes: '152x152', type: 'image/png' },
            { url: '/img/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' },
        ],
        other: [
            { rel: 'apple-touch-icon-precomposed', url: '/img/apple-touch-icon-57x57-precomposed.png', sizes: '57x57' },
            { rel: 'apple-touch-icon-precomposed', url: '/img/apple-touch-icon-60x60-precomposed.png', sizes: '60x60' },
            { rel: 'apple-touch-icon-precomposed', url: '/img/apple-touch-icon-72x72-precomposed.png', sizes: '72x72' },
            { rel: 'apple-touch-icon-precomposed', url: '/img/apple-touch-icon-76x76-precomposed.png', sizes: '76x76' },
            { rel: 'apple-touch-icon-precomposed', url: '/img/apple-touch-icon-114x114-precomposed.png', sizes: '114x114' },
            { rel: 'apple-touch-icon-precomposed', url: '/img/apple-touch-icon-120x120-precomposed.png', sizes: '120x120' },
            { rel: 'apple-touch-icon-precomposed', url: '/img/apple-touch-icon-144x144-precomposed.png', sizes: '144x144' },
            { rel: 'apple-touch-icon-precomposed', url: '/img/apple-touch-icon-152x152-precomposed.png', sizes: '152x152' },
            { rel: 'apple-touch-icon-precomposed', url: '/img/apple-touch-icon-180x180-precomposed.png', sizes: '180x180' },
            { rel: 'mask-icon', url: '/img/safari-pinned-tab.svg', color: '#22c55e' }
        ]
    },
    manifest: '/site.webmanifest',
    alternates: {
        canonical: '/'
    }
};

export const viewport = {
    themeColor: '#22c55e'
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`bg-neutral-950 text-white font-sans ${interFont.variable} ${robotoMonoFont.variable}`}>
                {children}
            </body>
        </html>
    );
}