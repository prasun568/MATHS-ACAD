import React from 'react';
import FAQAccordion from '@/components/FAQAccordion';
import Button from '@/components/Button';
import styles from './faqs.module.css';

export default function FAQsPage() {
  const faqs = [
    {
      question: 'Are classes one-to-one?',
      answer: 'Yes, we offer both dedicated 1-on-1 private tutoring and small-group interactive cohorts (typically capped at 3-5 students). This ensures that every child receives proper attention and learns at their own comfortable pace.',
    },
    {
      question: 'Which grades do you teach?',
      answer: 'We provide academic coaching and tutoring support for school students in Grades 3 all the way through Grade 12.',
    },
    {
      question: 'Which boards do you teach?',
      answer: 'We cover all major local and global boards: CBSE (national board), ICSE/ISC (council board), IGCSE/Cambridge (international syllabus), and US Curriculum Common Core standards.',
    },
    {
      question: 'Do you offer a trial class?',
      answer: 'Yes, once you fill out the Academic Assessment Form, we will arrange a complimentary assessment, followed by a free trial/demo session with the proposed subject mentor.',
    },
    {
      question: 'How are mentors selected?',
      answer: 'Our mentors undergo a thorough selection process. We review their educational credentials, test their subject knowledge, assess their communication ability, and verify their prior teaching experience before onboarding them.',
    },
    {
      question: 'How do parents track progress?',
      answer: 'We maintain complete transparency. Parents receive detailed monthly assessment reports, mock test scores, updates on completed homework, and direct feedback from the subject mentor.',
    },
    {
      question: 'Can classes be scheduled around our availability?',
      answer: 'Yes, we offer flexible timing slots. You can pick evening or weekend batches that align with your child\'s school schedule and other extra-curricular timings.',
    },
    {
      question: 'Do you teach students outside India?',
      answer: 'Yes, our online classes support students across multiple time zones (including Middle East, UK, US, and Southeast Asia) with curricula suited for those regions.',
    },
    {
      question: 'How do I get started?',
      answer: 'The best way is to fill out our Free Academic Assessment form. Our team will contact you on WhatsApp to organize a quick diagnostic call.',
    },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Frequently Asked Questions</h1>
          <p className={styles.subtitle}>
            Find detailed answers about our class schedules, mentor vetting standards, curriculum coverage, and billing details.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* Pricing Planner */}
      <section className="section-alt">
        <div className="container text-center">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Still Have Questions?</h2>
            <p className={styles.ctaDesc}>
              Our Academic Directors are available on WhatsApp to answer any operational or board syllabus queries you may have.
            </p>
            <div className={styles.ctaButtons}>
              <Button
                variant="whatsapp"
                size="lg"
                href="https://wa.me/918319531258?text=Hello%20MathMatriX%20Academy%2C%20I%20have%20questions%20about%20your%20online%20classes."
                external
              >
                CHAT WITH US ON WHATSAPP
              </Button>
              <Button variant="outline" size="lg" href="/contact">
                FILL OUT ENQUIRY FORM
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
