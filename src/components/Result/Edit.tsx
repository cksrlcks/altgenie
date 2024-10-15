import Section from '../common/Section';
import { ReactSortable } from 'react-sortablejs';
import { Dispatch, FormEvent, SetStateAction } from 'react';
import ContentEditor from './ContentEditor';
import styles from './style.module.css';

interface EditProps {
  selected: number | null;
  blocks: { id: number; text: string }[];
  setBlocks: Dispatch<SetStateAction<{ id: number; text: string }[]>>;
  onChange: (e: FormEvent<HTMLDivElement>, id: number) => void;
  onFocus: (id: number) => void;
  onBlur: () => void;
}

export default function Edit({
  selected,
  blocks,
  setBlocks,
  onChange,
  onFocus,
  onBlur,
}: EditProps) {
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
              <ContentEditor
                block={block}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </li>
          ))}
        </ReactSortable>
      </ul>
    </Section>
  );
}
