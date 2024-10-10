import Link from 'next/link';
import Image from 'next/image';
import styles from './style.module.css';
import Profile from '../Profile';

type TempSession = {
  user: {
    name: string;
    email: string;
    image: string;
  };
  expire: Date;
};

const fakeUserData: TempSession = {
  user: {
    name: '김찬기',
    email: 'chanki.kim89@gmail.com',
    image:
      'https://lh3.googleusercontent.com/ogw/AF2bZyj30FakUrEz6-weBgdwjFZv_WXjNHS61zeot0MYniWZC9rw=s64-c-mo',
  },
  expire: new Date(),
};

export default function Header() {
  const session = fakeUserData;

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src="/img/logo.svg" width={139} height={27} alt="altgenie" />
      </Link>
      <nav className={styles.nav}>
        {!session.user ? (
          <button className={styles['nav__btn']}>로그인</button>
        ) : (
          <>
            <Profile user={fakeUserData.user} />
            <Link href="/my" className={styles['nav__btn']}>
              이용내역
            </Link>
            <button type="button" className={styles['nav__btn']}>
              로그아웃
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
