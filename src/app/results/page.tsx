import React from 'react';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';
import styles from './results.module.css';

export default function Results() {
  const steps = [
    {
      title: 'Weekly Task & Assignment Logs',
      desc: 'Tutors assign structured worksheets after every class. Parents can check completed tasks, homework submission status, and tutor feedback remarks.',
    },
    {
      title: 'Monthly Progress Scorecards',
      desc: 'We conduct short revision assessments at the end of each module. We share scoring breakdowns highlighting improved topics and areas requiring extra practice.',
    },
    {
      title: 'Active WhatsApp Support Group',
      desc: 'A dedicated group chat is set up for each student.Tutors send homework sheets, coordinate schedules, and share class highlights directly with parents.',
    },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Results & Progress Tracking</h1>
          <p className={styles.subtitle}>
            How we keep parents informed, align on learning targets, and track conceptual development.
          </p>
        </div>
      </header>

      {/* Progress reports details */}
      <section className="section">
        <div className="container">
          <div className="grid-2">
            <div>
              <SectionHeading
                title="Transparent Performance Mapping"
                badge="PARENT COLLABORATION"
              />
              <p className={styles.text}>
                Online learning is only effective when parents stay informed. At The MathMatriX Academy, we ensure you have complete transparency about what your child is studying, how they perform in practice drills, and where they face difficulties.
              </p>
              <p className={styles.text}>
                Our system focuses on positive reinforcement. We build custom dashboards and WhatsApp communication lines to coordinate between the home, the student, and the subject mentor.
              </p>
            </div>
            <div className={styles.reportBox}>
              <h3 className={styles.boxTitle}>Included in Every Plan:</h3>
              <ul className={styles.boxList}>
                {steps.map((step, index) => (
                  <li key={index} className={styles.boxItem}>
                    <strong>{step.title}:</strong> {step.desc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Placeholder for Testimonials */}
      <section className="section-alt">
        <div className="container">
          <SectionHeading
            title="Verified Academic Improvements"
            subtitle="Genuine success indicators from parents who trust our educator network."
            centered
          />
          <div className={styles.placeholderCard}>
            <p className={styles.placeholderBadge}>Advertising Standards Trust Verification</p>
            <h3 className={styles.placeholderTitle}>Reviews Under Verification Status</h3>
            <p className={styles.placeholderText}>
              In compliance with local advertising regulations and consumer protection rules, we do not write simulated parent feedback or fictional board score percentages. We are collecting official student performance data and parental consent forms.
            </p>
            <p className={styles.placeholderInstruction}>
              *Real parent logs and exam improvement percentages will be updated here once verified.*
            </p>
          </div>
        </div>
      </section>

      {/* Conversion CTA */}
      <section className="section">
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Understand Your Child's Learning Level</h2>
            <p className={styles.ctaDesc}>
              Before structuring a study batch, let us evaluate their current academic standard with a free assessment session.
            </p>
            <Button variant="secondary" size="lg" href="/#assessment">
              BOOK FREE ASSESSMENT NOW
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
