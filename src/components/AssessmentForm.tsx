'use client';

import React, { useState } from 'react';
import Button from './Button';
import styles from './AssessmentForm.module.css';

interface AssessmentFormProps {
  isLandingPage?: boolean;
}

export default function AssessmentForm({ isLandingPage = false }: AssessmentFormProps) {
  const [formData, setFormData] = useState({
    parentName: '',
    whatsappNumber: '',
    childGrade: '',
    curriculum: '',
    subject: '',
    preferredTiming: '',
    learningMode: '', // One-on-one vs small group
    honeypot: '', // Spam protection
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const grades = [
    'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8',
    'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
  ];

  const curricula = [
    'CBSE',
    'ICSE',
    'ISC',
    'IGCSE / Cambridge',
    'USA Curriculum'
  ];

  const subjects = [
    'Mathematics',
    'Science (Grades 3-10)',
    'Physics (Grades 11-12)',
    'Chemistry (Grades 11-12)',
    'Biology (Grades 11-12)',
    'English',
    'Economics',
    'Computer Science & IT'
  ];

  const timings = [
    'Weekday Afternoons (3 PM - 5 PM)',
    'Weekday Evenings (5 PM - 8 PM)',
    'Weekend Mornings (9 AM - 12 PM)',
    'Weekend Afternoons (12 PM - 4 PM)',
    'Flexible / Discuss on Call'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation checks
    if (!formData.parentName.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!formData.whatsappNumber.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your WhatsApp number.');
      return;
    }
    if (!formData.childGrade) {
      setStatus('error');
      setErrorMessage("Please select your child's grade.");
      return;
    }
    if (!formData.curriculum) {
      setStatus('error');
      setErrorMessage('Please select a curriculum/board.');
      return;
    }
    if (!formData.subject) {
      setStatus('error');
      setErrorMessage('Please select a subject.');
      return;
    }
    if (!formData.preferredTiming) {
      setStatus('error');
      setErrorMessage('Please select your preferred timing.');
      return;
    }
    if (!formData.learningMode) {
      setStatus('error');
      setErrorMessage('Please select your preferred learning format.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Something went wrong. Please check fields and try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage('Network error. Please try again later or contact us on WhatsApp.');
    }
  };

  // Pre-filled WhatsApp confirmation message
  const whatsappMsg = isLandingPage
    ? "Hello MathMatriX Academy, I would like to book a FREE Academic Assessment from the ad."
    : "Hello MathMatriX Academy, I would like to book a FREE Academic Assessment for my child.";
  const waLink = `https://wa.me/918319531258?text=${encodeURIComponent(whatsappMsg)}`;

  if (status === 'success') {
    return (
      <div className={styles.successCard} role="alert">
        <div className={styles.successIcon}>✓</div>
        <h3 className={styles.successTitle}>Booking Successful!</h3>
        <p className={styles.successText}>
          Thank you for requesting a **FREE Academic Assessment**. Our Academic Director will get in touch with you via WhatsApp or phone call within 24 hours to schedule the session.
        </p>
        <div className={styles.successCtaBlock}>
          <p className={styles.ctaPrompt}>Want to speed up the booking? Confirm instantly via WhatsApp:</p>
          <Button
            variant="whatsapp"
            href={waLink}
            external
            className={styles.successWaBtn}
          >
            CONFIRM BOOKING ON WHATSAPP
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Honeypot field for bot spam prevention */}
      <div className={styles.honey} aria-hidden="true">
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <h3 className={styles.formTitle}>Book a Free Assessment</h3>
      <p className={styles.formSubtitle}>Understand your child's learning gaps, strengths, and concept clarity.</p>

      {status === 'error' && (
        <div className={styles.errorBanner} role="alert">
          {errorMessage}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="parentName" className="form-label">Parent Name</label>
        <input
          type="text"
          id="parentName"
          name="parentName"
          value={formData.parentName}
          onChange={handleChange}
          className="form-control"
          placeholder="e.g. Rajesh Kumar"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="whatsappNumber" className="form-label">WhatsApp Number</label>
        <input
          type="tel"
          id="whatsappNumber"
          name="whatsappNumber"
          value={formData.whatsappNumber}
          onChange={handleChange}
          className="form-control"
          placeholder="e.g. +91 98765 43210"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="learningMode" className="form-label">Preferred Learning Format</label>
        <select
          id="learningMode"
          name="learningMode"
          value={formData.learningMode}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="">Select Learning Format</option>
          <option value="One-on-One Private Session">One-on-One Private Session (Personalized Pace)</option>
          <option value="Small Group Session">Small Group Interactive Session (Collaborative Learning)</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="childGrade" className="form-label">Child's Grade</label>
          <select
            id="childGrade"
            name="childGrade"
            value={formData.childGrade}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Grade</option>
            {grades.map((grade) => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="curriculum" className="form-label">Curriculum / Board</label>
          <select
            id="curriculum"
            name="curriculum"
            value={formData.curriculum}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Board</option>
            {curricula.map((cur) => (
              <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="subject" className="form-label">Target Subject</label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="preferredTiming" className="form-label">Preferred Class Timing</label>
          <select
            id="preferredTiming"
            name="preferredTiming"
            value={formData.preferredTiming}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Preferred Timing</option>
            {timings.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>

      <Button
        variant="secondary"
        type="submit"
        loading={status === 'loading'}
        className={styles.submitBtn}
      >
        GET MY CHILD'S FREE ASSESSMENT
      </Button>

      <p className={styles.privacyNote}>
        🔒 Your contact information is secure. We only use this details to organize your child's assessment.
      </p>
    </form>
  );
}
