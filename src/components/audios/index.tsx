import { AudioCard } from '@/components/audio-card';
import { Spinner } from '@/components/ui/icons/loading';
import { useAudiosProvider } from '@/contexts/audios.context';
import type { AudioData } from '@/lib/services/audio.service';
import { searchAudios } from '@/lib/services/audio.service';
import type { Signal } from '@builder.io/qwik';
import { Resource, component$, useResource$ } from '@builder.io/qwik';
import { twMerge } from 'tailwind-merge';

type AudiosProps = {
  query: Signal<string>;
  limit?: number;
  onAudiosLoaded?: (audios: AudioData[]) => void;
};

export const Audios = component$<AudiosProps>(({ query, limit = 50, onAudiosLoaded }) => {
  const res = useResource$(async ({ track }) => {
    track(() => query.value);
    const audios = await searchAudios(query.value, limit);
    onAudiosLoaded?.(audios);
    return audios;
  });

  useAudiosProvider();

  return (
    <>
      <Resource
        value={res}
        onResolved={(audios) =>
          audios.length === 0 ? (
            res.loading ? (
              <Spinner class="text-base-content w-12 m-4" />
            ) : (
              <span class="text-center text-base-content/75">
                {query.value === ''
                  ? 'Empieza a escribir para ver audios'
                  : 'No se han encontrado audios para esa búsqueda'}
              </span>
            )
          ) : (
            <div
              class={twMerge(
                'w-full gap-10 mt-8 flex flex-col sm:grid sm:grid-cols-audios',
                res.loading ? 'animate-fade-out-down' : 'animate-fade-in-up',
              )}
            >
              {audios.map((audio) => (
                <AudioCard key={audio.refIndex} audio={audio} />
              ))}
            </div>
          )
        }
      />
    </>
  );
});
