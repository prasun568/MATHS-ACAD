import React from 'react';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';
import styles from './how-it-works.module.css';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Step 1: Tell Us About Your Child\'s Needs',
      badge: 'ENQUIRY STAGE',
      desc: 'Complete our short online booking form or contact us directly on WhatsApp. Share their current school grade, curriculum board, and target subjects where they need conceptual support.',
      actionText: 'Parents share their child\'s school performance card or specific challenge areas.',
    },
    {
      num: '02',
      title: 'Step 2: Diagnostic Academic Assessment',
      badge: 'EVALUATION STAGE',
      desc: 'We organize a complimentary diagnostic session. This is not a competitive entrance test. It is a concept-mapping review designed by senior academics to evaluate strengths, learning speed, and syllabus gaps.',
      actionText: 'Our academic director maps out concept areas requiring priority support.',
    },
    {
      num: '03',
      title: 'Step 3: Meet Your Subject Mentor (Free Demo)',
      badge: 'TRIAL CLASS',
      desc: 'We match your child with a verified educator who specializes in their curriculum. You attend a live 1-on-1 demo class to check compatibility, tutor interaction, and communication style.',
      actionText: 'Zero-obligation trial to confirm compatibility before purchasing classes.',
    },
    {
      num: '04',
      title: 'Step 4: Personalized Learning Plan',
      badge: 'CUSTOM TIMELINE',
      desc: 'If satisfied with the demo, we formulate a custom lesson plan. We specify key learning targets, select appropriate practice worksheets, and set class frequencies (e.g., 2 or 3 classes per week) at preferred timing slots.',
      actionText: 'Flexible scheduling matching student routines and international time zones.',
    },
    {
      num: '05',
      title: 'Step 5: Learn, Review and Track Progress',
      badge: 'ONGOING SUPPORT',
      desc: 'Interactive online classes begin using virtual whiteboards. Parents receive monthly progress reports, updates on assignments, mock test reviews, and feedback summaries directly from the subject mentor.',
      actionText: 'Transparent progress updates keep parents fully informed about academic growth.',
    },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Our Learning Process</h1>
          <p className={styles.subtitle}>
            A structured, child-centric approach designed to build strong foundations, concept clarity, and better grades.
          </p>
        </div>
      </header>

      {steps.map((step, idx) => (
        <section
          key={step.num}
          className={idx % 2 === 0 ? 'section' : 'section-alt'}
        >
          <div className={`container ${styles.grid}`}>
            <div className={styles.numCol}>
              <div className={styles.circleNum}>{step.num}</div>
            </div>
            <div className={styles.contentCol}>
              <span className={`badge badge-primary ${styles.badge}`}>{step.badge}</span>
              <h2 className={styles.stepTitle}>{step.title}</h2>
              <p className={styles.desc}>{step.desc}</p>
              <div className={styles.actionBox}>
                <p>
                  <strong>Outcome Focus:</strong> {step.actionText}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Pricing Planner */}
      <section className="section-alt">
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Ready to Take the First Step?</h2>
            <p className={styles.ctaDesc}>
              Join over 1000+ parents who trust our verified tutors for school curriculum support. Request your child's free diagnostic evaluation today.
            </p>
            <div className={styles.ctaButtons}>
              <Button variant="secondary" size="lg" href="/#assessment">
                BOOK FREE ASSESSMENT
              </Button>
              <Button
                variant="whatsapp"
                size="lg"
                href="https://wa.me/918319531258?text=Hello%20MathMatriX%20Academy%2C%20I%20would%20like%20to%20know%20how%20to%20get%20started."
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
