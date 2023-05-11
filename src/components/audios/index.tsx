import { AudioPlayer } from '@/components/ui/audio-player';
import { Spinner } from '@/components/ui/icons/loading';
import { searchAudios } from '@/lib/services/audio.services';
import { Resource, component$, useResource$ } from '@builder.io/qwik';

type AudiosProps = {
  query: string;
};

export const Audios = component$<AudiosProps>(({ query }) => {
  const audios = useResource$(({ track }) => {
    track(() => query);
    return searchAudios(query, 10);
  });

  return (
    <section class="transition-opacity duration-200 p-12">
      <Resource
        value={audios}
        onPending={() => <Spinner class="text-base-content w-12" />}
        onResolved={(audios) =>
          audios.length === 0 ? (
            <span>Empieza a escribir para ver audios</span>
          ) : (
            <div class="flex flex-col gap-6">
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
