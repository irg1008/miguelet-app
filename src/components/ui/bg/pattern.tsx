import styles from './styles.module.css';

export const PatternBG = () => {
  return (
    <div
      class={`fixed top-0 left-0 -z-10 pointer-events-none min-h-screen h-full w-full min-w-screen ${styles['pattern-bg']}`}
    ></div>
  );
};
