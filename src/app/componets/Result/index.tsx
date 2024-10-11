'use client';
import { FormEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Section from '../common/Section';
import styles from './style.module.css';

//임시데이터
import data from './dataNarrow.json';

export default function Result() {
  const [size, setSize] = useState<{ w: number; h: number }>({
    w: 1,
    h: 1,
  });
  const resultImg = useRef<HTMLImageElement>(null);
  const imgContainer = useRef<HTMLDivElement>(null);
  const scale = resultImg.current ? resultImg.current.naturalWidth / size.w : 1;
  const [blocks, setBlocks] = useState(data.map((block) => block.text));
  const resultText = blocks.join(', ');

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
    getSize();

    window.addEventListener('resize', getSize);

    return () => {
      window.removeEventListener('resize', getSize);
    };
  }, []);

  function handleChange(e: FormEvent<HTMLDivElement>, index: number) {
    const text = e.currentTarget.innerText;
    setBlocks((prev) => prev.map((t, idx) => (idx === index ? text : t)));
  }

  function handleCopy() {
    navigator.clipboard.writeText(resultText);
    alert('클립보드에 복사했습니다.');
  }

  return (
    <>
      <Section title="이미지 분석 결과">
        <div className={styles['result-img']} ref={imgContainer}>
          <img src="/img/testNarrow.png" alt="dd" ref={resultImg} />
          {resultImg.current && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size.w}
              height={size.h}
            >
              {data.map((block, index) => {
                const coordidate = block.boundings.vertices
                  .map((v) => `${v.x / scale},${v.y / scale}`)
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
        title="상세하게 수정하기"
        desc="문자가 감지된 구역에서 추출된 내용을 수정 할 수 있습니다."
      >
        <div className={styles['result-blocks']}>
          {data.map((block, index) => (
            <div
              key={index}
              contentEditable
              suppressContentEditableWarning
              className={styles['result-block']}
              onInput={(e) => handleChange(e, index)}
            >
              {block.text}
            </div>
          ))}
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
          onClick: handleCopy,
        }}
      >
        <div className={styles['result-txt']}>{resultText}</div>
      </Section>
    </>
  );
}
