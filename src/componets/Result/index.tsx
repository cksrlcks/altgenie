'use client';
import { useState, FormEvent } from 'react';
import Preview from './Preview';
import Edit from './Edit';
import ResultText from './ResultText';
import { useCursorPosition } from '@/app/hook/cursor';
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

  const { saveCursorPosition, restoreCursorPosition } = useCursorPosition();

  function handleChange(e: FormEvent<HTMLDivElement>, id: number) {
    const cursorPosition = saveCursorPosition();
    const text = e.currentTarget.innerText;
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, text } : b)));
    setTimeout(() => restoreCursorPosition(cursorPosition), 0);
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
            handleChange={handleChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
          />
        </div>
      </div>
      <ResultText selected={selected} blocks={blocks} />
    </>
  );
}
