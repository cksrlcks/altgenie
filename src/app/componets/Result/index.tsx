'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Section from '../common/Section';
import styles from './style.module.css';

//임시데이터
import data from './dataNarrow.json';

export default function Result() {
  const [scale, setScale] = useState(1);
  const resultImg = useRef<HTMLImageElement>(null);
  const imgContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resultImg.current && imgContainer.current) {
      const containerRatio =
        imgContainer.current.clientWidth / imgContainer.current.clientHeight;
      const naturalWidth = resultImg.current.naturalWidth;
      const naturalHeight = resultImg.current.naturalHeight;
      const imgRatio = naturalWidth / naturalHeight;

      if (imgRatio <= containerRatio) {
        //컨테이너의 비율보다 작아서 양옆이 남는경우
        const scaledHeight = resultImg.current.clientHeight;
        setScale(scaledHeight / naturalHeight);
      } else {
        //컨테이너 비율보다 커서 위아래가 남는경우
        const scaledWidth = resultImg.current.clientWidth;
        setScale(scaledWidth / naturalWidth);
      }
    }
  }, []);

  return (
    <>
      <Section title="이미지 분석 결과">
        <div className={styles['result-img']} ref={imgContainer}>
          <img src="/img/testNarrow.png" alt="dd" ref={resultImg} />
          {resultImg.current && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={resultImg.current?.naturalWidth * scale}
              height={resultImg.current?.naturalHeight * scale}
            >
              {data.map((block, index) => {
                const coordidate = block.boundings.vertices
                  .map((v) => `${v.x * scale},${v.y * scale}`)
                  .join(' ');
                return (
                  <polygon
                    key={index}
                    points={coordidate}
                    style={{
                      fill: 'transparent',
                      stroke: 'lightgreen',
                      strokeWidth: 2,
                    }}
                  />
                );
              })}
            </svg>
          )}
        </div>
      </Section>
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
          {data.map((block) => block.text).join(' ')}
        </div>
      </Section>
    </>
  );
}
