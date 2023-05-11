import { $, component$, useId, useVisibleTask$ } from '@builder.io/qwik';
import type { IColors } from 'lord-icon-element/interfaces';
import { twMerge } from 'tailwind-merge';
import type { Icon } from './library';
import { getIconSrc } from './library';

type LottieProps = {
  /**
   * Using src disables the icon property.
   *
   * @type {string}
   */
  icon: Icon;
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
  currentClass?: boolean;
  scale?: string;
  'axis-x'?: string;
  'axis-y'?: string;
};

export const Lottie = component$<LottieProps>(
  ({ colors, loading = 'lazy', trigger = 'loop', currentClass = true, icon, ...props }) => {
    const id = useId();

    const addReadyClass = $(() => {
      const el = document.querySelector(`#${id}`);
      el?.addEventListener('ready', () => el.classList.add('ready'));
    });

    useVisibleTask$(async () => {
      const { loadAnimation } = await import('lottie-web').then((m) => m.default);
      const { defineElement } = await import('lord-icon-element');
      defineElement(loadAnimation);
      addReadyClass();
    });

    const colorsString = colors && `primary:${colors.primary},secondary:${colors.secondary}`;
    const useCurrentClass = currentClass && !colors;

    return (
      <lord-icon
        id={id}
        {...props}
        src={getIconSrc(icon)}
        loading={loading}
        trigger={trigger}
        colors={colorsString}
        class={twMerge(
          'opacity-0 duration-200',
          '[&.ready]:opacity-100',
          useCurrentClass && 'current-color',
          props.class,
        )}
      ></lord-icon>
    );
  },
);
