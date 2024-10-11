import styles from './style.module.css';

export default function Loading({ ment }: { ment: string }) {
  return <div className={styles.loading}>{ment}</div>;
}
