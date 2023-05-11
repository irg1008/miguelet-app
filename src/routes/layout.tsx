import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import Footer from '@/components/core/footer/footer';
import Header from '@/components/core/header/header';

export const useYear = routeLoader$(() => {
  return {
    year: new Date().getFullYear(),
  };
});

export default component$(() => {
  return (
    <>
      <Header />
      <main class="flex-1 flex flex-col items-center gap-4 justify-items-center px-12 pb-8 pt-20 max-w-6xl mx-auto">
        <Slot />
      </main>
      <Footer />
    </>
  );
});
