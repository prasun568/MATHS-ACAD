import React from 'react';
import AssessmentForm from '@/components/AssessmentForm';
import styles from './landing.module.css';

export default function LandingPage() {
  const trustBenefits = [
    {
      title: 'Verified Tutors Only',
      desc: 'Selected for communication clarity, subject qualifications, and teaching experience.',
    },
    {
      title: 'Board-Aligned Syllabus',
      desc: 'Lessons structured around CBSE, ICSE, IGCSE, or US Common Core frameworks.',
    },
    {
      title: 'Flexible scheduling',
      desc: 'Timings adjusted to match school timetables and international time zones.',
    },
  ];

  return (
    <div className={styles.page}>
      {/* Ad hook top bar */}
      <div className={styles.adHeader}>
        <div className="container">
          <p className={styles.adHook}>
            🎯 <strong>Parents:</strong> Is your child struggling with Maths, Science or English? Let's identify the gaps.
          </p>
        </div>
      </div>

      <section className={styles.heroSection}>
        <div className={`container ${styles.grid}`}>
          {/* Pitch Left */}
          <div className={styles.pitchCol}>
            <span className="badge badge-secondary">FREE INVITATION</span>
            <h1 className={styles.pitchTitle}>
              Let's understand where your child needs help.
            </h1>
            <p className={styles.pitchDesc}>
              A 1-on-1 diagnostic review with a verified curriculum expert to evaluate concept clarity, identify learning gaps, and structure a custom learning strategy.
            </p>

            <div className={styles.trustBlock}>
              <h3 className={styles.trustHeading}>Why parents choose The MathMatriX Academy:</h3>
              <ul className={styles.trustList}>
                {trustBenefits.map((benefit, idx) => (
                  <li key={idx} className={styles.trustItem}>
                    <strong>{benefit.title}:</strong> {benefit.desc}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.socialProof}>
              <p>⭐⭐⭐⭐⭐ Trusted by parents for CBSE, ICSE, IGCSE, and USA Curriculum support.</p>
            </div>
          </div>

          {/* Form Right */}
          <div className={styles.formCol} id="assessment-form-block">
            <AssessmentForm isLandingPage={true} />
          </div>
        </div>
      </section>

      {/* Simple trust logos bar */}
      <div className={styles.logosBar}>
        <div className="container text-center">
          <p className={styles.logosTitle}>CURRICULUM BOARDS SUPPORTED:</p>
          <div className={styles.logoGrid}>
            <span>CBSE</span>
            <span>ICSE / ISC</span>
            <span>IGCSE / Cambridge</span>
            <span>USA Common Core</span>
          </div>
        </div>
      </div>
    </div>
  );
}
