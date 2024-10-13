import type { Metadata } from 'next';
import '../assets/css/reset.css';
import '../assets/css/globals.css';
import styles from './layout.module.css';
import Header from '../componets/Header';

export const metadata: Metadata = {
  title: 'Altgenie',
  description: '구글 vision api를 이용한 대체택스트 생성기',
  openGraph: {
    title: 'Altgenie',
    description: '구글 vision api를 이용한 대체택스트 생성기',
    url: 'https://altgenie.vercel.app/',
    siteName: 'Altgenie',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className={styles.app}>
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
