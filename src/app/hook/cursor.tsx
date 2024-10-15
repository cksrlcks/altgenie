export function useCursorPosition() {
  function saveCursorPosition() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      return {
        startContainer: range.startContainer,
        startOffset: range.startOffset,
      };
    }
    return null;
  }

  // 커서 위치 복원
  function restoreCursorPosition(
    cursorPosition: {
      startContainer: Node;
      startOffset: number;
    } | null,
  ) {
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

  return { saveCursorPosition, restoreCursorPosition };
}
