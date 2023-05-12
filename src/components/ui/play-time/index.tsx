import type { QwikIntrinsicElements } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';

type PlayTimeProps = QwikIntrinsicElements['span'] & {
  seconds: number;
};

const lead = (value: number, lead: number, condition: boolean, times = 1): string => {
  if (!condition) return `${value}`;
  return `${lead * times}${value}`;
};

const formatTime = (value: number) => {
  const min = Math.floor(value / 60);
  const sec = Math.floor(value % 60);

  return [min, lead(sec, 0, sec < 10)];
};

export const isValidTime = (time?: number) => {
  return time !== undefined && !isNaN(time) && isFinite(time) && time >= 0;
};

const CountDown = component$(({ time }: { time: string | number }) => (
  <span class="countdown">
    <span style={`--value: ${time};`}></span>
  </span>
));

export const PlayTime = component$<PlayTimeProps>(({ seconds, ...props }) => {
  const [min, sec] = formatTime(seconds);
  return (
    <span {...props}>
      <CountDown time={min} />
      :
      <CountDown time={sec} />
    </span>
  );
});
