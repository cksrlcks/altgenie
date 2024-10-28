import { FormEvent, useState } from 'react';
import { Button, ButtonWithWrapper } from '../common/Button';
import Section from '../common/Section';
import FileUpload from './FileUpload';

interface UploadProps {
  onSubmit: (formData: FormData) => void;
  loading: boolean;
}

export default function Upload({ onSubmit, loading }: UploadProps) {
  const [file, setFile] = useState<File | undefined>(undefined);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    onSubmit(formData);
  }

  return (
    <Section>
      <Section.Header>
        <Section.Title>이미지 업로드</Section.Title>
      </Section.Header>
      <Section.Body>
        <form onSubmit={handleSubmit}>
          <FileUpload file={file} setFile={setFile} />
          <ButtonWithWrapper>
            <Button type="submit" disabled={!file}>
              {!loading ? '대체택스트 만들기' : '이미지를 분석중입니다.'}
            </Button>
          </ButtonWithWrapper>
        </form>
      </Section.Body>
    </Section>
  );
}
