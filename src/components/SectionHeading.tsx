import React from 'react';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  badge,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`${styles.container} ${centered ? styles.centered : ''} ${
        light ? styles.light : ''
      }`}
    >
      {badge && (
        <span className={`badge ${light ? 'badge-secondary' : 'badge-primary'} ${styles.badge}`}>
          {badge}
        </span>
      )}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
