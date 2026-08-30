import React from 'react';
import MentorForm from '@/components/MentorForm';
import styles from './apply-mentor.module.css';

export default function ApplyMentor() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Join Our Mentor Panel</h1>
          <p className={styles.subtitle}>
            Are you a passionate educator who loves building conceptual clarity? Apply to join our network of verified academic tutors.
          </p>
        </div>
      </header>

      <section className="section">
        <div className={`container ${styles.grid}`}>
          <div className={styles.infoCol}>
            <div className={styles.requirementBox}>
              <h3 className={styles.boxTitle}>Our Teaching Standards:</h3>
              <p className={styles.boxDesc}>
                We maintain a strict quality bar to remain a trusted academic partner for parents. We evaluate mentors on three core criteria:
              </p>
              <ul className={styles.list}>
                <li>
                  <strong>Subject Knowledge:</strong> Deep familiarity with CBSE, ICSE, IGCSE, or USA math/science syllabi.
                </li>
                <li>
                  <strong>Communication Skills:</strong> Ability to break down complex formulas into simple, visual, child-friendly steps.
                </li>
                <li>
                  <strong>Interactive Pedagogy:</strong> Experience in conducting live online lessons using digital whiteboards, drawing pads, and engaging slides.
                </li>
              </ul>
            </div>

            <div className={styles.processBox}>
              <h3 className={styles.boxTitle}>Onboarding Process:</h3>
              <ol className={styles.orderedList}>
                <li>
                  <strong>Application Review:</strong> We review your past teaching history and credentials.
                </li>
                <li>
                  <strong>Diagnostic Screening:</strong> A short subject-matter interview with our senior academic panel.
                </li>
                <li>
                  <strong>Demo Simulation:</strong> You conduct a 20-minute mock demo lesson with simulated student questions.
                </li>
                <li>
                  <strong>Onboarding & Training:</strong> Training in platform tools, student psychology guidelines, and class feedback logs.
                </li>
              </ol>
            </div>
          </div>

          <div className={styles.formCol}>
            <MentorForm />
          </div>
        </div>
      </section>
    </div>
  );
}
