import { Lottie } from '@/components/ui/lottie';
import type { AudioData } from '@/lib/services/audio.services';
import { component$ } from '@builder.io/qwik';

type AudioPlayerProps = {
  audio: AudioData;
};

const highlightMatches = (audio: AudioData) => {
  const { matches, item: text } = audio;
  const indices = matches.flatMap((match) => match.indices);

  const insertTag = (value: string) => `<mark>${value}</mark>`;

  let html: string = '';
  indices.forEach(([start, end]) => {
    html += text.slice(0, start);
    html += insertTag(text.slice(start, end + 1));
    html += text.slice(end + 1);
  });

  return html;
};

export const AudioPlayer = component$<AudioPlayerProps>(({ audio }) => {
  const text = highlightMatches(audio);

  return (
    <a
      class="card card-body bg-primary relative shadow-lg shadow-primary/30 hover:scale-105 transition-transform ease-out-back duration-300 ring-offset-primary-focus ring-offset-2"
      key="item"
      href={`https://miguelet.spoiled.workers.dev/audios/${audio.item}`}
      target="_blank"
    >
      <span dangerouslySetInnerHTML={text}></span>
      <Lottie
        icon="share"
        delay={5000}
        class="w-10 h-10 text-primary-content/50 absolute bottom-0 right-0 m-4"
      />
    </a>
  );
});
