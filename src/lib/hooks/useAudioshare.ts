import { getAudioUrl } from '@/lib/services/audio.service';
import { $ } from '@builder.io/qwik';
import { isWebkit } from '../utils/browser.utils';

export const useAudioShare = (name: string) => {
  const share = $(async () => {
    const ext = isWebkit() ? 'aac' : 'ogg';
    const src = getAudioUrl(name, ext);
    const res = await fetch(src);
    const blob = await res.blob();
    const file = new File([blob], src, { type: `audio/${ext}` });
    navigator.share({
      files: [file],
    });
  });

  return share;
};
