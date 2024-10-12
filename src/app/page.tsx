'use client';
import { useState } from 'react';
import Result from '../componets/Result';
import Upload from '../componets/Upload';
import Loading from '../componets/common/Loading';
import { OcrResult } from '../types/ocr';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setReult] = useState<OcrResult | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const response = await fetch('/api/ocr/', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setLoading(false);
    setReult(data);
  }
  return (
    <>
      {loading && <Loading ment="처리중입니다..." />}

      {!result ? (
        <Upload onSubmit={handleSubmit} />
      ) : (
        <Result result={result} />
      )}
    </>
  );
}
