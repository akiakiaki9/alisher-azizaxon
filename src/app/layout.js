import './globals.css';

export const metadata = {
  title: 'Alisher & Yulduz | Свадебное приглашение',
  description: 'Свадебное приглашение Alisher и Yulduz',
  icons: {
    icon: [
      { url: '/images/icon.png', sizes: 'any' },
      { url: '/images/icon.png', type: 'image/png' },
    ],
    shortcut: '/images/icon.png',
    apple: '/images/icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600;700&family=Noto+Naskh+Arabic:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/images/icon.png" />
        <link rel="apple-touch-icon" href="/images/icon.png" />
        <link rel="shortcut icon" href="/images/icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}