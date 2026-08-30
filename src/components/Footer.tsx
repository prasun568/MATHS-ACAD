'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isLandingPage = pathname === '/landing';

  if (isLandingPage) {
    return (
      <footer className={styles.footerLanding}>
        <div className="container">
          <p className={styles.copy}>
            &copy; {currentYear} The MathMatriX Academy. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.aboutCol}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/images/logo.jpg"
              alt="The MathMatriX Academy Logo"
              width={40}
              height={40}
              className={styles.logoImage}
            />
            <span className={styles.logoText}>
              <span className={styles.logoTitle}>The MathMatriX</span>
              <span className={styles.logoSub}>Academy</span>
            </span>
          </Link>
          <p className={styles.tagline}>Learn Smart. Learn Strong. Achieve More.</p>
          <p className={styles.description}>
            A premium academic partner for parents. We provide concept-based, personalized online learning
            for Grades 3–12 to bridge learning gaps and build lasting academic confidence.
          </p>
          <div className={styles.contactDetails}>
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:themathmatrixacademy@gmail.com" className={styles.contactLink}>
                themathmatrixacademy@gmail.com
              </a>
            </p>
            <p>
              <strong>WhatsApp:</strong>{' '}
              <a href="https://wa.me/918319531258?text=Hello%20MathMatriX%20Academy%2C%20I%20would%20like%20to%20know%20more%20about%20online%20classes." target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                +91 83195 31258
              </a>
            </p>
          </div>
        </div>

        <div>
          <h4 className={styles.heading}>Programs</h4>
          <ul className={styles.links}>
            <li><Link href="/programs#grades-3-5" className={styles.link}>Grades 3–5 (Primary)</Link></li>
            <li><Link href="/programs#grades-6-8" className={styles.link}>Grades 6–8 (Middle School)</Link></li>
            <li><Link href="/programs#grades-9-10" className={styles.link}>Grades 9–10 (Secondary)</Link></li>
            <li><Link href="/programs#grades-11-12" className={styles.link}>Grades 11–12 (Higher Secondary)</Link></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.heading}>Curricula</h4>
          <ul className={styles.links}>
            <li><Link href="/curricula#cbse" className={styles.link}>CBSE Curriculum</Link></li>
            <li><Link href="/curricula#icse" className={styles.link}>ICSE & ISC Curriculum</Link></li>
            <li><Link href="/curricula#igcse" className={styles.link}>IGCSE / Cambridge</Link></li>
            <li><Link href="/curricula#usa" className={styles.link}>USA Curriculum Support</Link></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.heading}>For Educators</h4>
          <p className={styles.mentorText}>
            Are you an experienced mentor looking to join our verified educator network?
          </p>
          <Link href="/apply-mentor" className={styles.mentorCta}>
            Apply as a Mentor &rarr;
          </Link>

          <h4 className={`${styles.heading} ${styles.socialHeader}`}>Quick Links</h4>
          <ul className={styles.links}>
            <li><Link href="/about" className={styles.link}>About Our Philosophy</Link></li>
            <li><Link href="/how-it-works" className={styles.link}>Our 5-Step Process</Link></li>
            <li><Link href="/results" className={styles.link}>Results & Progress Tracking</Link></li>
            <li><Link href="/faqs" className={styles.link}>Frequently Asked Questions</Link></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContainer}`}>
          <p className={styles.copy}>
            &copy; {currentYear} The MathMatriX Academy. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <span className={styles.placeholderLabel}>Verification Trust Seal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
