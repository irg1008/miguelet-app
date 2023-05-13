import { component$, Slot } from '@builder.io/qwik';

import Footer from '@/components/core/footer/footer';
import Header from '@/components/core/header/header';
import { PatternBG } from '@/components/ui/bg/pattern';

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
