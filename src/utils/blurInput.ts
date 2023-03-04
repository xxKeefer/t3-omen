export const blurInput = () => {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
};
