import { Lottie } from '@/components/ui/lottie';
import type { AudioData } from '@/lib/services/audio.service';
import { getAudioUrl } from '@/lib/services/audio.service';
import { highlightMatches } from '@/lib/utils/audios.utils';
import { $, component$ } from '@builder.io/qwik';
import { AudioPlayer } from '../ui/audio-player';

type AudioPlayerProps = {
  audio: AudioData;
};
export const AudioCard = component$<AudioPlayerProps>(({ audio }) => {
  const text = highlightMatches(audio);
  const src = getAudioUrl(audio.item, 'ogg');

  const shareAudio = $(async () => {
    const blob = await fetch(src).then((res) => res.blob());
    const file = new File([blob], `${audio.item}.ogg`, { type: 'audio/ogg' });
    navigator.share({
      files: [file],
      title: 'Audios de Miguelet',
      text: 'Escucha este maravilloso audio!! 📢',
    });
  });

  return (
    <article class="card bg-gradient-to-br from-primary to-primary-focus drop-shadow-sm h-auto relative shadow-lg shadow-primary/30 ring-b-1 ring-primary ring-offset-primary-focus ring-offset-2 flex flex-col justify-between">
      <main class="card-body p-2">
        <div class="flex gap-4 items-center">
          <AudioPlayer src={src} />
          <span dangerouslySetInnerHTML={text} class="line-clamp-1" title={audio.item}></span>
          <button
            class="btn btn-ghost text-lg btn-circle ml-auto"
            title="Compartir"
            onClick$={shareAudio}
          >
            <Lottie icon="/lotties/share.json" stroke="80" class="h-8 w-8" trigger="hover" />
          </button>
        </div>
      </main>
    </article>
  );
});
