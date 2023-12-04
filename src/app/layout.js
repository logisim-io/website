import '@/styles/global.sass';

export const metadata = {
    title: 'logisim.io',
    description: 'An advanced digital circuit logic simulator.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}