import { Ext, getAudioUrl } from '@/lib/services/audio.service';
import { $ } from '@builder.io/qwik';
import { useIsWebkit } from './useIsWebkit';

export const useAudioShare = (name: string) => {
  const isWebkit = useIsWebkit();
  const ext: Ext = isWebkit ? 'aac' : 'ogg';
  const src = getAudioUrl(name, ext);
  const type = `audio/${ext}`;

  const share = $(async () => {
    const res = await fetch(src);
    const blob = await res.blob();
    const file = new File([blob], src, { type });
    navigator.share({ files: [file] });
  });

  return share;
};
