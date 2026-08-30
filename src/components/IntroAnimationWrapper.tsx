'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './IntroAnimationWrapper.module.css';

interface IntroAnimationWrapperProps {
  children: React.ReactNode;
}

export default function IntroAnimationWrapper({ children }: IntroAnimationWrapperProps) {
  const [introState, setIntroState] = useState<'checking' | 'playing' | 'transitioning' | 'completed'>('checking');
  const [logoCoords, setLogoCoords] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const [isCentered, setIsCentered] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 1. Check if intro has already played in this browser session
    const hasPlayed = sessionStorage.getItem('mm_intro_played');
    if (hasPlayed === 'true') {
      setIntroState('completed');
      return;
    }

    // 2. If not played, set state to playing and update body attributes
    setIntroState('playing');
    document.body.setAttribute('data-intro-state', 'playing');

    // 3. Fallback timer: in case video fails to load, play, or trigger onEnded (e.g., autoplay block or network delay)
    // We set a 35-second safe fallback so the video is never cut off prematurely.
    fallbackTimerRef.current = setTimeout(() => {
      handleVideoEnd();
    }, 35000);

    return () => {
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
      document.body.removeAttribute('data-intro-state');
    };
  }, []);

  const handleVideoEnd = () => {
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }

    if (introState === 'completed' || introState === 'transitioning') return;

    // Calculate target coordinates of the actual logo in the Navbar
    const targetLogo = document.getElementById('navbar-logo');
    if (targetLogo) {
      const rect = targetLogo.getBoundingClientRect();
      setLogoCoords({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
      });
    } else {
      // Fallback coordinates if logo element not found
      setLogoCoords({
        top: 20,
        left: 20,
        width: 36,
        height: 36,
      });
    }

    // First transition phase: Render logo centered
    setIsCentered(true);
    setIntroState('transitioning');
    document.body.setAttribute('data-intro-state', 'transitioning');

    // In the next animation frame, trigger the transition toward navbar position
    setTimeout(() => {
      setIsCentered(false);
    }, 50);

    // After the transition animation completes (850ms CSS duration), set to completed
    setTimeout(() => {
      setIntroState('completed');
      document.body.removeAttribute('data-intro-state');
      sessionStorage.setItem('mm_intro_played', 'true');
    }, 900);
  };

  // If completed, just render normal layout children immediately
  if (introState === 'completed') {
    return <>{children}</>;
  }

  // If checking, render children hidden to calculate position or render nothing
  if (introState === 'checking') {
    return <div style={{ opacity: 0 }}>{children}</div>;
  }

  return (
    <>
      {/* Play the intro overlay */}
      {(introState === 'playing' || introState === 'transitioning') && (
        <div className={`${styles.overlay} ${introState === 'transitioning' ? styles.overlayFadeOut : ''}`}>
          {/* Intro Video Element */}
          {introState === 'playing' && (
            <video
              ref={videoRef}
              src="/ho.mp4"
              className={styles.introVideo}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
            />
          )}

          {/* Floating Transition Logo: visible only during logo movement */}
          {introState === 'transitioning' && logoCoords && (
            <div
              className={styles.transitionLogo}
              style={{
                top: isCentered ? '50%' : `${logoCoords.top}px`,
                left: isCentered ? '50%' : `${logoCoords.left}px`,
                width: isCentered ? '140px' : `${logoCoords.width}px`,
                height: isCentered ? '140px' : `${logoCoords.height}px`,
                transform: isCentered ? 'translate(-50%, -50%)' : 'translate(0, 0)',
                boxShadow: isCentered ? '0 10px 30px rgba(0, 0, 0, 0.4)' : 'none',
              }}
            >
              <img
                src="/images/logo.jpg"
                alt="Transition Logo"
                className={styles.logoImage}
              />
            </div>
          )}

          {/* Skip Intro Button */}
          {introState === 'playing' && (
            <button className={styles.skipButton} onClick={handleVideoEnd}>
              Skip Intro
            </button>
          )}
        </div>
      )}

      {/* Main website structure (faded out via CSS attributes while intro plays) */}
      <div className={styles.websiteWrapper}>
        {children}
      </div>
    </>
  );
}
