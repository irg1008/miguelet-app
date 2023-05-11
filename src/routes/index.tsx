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
    <>
      <div class="w-full max-w-2xl relative">
        <Hero />
        <div class="sticky top-0 left-0">
          <Autocomplete onDebouncedQuery={updateQuery} />
        </div>
      </div>

      <Audios query={q.value} />
    </>
  );
});

export const head: DocumentHead = {
  title: 'Bienvenido a Miguelet',
  meta: [
    {
      name: 'description',
      content: 'la web de los audios y el basuco',
    },
  ],
};
