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

  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedCurricula, setSelectedCurricula] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [interviewInfo, setInterviewInfo] = useState<{
    scheduledFor: string;
    zoomLink: string;
    contactPhone: string;
    candidateEmail: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Resume state variables
  const [resumeType, setResumeType] = useState<'file' | 'link'>('file');
  const [resumeLink, setResumeLink] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [resumeBase64, setResumeBase64] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState('');

  const gradesOptions = [
    'Grade 3',
    'Grade 4',
    'Grade 5',
    'Grade 6',
    'Grade 7',
    'Grade 8',
    'Grade 9',
    'Grade 10',
    'Grade 11',
    'Grade 12',
  ];

  const gradePresets = [
    { label: 'Primary (Grades 3–5)', grades: ['Grade 3', 'Grade 4', 'Grade 5'] },
    { label: 'Middle School (Grades 6–8)', grades: ['Grade 6', 'Grade 7', 'Grade 8'] },
    { label: 'Secondary (Grades 9–10)', grades: ['Grade 9', 'Grade 10'] },
    { label: 'Senior Secondary (Grades 11–12)', grades: ['Grade 11', 'Grade 12'] },
    { label: 'All Grades (3–12)', grades: gradesOptions },
  ];

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

  const handleGradeChange = (grade: string) => {
    setSelectedGrades((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]
    );
  };

  const handleTogglePreset = (presetGrades: string[]) => {
    const allSelected = presetGrades.every((g) => selectedGrades.includes(g));
    if (allSelected) {
      setSelectedGrades((prev) => prev.filter((g) => !presetGrades.includes(g)));
    } else {
      setSelectedGrades((prev) => Array.from(new Set([...prev, ...presetGrades])));
    }
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
    if (selectedGrades.length === 0) {
      setStatus('error');
      setErrorMessage('Please select at least one grade level you want to teach.');
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
      grades: selectedGrades,
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
        setInterviewInfo(
          result.interviewDetails || {
            scheduledFor: 'Tomorrow at 10:00 AM IST',
            zoomLink: 'https://us06web.zoom.us/j/89307082370?pwd=HVDyVmIFPLnXG8bG19HD9sJn9dln04.1',
            contactPhone: '7828440234',
            candidateEmail: formData.email,
          }
        );
        setEmailSent(!!result.emailDelivery?.candidateEmailSent);
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

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      experience: '',
      availability: '',
      introduction: '',
      honeypot: '',
    });
    setSelectedGrades([]);
    setSelectedSubjects([]);
    setSelectedCurricula([]);
    setResumeType('file');
    setResumeLink('');
    setResumeFileName('');
    setResumeBase64('');
    setStatus('idle');
    setInterviewInfo(null);
    setEmailSent(false);
    setCopied(false);
  };

  if (status === 'success') {
    const zoomLink =
      interviewInfo?.zoomLink ||
      'https://us06web.zoom.us/j/89307082370?pwd=HVDyVmIFPLnXG8bG19HD9sJn9dln04.1';
    const contactPhone = interviewInfo?.contactPhone || '7828440234';
    const scheduledTime = interviewInfo?.scheduledFor || 'Tomorrow at 10:00 AM IST';
    const candidateEmail = interviewInfo?.candidateEmail || formData.email;

    const handleCopy = () => {
      if (typeof window !== 'undefined' && navigator?.clipboard) {
        navigator.clipboard.writeText(zoomLink).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        }).catch(() => {
          // fallback
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        });
      }
    };

    return (
      <div className={styles.successCard} role="alert">
        <div className={styles.successIcon}>✓</div>
        <span className={styles.successBadge}>
          {emailSent ? 'Interview Details Sent to Your Email' : 'Online Interview Scheduled'}
        </span>
        <h3 className={styles.successTitle}>Application Submitted Successfully!</h3>
        <p className={styles.successText}>
          {emailSent ? (
            <>
              Thank you for applying to join <strong>The MathMatriX Academy</strong>. We have sent your interview confirmation and Zoom meeting link directly to <strong>{candidateEmail}</strong>.
            </>
          ) : (
            <>
              Thank you for applying to join <strong>The MathMatriX Academy</strong>. Please note your interview schedule and join link below:
            </>
          )}
        </p>

        <div className={styles.interviewCard}>
          <div className={styles.interviewCardTitle}>
            <span>🗓️</span>
            <span>Online Interview Schedule</span>
          </div>

          <div className={styles.interviewDetailsList}>
            <div className={styles.interviewRow}>
              <span className={styles.interviewLabel}>Scheduled Slot:</span>
              <span className={styles.interviewValue}>{scheduledTime}</span>
            </div>
            <div className={styles.interviewRow}>
              <span className={styles.interviewLabel}>Platform:</span>
              <span className={styles.interviewValue}>Zoom Video Meeting</span>
            </div>
            <div className={styles.interviewRow}>
              <span className={styles.interviewLabel}>Role Applied:</span>
              <span className={styles.interviewValue}>Educator / Mentor</span>
            </div>
          </div>

          <div className={styles.zoomActionGroup}>
            <a
              href={zoomLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.zoomPrimaryBtn}
            >
              <span>🎥</span>
              <span>Join Zoom Meeting</span>
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className={styles.zoomCopyBtn}
            >
              {copied ? '✓ Copied Link' : '📋 Copy Zoom Link'}
            </button>
          </div>
        </div>

        <div className={styles.slotHelpBox}>
          <strong>⚠️ Slot Issue or Need Rescheduling?</strong><br />
          If you have any issue in the given slot, please contact on this number:{' '}
          <a href={`tel:${contactPhone}`} className={styles.slotHelpPhone}>
            {contactPhone}
          </a>
        </div>

        <button type="button" onClick={handleReset} className={styles.resetBtn}>
          ← Submit another application
        </button>
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
        <label className="form-label">Grades You Want to Teach * (Select all that apply)</label>
        <div className={styles.gradesContainer}>
          <div className={styles.presetRow}>
            <span className={styles.presetLabel}>Quick Select:</span>
            {gradePresets.map((preset) => {
              const isActive = preset.grades.every((g) => selectedGrades.includes(g));
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleTogglePreset(preset.grades)}
                  className={`${styles.presetBtn} ${isActive ? styles.activePresetBtn : ''}`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          <div className={styles.gradesGrid}>
            {gradesOptions.map((grade) => (
              <label key={grade} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedGrades.includes(grade)}
                  onChange={() => handleGradeChange(grade)}
                  className={styles.checkboxInput}
                />
                <span className={styles.checkboxText}>{grade}</span>
              </label>
            ))}
          </div>
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
            <option value="0-1 years">0–1 years</option>
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
                <span className={styles.fileIcon} aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </span>
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
                <span className={styles.uploadIcon} aria-hidden="true">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </span>
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
