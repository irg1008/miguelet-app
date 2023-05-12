import { $ } from '@builder.io/qwik';
import { isBrowser } from '@builder.io/qwik/build';

export const scrollToTop = $(() => isBrowser && window.scrollTo({ top: 0, behavior: 'smooth' }));
