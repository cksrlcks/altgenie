import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  SetStateAction,
  useState,
} from 'react';
import styles from './style.module.css';
import Image from 'next/image';

//google vision api : json limit size < 10 mb (base64로 인코딩되면 약 37퍼센트 더 커진다고 함)
//약 7mb 이하로 이미지를 받아야함 (안전하게 5mb로 설정)
const LIMIT_SIZE_MB = 5;
const VALID_IMAGE_TYPES = /(gif|png|jpg|jpeg)$/i;

interface FileUploadProps {
  file: File | undefined;
  setFile: Dispatch<SetStateAction<File | undefined>>;
}

export default function FileUpload({ file, setFile }: FileUploadProps) {
  const [isOver, setIsOver] = useState(false);

  function isValidType(file: File, typeRegex: RegExp) {
    if (!typeRegex.exec(file.type)) {
      alert('이미지파일만 업로드가 가능합니다.');
      return false;
    }
    return true;
  }

  function isValidSize(file: File, limit: number) {
    const limitSize = limit * 1024 * 1024;
    if (file.size > limitSize) {
      alert(`이미지는 ${limit}MB 이하로 업로드 해주세요.`);
      return false;
    }
    return true;
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (
      isValidSize(file, LIMIT_SIZE_MB) &&
      isValidType(file, VALID_IMAGE_TYPES)
    ) {
      setFile(file);
    }

    e.target.value = '';
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

    if (
      isValidSize(file, LIMIT_SIZE_MB) &&
      isValidType(file, VALID_IMAGE_TYPES)
    ) {
      setFile(file);
    }
  }

  return (
    <div
      className={styles['upload__container']}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {file && (
        <button
          type="button"
          className={styles['upload__reset-btn']}
          onClick={handleReset}
        >
          이미지 삭제
        </button>
      )}
      <div
        className={`${styles['upload__drag-zone']} ${file ? styles['upload__drag-zone--active'] : ''} ${isOver ? styles['upload__drag-zone--over'] : ''}`}
      >
        {!file ? (
          <label htmlFor="file" className={styles['upload__placeholder']}>
            <input id="file" type="file" value={file} onChange={handleChange} />
            <div className={styles['upload__placeholder-title']}>
              이곳에 드래그하여 이미지를 올려주시거나, 클릭해서 파일을
              첨부해주세요
            </div>
            <div className={styles['upload__placeholder-desc']}>
              최대 5MB 이하의 이미지만 업로드 가능합니다.
            </div>
          </label>
        ) : (
          <Image src={URL.createObjectURL(file)} alt="temp" fill />
        )}
      </div>
    </div>
  );
}
