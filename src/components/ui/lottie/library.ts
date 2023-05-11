const cdn = 'https://cdn.lordicon.com';

const library = {
  search: 'xfftupfv',
  box: 'cjhjyecy',
  mic: 'psseymno',
  share: 'vpzjmdjv',
};

export type Icon = keyof typeof library;

export const getIconSrc = (icon: Icon) => `${cdn}/${library[icon]}.json`;
