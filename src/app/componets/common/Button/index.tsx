'use client';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './style.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function ButtonWithWrapper({ children }: { children: ReactNode }) {
  return <div className={styles.control}>{children}</div>;
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={styles['control__btn']}>
      {children}
    </button>
  );
}
