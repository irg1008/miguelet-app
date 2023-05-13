import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import Footer from '@/components/core/footer/footer';
import Header from '@/components/core/header/header';
import { PatternBG } from '@/components/ui/bg/pattern';
import type { Ext } from '@/lib/services/audio.service';
import { isWebkit } from '@/lib/utils/browser.utils';

export const useAudioExtension = routeLoader$(() => {
  const ext: Ext = isWebkit() ? 'acc' : 'ogg';
  return { ext };
});

export default component$(() => {
  return (
    <>
      <PatternBG />
      <Header />
      <main class="flex-1">
        <Slot />
      </main>
      <Footer />
    </>
  );
});
