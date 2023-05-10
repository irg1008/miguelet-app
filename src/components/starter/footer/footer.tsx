import { useServerTimeLoader } from '@/routes/layout';
import { component$ } from '@builder.io/qwik';

export default component$(() => {
  const serverTime = useServerTimeLoader();

  return (
    <footer>
      <div>
        <span>Made with ♡ by Builder.io</span>
        <span>{serverTime.value.date}</span>
      </div>
    </footer>
  );
});
