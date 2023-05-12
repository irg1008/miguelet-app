import { Slot, component$ } from '@builder.io/qwik';
import { twMerge } from 'tailwind-merge';

type SwapProps = {
  active: boolean;
  class?: string;
};

export const Swap = component$<SwapProps>(({ active }) => {
  return (
    <label class={twMerge('swap swap-rotate', active && 'swap-active')}>
      <span class="swap-on">
        <Slot name="on" />
      </span>
      <span class="swap-off">
        <Slot name="off" />
      </span>
    </label>
  );
});
