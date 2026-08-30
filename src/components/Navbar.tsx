'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Button from './Button';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // If we are on the landing page, we want minimal navigation to avoid distractions
  const isLandingPage = pathname === '/landing';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Programs', href: '/programs' },
    { label: 'Curricula', href: '/curricula' },
    { label: 'Subjects', href: '/subjects' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Results', href: '/results' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Contact', href: '/contact' },
  ];

  if (isLandingPage) {
    return (
      <header className={`${styles.header} ${styles.scrolled}`}>
        <div className={`container ${styles.container}`}>
          <div className={styles.logoArea}>
            <Link href="/" className={styles.logoLink}>
              <Image
                id="navbar-logo"
                src="/images/logo.jpg"
                alt="The MathMatriX Academy Logo"
                width={36}
                height={36}
                className={styles.logoImage}
              />
              <span className={styles.logoText}>
                The <span className={styles.logoTitle}>MathMatriX</span>
                <span className={styles.logoSub}>Academy</span>
              </span>
            </Link>
          </div>
          <div className={styles.landingCta}>
            <Button
              variant="whatsapp"
              size="sm"
              href="https://wa.me/918319531258?text=Hello%20MathMatriX%20Academy%2C%20I%20would%20like%20to%20know%20more%20about%20classes%20for%20my%20child."
              external
            >
              WhatsApp Counsellor
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${
        isOpen ? styles.menuOpen : ''
      }`}
    >
      <div className={`container ${styles.container}`}>
        <div className={styles.logoArea}>
          <Link href="/" className={styles.logoLink}>
            <Image
              id="navbar-logo"
              src="/images/logo.jpg"
              alt="The MathMatriX Academy Logo"
              width={36}
              height={36}
              className={styles.logoImage}
            />
            <span className={styles.logoText}>
              The <span className={styles.logoTitle}>MathMatriX</span>
              <span className={styles.logoSub}>Academy</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${
                    pathname === link.href ? styles.active : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.ctaArea}>
          <Button variant="primary" size="sm" href="/#assessment">
            BOOK FREE ASSESSMENT
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <nav className={`${styles.mobileNav} ${isOpen ? styles.open : ''}`}>
        <ul className={styles.mobileNavLinks}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${styles.mobileNavLink} ${
                  pathname === link.href ? styles.active : ''
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className={styles.mobileCtaLi}>
            <Button
              variant="primary"
              size="md"
              href="/#assessment"
              className={styles.mobileCtaBtn}
            >
              BOOK FREE ASSESSMENT
            </Button>
          </li>
          <li className={styles.mobileWhatsappCta}>
            <Button
              variant="whatsapp"
              size="md"
              href="https://wa.me/918319531258?text=Hello%20MathMatriX%20Academy%2C%20I%20would%20like%20to%20know%20more%20about%20your%20online%20classes."
              external
              className={styles.mobileCtaBtn}
            >
              TALK ON WHATSAPP
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
