import { $ } from '@builder.io/qwik';
import { createMapContext, useMap, useMapProvider } from './map.context';

type A = HTMLAudioElement;

const AudiosCtx = createMapContext<A>();

export const useAudios = () => useMap<A>(AudiosCtx);

export const useAudiosProvider = () =>
  useMapProvider<A>({
    Context: AudiosCtx,
    onAdd: $((id, map) => {
      // On new play => Reset rest of audios

      const mapEntries = Object.entries(map);

      for (const [audioId, audio] of mapEntries) {
        if (audioId === id) continue;
        audio.pause();
        audio.currentTime = 0;
      }
    }),
  });
