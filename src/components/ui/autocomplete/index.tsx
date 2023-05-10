import { searchAudios } from '@/lib/services/audio.services';
import { debounce } from '@/lib/utils/debounce.utils';
import { Resource, component$, useResource$, useSignal, useTask$ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { twMerge } from 'tailwind-merge';

export const Autocomplete = component$(() => {
  const q = useSignal('');
  const debouncedQ = useSignal('');

  const debounceTime = 500;

  useTask$(async ({ track, cleanup }) => {
    track(() => q.value);

    const clear = debounce(() => {
      debouncedQ.value = q.value;
    }, debounceTime);

    cleanup(clear);
  });

  const audios = useResource$(async ({ track }) => {
    track(() => debouncedQ.value);
    return await searchAudios(q.value, 10);
  });

  return (
    <div>
      <Form class="form-control max-w-xs">
        <div class="input-group">
          <input
            type="text"
            name="q"
            placeholder="Búsqueda de audios"
            class="input input-primary input-group"
            bind:value={q}
          />
          <button type="submit" class="btn btn-primary">
            Buscar
          </button>
        </div>
      </Form>

      <section class={twMerge(audios.loading && 'opacity-50')}>
        <Resource
          value={audios}
          onResolved={(audios) => (
            <div class={twMerge('flex flex-col gap-6', audios.length > 0 && 'p-12')}>
              {audios.map(({ item }) => (
                <a
                  class="card card-body bg-primary"
                  key="item"
                  href={`https://miguelet.spoiled.workers.dev/audios/${item}`}
                  target="_blank"
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        />
      </section>
    </div>
  );
});
