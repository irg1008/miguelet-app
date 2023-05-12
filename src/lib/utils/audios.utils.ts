import { AudioData } from '@/lib/services/audio.service';
import { JSXTagName } from '@builder.io/qwik';

const wrap = (value: string, tag: JSXTagName) => `<${tag}>${value}</${tag}>`;

export const highlightMatches = (audio: AudioData, tag: JSXTagName = 'mark') => {
  const { matches, item: text } = audio;
  let html = '';
  let lastEnd = -1;

  matches
    .flatMap((match) => match.indices)
    .forEach(([start, end]) => {
      const before = text.substring(lastEnd + 1, start);
      const match = text.substring(start, end + 1);
      html += before + wrap(match, tag);
      lastEnd = end;
    });

  html += text.substring(lastEnd + 1);

  return html;
};
