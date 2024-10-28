import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './style.module.css';
import { OcrResult } from '@/types/ocr';

interface PreviewImageProps {
  result: OcrResult;
  selected: number | null;
}

function getSizeOfContainImage(
  imgContainer: HTMLDivElement,
  resultImg: HTMLImageElement,
) {
  const resultImgRatio = resultImg.naturalWidth / resultImg.naturalHeight;
  const containerRatio = imgContainer.clientWidth / imgContainer.clientHeight;

  if (resultImgRatio <= containerRatio) {
    //컨테이너의 비율보다 작아서 양옆이 남는경우
    return {
      w: imgContainer.clientHeight * resultImgRatio,
      h: imgContainer.clientHeight,
    };
  } else {
    //컨테이너 비율보다 커서 위아래가 남는경우
    return {
      w: imgContainer.clientWidth,
      h: imgContainer.clientWidth / resultImgRatio,
    };
  }
}

export default function PreviewImage({ result, selected }: PreviewImageProps) {
  const [size, setSize] = useState<{ w: number; h: number }>({
    w: 1,
    h: 1,
  });
  const resultImg = useRef<HTMLImageElement>(null);
  const imgContainer = useRef<HTMLDivElement>(null);
  const scale = resultImg.current ? resultImg.current.naturalWidth / size.w : 1;

  useEffect(() => {
    function handleResponsiveImage() {
      if (!imgContainer.current || !resultImg.current) return;
      setSize(getSizeOfContainImage(imgContainer.current, resultImg.current));
    }
    window.addEventListener('resize', handleResponsiveImage);

    return () => {
      window.removeEventListener('resize', handleResponsiveImage);
    };
  }, []);
  return (
    <>
      <div className={styles['result-img']} ref={imgContainer}>
        <Image
          src={`data:${result.img.type};base64,${result.img.base64}`}
          alt={'이미지 분석 결과'}
          ref={resultImg}
          onLoad={() => window.dispatchEvent(new Event('resize'))}
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
    </>
  );
}
