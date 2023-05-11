import { AudioPlayer } from '@/components/ui/audio-player';
import { Spinner } from '@/components/ui/icons/loading';
import { searchAudios } from '@/lib/services/audio.services';
import { Resource, component$, useResource$ } from '@builder.io/qwik';
import { twMerge } from 'tailwind-merge';

type AudiosProps = {
  query: string;
};

export const Audios = component$<AudiosProps>(({ query }) => {
  const limit = 100;

  const res = useResource$(({ track }) => {
    track(() => query);
    return searchAudios(query, limit);
  });

  return (
    <section class="flex justify-center">
      <Resource
        value={res}
        onResolved={(audios) =>
          audios.length === 0 ? (
            res.loading ? (
              <Spinner class="text-base-content w-12 m-4" />
            ) : (
              <span class="text-center text-base-content/75">
                {query === ''
                  ? 'Empieza a escribir para ver audios'
                  : 'No se han encontrado audios para esa búsqueda'}
              </span>
            )
          ) : (
            <div
              class={twMerge(
                'grid gap-6 grid-cols-audios mt-8',
                res.loading ? 'animate-fade-out-down' : 'animate-fade-in-up',
              )}
            >
              {audios.map((audio) => (
                <AudioPlayer key={audio.refIndex} audio={audio} />
              ))}
            </div>
          )
        }
      />
    </section>
  );
});
