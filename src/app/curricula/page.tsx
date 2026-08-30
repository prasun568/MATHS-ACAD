import React from 'react';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';
import styles from './curricula.module.css';

export default function Curricula() {
  const boards = [
    {
      id: 'cbse',
      name: 'CBSE Curriculum (Central Board of Secondary Education)',
      focus: 'Foundations and National Testing Standards',
      desc: 'Our CBSE coaching aligns with the latest NCERT syllabus. Tutors focus on step-by-step solutions for mathematics derivations, physics laws, chemical reactions, and clear explanations for English literature.',
      prep: 'Complete syllabus coverage, NCERT textbook problems, board marking pattern simulations, and previous 10 years\' board paper resolutions.',
    },
    {
      id: 'icse',
      name: 'ICSE & ISC Curriculum (Council for the Indian School Certificate Examinations)',
      focus: 'Application-Based Learning and Depth of Syllabus',
      desc: 'The CISCE syllabus requires deep conceptual understanding and precise expression, particularly in science and English grammar. Our mentors help students master the extensive curriculum with structured notes.',
      prep: 'Practice with previous board papers, detailed analysis of English literature prose & poetry, and rigorous solving of Selina/Concise Math & Science publications.',
    },
    {
      id: 'igcse',
      name: 'IGCSE & Cambridge International',
      focus: 'Global Analytical Thinking and Practical Questions',
      desc: 'IGCSE evaluates logical deduction, practical interpretations, and data analysis. Tutors focus on building independent thinking, teaching writing structures suited for Cambridge examiners.',
      prep: 'IGCSE past paper practice, master class worksheets, grading criteria alignments, and structural guidance for multi-part physics/chemistry calculations.',
    },
    {
      id: 'usa',
      name: 'USA Curriculum Support',
      focus: 'Grade-level Common Core Alignment',
      desc: 'For students studying in international schools or based in the US, we provide tutoring mapped directly to US Common Core standards, AP courses, or private school academic standards.',
      prep: 'Step-by-step support for high-school Algebra 1 & 2, Geometry, Pre-Calculus, AP Physics, AP Chemistry, and school assignments.',
    },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Curricula We Support</h1>
          <p className={styles.subtitle}>
            Specialized board-aligned tutoring matching different national and international educational standards.
          </p>
        </div>
      </header>

      {boards.map((board, idx) => (
        <section
          key={board.id}
          id={board.id}
          className={idx % 2 === 0 ? 'section' : 'section-alt'}
        >
          <div className="container">
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.badge}>Syllabus Support</span>
                <h2 className={styles.boardName}>{board.name}</h2>
              </div>
              <div className="grid-2">
                <div>
                  <h3 className={styles.sectionTitle}>Conceptual Focus:</h3>
                  <p className={styles.text}>{board.desc}</p>
                </div>
                <div>
                  <h3 className={styles.sectionTitle}>Preparation Approach:</h3>
                  <p className={styles.text}>{board.prep}</p>
                  <p className={styles.subtext}>
                    <strong>Target Areas:</strong> {board.focus}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Conversion CTA */}
      <section className="section-alt">
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Not Sure Which Plan Matches Your Child?</h2>
            <p className={styles.ctaDesc}>
              Let us evaluate your child's current academic standard through a diagnostic assessment call. We will match them with an expert tutor trained in their specific board.
            </p>
            <div className={styles.ctaButtons}>
              <Button variant="secondary" size="lg" href="/#assessment">
                BOOK FREE ASSESSMENT
              </Button>
              <Button
                variant="whatsapp"
                size="lg"
                href="https://wa.me/918319531258?text=Hello%20MathMatriX%20Academy%2C%20I%20have%20questions%20about%20board%20curricula."
                external
              >
                ASK A COUNSELLOR ON WHATSAPP
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
