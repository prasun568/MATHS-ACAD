import React from 'react';
import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';
import styles from './about.module.css';

export default function About() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>About Our Academy</h1>
          <p className={styles.subtitle}>
            Empowering students with conceptual clarity, exam preparation, and long-term learning confidence.
          </p>
        </div>
      </header>

      {/* Main Philosophy */}
      <section className="section">
        <div className="container">
          <div className="grid-2">
            <div>
              <SectionHeading
                title="Why The MathMatriX Academy Was Started"
                badge="OUR ORIGIN"
              />
              <p className={styles.text}>
                The MathMatriX Academy is a Government of India MSME Registered educational enterprise (Udyam Reg. No: UDYAM-MP-48-0022294) founded to bridge the gap between rote memorization and true conceptual understanding. In typical large classroom environments, individual student learning paces are often overlooked, leading to learning gaps that accumulate over school terms.
              </p>
              <p className={styles.text}>
                We believe that every student has the potential to excel in STEM fields and languages if they are supported by the right mentor and guided at a speed that matches their learning profile.
              </p>
            </div>
            <div className={styles.philosophyBlock}>
              <h3 className={styles.blockTitle}>Our Core Philosophy</h3>
              <ul className={styles.philosophyList}>
                <li>
                  <strong>Concept Clarity First:</strong> We focus on the 'Why' behind every equation, rule, or concept, rather than just the 'How' to pass exams.
                </li>
                <li>
                  <strong>Personalized Attention:</strong> We align our lessons and practice sets to target the specific gaps identified in diagnostic assessments.
                </li>
                <li>
                  <strong>Verified Mentors:</strong> We only onboard educators who demonstrate not just subject mastery, but the empathy and communication needed to connect with young learners.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="section-alt">
        <div className="container">
          <SectionHeading
            title="Meet Our Founder"
            subtitle="Led by academic purpose and a dedication to high-quality online instruction."
            centered
          />
          
          <div className={styles.founderGrid}>
            <div className={styles.founderVisual}>
              <div className={styles.founderPhotoWrapper}>
                <Image
                  src="/images/vidur.jpg"
                  alt="Vidur Namdev - Founder of The MathMatriX Academy"
                  fill
                  className={styles.founderPhoto}
                  sizes="(max-width: 768px) 280px, 320px"
                  priority
                />
              </div>
            </div>
            <div className={styles.founderContent}>
              <span className="badge badge-primary">Founder & Director</span>
              <h3 className={styles.founderName}>Vidur Namdev</h3>
              
              <div className={styles.credentialCard}>
                <p className={styles.credentialHeading}>Professional Profile</p>
                <ul className={styles.credentialList}>
                  <li>
                    <strong>Background:</strong> Experienced educator and Master Trainer with 8+ years of experience in Mathematics, Physics, Quantitative Aptitude, and academic mentoring.
                  </li>
                  <li>
                    <strong>Teaching Experience:</strong> Expertise in Mathematics, Physics, Aptitude & Reasoning, with experience mentoring students for school and competitive examinations including GATE, AMCAT & CoCubes.
                  </li>
                  <li>
                    <strong>Vision:</strong> Helping students build conceptual clarity, confidence, and measurable academic growth through personalized learning.
                  </li>
                </ul>

                <div className={styles.recognitionSection}>
                  <h4 className={styles.recognitionTitle}>Credentials & Recognition</h4>
                  <ul className={styles.recognitionList}>
                    <li>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      8+ Years Teaching & Training
                    </li>
                    <li>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Master Trainer Mathematics & Aptitude
                    </li>
                    <li>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Certified Facilitator Wadhwani Foundation
                    </li>

                    <li>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Founder, The MathMatriX Academy
                    </li>
                    <li>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Govt. of India MSME Registered (UDYAM-MP-48-0022294)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentor Standards */}
      <section className="section">
        <div className="container">
          <SectionHeading
            title="Our Mentor Standards"
            subtitle="How we select the educators who guide your child."
            centered
          />
          <div className="grid-3">
            <div className={styles.standardCard}>
              <div className={styles.standardNum}>01</div>
              <h4 className={styles.standardTitle}>Academic Verification</h4>
              <p className={styles.standardDesc}>
                Every mentor's degrees, past certifications, and teaching credentials are thoroughly reviewed and verified.
              </p>
            </div>
            <div className={styles.standardCard}>
              <div className={styles.standardNum}>02</div>
              <h4 className={styles.standardTitle}>Pedagogical Testing</h4>
              <p className={styles.standardDesc}>
                Tutors conduct mock classes reviewed by senior academics to evaluate communication clarity, patience, and engagement.
              </p>
            </div>
            <div className={styles.standardCard}>
              <div className={styles.standardNum}>03</div>
              <h4 className={styles.standardTitle}>Continuous Training</h4>
              <p className={styles.standardDesc}>
                Mentors are trained in online interactive whiteboard tools, digital pedagogy, and curriculum patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regions served */}
      <section className="section-alt">
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Serving Students Globally</h2>
            <p className={styles.ctaDesc}>
              We support students across multiple time zones (including India, UAE, UK, Singapore, and USA). Our schedules are highly flexible to accommodate different international schooling calendars.
            </p>
            <Button variant="secondary" size="lg" href="/#assessment">
              BOOK A FREE DIAGNOSTIC ASSESSMENT
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
