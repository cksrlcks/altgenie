import { useState } from 'react';

export function useCursorPosition() {
  const [cursorPosition, setCursorPosition] = useState<{
    startContainer: Node;
    startOffset: number;
  } | null>(null);

  function saveCursorPosition() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      setCursorPosition({
        startContainer: range.startContainer,
        startOffset: range.startOffset,
      });
    } else {
      setCursorPosition(null);
    }
  }

  function restoreCursorPosition() {
    if (!cursorPosition) return;

    const { startContainer, startOffset } = cursorPosition;
    const selection = window.getSelection();
    if (selection) {
      const range = document.createRange();
      if (
        startContainer.textContent &&
        startOffset <= startContainer.textContent.length
      ) {
        range.setStart(startContainer, startOffset);
        range.collapse(true); // 커서를 시작 위치로 설정
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }

  function resetCursor() {
    setCursorPosition(null);
  }

  return { saveCursorPosition, restoreCursorPosition, resetCursor };
}
