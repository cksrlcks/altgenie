import { FormEvent, useEffect } from 'react';
import styles from './style.module.css';
import { useCursorPosition } from '@/app/hook/useCursorPosition';

interface ContentEditorProps {
  block: { id: number; text: string };
  onChange: (e: FormEvent<HTMLDivElement>, id: number) => void;
  onFocus: (id: number) => void;
  onBlur: () => void;
}

export default function ContentEditor({
  block,
  onChange,
  onFocus,
  onBlur,
}: ContentEditorProps) {
  //contenteditable div에 내용이 업데이트될때, 커서가 앞으로 가는거 방지
  const { saveCursorPosition, restoreCursorPosition, resetCursor } =
    useCursorPosition();

  useEffect(() => {
    restoreCursorPosition();
  }, [block, restoreCursorPosition]);

  //contenteditable div에서 오른쪽으로 마우스포인터가 blur될때 가까운 contenteditable에 focus되는거 막기
  useEffect(() => {
    document.addEventListener('mousedown', handleBlurContentEdtitable);

    return () => {
      document.removeEventListener('mousedown', handleBlurContentEdtitable);
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

  function handleInput(e: FormEvent<HTMLDivElement>, id: number) {
    saveCursorPosition();
    onChange(e, id);
  }
  function handleFocus(id: number) {
    resetCursor();
    onFocus(id);
  }
  function handleBlur() {
    resetCursor();
    onBlur();
  }

  return (
    <div
      contentEditable
      suppressContentEditableWarning
      className={styles['result-block__content']}
      onInput={(e) => handleInput(e, block.id)}
      onFocus={() => handleFocus(block.id)}
      onBlur={handleBlur}
    >
      {block.text}
    </div>
  );
}
