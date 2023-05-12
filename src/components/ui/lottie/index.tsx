import { component$, useId, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import type { IColors } from 'lord-icon-element/interfaces';
import { twMerge } from 'tailwind-merge';

type LottieProps = {
  /**
   * Using src disables the icon property.
   *
   * @type {string}
   */
  icon: string;
  loading?: 'lazy';
  target?: string;
  stroke?: string;
  trigger?: 'loop' | 'hover' | 'click' | 'boomerang' | 'loop-on-hover' | 'sequence' | 'morph';
  state?: string;
  states?: string[];
  /**
   *  Using colors disables the currentColor class. All text color class will be ignored.
   *
   * @type {IColors}
   */
  colors?: IColors;
  delay?: number;
  class?: string;
  readyClass?: string;
  currentColor?: boolean;
  scale?: string;
  'axis-x'?: string;
  'axis-y'?: string;
};

export const Lottie = component$<LottieProps>(
  ({
    colors,
    loading = 'lazy',
    trigger = 'loop',
    currentColor = true,
    readyClass,
    icon,
    ...props
  }) => {
    const id = useId();
    const ready = useSignal(false);

    useVisibleTask$(async () => {
      const { loadAnimation } = await import('lottie-web').then((m) => m.default);
      const { defineElement } = await import('lord-icon-element');
      defineElement(loadAnimation);
      ready.value = true;
    });

    const colorsString = colors && `primary:${colors.primary},secondary:${colors.secondary}`;
    const useCurrentClass = currentColor && !colors;

    return (
      <lord-icon
        id={id}
        {...props}
        src={icon}
        loading={loading}
        trigger={trigger}
        colors={colorsString}
        class={twMerge(
          'opacity-0 duration-200',
          ready.value && ['opacity-100', readyClass],
          useCurrentClass && 'current-color',
          props.class,
        )}
      ></lord-icon>
    );
  },
);
