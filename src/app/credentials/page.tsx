import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import MSMESection from '@/components/MSMESection';
import styles from './credentials.module.css';

export const metadata: Metadata = {
  title: 'Government MSME Registration Details | The MathMatriX Academy',
  description:
    'Official Government of India MSME Udyam Registration (UDYAM-MP-48-0022294) information for The MathMatriX Academy.',
  keywords: [
    'MathMatriX Academy MSME',
    'UDYAM-MP-48-0022294',
    'Government Registered Online Tutoring',
    'Academic Tutoring Services',
  ],
};

export default function CredentialsPage() {
  const trustHighlights = [
    {
      title: 'Govt. of India MSME Registered',
      badge: 'UDYAM CERTIFIED',
      desc: 'Formally registered under the Ministry of Micro, Small & Medium Enterprises, Government of India.',
      regNumber: 'UDYAM-MP-48-0022294',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      title: 'Academic Tutoring Services',
      badge: 'OFFICIAL ACTIVITY',
      desc: 'Formally recognized for providing specialized online academic tutoring and mentoring.',
      regNumber: 'Services Classification',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
      ),
    },
    {
      title: 'Micro Enterprise Status',
      badge: 'STATUTORY STATUS',
      desc: 'Registered as a professional service enterprise with transparent operational standards.',
      regNumber: 'Micro (Services)',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      title: 'Verified Mentor Governance',
      badge: 'ACADEMIC RIGOR',
      desc: 'Every mentor undergoes rigorous multi-point screening, subject audits, and student review benchmarks.',
      regNumber: 'Master Trainer Led',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="7" r="4" />
          <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        </svg>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerBadge}>
            <span className={styles.flagIcon}>🇮🇳</span>
            <span>Government Registered &amp; Compliant</span>
          </div>
          <h1 className={styles.title}>MSME Registration Details</h1>
          <p className={styles.subtitle}>
            The MathMatriX Academy is a Government of India MSME Registered educational enterprise. We believe transparency is the foundation of trust for every parent.
          </p>
        </div>
      </header>

      {/* Main MSME Registered Section */}
      <MSMESection showHeading={false} />

      {/* Trust Highlights Grid */}
      <section className="section-alt">
        <div className="container">
          <SectionHeading
            badge="REGULATORY RECOGNITION"
            title="Professional &amp; Statutory Standards"
            subtitle="Providing parents and students with the assurance of a compliant, professionally governed learning institution."
            centered
          />

          <div className="grid-4">
            {trustHighlights.map((item, idx) => (
              <div key={idx} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.cardIcon}>{item.icon}</div>
                  <span className={styles.badge}>{item.badge}</span>
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.regLabel}>{item.regNumber}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Verification Guide */}
      <section className="section">
        <div className="container">
          <div className={styles.verificationGuideGrid}>
            <div className={styles.guideCard}>
              <div className={styles.guideHeader}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.guideIcon}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <h3>How Parents Can Verify</h3>
              </div>
              <p className={styles.guideText}>
                You can independently verify our enterprise credentials on the Government of India MSME Portal:
              </p>
              <ol className={styles.guideSteps}>
                <li>Visit the official portal at <strong>udyamregistration.gov.in</strong></li>
                <li>Navigate to &quot;Verify Udyam Registration&quot; in the portal menu.</li>
                <li>Enter Udyam Number: <strong>UDYAM-MP-48-0022294</strong></li>
                <li>The portal will confirm active registration under &quot;THE MATHMATRIX ACADEMY&quot;.</li>
              </ol>
              <a
                href="https://udyamregistration.gov.in/Udyam_Verify.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.portalBtn}
              >
                Verify on Official Portal &rarr;
              </a>
            </div>

            <div className={styles.guideCard}>
              <div className={styles.guideHeader}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.guideIconGold}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <h3>Parent Transparency Guarantee</h3>
              </div>
              <p className={styles.guideText}>
                Our commitment to student success is grounded in ethical, professional education standards:
              </p>
              <ul className={styles.guideList}>
                <li><strong>No Forced Multi-Year Locks:</strong> Flexible monthly or term learning milestones.</li>
                <li><strong>Free Initial Diagnostics:</strong> Comprehensive 40-point assessment before enrollment.</li>
                <li><strong>Direct Access to Leadership:</strong> Speak directly with senior counselors and academic leadership.</li>
                <li><strong>Regular Progress Tracking:</strong> Weekly feedback and monthly parent-teacher reviews.</li>
              </ul>
              <div className={styles.trustNote}>
                <em>Statutory note:</em> The MathMatriX Academy is registered with the Ministry of MSME for academic tutoring services. We deliver concept-driven coaching tailored to school syllabi (CBSE, ICSE, IGCSE &amp; USA Curricula).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Experience Concept-First Learning for Your Child</h2>
            <p className={styles.ctaDesc}>
              Book a complimentary 1-on-1 Academic Assessment session with our senior education counselor. Identify concept gaps and discover a tailored roadmap for your child&apos;s growth.
            </p>
            <div className={styles.ctaActions}>
              <Button variant="secondary" size="lg" href="/#assessment">
                BOOK FREE ASSESSMENT
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="https://wa.me/918319531258?text=Hello%20MathMatriX%20Academy%2C%20I%20would%20like%20to%20know%20more%20about%20your%20registered%20programs."
                external
                className={styles.ctaOutline}
              >
                WHATSAPP OUR TEAM
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
