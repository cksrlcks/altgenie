import Image from 'next/image';
import Section from '../common/Section';
import styles from './style.module.css';

export default function Result() {
  return (
    <Section
      title="생성된 대체 텍스트"
      desc="google vision OCR을 통해 추출된 텍스트를 기반으로 작성된
        내용입니다."
      button={{
        icon: (
          <Image
            src="/img/icon_copy.svg"
            width={20}
            height={20}
            alt="클립보드에 복사합니다."
          />
        ),
        title: '복사하기',
      }}
    >
      <div className={styles['result-txt']}>
        대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
        결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
        결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
        결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
        결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
        결과대체텍스트 결과대체텍스트 결과대체텍스트 결과대체텍스트
        결과대체텍스트 결과대체텍스트 결과대체텍스트
      </div>
    </Section>
  );
}
