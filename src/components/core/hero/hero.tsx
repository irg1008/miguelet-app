import { Lottie } from '@/components/ui/lottie';
import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <section class="hero m-8 relative">
      <aside class="hero-overlay bg-transparent absolute top-0 left-0 grid place-content-center">
        <Lottie
          icon="/lotties/mic.json"
          delay={2000}
          class="text-base-content opacity-10 rotate-12 w-96 h-96"
          readyClass="m-16"
        />
      </aside>

      <main class="hero-content max-w-3xl prose-sm prose lg:prose-2xl mx-auto">
        <h1 class="uppercase text-center animate-scale-in text-grad">
          Esucha estos{' '}
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-focus">
            audios
          </span>{' '}
          de{' '}
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-focus">
            Miguelet
          </span>
        </h1>
      </main>
    </section>
  );
});
