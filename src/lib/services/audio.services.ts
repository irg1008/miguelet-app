import { server$ } from '@builder.io/qwik-city';

const cdn = 'https://miguelet.spoiled.workers.dev';

enum ENDPOINTS {
  SEARCH = 'audios/search/{q}/{limit}',
  GET_AUDIO = 'audios/{name}',
}

type Indice = [number, number];

type Match = {
  indices: Indice[];
  value: string;
};

type Result = {
  item: string;
  refIndex: number;
  matches: Match[];
};

export const searchAudios = server$(async (q: string, limit: number): Promise<Result[]> => {
  if (q === '') return [];
  const replacedParams = ENDPOINTS.SEARCH.replace('{q}', q).replace('{limit}', limit.toString());
  const url = `${cdn}/${replacedParams}`;
  const res = await fetch(url);
  return res.ok ? await res.json() : [];
});
