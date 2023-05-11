import { useYear } from '@/routes/layout';
import { component$ } from '@builder.io/qwik';

export default component$(() => {
  const data = useYear();

  return (
    <footer class="text-center p-4 opacity-50">
      <span>Creado por dos locos en </span>
      <span class="italic">{data.value.year}</span>
    </footer>
  );
});
