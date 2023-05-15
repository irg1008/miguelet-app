import { component$, Slot } from '@builder.io/qwik';

import Footer from '@/components/core/footer/footer';
import Header from '@/components/core/header/header';

export default component$(() => {
  return (
    <>
      <Header />
      <main class="flex-1">
        <Slot />
      </main>
      <Footer />
    </>
  );
});
