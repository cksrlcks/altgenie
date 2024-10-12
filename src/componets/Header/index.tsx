import Link from 'next/link';
import Image from 'next/image';
import styles from './style.module.css';
import Profile from '../Profile';
import { handleReset } from '@/utils/reset';

// type TempSession = {
//   user: {
//     name: string;
//     email: string;
//     image: string;
//   };
//   expire: Date;
// };

// const fakeUserData: TempSession = {
//   user: {
//     name: '김찬기',
//     email: 'chanki.kim89@gmail.com',
//     image:
//       'https://lh3.googleusercontent.com/ogw/AF2bZyj30FakUrEz6-weBgdwjFZv_WXjNHS61zeot0MYniWZC9rw=s64-c-mo',
//   },
//   expire: new Date(),
// };

export default function Header() {
  //const session = fakeUserData;

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Image src="/img/logo.svg" width={139} height={27} alt="altgenie" />
      </h1>
      {/* <div>로그인 기능 개발 예정 (하루 사용량 제한하기)</div> */}
      {/* <nav className={styles.nav}>
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
      </nav> */}
    </header>
  );
}
