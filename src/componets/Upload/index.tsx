import { ChangeEvent, DragEvent, FormEvent, useState } from 'react';
import { Button, ButtonWithWrapper } from '../common/Button';
import Section from '../common/Section';
import styles from './style.module.css';

interface UploadProps {
  onSubmit: (formData: FormData) => void;
  loading: boolean;
}

export default function Upload({ onSubmit, loading }: UploadProps) {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [isOver, setIsOver] = useState(false);

  //google vision api : json limit size < 10 mb
  //base64로 인코딩되면 약 37퍼센트 더 커진다고 함
  //약 7mb 이하로 이미지를 받아야함 (안전하게 5mb로 설정)
  const limitSize = 5;

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (isValidSize(file, limitSize) && isImgType(file)) {
      setFile(e.target.files[0]);
    }

    e.target.value = '';
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    onSubmit(formData);
  }

  function isImgType(file: File) {
    const regex = /(gif|png|jpg|jpeg)$/i;
    if (!regex.exec(file.type)) {
      alert('이미지파일만 업로드가 가능합니다.');
      return false;
    } else {
      return true;
    }
  }

  function isValidSize(file: File, limit: number) {
    const size = file.size;
    const limitSize = limit * 1024 * 1024;
    if (size > limitSize) {
      alert(`이미지는 ${limit}MB 이하로 업로드 해주세요.`);
      return false;
    } else {
      return true;
    }
  }

  function handleReset() {
    setFile(undefined);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsOver(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsOver(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsOver(false);

    const files = e.dataTransfer.files;
    if (!files.length) return;
    const file = files[0];

    if (isValidSize(file, limitSize) && isImgType(file)) {
      setFile(file);
    }
  }

  return (
    <div className={styles['upload']}>
      <Section title="이미지 업로드">
        <form onSubmit={handleSubmit}>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={styles['upload__container']}
          >
            {file && (
              <button
                type="button"
                onClick={handleReset}
                className={styles['upload__reset-btn']}
              >
                이미지 삭제
              </button>
            )}

            <div
              className={`${styles['upload__drag-zone']} ${file ? styles['upload__drag-zone--active'] : ''} ${isOver ? styles['upload__drag-zone--over'] : ''}`}
            >
              {!file ? (
                <label htmlFor="file" className={styles['upload__placeholder']}>
                  <input
                    id="file"
                    type="file"
                    value={file}
                    onChange={handleFile}
                  />
                  <div className={styles['upload__placeholder-title']}>
                    이곳에 드래그하여 이미지를 올려주시거나, 클릭해서 파일을
                    첨부해주세요
                  </div>
                  <div className={styles['upload__placeholder-desc']}>
                    최대 5MB 이하의 이미지만 업로드 가능합니다.
                  </div>
                </label>
              ) : (
                <img src={URL.createObjectURL(file)} alt="temp" />
              )}
            </div>
          </div>
          <ButtonWithWrapper>
            <Button type="submit" disabled={!file}>
              {!loading ? '대체택스트 만들기' : '이미지를 분석중입니다.'}
            </Button>
          </ButtonWithWrapper>
        </form>
      </Section>
    </div>
  );
}
