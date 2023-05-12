export const debounce = (fn: () => void, delay: number) => {
  const timeout = setTimeout(fn, delay);
  return () => clearTimeout(timeout);
};
