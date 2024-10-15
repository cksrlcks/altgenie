import Lottie from 'react-lottie';
import styles from './style.module.css';
import * as loader from './loader.json';

export default function Loading() {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: loader,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet',
    },
  };
  return (
    <div className={styles.loading}>
      <div className={styles['loading-inner']}>
        <Lottie options={lottieOptions} width={200} height={200}></Lottie>
        <div className={styles['loading-title']}>이미지를 분석중입니다</div>
        <div className={styles['loading-desc']}>
          이미지의 상태와 폰트에 따라 <br />
          정확도가 낮을 수 있습니다
        </div>
        <div className={styles['loading-source']}>
          Powered by <em>Google Cloud Vision API</em>
        </div>
      </div>
    </div>
  );
}
