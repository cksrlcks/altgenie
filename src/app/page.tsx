'use client';
import { useState } from 'react';
import Result from '../components/Result';
import Upload from '../components/Upload';
import Loading from '../components/common/Loading';
import { OcrResult } from '../types/ocr';
import styles from './page.module.css';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OcrResult | null>(null);

  async function handleSubmit(formData: FormData) {
    try {
      setLoading(true);
      const response: Response = await fetch('/api/ocr/', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setResult(result);
      } else {
        alert(
          result.error || '문제가 발생했습니다. 잠시후 다시 시도해 주세요.',
        );
      }
    } catch (error) {
      console.error(error);
      alert('요청에 실패했습니다.');
    } finally {
      setLoading(false);
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
