'use client';
import { useState } from 'react';
import Result from '../componets/Result';
import Upload from '../componets/Upload';
import Loading from '../componets/common/Loading';
import { OcrResult } from '../types/ocr';
import styles from './page.module.css';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setReult] = useState<OcrResult | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const response = await fetch('/api/ocr/', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      setReult(data);
      setLoading(false);
    } else {
      setLoading(false);
      alert('해당 이미지에 텍스트를 추출 할 수 없었습니다.');
    }
  }
  return (
    <>
      {loading && <Loading />}
      {!result ? (
        <div className={styles.inner}>
          <Upload onSubmit={handleSubmit} loading={loading} />
        </div>
      ) : (
        <Result result={result} />
      )}
    </>
  );
}
