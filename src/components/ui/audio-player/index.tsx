import type { AudioData } from '@/lib/services/audio.services';
import { component$ } from '@builder.io/qwik';

type AudioPlayerProps = {
  audio: AudioData;
};

export const AudioPlayer = component$<AudioPlayerProps>(({ audio }) => {
  const { item } = audio;
  return (
    <a
      class="card card-body bg-primary"
      key="item"
      href={`https://miguelet.spoiled.workers.dev/audios/${item}`}
      target="_blank"
    >
      {item}
    </a>
  );
});
