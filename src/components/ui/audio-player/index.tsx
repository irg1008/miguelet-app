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
  const duration = useSignal(0);

  const setUpAudio = $(() => {
    audio.value = new Audio(src);
    audio.value.preload = 'metadata';

    audio.value.addEventListener('ended', () => {
      playing.value = false;
      time.value = 0;
    });

    // On play, pause all other audios.
    audio.value.addEventListener('play', function () {
      playing.value = true;
      add(src, this);
      onPlay?.();
    });

    // On pause, set playing to false. This way we handle external pause.
    audio.value.addEventListener('pause', () => {
      onPause?.();
      playing.value = false;
    });

    audio.value.addEventListener('timeupdate', function () {
      if (!playing.value) return;
      time.value = this.currentTime;
    });

    audio.value.addEventListener('loadedmetadata', function () {
      duration.value = this.duration;
    });
  });

  const onSliderRelease = $(() => {
    if (!audio.value) return;
    audio.value.currentTime = time.value;
    // TODO: WTF. Maybe changing deep a singla object does not work. Try using store.
    console.log('time', audio.value.currentTime, time.value);
  });

  const onSliderChange = $((value: string) => {
    time.value = Number(value);
  });

  useVisibleTask$(() => {
    setUpAudio();
  });

  const toggleAudio = $(() => {
    if (!audio.value) return;
    playing.value ? audio.value.pause() : audio.value.play();
  });

  return (
    <div class="flex items-center gap-6 transition-transform duration-200 ease-in-out">
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

      <div class="text-2xl font-extrabold text-opacity-50 italic flex gap-6 items-center flex-wrap">
        <PlayTime seconds={time.value} />/
        {/* <input
          type="range"
          min="0"
          max={duration.value}
          step={1}
          value={time.value}
          onInput$={(_, el) => onSliderChange(el.value)}
          onChange$={() => onSliderRelease()}
          class="range range-accent flex-grow-1 range-xs"
        /> */}
        <PlayTime seconds={duration.value} />
      </div>
    </div>
  );
});
