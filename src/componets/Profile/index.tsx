import Image from 'next/image';
import styles from './style.module.css';

interface ProfileProps {
  user: {
    name: string;
    email: string;
    image: string;
  };
}

export default function Profile({ user }: ProfileProps) {
  //get available number (SWR)
  const data = {
    count: 5,
    lastUsed: new Date(),
  };

  return (
    <>
      <div className={styles.avatar}>
        <Image src={user.image} width={32} height={32} alt="avatar" />
      </div>
      <div className={styles['nav__status']}>
        <span className={styles['nav__status-title']}>오늘 남은 횟수</span>
        <span className={styles['nav__status-count']}>{data.count}</span>
      </div>
    </>
  );
}
