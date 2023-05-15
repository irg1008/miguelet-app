import { AudioPlayer } from '@/components/ui/audio-player';
import { Lottie } from '@/components/ui/lottie';
import { useAudioShare } from '@/lib/hooks/useAudioshare';
import type { AudioData } from '@/lib/services/audio.service';
import { getAudioUrl } from '@/lib/services/audio.service';
import { highlightMatches } from '@/lib/utils/audios.utils';
import { component$ } from '@builder.io/qwik';

type AudioPlayerProps = {
  audio: AudioData;
};
export const AudioCard = component$<AudioPlayerProps>(({ audio }) => {
  const text = highlightMatches(audio);
  const shareAudio = useAudioShare(audio.item);
  const src = getAudioUrl(audio.item, 'aac');

  return (
    <article class="card h-auto relative bg-opacity-75 backdrop-blur-sm drop-shadow-md shadow-sm shadow-primary/50 border-b-4 bg-base-300 border-primary flex flex-col justify-between">
      <main class="card-body p-3">
        <span dangerouslySetInnerHTML={text} class="line-clamp-2" title={audio.item}></span>

        <div class="flex gap-4 items-center">
          <AudioPlayer src={src} />
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
