import Section from '../common/Section';
import { ReactSortable } from 'react-sortablejs';
import styles from './style.module.css';
import { Dispatch, FormEvent, SetStateAction, useEffect } from 'react';

interface EditProps {
  selected: number | null;
  blocks: { id: number; text: string }[];
  setBlocks: Dispatch<SetStateAction<{ id: number; text: string }[]>>;
  handleChange: (e: FormEvent<HTMLDivElement>, id: number) => void;
  handleFocus: (id: number) => void;
  handleBlur: () => void;
}

export default function Edit({
  selected,
  blocks,
  setBlocks,
  handleChange,
  handleFocus,
  handleBlur,
}: EditProps) {
  useEffect(() => {
    document.addEventListener('mousedown', handleBlurContentEdtitable);

    return () => {
      document.addEventListener('mousedown', handleBlurContentEdtitable);
    };
  }, []);

  function handleBlurContentEdtitable(e: MouseEvent) {
    const clickedElement = e.target as HTMLElement;
    if (
      !clickedElement.closest('[contenteditable="true"]') &&
      !clickedElement.closest('.drag-handle') &&
      !clickedElement.closest('.result-zone')
    ) {
      e.preventDefault();
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  }

  return (
    <Section
      title="상세하게 수정하기"
      desc="문자가 감지된 구역에서 추출된 내용을 수정 할 수 있습니다."
    >
      <ul className={styles['result-blocks']}>
        <ReactSortable
          list={blocks}
          setList={setBlocks}
          handle=".drag-handle"
          animation={200}
        >
          {blocks.map((block) => (
            <li
              key={block.id}
              className={`${styles['result-block']} ${selected === block.id ? styles['result-block--active'] : ''}`}
            >
              <div className={`drag-handle ${styles['result-block__handle']}`}>
                <span className="a11y">드래그 핸들</span>
              </div>
              <div
                contentEditable
                suppressContentEditableWarning
                className={styles['result-block__content']}
                onInput={(e) => handleChange(e, block.id)}
                onFocus={() => handleFocus(block.id)}
                onBlur={handleBlur}
              >
                {block.text}
              </div>
            </li>
          ))}
        </ReactSortable>
      </ul>
    </Section>
  );
}
