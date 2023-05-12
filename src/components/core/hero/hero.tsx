import { Lottie } from '@/components/ui/lottie';
import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <section class="hero m-8 relative">
      <aside class="hero-overlay bg-transparent absolute top-0 left-0 grid place-content-center">
        <span class="bg-gradient-to-br rounded-full shadow-lg shadow-accent/30 from-secondary to-accent">
          <Lottie
            icon="/lotties/mic.json"
            delay={2000}
            class="text-accent-content opacity-50 md:h-40 md:w-40 w-32 h-32 rotate-6"
            readyClass="m-16"
          />
        </span>
      </aside>

      <main class="hero-content max-w-2xl prose-sm prose lg:prose-2xl mx-auto">
        <h1 class="uppercase text-center animate-scale-in">Bienvenido a la web de Miguelet</h1>
      </main>
    </section>
  );
});
