import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import Footer from '@/components/starter/footer/footer';
import Header from '@/components/starter/header/header';

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  return (
    <>
      <Header />
      <main class="flex-1 grid place-content-center justify-items-center">
        <Slot />
      </main>
      <Footer />
    </>
  );
});
