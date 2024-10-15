'use client';
import { useState, FormEvent } from 'react';
import Preview from './Preview';
import Edit from './Edit';
import ResultText from './ResultText';
import { OcrResult } from '@/types/ocr';
import styles from './style.module.css';

interface ResultProps {
  result: OcrResult;
}

export default function Result({ result }: ResultProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [blocks, setBlocks] = useState(
    result.blocks.map((block, index) => ({ id: index, text: block.text })),
  );

  function handleChange(e: FormEvent<HTMLDivElement>, id: number) {
    const text = e.currentTarget.innerText;
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, text } : b)));
  }

  function handleFocus(id: number) {
    setSelected(id);
  }

  function handleBlur() {
    setSelected(null);
  }

  return (
    <>
      <div className={styles['result-header']}>
        <div className={styles['result-header__preview']}>
          <Preview result={result} selected={selected} />
        </div>
        <div className={styles['result-header__detail']}>
          <Edit
            selected={selected}
            blocks={blocks}
            setBlocks={setBlocks}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </div>
      <ResultText selected={selected} blocks={blocks} />
    </>
  );
}
