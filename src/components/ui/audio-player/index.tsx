import type { AudioData } from '@/lib/services/audio.services';
import { getAudioUrl } from '@/lib/services/audio.services';
import { highlightMatches } from '@/lib/utils/audios.utils';
import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

type AudioPlayerProps = {
  audio: AudioData;
};

export const AudioPlayer = component$<AudioPlayerProps>(({ audio }) => {
  const text = highlightMatches(audio);
  const playing = useSignal(false);

  const duration = useSignal(0);
  const audioRef = useSignal<HTMLAudioElement>();

  const setUpAudio = $(() => {
    if (!audioRef.value) return;

    audioRef.value.volume = 0.2;

    audioRef.value.addEventListener('ended', () => {
      playing.value = false;
    });

    // On play, pause all other audios.
    audioRef.value.addEventListener('play', () => {
      const audios = document.querySelectorAll('audio');
      audios.forEach((audio) => {
        if (audio !== audioRef.value) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    });

    // On pause, set playing to false. This way we handle external pause.
    audioRef.value.addEventListener('pause', () => {
      playing.value = false;
    });

    audioRef.value.addEventListener('play', function () {
      console.log(this.duration);
    });
  });

  const toggleAudio = $(() => {
    if (!audioRef.value) return;
    if (playing.value) audioRef.value.pause();
    else audioRef.value.play();
    playing.value = !playing.value;
  });

  useVisibleTask$(() => setUpAudio());

  useVisibleTask$(async () => {
    import('vidstack/styles/base.css');
    const { defineCustomElements } = await import('vidstack/elements');
    defineCustomElements();
  });

  return (
    <article class="card drop-shadow-sm bg-primary h-auto relative shadow-lg shadow-primary/30 ring-1 ring-primary ring-offset-primary-focus ring-offset-2 flex flex-col justify-between">
      <main class="card-body">
        <span dangerouslySetInnerHTML={text} class="line-clamp-3" title={audio.item}></span>
      </main>

      <media-player
        title="Tears of Steel: 40 Years Later"
        src={getAudioUrl(audio.item, 'ogg')}
        controls
      >
        <media-outlet></media-outlet>
      </media-player>

      <media-player
        title="Agent 327: Operation Barbershop"
        src="https://media-files.vidstack.io/720p.mp4"
        poster="https://media-files.vidstack.io/poster.png"
        controls
      >
        <media-outlet></media-outlet>
      </media-player>

      {/* <footer class="flex gap-2 p-4">
        <audio preload="metadata" ref={audioRef}>
          <source src={getAudioUrl(audio.item, 'ogg')} type="audio/ogg" />
        </audio>

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

        <span class="inline-block">0:00</span>
        <input type="range" class="range range-secondary" max="100" value="0" />
        <span class="inline-block">{audioRef.value?.duration}</span>
        <output id="volume-output">100</output>

        <input type="range" class="range range-accent" max="100" value="100"></input>

        <button id="mute-icon">mute</button>
      </footer> */}
    </article>
  );
});
