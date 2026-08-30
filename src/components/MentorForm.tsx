'use client';

import React, { useState } from 'react';
import Button from './Button';
import styles from './MentorForm.module.css';

export default function MentorForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    availability: '',
    introduction: '',
    honeypot: '',
  });

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedCurricula, setSelectedCurricula] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const subjectsOptions = [
    'Mathematics',
    'Science (Grades 3-10)',
    'Physics (Grades 11-12)',
    'Chemistry (Grades 11-12)',
    'Biology (Grades 11-12)',
    'English',
    'Economics',
    'Computer Science & IT',
  ];

  const curriculaOptions = [
    'CBSE',
    'ICSE',
    'ISC',
    'IGCSE / Cambridge',
    'USA Curriculum',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const handleCurriculumChange = (curriculum: string) => {
    setSelectedCurricula((prev) =>
      prev.includes(curriculum) ? prev.filter((c) => c !== curriculum) : [...prev, curriculum]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email.');
      return;
    }
    if (!formData.phone.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your phone number.');
      return;
    }
    if (selectedSubjects.length === 0) {
      setStatus('error');
      setErrorMessage('Please select at least one subject.');
      return;
    }
    if (!formData.experience) {
      setStatus('error');
      setErrorMessage('Please select your teaching experience range.');
      return;
    }
    if (selectedCurricula.length === 0) {
      setStatus('error');
      setErrorMessage('Please select at least one curriculum alignment.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    const payload = {
      ...formData,
      subjects: selectedSubjects,
      curriculumExpertise: selectedCurricula,
    };

    try {
      const response = await fetch('/api/mentor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Failed to submit application.');
      }
    } catch (error) {
      console.error('Mentor application error:', error);
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.successCard} role="alert">
        <div className={styles.successIcon}>✓</div>
        <h3 className={styles.successTitle}>Application Submitted!</h3>
        <p className={styles.successText}>
          Thank you for applying to **The MathMatriX Academy** mentor panel. Our academic review team will verify your credentials and contact you within 3–5 working days to schedule a mock demonstration class.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Honeypot field */}
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

      <h3 className={styles.formTitle}>Educator Application Form</h3>
      <p className={styles.formSubtitle}>
        Join our network of verified academic mentors. Fields marked with * are required.
      </p>

      {status === 'error' && (
        <div className={styles.errorBanner} role="alert">
          {errorMessage}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="mentor-name" className="form-label">Full Name *</label>
        <input
          type="text"
          id="mentor-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
          placeholder="e.g. Dr. Sunita Rao"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="mentor-email" className="form-label">Email Address *</label>
          <input
            type="email"
            id="mentor-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g. sunita.rao@gmail.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mentor-phone" className="form-label">Phone / WhatsApp Number *</label>
          <input
            type="tel"
            id="mentor-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g. +91 99999 88888"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Subjects You Teach * (Select all that apply)</label>
        <div className={styles.checkboxGrid}>
          {subjectsOptions.map((sub) => (
            <label key={sub} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedSubjects.includes(sub)}
                onChange={() => handleSubjectChange(sub)}
                className={styles.checkboxInput}
              />
              <span className={styles.checkboxText}>{sub}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="mentor-experience" className="form-label">Teaching Experience *</label>
          <select
            id="mentor-experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Experience</option>
            <option value="1-3 years">1–3 years</option>
            <option value="3-5 years">3–5 years</option>
            <option value="5-10 years">5–10 years</option>
            <option value="10+ years">10+ years</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mentor-availability" className="form-label">General Weekly Availability</label>
          <input
            type="text"
            id="mentor-availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g. Weekdays 4 PM - 8 PM, Weekend Mornings"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Curricula Expertise * (Select all that apply)</label>
        <div className={styles.checkboxGrid}>
          {curriculaOptions.map((cur) => (
            <label key={cur} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedCurricula.includes(cur)}
                onChange={() => handleCurriculumChange(cur)}
                className={styles.checkboxInput}
              />
              <span className={styles.checkboxText}>{cur}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="mentor-intro" className="form-label">Tell Us About Yourself</label>
        <textarea
          id="mentor-intro"
          name="introduction"
          rows={5}
          value={formData.introduction}
          onChange={handleChange}
          className="form-control"
          placeholder="Introduce yourself, mention prior school teaching experience, certifications, and educational philosophy..."
        ></textarea>
      </div>

      <Button
        variant="primary"
        type="submit"
        loading={status === 'loading'}
        className={styles.submitBtn}
      >
        SUBMIT MENTOR APPLICATION
      </Button>
    </form>
  );
}
