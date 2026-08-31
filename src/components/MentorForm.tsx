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

  // Resume state variables
  const [resumeType, setResumeType] = useState<'file' | 'link'>('file');
  const [resumeLink, setResumeLink] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [resumeBase64, setResumeBase64] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState('');

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

  const handleFileChange = (file: File) => {
    setFileError('');
    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    if (!extension || !allowedExtensions.includes(extension)) {
      setFileError('Invalid file type. Only PDF, DOC, and DOCX are allowed.');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size exceeds the 5MB limit.');
      return;
    }

    setResumeFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setResumeBase64(e.target.result as string);
      }
    };
    reader.onerror = () => {
      setFileError('Error reading file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
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
    if (!formData.availability.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your daily availability.');
      return;
    }

    // Resume validation
    if (resumeType === 'link') {
      if (!resumeLink.trim()) {
        setStatus('error');
        setErrorMessage('Please enter a link to your resume.');
        return;
      }
      if (!/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(resumeLink.trim())) {
        setStatus('error');
        setErrorMessage('Please enter a valid URL (starting with http:// or https://) for your resume.');
        return;
      }
    } else {
      if (!resumeBase64) {
        setStatus('error');
        setErrorMessage('Please upload your resume file.');
        return;
      }
    }

    setStatus('loading');
    setErrorMessage('');

    const payload = {
      ...formData,
      subjects: selectedSubjects,
      curriculumExpertise: selectedCurricula,
      resumeType,
      resumeLink: resumeType === 'link' ? resumeLink : '',
      resumeFileName: resumeType === 'file' ? resumeFileName : '',
      resumeBase64: resumeType === 'file' ? resumeBase64 : '',
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
          <label htmlFor="mentor-availability" className="form-label">Daily Availability *</label>
          <input
            type="text"
            id="mentor-availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g. Daily 4 PM - 6 PM, or Mon-Fri 5 PM - 8 PM"
            required
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

      {/* Resume/CV Section */}
      <div className="form-group">
        <label className="form-label">Resume / CV *</label>
        
        {/* Toggle options */}
        <div className={styles.resumeToggle}>
          <button
            type="button"
            className={`${styles.toggleBtn} ${resumeType === 'file' ? styles.activeToggle : ''}`}
            onClick={() => setResumeType('file')}
          >
            Upload File
          </button>
          <button
            type="button"
            className={`${styles.toggleBtn} ${resumeType === 'link' ? styles.activeToggle : ''}`}
            onClick={() => setResumeType('link')}
          >
            Provide Link
          </button>
        </div>

        {resumeType === 'file' ? (
          <div 
            className={`${styles.dropZone} ${dragActive ? styles.dragActive : ''} ${resumeFileName ? styles.hasFile : ''}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="resume-file-input"
              className={styles.fileInput}
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileChange(e.target.files[0]);
                }
              }}
            />
            
            {resumeFileName ? (
              <div className={styles.fileInfo}>
                <span className={styles.fileIcon}>📄</span>
                <div className={styles.fileDetails}>
                  <p className={styles.fileName}>{resumeFileName}</p>
                  <p className={styles.fileSuccess}>File loaded successfully</p>
                </div>
                <button 
                  type="button" 
                  className={styles.removeFileBtn}
                  onClick={() => {
                    setResumeFileName('');
                    setResumeBase64('');
                  }}
                  aria-label="Remove file"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label htmlFor="resume-file-input" className={styles.dropZoneLabel}>
                <span className={styles.uploadIcon}>📤</span>
                <span className={styles.uploadText}>
                  <strong>Click to upload</strong> or drag & drop
                </span>
                <span className={styles.uploadSubtext}>PDF, DOC, or DOCX (Max 5MB)</span>
              </label>
            )}
            
            {fileError && <p className={styles.fileErrorText}>{fileError}</p>}
          </div>
        ) : (
          <div className={styles.linkInputContainer}>
            <input
              type="url"
              className="form-control"
              placeholder="e.g. https://drive.google.com/file/d/your-resume-link"
              value={resumeLink}
              onChange={(e) => setResumeLink(e.target.value)}
            />
            <p className={styles.helpText}>
              Ensure the link is public and accessible (e.g. Google Drive link set to 'Anyone with the link can view').
            </p>
          </div>
        )}
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
