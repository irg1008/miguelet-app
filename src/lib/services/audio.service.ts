import { server$ } from '@builder.io/qwik-city';

const baseUrl = 'https://miguelet.spoiled.workers.dev';
// const baseUrl = 'http://192.168.0.16:8787';

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

export type Ext = 'ogg' | 'aac';

const parseEndpoint = <E extends ENDPOINT>(endpoint: E, params: Params[E]) => {
  let e = endpoint.toString();
  Object.entries(params).forEach(([key, value]) => {
    e = e.replace(`{${key}}`, value.toString());
  });

  return `${baseUrl}/${e}`;
};

async function api<E extends ENDPOINT>(endpoint: E, params: Params[E]) {
  const url = parseEndpoint(endpoint, params);
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

export const getAudioUrl = (name: string, extension: Ext) => {
  return parseEndpoint(ENDPOINT.GET_AUDIO, { name }) + `.${extension}`;
};

export const getAudioBuffer = server$(async (name: string, ext: Ext) => {
  const res = await api(ENDPOINT.GET_AUDIO, { name: `${name}.${ext}` });
  return res.ok ? await res.arrayBuffer() : null;
});
