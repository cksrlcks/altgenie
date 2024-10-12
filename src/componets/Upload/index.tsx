import { ChangeEvent, useRef, useState } from 'react';
import { Button, ButtonWithWrapper } from '../common/Button';
import Section from '../common/Section';
import styles from './style.module.css';

interface UploadProps {
  onSubmit: (formData: FormData) => void;
}

export default function Upload({ onSubmit }: UploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const inputFile = useRef(null);

  function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  }

  function handleSubmit() {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    onSubmit(formData);
  }
  return (
    <Section title="이미지 업로드">
      <div className={styles['upload']}>
        <div
          className={`${styles['upload__container']} ${file ? styles['active'] : ''}`}
        >
          {!file ? (
            <label htmlFor="file" className={styles['upload__placeholder']}>
              <input
                id="file"
                type="file"
                onChange={handleUpload}
                ref={inputFile}
              />
              <div className={styles['upload__placeholder-title']}>
                이곳에 드래그하여 이미지를 올려주시거나, 클릭해서 파일을
                첨부해주세요
              </div>
              <div className={styles['upload__placeholder-desc']}>
                최대 5MB 이하. 최대 1000 px까지만 업로드 가능합니다.
              </div>
            </label>
          ) : (
            <img src={URL.createObjectURL(file)} alt="temp" />
          )}
        </div>
      </div>
      <ButtonWithWrapper>
        <Button onClick={handleSubmit}>대체택스트 만들기</Button>
      </ButtonWithWrapper>
    </Section>
  );
}
