import { Autocomplete } from '@/components/ui/autocomplete';
import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class="text-xl">
      <Autocomplete />
    </div>
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
