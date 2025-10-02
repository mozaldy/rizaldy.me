// components/ui/Overlay.tsx
import styles from './Overlay.module.css';

export function Overlay() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>rizaldy.me</h1>
        <nav className={styles.nav}>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
          <a href="#devdiary">Dev Diary</a>
        </nav>
      </header>
      <footer className={styles.footer}>
        <div>↓ Scroll to explore</div>
      </footer>
    </div>
  );
}
