'use client';

import React, { useState } from 'react';
import Button from './Button';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!formData.email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your email.');
      return;
    }
    if (!formData.subject.trim()) {
      setStatus('error');
      setErrorMessage('Please enter a subject.');
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus('error');
      setErrorMessage('Please enter a message (min 10 characters).');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
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
        setErrorMessage(result.error || 'Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Contact Form error:', error);
      setStatus('error');
      setErrorMessage('Network error. Please try again or contact us directly on WhatsApp.');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.successCard} role="alert">
        <h3 className={styles.successTitle}>Enquiry Received</h3>
        <p className={styles.successText}>
          Thank you for reaching out to **The MathMatriX Academy**. A counselor will review your question and respond via email or WhatsApp within 24 hours.
        </p>
        <Button variant="whatsapp" href="https://wa.me/918319531258?text=Hello%20MathMatriX%20Academy%2C%20I%20sent%20a%20website%20enquiry%20and%20would%20like%20to%20follow%20up." external>
          TALK ON WHATSAPP NOW
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
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

      {status === 'error' && (
        <div className={styles.errorBanner} role="alert">
          {errorMessage}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="contact-name" className="form-label">Your Name</label>
        <input
          type="text"
          id="contact-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
          placeholder="e.g. Amit Sharma"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-email" className="form-label">Email Address</label>
        <input
          type="email"
          id="contact-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
          placeholder="e.g. amit@gmail.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-subject" className="form-label">Subject</label>
        <input
          type="text"
          id="contact-subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="form-control"
          placeholder="e.g. Enquiry about Grade 9 Physics"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-message" className="form-label">Your Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="form-control"
          placeholder="Tell us details about what you're looking for or any questions you have..."
          required
        ></textarea>
      </div>

      <Button
        variant="primary"
        type="submit"
        loading={status === 'loading'}
        className={styles.submitBtn}
      >
        SEND ENQUIRY
      </Button>
    </form>
  );
}
