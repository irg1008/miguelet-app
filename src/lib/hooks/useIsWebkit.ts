import { useSignal, useVisibleTask$ } from '@builder.io/qwik';

export const useIsWebkit = () => {
  const isWebkit = useSignal(false);
  useVisibleTask$(() => {
    isWebkit.value = navigator.userAgent.includes('Safari');
  });
  return isWebkit.value;
};
