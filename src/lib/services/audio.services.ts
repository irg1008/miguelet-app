import { server$ } from '@builder.io/qwik-city';

const cdn = 'https://miguelet.spoiled.workers.dev';

enum ENDPOINT {
  SEARCH = 'audios/search/{q}/{limit}',
  GET_AUDIO = 'audios/{name}',
}

type Params = {
  [ENDPOINT.SEARCH]: {
    q: string;
    limit: number;
  };
  [ENDPOINT.GET_AUDIO]: {
    name: string;
  };
};

async function api<E extends ENDPOINT>(endpoint: E, params: Params[E]) {
  let e = endpoint.toString();
  Object.entries(params).forEach(([key, value]) => {
    e = e.replace(`{${key}}`, value.toString());
  });

  const url = `${cdn}/${e}`;
  const res = await fetch(url);
  return res;
}

type Indice = [number, number];

type Match = {
  indices: Indice[];
  value: string;
};

export type AudioData = {
  item: string;
  refIndex: number;
  matches: Match[];
};

export const searchAudios = server$(async (q: string, limit: number): Promise<AudioData[]> => {
  const res = await api(ENDPOINT.SEARCH, { q, limit });
  return res.ok ? await res.json() : [];
});

export const getAudioUrl = (name: string, extension: 'ogg' | 'acc' = 'ogg') => {
  return `${cdn}/${ENDPOINT.GET_AUDIO.replace('{name}', `${name}.${extension}`)}`;
};
