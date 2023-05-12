import { Lottie } from '@/components/ui/lottie';
import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="w-screen h-screen absolute top-0 left-0 overflow-hidden bg-gradient-to-b from-primary/40 to-transparent flex flex-col items-center">
      <Lottie
        icon="/lotties/not-found.json"
        class="h-full max-h-[1000px] w-full mix-blend-luminosity"
        currentColor={false}
      />
      <a href="/" role="button" class="btn btn-primary mb-[20%]">
        Ir a casita
      </a>
    </div>
  );
});
