import { Audios } from '@/components/audios';
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
      <Autocomplete onDebouncedQuery={updateQuery} />
      <Audios query={q.value} />
    </>
  );
});

export const head: DocumentHead = {
  title: 'Me Page',
  meta: [
    {
      name: 'description',
      content: 'Here is my page',
    },
  ],
};
