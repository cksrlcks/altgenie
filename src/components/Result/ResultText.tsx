import Section from '../common/Section';
import Image from 'next/image';
import { Button, ButtonWithWrapper } from '../common/Button';
import styles from './style.module.css';
import { Fragment } from 'react';

interface TextProps {
  selected: number | null;
  blocks: {
    id: number;
    text: string;
  }[];
}

export default function ResultText({ selected, blocks }: TextProps) {
  const resultText = blocks.map((b) => b.text).join(', ');

  function handleCopy() {
    navigator.clipboard.writeText(resultText);
    alert('클립보드에 복사했습니다.');
  }

  function handleReset() {
    const confirm = window.confirm(
      '작업된 내용이 초기화 될 수 있습니다. 정말 처음으로 돌아가시겠습니까?',
    );
    if (!confirm) return;

    window.location.reload();
  }

  return (
    <>
      <Section>
        <Section.Header>
          <Section.Title>생성된 대체 텍스트</Section.Title>
          <Section.Description>
            google vision OCR을 통해 추출된 텍스트를 기반으로 작성된 내용입니다.
          </Section.Description>
          <Section.Button onClick={handleCopy}>
            <Image
              src="/img/icon_copy.svg"
              width={20}
              height={20}
              alt="클립보드에 복사합니다."
            />{' '}
            복사하기
          </Section.Button>
        </Section.Header>
        <Section.Body>
          <div className={`result-zone ${styles['result-txt']}`}>
            {blocks.map((block) =>
              selected === block.id ? (
                <em
                  key={block.id}
                  className={`${styles.txt} ${selected === block.id ? styles.active : ''}`}
                >
                  {block.text}
                </em>
              ) : (
                <Fragment key={block.id}>{block.text}</Fragment>
              ),
            )}
          </div>
        </Section.Body>
      </Section>
      <ButtonWithWrapper>
        <Button type="button" onClick={handleReset}>
          처음으로 돌아가기
        </Button>
      </ButtonWithWrapper>
    </>
  );
}
