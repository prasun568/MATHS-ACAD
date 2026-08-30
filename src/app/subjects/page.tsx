import React from 'react';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';
import { renderPremiumIcon } from '@/components/Icons';
import styles from './subjects.module.css';

export default function Subjects() {
  const subjectsList = [
    {
      name: 'Mathematics',
      grades: 'Grades 3–12',
      icon: 'ruler',
      desc: 'From basic numerical math, fractions, and geometry to high-school Algebra 2, Trigonometry, and Calculus. We focus on active derivation practice and step-by-step problem-solving.',
    },
    {
      name: 'Science (Integrated)',
      grades: 'Grades 3–10',
      icon: 'test-tube',
      desc: 'Building basic curiosity about physical and chemical changes, life systems, and experimental deduction. Prepares a strong foundation for higher secondary splits.',
    },
    {
      name: 'Physics',
      grades: 'Grades 11–12',
      icon: 'lightning',
      desc: 'Mastering mechanics, electrodynamics, optics, and thermodynamics. Focus is placed on structural derivations and resolving numerical application sheets.',
    },
    {
      name: 'Chemistry',
      grades: 'Grades 11–12',
      icon: 'atom',
      desc: 'Organic mechanisms, physical calculation constants, and inorganic reactions. Tutors teach naming conventions, periodic patterns, and balanced equation rules.',
    },
    {
      name: 'Biology',
      grades: 'Grades 11–12',
      icon: 'leaf',
      desc: 'Mastering human physiology, genetics, plant cells, and taxonomy. Tutors utilize high-quality diagrams, flowchart keys, and structured memory charts.',
    },
    {
      name: 'English Literature & Language',
      grades: 'Grades 3–12',
      icon: 'book',
      desc: 'Grammar mechanics, critical comprehension reading, vocabulary depth, and structure patterns for essays. Also includes thorough preparation for Board-prescribed literature.',
    },
    {
      name: 'Economics',
      grades: 'Grades 11–12',
      icon: 'trending-up',
      desc: 'Microeconomics graphs, macroeconomics formulas, trade systems, and statistics. We help students connect economic graphs with real-world scenarios.',
    },
    {
      name: 'Computer Science & IT',
      grades: 'Grades 6–12',
      icon: 'laptop',
      desc: 'Coding basics, data operations, variables, logic loops, arrays, databases, and programming languages (Python, Java, C++). Tutors walk through actual code implementation.',
    },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Subjects We Teach</h1>
          <p className={styles.subtitle}>
            Conceptual, syllabus-aligned online tutoring in core sciences, advanced mathematics, coding, and literature.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="grid-2">
            {subjectsList.map((subject, idx) => (
              <div key={idx} className={styles.subjectCard}>
                <div className={styles.cardIcon}>
                  {renderPremiumIcon(subject.icon)}
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <span className={styles.grades}>{subject.grades}</span>
                    <h3 className={styles.subjectName}>{subject.name}</h3>
                  </div>
                  <p className={styles.desc}>{subject.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Prompt */}
      <section className="section-alt">
        <div className="container text-center">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Book a Free Academic Assessment</h2>
            <p className={styles.ctaDesc}>
              Let us identify exactly where your child faces doubts in these subjects. Our 1-on-1 diagnostic evaluation session gives you clear feedback on their current concept clarity.
            </p>
            <Button variant="secondary" size="lg" href="/#assessment">
              GET DIAGNOSTIC EVALUATION
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
