import { Pause } from '@/components/ui/icons/pause';
import { Play } from '@/components/ui/icons/play';
import { PlayTime } from '@/components/ui/play-time';
import { Swap } from '@/components/ui/swap';
import { useAudios } from '@/contexts/audios.context';
import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

type AudioPlayerProps = {
  src: string;
  onPlay?: () => void;
  onPause?: () => void;
};

export const AudioPlayer = component$<AudioPlayerProps>(({ src, onPause, onPlay }) => {
  const { add } = useAudios();

  const playing = useSignal(false);
  const audio = useSignal<HTMLAudioElement>();
  const time = useSignal(0);

  const setUpAudio = $(() => {
    audio.value = new Audio(src);

    audio.value.addEventListener('ended', () => {
      playing.value = false;
      time.value = 0;
    });

    // On play, pause all other audios.
    audio.value.addEventListener('play', function () {
      playing.value = true;
      add(src, this);
      onPlay?.();

      // Pause the rest of audio elements created.
    });

    // On pause, set playing to false. This way we handle external pause.
    audio.value.addEventListener('pause', () => {
      onPause?.();
      playing.value = false;
    });

    audio.value.addEventListener('timeupdate', function () {
      time.value = this.currentTime;
    });
  });

  useVisibleTask$(() => {
    setUpAudio();
  });

  const toggleAudio = $(() => {
    if (!audio.value) return;
    playing.value ? audio.value.pause() : audio.value.play();
  });

  return (
    <div class="flex items-center gap-2 transition-transform duration-200 ease-in-out">
      <button
        class="btn btn-circle btn-ghost text-lg"
        onClick$={toggleAudio}
        title={playing.value ? 'Pausar' : 'Reproducir'}
      >
        <Swap active={playing.value}>
          <Pause q:slot="on" />
          <Play q:slot="off" />
        </Swap>
      </button>

      <PlayTime class="text-2xl font-extrabold opacity-25 italic" seconds={time.value} />
      {/* <footer class="flex gap-2 p-4">
        <audio preload="metadata" ref={audioRef}>
          <source src={getAudioUrl(audio.item, 'ogg')} type="audio/ogg" />
        </audio>



        <span class="inline-block">0:00</span>
        <input type="range" class="range range-secondary" max="100" value="0" />
        <span class="inline-block">{audioRef.value?.duration}</span>
        <output id="volume-output">100</output>

        <input type="range" class="range range-accent" max="100" value="100"></input>

        <button id="mute-icon">mute</button>
      </footer> */}
    </div>
  );
});
