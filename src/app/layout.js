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
    title: 'logisim.io',
    description: 'An advanced digital circuit logic simulator.',
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