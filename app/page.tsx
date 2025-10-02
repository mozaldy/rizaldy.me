'use client';

import { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';
import Experience from '@/components/canvas/Experience';
import { Overlay } from '@/components/ui/Overlay';
import { useScrollStore } from '@/lib/store';
import styles from './page.module.css';
import { Intro } from '@/components/intro/intro';

export default function Home() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const setScrollProgress = useScrollStore((state) => state.setScrollProgress);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setScrollProgress(latest);
    });
  }, [scrollYProgress, setScrollProgress]);

  return (
    <div ref={scrollRef} className={styles.scrollContainer}>
      {/* This main element will be sticky */}
      <main className={styles.main}>
        <Intro />
        <Experience />
        <Overlay />
      </main>
      {/* This div creates the scrollable height */}
      <div className={styles.scrollContent}></div>
    </div>
  );
}
