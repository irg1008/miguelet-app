import { Lottie } from '@/components/ui/lottie';
import { debounce } from '@/lib/utils/debounce.utils';
import type { QRL } from '@builder.io/qwik';
import { component$, useSignal, useTask$ } from '@builder.io/qwik';

type QueryCb = (q: string) => void;

type AutocompleteProps = {
  onQuery?: QRL<QueryCb>;
  onDebouncedQuery?: QRL<QueryCb>;
  placeholder?: string;
};

export const Autocomplete = component$<AutocompleteProps>(
  ({ onQuery, onDebouncedQuery, placeholder }) => {
    const q = useSignal('');
    const debounceTime = 500;

    useTask$(async ({ track, cleanup }) => {
      track(() => q.value);
      onQuery?.(q.value);

      const clear = debounce(() => {
        if (q.value === '') return;
        onDebouncedQuery?.(q.value);
      }, debounceTime);

      cleanup(clear);
    });

    return (
      <fieldset class="form-control w-full relative">
        <input
          autoFocus
          type="text"
          name="q"
          placeholder={placeholder || 'Search'}
          class="input input-primary input-group pr-12 bg-opacity-75 backdrop-blur-sm"
          bind:value={q}
        />
        <aside class="absolute right-0 top-0 h-full flex items-center pr-4">
          <Lottie icon="search" delay={5000} class="w-4 h-4 text-base-content" />
        </aside>
      </fieldset>
    );
  },
);
