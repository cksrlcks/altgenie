'use client';
import { useState, FormEvent, useEffect } from 'react';
import Preview from './Preview';
import Edit from './Edit';
import ResultText from './ResultText';
import { useCursorPosition } from '@/app/hook/useCursorPosition';
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

  const { saveCursorPosition, restoreCursorPosition, resetCursor } =
    useCursorPosition();

  useEffect(() => {
    restoreCursorPosition();
  }, [blocks, restoreCursorPosition]);

  function handleChange(e: FormEvent<HTMLDivElement>, id: number) {
    saveCursorPosition();
    const text = e.currentTarget.innerText;
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, text } : b)));
  }

  function handleFocus(id: number) {
    resetCursor();
    setSelected(id);
  }

  function handleBlur() {
    resetCursor();
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
