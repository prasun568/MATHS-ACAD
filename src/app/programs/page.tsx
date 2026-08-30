import React from 'react';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';
import styles from './programs.module.css';

export default function Programs() {
  const gradesData = [
    {
      id: 'grades-3-5',
      title: 'Grades 3–5 (Primary School Support)',
      badge: 'BUILDING FOUNDATIONS',
      tagline: 'Fostering numerical comfort and basic scientific curiosity.',
      subjects: ['Basic Mathematics (Operations, Shapes, Fractions)', 'General Science (Nature, Plants, Human Body)', 'English (Spelling, Grammar, Simple Reading Comprehension)'],
      description: 'At the primary stage, students transition from simple calculations to logical arithmetic. We help them grasp key concepts through interactive visuals and relatable everyday examples, steering them away from simple memorization.',
      focusPoints: ['Overcoming math-phobia early', 'Building robust reading habits', 'Encouraging inquiry-based science learning'],
    },
    {
      id: 'grades-6-8',
      title: 'Grades 6–8 (Middle School Core)',
      badge: 'CONCEPT DEVELOPMENT',
      tagline: 'Bridging the transition to complex logical abstractions.',
      subjects: ['Core Mathematics (Pre-Algebra, Geometry, Data)', 'Integrated Science (Physics, Chemistry, Biology introductions)', 'English (Essay Writing, Intermediate Grammar, Literature)', 'Computer Science Foundations'],
      description: 'Middle school introduces abstract variables in mathematics (algebra) and branches science into physics, chemistry, and biology. Our mentors focus on helping students visualize abstract equations and chemical reactions.',
      focusPoints: ['Visualizing algebraic equations', 'Mapping the scientific method', 'Structuring logical written expression'],
    },
    {
      id: 'grades-9-10',
      title: 'Grades 9–10 (Secondary & Board Preparation)',
      badge: 'BOARD INTEGRITY',
      tagline: 'Syllabus mastery combined with exam-writing techniques.',
      subjects: ['Advanced Mathematics (Trigonometry, Quad Equations, Theorems)', 'Physics (Mechanics, Electricity, Optics)', 'Chemistry (Periodic Table, Organic Intro, Equations)', 'Biology (Life Processes, Genetics)', 'English Core & Literature', 'Computer Science & Board Coding'],
      description: 'Grades 9 & 10 are critical board years. We cover the entire school syllabus thoroughly, followed by solving past board papers and conducting mock tests to build speed, accuracy, and writing confidence.',
      focusPoints: ['Board exam simulation and writing practice', 'Solving previous-year question papers', 'Time-management strategies for exams'],
    },
    {
      id: 'grades-11-12',
      title: 'Grades 11–12 (Higher Secondary Mastery)',
      badge: 'ACADEMIC EXCELLENCE',
      tagline: 'Deep conceptual rigor for specialized domains.',
      subjects: ['Higher Mathematics (Calculus, Probability, Matrices)', 'Advanced Physics (Electromagnetism, Modern Physics)', 'Advanced Chemistry (Organic, Physical, Inorganic)', 'Advanced Biology (Human Physiology, Plant Systems)', 'Economics (Micro, Macro, Statistics)', 'English Literature & Functional Grammar', 'Computer Science & IT (Python, Data Structures, DBs)'],
      description: 'The senior secondary stage demands rigorous logical reasoning and deep subject mastery. Our tutors focus on complex derivations, physical interpretations, and board alignment to secure top percentages.',
      focusPoints: ['Mastering complex mathematical derivations', 'Applying theoretical physics to numerical problems', 'Preparing for school finals and board evaluation criteria'],
    },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Our Academic Programs</h1>
          <p className={styles.subtitle}>
            Targeted online support for school academics, curriculum boards, and final exam preparations.
          </p>
        </div>
      </header>

      {gradesData.map((grade, idx) => (
        <section
          key={grade.id}
          id={grade.id}
          className={idx % 2 === 0 ? 'section' : 'section-alt'}
        >
          <div className={`container ${styles.grid}`}>
            <div className={idx % 2 === 0 ? styles.contentLeft : styles.contentRight}>
              <SectionHeading title={grade.title} badge={grade.badge} />
              <p className={styles.taglineText}>"{grade.tagline}"</p>
              <p className={styles.descText}>{grade.description}</p>
              
              <div className={styles.focusArea}>
                <h4 className={styles.focusTitle}>Key Milestones:</h4>
                <ul className={styles.focusList}>
                  {grade.focusPoints.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className={idx % 2 === 0 ? styles.contentRight : styles.contentLeft}>
              <div className={styles.subjectBox}>
                <h4 className={styles.boxHeading}>Curriculum Subjects Offered:</h4>
                <ul className={styles.subjectList}>
                  {grade.subjects.map((sub, index) => (
                    <li key={index} className={styles.subjectItem}>
                      <span className={styles.bullet}>•</span> {sub}
                    </li>
                  ))}
                </ul>
                <div className={styles.boxCta}>
                  <Button variant="secondary" size="md" href="/#assessment">
                    REQUEST DIAGNOSTIC TIMELINE
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Pricing Notice */}
      <section className="section-alt">
        <div className="container text-center">
          <div className={styles.pricingCard}>
            <h3 className={styles.pricingTitle}>Customizable Scheduling & Batches</h3>
            <p className={styles.pricingDesc}>
              We support both dedicated 1-on-1 private schedules and interactive small group settings. Custom pricing proposals are prepared depending on grade level, target subjects, and frequency of weekly sessions.
            </p>
            <div className={styles.pricingButtons}>
              <Button variant="primary" size="lg" href="/#assessment">
                BOOK FREE ASSESSMENT
              </Button>
              <Button
                variant="whatsapp"
                size="lg"
                href="https://wa.me/918319531258?text=Hello%20MathMatriX%20Academy%2C%20I%20would%20like%20to%20enquire%20about%20tutoring%20pricing."
                external
              >
                DISCUSS ON WHATSAPP
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
