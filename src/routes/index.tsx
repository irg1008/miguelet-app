import { Audios } from '@/components/audios';
import Hero from '@/components/core/hero/hero';
import { Autocomplete } from '@/components/ui/autocomplete';
import { $, component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  const q = useSignal('');

  const updateQuery = $((query: string) => {
    q.value = query;
  });

  return (
    <div class="flex flex-col items-center gap-4 justify-items-center px-12 pb-8 pt-20 max-w-6xl mx-auto relative">
      <div class="w-full max-w-2xl">
        <Hero />
      </div>

      <div class="w-full max-w-3xl sticky top-10 z-10">
        <Autocomplete onDebouncedQuery={updateQuery} />
      </div>

      <Audios query={q.value} />
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
