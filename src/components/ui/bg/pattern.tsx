import styles from './styles.module.css';

export const PatternBG = () => {
  return (
    <aside
      class={`fixed -z-10 pointer-events-none h-screen w-screen ${styles['pattern-bg']}`}
    ></aside>
  );
};
