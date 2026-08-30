import React from 'react';
import Button from '@/components/Button';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Premium mathematical coordinate-themed SVG */}
        <div className={styles.visualArea}>
          <svg viewBox="0 0 100 100" className={styles.mathSvg} width="120" height="120" fill="none" stroke="currentColor">
            {/* Dashed grid lines */}
            <line x1="10" y1="50" x2="90" y2="50" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="3,3" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="3,3" />
            
            {/* Curved geometric graph */}
            <path d="M 15 85 Q 50 15 85 85" stroke="var(--secondary)" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Highlighted coordinates points */}
            <circle cx="50" cy="50" r="4.5" fill="#061320" stroke="var(--secondary)" strokeWidth="2" />
            <circle cx="85" cy="85" r="4.5" fill="#061320" stroke="#475569" strokeWidth="2" />
            <circle cx="15" cy="85" r="4.5" fill="#061320" stroke="#475569" strokeWidth="2" />
            
            {/* Text labeling coordinate system */}
            <text x="54" y="47" fill="var(--text-secondary)" fontSize="5.5" fontFamily="var(--font-headings)" fontWeight="bold">(404, 0)</text>
            <text x="86" y="48" fill="var(--text-light)" fontSize="5.5" fontFamily="var(--font-headings)">x</text>
            <text x="47" y="8" fill="var(--text-light)" fontSize="5.5" fontFamily="var(--font-headings)">y</text>
          </svg>
        </div>

        <span className="badge badge-primary">Error 404</span>
        <h1 className={styles.title}>Path Coordinates Not Found</h1>
        <p className={styles.desc}>
          The lesson path or webpage you requested does not exist on our map. It may have been moved, updated, or is temporarily offline.
        </p>

        <div className={styles.actions}>
          <Button variant="secondary" size="lg" href="/">
            RETURN TO HOMEPAGE
          </Button>
          <Button
            variant="outline"
            size="lg"
            href="https://wa.me/918319531258?text=Hello%20MathMatriX%20Academy%2C%20I%20was%20redirected%20to%20a%20404%20page%20and%20need%20assistance."
            external
          >
            TALK TO COUNSELLOR
          </Button>
        </div>
      </div>
    </div>
  );
}
