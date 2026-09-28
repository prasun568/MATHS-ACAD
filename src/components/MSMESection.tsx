'use client';

import React, { useState } from 'react';
import styles from './MSMESection.module.css';

interface MSMESectionProps {
  id?: string;
  showHeading?: boolean;
}

export default function MSMESection({ id = 'msme-registration', showHeading = true }: MSMESectionProps) {
  const [copied, setCopied] = useState(false);
  const udyamNumber = 'UDYAM-MP-48-0022294';

  const handleCopy = () => {
    navigator.clipboard.writeText(udyamNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const verifiedDetails = [
    { label: 'Enterprise Name', value: 'THE MATHMATRIX ACADEMY', isTitle: true },
    { label: 'Enterprise Type', value: 'Micro Enterprise' },
    { label: 'Udyam Registration Number', value: udyamNumber, isMonospace: true, isCopyable: true },
    { label: 'Major Activity', value: 'Services' },
    { label: 'Business Activity', value: 'Academic Tutoring Services' },
    { label: 'Date of Udyam Registration', value: '01/09/2026' },
  ];

  return (
    <section className={styles.section} id={id} aria-label="MSME Registration Details">
      <div className="container">
        {showHeading && (
          <div className={styles.sectionHeader}>
            <div className={styles.badgeRow}>
              <span className={styles.msmeBadge}>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.shieldIcon}
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                MSME Registered Enterprise
              </span>
            </div>
            <h2 className={styles.title}>Government Registered &amp; Compliant</h2>
            <p className={styles.subtitle}>
              The MathMatriX Academy operates with full statutory compliance under the Ministry of Micro, Small and Medium Enterprises, Government of India.
            </p>
          </div>
        )}

        <div className={styles.card}>
          {/* Card Top Banner */}
          <div className={styles.cardHeader}>
            <div className={styles.orgInfo}>
              <div className={styles.emblemBox}>
                <span className={styles.flagIcon}>🇮🇳</span>
              </div>
              <div>
                <span className={styles.ministryTag}>Ministry of Micro, Small &amp; Medium Enterprises (Govt. of India)</span>
                <h3 className={styles.enterpriseHeading}>THE MATHMATRIX ACADEMY</h3>
              </div>
            </div>

            <div className={styles.verifiedPill}>
              <span className={styles.verifiedDot}></span>
              <span>Verified Registration</span>
            </div>
          </div>

          {/* Key-Value Details Grid */}
          <div className={styles.detailsGrid}>
            {verifiedDetails.map((item, idx) => (
              <div key={idx} className={styles.detailItem}>
                <span className={styles.detailLabel}>{item.label}</span>
                <div className={styles.detailValueRow}>
                  <span
                    className={`${styles.detailValue} ${item.isMonospace ? styles.monoValue : ''} ${
                      item.isTitle ? styles.titleValue : ''
                    }`}
                  >
                    {item.value}
                  </span>
                  {item.isCopyable && (
                    <button
                      type="button"
                      onClick={handleCopy}
                      className={styles.copyBtn}
                      title="Copy Udyam Registration Number"
                      aria-label="Copy Udyam Registration Number"
                    >
                      {copied ? (
                        <span className={styles.copiedText}>Copied ✓</span>
                      ) : (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className={styles.cardFooter}>
            <p className={styles.footerNote}>
              Registration confirms formal recognition for academic tutoring services under the MSME Act, 2006.
            </p>
            <div className={styles.actionGroup}>
              <a
                href="https://udyamregistration.gov.in/Udyam_Verify.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.verifyBtn}
              >
                <span>Verify on Official Udyam Portal</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
