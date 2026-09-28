import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';
import MentorGrid from '@/components/MentorGrid';
import { initialMentors } from '@/data/mentors';
import styles from './mentors.module.css';

export const metadata: Metadata = {
  title: 'Expert Mentors & Faculty | The MathMatriX Academy',
  description:
    'Meet the verified subject-matter experts, educators, and academic trainers at The MathMatriX Academy. Personalized concept-based learning for Grades 3–12.',
  keywords: [
    'MathMatriX Academy Mentors',
    'Online Maths Tutors',
    'Physics Tutors India',
    'Chemistry Mentors CBSE ICSE',
    'Verified Academic Mentors',
    'Vidur Namdev Educator',
  ],
};

export default function MentorsPage() {
  const vettingSteps = [
    {
      num: '01',
      title: 'Subject Expertise Audit',
      desc: 'Rigorous assessment of foundational knowledge, problem-solving speed, and curriculum familiarity.',
    },
    {
      num: '02',
      title: 'Pedagogy & Empathy Demo',
      desc: 'Live evaluated demonstration on virtual whiteboards focusing on student engagement and patience.',
    },
    {
      num: '03',
      title: 'Verified Qualifications',
      desc: 'Validation of degrees, competitive achievements, and prior teaching track records.',
    },
    {
      num: '04',
      title: 'Continuous Review',
      desc: 'Regular parent feedback evaluations and student outcome reviews overseen by academic leadership.',
    },
  ];

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerBadge}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
            </svg>
            <span>VERIFIED ACADEMIC LEADERSHIP &amp; FACULTY</span>
          </div>
          <h1 className={styles.title}>Meet Our Expert Mentors</h1>
          <p className={styles.subtitle}>
            Every educator at The MathMatriX Academy is chosen for their subject mastery, communication clarity, and genuine passion for helping young learners build unshakeable confidence.
          </p>
        </div>
      </header>

      {/* Vetting Process Section */}
      <section className="section-alt">
        <div className="container">
          <SectionHeading
            badge="OUR QUALITY ASSURANCE"
            title="How We Select Your Child's Mentor"
            subtitle="Only the top 5% of applying educators make it through our rigorous screening process."
            centered
          />
          <div className="grid-4">
            {vettingSteps.map((step, idx) => (
              <div key={idx} className={styles.stepCard}>
                <div className={styles.stepNum}>{step.num}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Mentors Grid */}
      <section className="section">
        <div className="container">
          <SectionHeading
            badge="OUR EDUCATOR NETWORK"
            title="Explore Mentor Profiles"
            subtitle="Filter by subject or curriculum to discover verified mentors guiding students across India and internationally."
            centered
          />

          <MentorGrid mentors={initialMentors} />
        </div>
      </section>

      {/* Apply as a Mentor Banner */}
      <section className={styles.applyBanner}>
        <div className="container">
          <div className={styles.bannerGrid}>
            <div className={styles.bannerText}>
              <span className={styles.bannerBadge}>EDUCATORS WANTED</span>
              <h2 className={styles.bannerTitle}>Are You an Exceptional Academic Mentor?</h2>
              <p className={styles.bannerDesc}>
                We are constantly expanding our verified educator network in Mathematics, Physics, Chemistry, Biology, Economics, and Computer Science. Enjoy flexible schedules, automated Zoom classes, and competitive compensation.
              </p>
            </div>
            <div className={styles.bannerCta}>
              <Button variant="secondary" size="lg" href="/apply-mentor">
                APPLY TO TEACH WITH US &rarr;
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Booking Bottom CTA */}
      <section className={styles.ctaBottom}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Find the Perfect Mentor for Your Child</h2>
            <p className={styles.ctaSubtitle}>
              Book a complimentary 1-on-1 Academic Assessment. We identify your child&apos;s concept gaps and pair them with the ideal verified mentor for a free demo session.
            </p>
            <div className={styles.ctaButtons}>
              <Button variant="primary" size="lg" href="/#assessment">
                BOOK FREE ACADEMIC ASSESSMENT
              </Button>
              <Button
                variant="whatsapp"
                size="lg"
                href="https://wa.me/918319531258?text=Hello%20MathMatriX%20Academy%2C%20I%20would%20like%20to%20know%20more%20about%20your%20mentors%20for%20my%20child."
                external
              >
                WHATSAPP COUNSELLOR
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
