'use client';
import React, { ReactNode } from 'react';
import styles from './style.module.css';

interface SectionProps {
  children?: ReactNode;
}

export default function Section({ children }: SectionProps) {
  return <section className={styles.section}>{children}</section>;
}

Section.Header = function SectionHeader({ children }: { children: ReactNode }) {
  return (
    <div className={styles['section__header']}>
      <div className={styles['section__header-info']}>{children}</div>
    </div>
  );
};

Section.Title = function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className={styles['section__header-title']}>{children}</h2>;
};

Section.Description = function SectionDescription({
  children,
}: {
  children: ReactNode;
}) {
  return <div className={styles['section__header-desc']}>{children}</div>;
};

Section.Button = function SectionButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={styles['section__header-btn']}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Section.Body = function SectionBody({ children }: { children: ReactNode }) {
  return <div className={styles['section__body']}>{children}</div>;
};
