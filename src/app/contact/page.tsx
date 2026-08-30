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
              <span className={styles.icon}>💬</span>
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
              <span className={styles.icon}>✉️</span>
              <div className={styles.infoText}>
                <h3>Email Address</h3>
                <p>Send us your syllabus outlines or specific support queries.</p>
                <a href="mailto:themathmatrixacademy@gmail.com" className={styles.contactValue}>
                  themathmatrixacademy@gmail.com
                </a>
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
