import React from 'react';
import ContactForm from '@/components/ContactForm';
import Button from '@/components/Button';
import styles from './contact.module.css';

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.subtitle}>
            Have questions about our online classes or pricing schedules? Speak directly with our counseling team.
          </p>
        </div>
      </header>

      <section className="section">
        <div className={`container ${styles.grid}`}>
          {/* Info Panel */}
          <div className={styles.infoCol}>
            <div className={styles.infoBlock}>
              <div className={`${styles.iconBox} ${styles.whatsappIconBox}`} aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <div className={styles.infoText}>
                <h3>WhatsApp Direct Line</h3>
                <p>Chat instantly with our academic counselors for fast enquiries.</p>
                <a
                  href="https://wa.me/918319531258?text=Hello%20MathMatriX%20Academy%2C%20I%20would%20like%20to%20know%20more%20about%20online%20classes."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactValue}
                >
                  +91 83195 31258
                </a>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <div className={`${styles.iconBox} ${styles.emailIconBox}`} aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className={styles.infoText}>
                <h3>Email Address</h3>
                <p>Send us your syllabus outlines or specific support queries.</p>
                <a href="mailto:themathmatrixacademy@gmail.com" className={styles.contactValue}>
                  themathmatrixacademy@gmail.com
                </a>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <div className={`${styles.iconBox} ${styles.instaIconBox}`} aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <div className={styles.infoText}>
                <h3>Instagram</h3>
                <p>Follow our official page for academic tips, puzzles & announcements.</p>
                <a
                  href="https://instagram.com/the.mathmatrixacademy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactValue}
                >
                  @the.mathmatrixacademy
                </a>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <div className={`${styles.iconBox} ${styles.govIconBox}`} aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V10" />
                  <path d="M19 21V10" />
                  <path d="M9 21V10" />
                  <path d="M15 21V10" />
                  <path d="M2 10h20" />
                  <path d="m12 3 10 7H2z" />
                </svg>
              </div>
              <div className={styles.infoText}>
                <h3>Government Registration</h3>
                <p>Govt. of India MSME Registered Educational Enterprise</p>
                <span className={styles.contactValue} style={{ color: 'var(--primary)', fontWeight: 700 }}>
                  UDYAM-MP-48-0022294
                </span>
              </div>
            </div>

            <div className={styles.hoursBlock}>
              <h4>Counseling Hours:</h4>
              <p>Monday to Sunday: 9:00 AM — 9:00 PM (IST)</p>
              <p>Supporting multiple international time zones.</p>
            </div>

            <div className={styles.quickCta}>
              <Button
                variant="whatsapp"
                size="lg"
                href="https://wa.me/918319531258?text=Hello%20MathMatriX%20Academy%2C%20I%20would%20like%20to%20schedule%20a%20call."
                external
              >
                START WHATSAPP CHAT
              </Button>
            </div>
          </div>

          {/* Form Panel */}
          <div className={styles.formCol}>
            <h3 className={styles.formSectionTitle}>Send an Enquiry Message</h3>
            <p className={styles.formSectionDesc}>
              Fill out the form below, and we will get back to you within 24 hours.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
