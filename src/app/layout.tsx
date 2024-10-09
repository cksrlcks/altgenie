import type { Metadata } from 'next';
import './assets/css/reset.css';
import './assets/css/globals.css';
import styles from './layout.module.css';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Altgenie',
  description: '대체택스트 생성기',
};

const isLogin = true;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className={styles.app}>
          <header className={styles.header}>
            <Link href="/">
              <Image
                src="/img/logo.svg"
                width={139}
                height={27}
                alt="altgenie"
              />
            </Link>
            <nav className={styles.nav}>
              {!isLogin ? (
                <Link href="/" className={styles['nav__btn']}>
                  로그인
                </Link>
              ) : (
                <>
                  <div className={styles['nav__status']}>
                    <span className={styles['nav__status-title']}>
                      오늘 남은 횟수
                    </span>
                    <span className={styles['nav__status-count']}>5</span>
                  </div>

                  <Link href="/" className={styles['nav__btn']}>
                    이용내역
                  </Link>
                  <Link href="/" className={styles['nav__btn']}>
                    로그아웃
                  </Link>
                  <div className={styles.avatar}>
                    <Image
                      src="/img/avatar.png"
                      width={32}
                      height={32}
                      alt="avatar"
                    />
                  </div>
                </>
              )}
            </nav>
          </header>
          <section className={styles.section}>
            <div className={styles['section__header']}>
              <div className={styles['section__header-info']}>
                <h2 className={styles['section__header-title']}>
                  이미지 업로드
                </h2>
              </div>
            </div>
            <div className={styles['section__body']}>
              <div className={styles['upload']}>
                <div className={styles['upload__container']}>
                  <div className={styles['upload__placeholder']}>
                    <div className={styles['upload__placeholder-title']}>
                      이곳에 드래그하여 이미지를 올려주시거나, 클릭해서 파일을
                      첨부해주세요
                    </div>
                    <div className={styles['upload__placeholder-desc']}>
                      최대 5MB 이하. 최대 1000 px까지만 업로드 가능합니다.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.section}>
            <div className={styles['section__header']}>
              <div className={styles['section__header-info']}>
                <h2 className={styles['section__header-title']}>
                  생성된 대체 텍스트
                </h2>
                <div className={styles['section__header-desc']}>
                  google vision OCR을 통해 추출된 텍스트를 기반으로 작성된
                  내용입니다.
                </div>
              </div>
              <button type="button" className={styles['section__header-btn']}>
                <Image
                  src="/img/icon_copy.svg"
                  width={20}
                  height={20}
                  alt="클립보드에 복사합니다."
                />
                복사하기
              </button>
            </div>
            <div className={styles['section__body']}>
              <div className={styles['result-txt']}>
                대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
                결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
                결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
                결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
                결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
                결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
                결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
                결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
                결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
                결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
                결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
                결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
                결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
                결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
                결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
                결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
                결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
                결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트 결과
              </div>
            </div>
          </section>
          <div className={styles.control}>
            <button type="button" className={styles['control__btn']}>
              대체택스트 만들기
            </button>
            <button type="button" className={styles['control__btn']} disabled>
              대체택스트 만들기
            </button>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
