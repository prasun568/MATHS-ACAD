import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp' | 'text';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const classNames = `${styles.btn} ${styles[variant]} ${styles[size]} ${
    loading ? styles.loading : ''
  } ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classNames}
        >
          {children}
        </a>
      );
    }
    return (
      <a href={href} className={classNames}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classNames}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className={styles.spinner}></span>}
      <span className={styles.content}>{children}</span>
    </button>
  );
}
