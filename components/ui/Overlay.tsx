// components/ui/Overlay.tsx
import { Title } from '../intro/intro';
import styles from './Overlay.module.css';

export function Overlay() {
  return (
    <div className={styles.container}>
      <Title />
    </div>
  );
}
