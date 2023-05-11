import { Lottie } from '@/components/ui/lottie';
import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <section class="relative m-8">
      <aside class="absolute top-0 left-0 grid place-content-center h-full w-full -z-10">
        <span class="bg-gradient-to-br rounded-full shadow-lg shadow-accent/30 from-secondary to-accent">
          <Lottie
            icon="mic"
            delay={2000}
            class="text-accent-content opacity-50 md:h-40 md:w-40 w-32 h-32 rotate-6"
            readyClass="m-16"
          />
        </span>
      </aside>

      <main>
        <h2 class="md:text-6xl xs:text-3xl text-xl font-extrabold tracking-wide leading-tight uppercase text-center animate-scale-in">
          Bienvenido a la web de Miguelet
        </h2>
      </main>
    </section>
  );
});
