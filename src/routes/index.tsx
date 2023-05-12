import { Audios } from '@/components/audios';
import Hero from '@/components/core/hero/hero';
import { Autocomplete } from '@/components/ui/autocomplete';
import { scrollToTop } from '@/lib/utils/window.utils';
import { $, component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const { url } = useLocation();
  const params = new URLSearchParams(url.search);
  const query = useSignal(params.get('q') ?? '');

  const oQueryChange = $((value: string) => {
    query.value = value;
  });

  return (
    <div class="flex flex-col items-center gap-4 justify-items-center px-12 pb-8 pt-20 max-w-6xl relative mx-auto">
      <Hero />

      <div class="w-full max-w-2xl sticky top-10 z-10">
        <Autocomplete query={query.value} onDebouncedQuery={oQueryChange} />
      </div>

      <Audios query={query} onAudiosLoaded={scrollToTop} />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Bienvenido a Miguelet',
  meta: [
    {
      name: 'description',
      content: 'La web de los audios y el basuco',
    },
  ],
};
