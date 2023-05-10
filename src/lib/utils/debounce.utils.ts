export const debounce = (fn: () => void, time: number) => {
  const timeout = setTimeout(fn, time);
  return () => clearTimeout(timeout);
};
