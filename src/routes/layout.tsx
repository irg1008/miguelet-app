import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import Footer from '@/components/core/footer/footer';
import Header from '@/components/core/header/header';
import { PatternBG } from '@/components/ui/bg/pattern';

export const useYear = routeLoader$(() => {
  return {
    year: new Date().getFullYear(),
  };
});

export default component$(() => {
  return (
    <>
      <PatternBG />
      <Header />
      <main class="flex-1">
        <Slot />
      </main>
      <Footer />
    </>
  );
});
