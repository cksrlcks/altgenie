'use client';
import { ReactNode } from 'react';
import styles from './style.module.css';

interface SectionProps {
  title: string;
  desc?: string;
  button?: {
    icon?: ReactNode;
    title: string;
    onClick?: () => void;
  };
  children?: ReactNode;
}

export default function Section({
  title,
  desc,
  button,
  children,
}: SectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles['section__header']}>
        <div className={styles['section__header-info']}>
          <h2 className={styles['section__header-title']}>{title}</h2>
          {desc && <div className={styles['section__header-desc']}>{desc}</div>}
        </div>
        {button && (
          <button
            type="button"
            className={styles['section__header-btn']}
            onClick={button.onClick}
          >
            {button.icon}
            {button.title}
          </button>
        )}
      </div>
      <div className={styles['section__body']}>{children}</div>
    </section>
  );
}
