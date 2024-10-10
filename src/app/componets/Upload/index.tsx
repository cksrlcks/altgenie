import { Button, ButtonWithWrapper } from '../common/Button';
import Section from '../common/Section';
import styles from './style.module.css';

export default function Upload() {
  return (
    <Section title="이미지 업로드">
      <div className={styles['upload']}>
        <div className={styles['upload__container']}>
          <div className={styles['upload__placeholder']}>
            <div className={styles['upload__placeholder-title']}>
              이곳에 드래그하여 이미지를 올려주시거나, 클릭해서 파일을
              첨부해주세요
            </div>
            <div className={styles['upload__placeholder-desc']}>
              최대 5MB 이하. 최대 1000 px까지만 업로드 가능합니다.
            </div>
          </div>
        </div>
      </div>
      <ButtonWithWrapper>
        <Button>대체택스트 만들기</Button>
      </ButtonWithWrapper>
    </Section>
  );
}
