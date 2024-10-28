import Section from '../common/Section';
import { OcrResult } from '@/types/ocr';
import PreviewImage from './PreviewImage';

interface PreviewProps {
  result: OcrResult;
  selected: number | null;
}

export default function Preview({ result, selected }: PreviewProps) {
  return (
    <Section>
      <Section.Header>
        <Section.Title>이미지 분석 결과</Section.Title>
        <Section.Description>
          이미지에 감지된 텍스트 영역입니다.
        </Section.Description>
      </Section.Header>
      <Section.Body>
        <PreviewImage result={result} selected={selected} />
      </Section.Body>
    </Section>
  );
}
