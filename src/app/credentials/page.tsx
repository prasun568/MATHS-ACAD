import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import CertificateViewer from '@/components/CertificateViewer';
import styles from './credentials.module.css';

export const metadata: Metadata = {
  title: 'Official Credentials & Government Registration | The MathMatriX Academy',
  description:
    'Verify official Government of India MSME Registration (UDYAM-MP-48-0022294) and statutory compliance details for The MathMatriX Academy.',
  keywords: [
    'MathMatriX Academy Credentials',
    'MSME Registered Academy',
    'UDYAM-MP-48-0022294',
    'Government Registered Online Tutoring',
    'Verified Maths Tutors',
  ],
};

export default function CredentialsPage() {
  const compliancePoints = [
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
      title: 'State Compliance & Regulation',
      badge: 'STATE COMPLIANT',
      desc: 'Compliant with Madhya Pradesh Shops & Establishments Act standards for private professional service units.',
      regNumber: 'Tikamgarh Jurisdiction',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="9" y1="16" x2="15" y2="16" />
        </svg>
      ),
    },
    {
      title: 'NIC 85491 Education Services',
      badge: 'OFFICIAL ACTIVITY',
      desc: 'Officially classified under National Industry Classification Code 85491: "Academic tutoring services".',
      regNumber: 'Services / Education',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
      ),
    },
    {
      title: 'Verified Mentor Network',
      badge: 'ACADEMIC RIGOR',
      desc: 'Strict educator vetting: subject competence tests, demo audits, and student communication reviews.',
      regNumber: 'Master Trainer Led',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="7" r="4" />
          <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        </svg>
      ),
    },
  ];

  const officialParticulars = [
    { label: 'Enterprise Legal Name', value: 'THE MATHMATRIX ACADEMY' },
    { label: 'Udyam Registration Number', value: 'UDYAM-MP-48-0022294', highlight: true },
    { label: 'Enterprise Classification', value: 'Micro Enterprise' },
    { label: 'Major Activity', value: 'SERVICES' },
    { label: 'National Industry Classification (NIC)', value: '85491 — Academic tutoring services' },
    { label: 'Date of Incorporation', value: '01/01/2024' },
    { label: 'Date of Udyam Registration', value: '01/09/2026' },
    { label: 'Founder & Director', value: 'Vidur Namdev (Master Trainer & Senior Academician)' },
    { label: 'District Industries Centre', value: 'Tikamgarh, Madhya Pradesh' },
    { label: 'MSME Development & Facilitation Office', value: 'Indore, Madhya Pradesh' },
    {
      label: 'Official Registered Address',
      value: 'Ward No 15, 42/1, Near Balaji Mandir, Rest House Road, Jatara, Tikamgarh, Madhya Pradesh — 472118',
    },
    { label: 'Official Contact Number', value: '+91 83195 31258' },
    { label: 'Official Communication Email', value: 'themathmatrixacademy@gmail.com' },
  ];

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerBadge}>
            <span className={styles.flagIcon}>🇮🇳</span>
            <span>Government Registered & Compliant</span>
          </div>
          <h1 className={styles.title}>Trust & Credentials</h1>
          <p className={styles.subtitle}>
            The MathMatriX Academy is a Government of India MSME Registered educational enterprise. We believe transparency is the foundation of trust for every parent.
          </p>
        </div>
      </header>

      {/* Trust Highlights Grid */}
      <section className="section">
        <div className="container">
          <SectionHeading
            badge="VERIFIED CREDENTIALS"
            title="Recognized Educational Framework"
            subtitle="Providing parents and students with the security of a compliant, professionally governed learning institution."
            centered
          />

          <div className="grid-4">
            {compliancePoints.map((item, idx) => (
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

      {/* Interactive Certificate Viewer Section */}
      <section className="section-alt">
        <div className="container">
          <SectionHeading
            badge="OFFICIAL DOCUMENTATION"
            title="Government of India Udyam Registration Certificate"
            subtitle="Review the complete, official registration document issued by the Ministry of Micro, Small and Medium Enterprises."
            centered
          />

          <CertificateViewer />
        </div>
      </section>

      {/* Statutory Particulars Table */}
      <section className="section">
        <div className="container">
          <SectionHeading
            badge="STATUTORY PARTICULARS"
            title="Official Registry Information"
            subtitle="Verified details recorded with the Ministry of MSME and regulatory authorities."
            centered
          />

          <div className={styles.tableWrapper}>
            <table className={styles.particularsTable}>
              <tbody>
                {officialParticulars.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? styles.evenRow : styles.oddRow}>
                    <td className={styles.labelCol}>{row.label}</td>
                    <td className={`${styles.valueCol} ${row.highlight ? styles.highlightValue : ''}`}>
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Verification Instructions & Disclaimers */}
      <section className="section-alt">
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
                <li>The portal will display our active verified status under &quot;THE MATHMATRIX ACADEMY&quot;.</li>
              </ol>
              <a
                href="https://udyamregistration.gov.in/Udyam_Verify.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.portalBtn}
              >
                Go to Govt. Verification Portal &rarr;
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
                <li><strong>Direct Access to Leadership:</strong> Speak directly with senior counselors and founder Vidur Namdev.</li>
                <li><strong>Regular Progress Tracking:</strong> Weekly feedback and monthly parent-teacher reviews.</li>
              </ul>
              <div className={styles.trustNote}>
                <em>Statutory note:</em> The MathMatriX Academy is registered with the Ministry of MSME for academic tutoring services. We deliver independent, concept-driven coaching tailored to school syllabi (CBSE, ICSE, IGCSE & USA Curricula).
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
