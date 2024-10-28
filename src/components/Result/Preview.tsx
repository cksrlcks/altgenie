import { useEffect, useRef, useState } from 'react';
import Section from '../common/Section';
import styles from './style.module.css';
import { OcrResult } from '@/types/ocr';
import Image from 'next/image';

interface PreviewProps {
  result: OcrResult;
  selected: number | null;
}

export default function Preview({ result, selected }: PreviewProps) {
  const [size, setSize] = useState<{ w: number; h: number }>({
    w: 1,
    h: 1,
  });
  const resultImg = useRef<HTMLImageElement>(null);
  const imgContainer = useRef<HTMLDivElement>(null);
  const scale = resultImg.current ? resultImg.current.naturalWidth / size.w : 1;

  function getSize() {
    if (!imgContainer.current || !resultImg.current) return;

    const resultImgRatio =
      resultImg.current.naturalWidth / resultImg.current.naturalHeight;
    const containerRatio =
      imgContainer.current.clientWidth / imgContainer.current.clientHeight;

    if (resultImgRatio <= containerRatio) {
      //컨테이너의 비율보다 작아서 양옆이 남는경우
      setSize({
        w: imgContainer.current.clientHeight * resultImgRatio,
        h: imgContainer.current.clientHeight,
      });
    } else {
      //컨테이너 비율보다 커서 위아래가 남는경우
      setSize({
        w: imgContainer.current.clientWidth,
        h: imgContainer.current.clientWidth / resultImgRatio,
      });
    }
  }

  useEffect(() => {
    window.addEventListener('resize', getSize);

    return () => {
      window.removeEventListener('resize', getSize);
    };
  }, []);
  return (
    <Section>
      <Section.Header>
        <Section.Title>이미지 분석 결과</Section.Title>
        <Section.Description>
          이미지에 감지된 텍스트 영역입니다.
        </Section.Description>
      </Section.Header>
      <Section.Body>
        <div className={styles['result-img']} ref={imgContainer}>
          <Image
            src={`data:${result.img.type};base64,${result.img.base64}`}
            alt={'이미지 분석 결과'}
            ref={resultImg}
            onLoad={getSize}
            fill
          />
          {resultImg.current && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size.w}
              height={size.h}
            >
              {result.blocks.map((block, index) => {
                const coordidate = block.boundings
                  .map((v) => `${v.x / scale},${v.y / scale}`)
                  .join(' ');
                return (
                  <polygon
                    key={index}
                    points={coordidate}
                    style={{
                      fill: 'transparent',
                      stroke: selected === index ? 'red' : 'lightgreen',
                      strokeWidth: 2,
                    }}
                  />
                );
              })}
            </svg>
          )}
        </div>
      </Section.Body>
    </Section>
  );
}
