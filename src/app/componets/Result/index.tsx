'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Section from '../common/Section';
import styles from './style.module.css';

//임시데이터
import data from './data.json';

export default function Result() {
  const resultImg = useRef<HTMLImageElement>(null);
  const [scaledImgDimesion, setScaledImgDimension] = useState<{
    w: number;
    h: number;
  } | null>(null);
  const [ratio, setRatio] = useState(1);
  // const [scaledBoundPosition, setScaledBoundPosition] = useState<{x:number, y:number}[]|null>(null)

  useEffect(() => {
    if (resultImg.current) {
      const img = resultImg.current;
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
      const ratio = naturalWidth / naturalHeight;

      const scaledHeight = img.clientHeight;
      const scaledWidth = scaledHeight * ratio;
      setScaledImgDimension({ w: scaledWidth, h: scaledHeight });
      setRatio(scaledWidth / naturalWidth);
    }
  }, []);

  return (
    <>
      <Section title="이미지 분석 결과">
        <div className={styles['result-img']}>
          <img src="/img/test.png" alt="dd" ref={resultImg} />
          {scaledImgDimesion && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={scaledImgDimesion.w}
              height={scaledImgDimesion.h}
            >
              {data.map((block, index) => {
                const coordidate = block.boundings.vertices
                  .map((v) => `${v.x * ratio},${v.y * ratio}`)
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
