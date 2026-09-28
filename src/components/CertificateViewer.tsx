'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './CertificateViewer.module.css';

interface CertificatePage {
  pageNumber: number;
  title: string;
  subtitle: string;
  imageSrc: string;
  highlights: string[];
}

const certificatePages: CertificatePage[] = [
  {
    pageNumber: 1,
    title: 'Page 1: Enterprise & NIC Details',
    subtitle: 'Official Udyam Registration & Academic Tutoring Classification',
    imageSrc: '/images/certificates/udyam-page-1.png',
    highlights: [
      'Udyam Registration Number: UDYAM-MP-48-0022294',
      'Name of Enterprise: THE MATHMATRIX ACADEMY',
      'Enterprise Type: Micro Enterprise (Services)',
      'NIC Code: 85491 - Academic tutoring services',
      'Official Address: Ward 15, Rest House Road, Jatara, Tikamgarh, MP - 472118',
    ],
  },
  {
    pageNumber: 2,
    title: 'Page 2: Industry Centre & Assistance',
    subtitle: 'District Industries Centre & MSME-DFO Jurisdiction Details',
    imageSrc: '/images/certificates/udyam-page-2.png',
    highlights: [
      'District Industries Centre: TIKAMGARH (Madhya Pradesh)',
      'MSME Development and Facilitation Office: INDORE (Madhya Pradesh)',
      'Official Government MSME Portal Verification QR & Direct Links',
    ],
  },
  {
    pageNumber: 3,
    title: 'Page 3: Organisation & Statutory Profile',
    subtitle: 'Enterprise Structure, Proprietor Details & Banking Information',
    imageSrc: '/images/certificates/udyam-page-3.png',
    highlights: [
      'Owner / Proprietor: VIDUR NAMDEV',
      'PAN Registered & Statutory Income Tax Verification Compliant',
      'Official Banking Profile at HDFC Bank (IFS Code: HDFC0011326)',
      'Employment & Operations Classification Details',
    ],
  },
  {
    pageNumber: 4,
    title: 'Page 4: Unit Details & Verification',
    subtitle: 'Operational Unit, Registration Dates & Portal Confirmations',
    imageSrc: '/images/certificates/udyam-page-4.png',
    highlights: [
      'Unit Name: The MathMatriX Academy',
      'Date of Incorporation: 01/01/2024',
      'Date of Udyam Registration: 01/09/2026',
      'Registered on National Career Service (NCS) Portal',
    ],
  },
];

export default function CertificateViewer() {
  const [activePage, setActivePage] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const currentPage = certificatePages[activePage];

  const handlePrev = () => {
    setActivePage((prev) => (prev > 0 ? prev - 1 : certificatePages.length - 1));
  };

  const handleNext = () => {
    setActivePage((prev) => (prev < certificatePages.length - 1 ? prev + 1 : 0));
  };

  const handleOpenModal = () => {
    setZoomLevel(1);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setZoomLevel(1);
  };

  return (
    <div className={styles.wrapper}>
      {/* Top Controls: Tabs & Download Actions */}
      <div className={styles.topBar}>
        <div className={styles.pageTabs}>
          {certificatePages.map((page, idx) => (
            <button
              key={page.pageNumber}
              type="button"
              className={`${styles.pageTab} ${activePage === idx ? styles.activeTab : ''}`}
              onClick={() => setActivePage(idx)}
              aria-label={`View page ${page.pageNumber}`}
            >
              <span className={styles.tabNum}>P.{page.pageNumber}</span>
              <span className={styles.tabLabel}>{page.title.split(':')[1]?.trim() || page.title}</span>
            </button>
          ))}
        </div>

        <div className={styles.actionsGroup}>
          <a
            href="/documents/udyam-registration-certificate.pdf"
            download="The-MathMatrix-Academy-Udyam-Certificate.pdf"
            className={styles.downloadBtn}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </a>

          <a
            href="https://udyamregistration.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.verifyLink}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Udyam Portal
          </a>
        </div>
      </div>

      {/* Main Display Area */}
      <div className={styles.displayGrid}>
        {/* Certificate Preview Card */}
        <div className={styles.previewContainer}>
          <div className={styles.imageCard}>
            <div className={styles.imageOverlay} onClick={handleOpenModal} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleOpenModal()}>
              <div className={styles.zoomPrompt}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                Click to expand & examine full page
              </div>
            </div>

            <div className={styles.imageFrame} onClick={handleOpenModal}>
              <Image
                src={currentPage.imageSrc}
                alt={`Udyam Certificate ${currentPage.title}`}
                width={850}
                height={1100}
                className={styles.certImage}
                priority
              />
            </div>

            {/* Pagination Controls */}
            <div className={styles.navControls}>
              <button
                type="button"
                className={styles.navBtn}
                onClick={handlePrev}
                aria-label="Previous page"
              >
                &larr; Prev Page
              </button>
              <span className={styles.navInfo}>
                Page <strong>{currentPage.pageNumber}</strong> of {certificatePages.length}
              </span>
              <button
                type="button"
                className={styles.navBtn}
                onClick={handleNext}
                aria-label="Next page"
              >
                Next Page &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Highlights Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.infoBadge}>
            <span className={styles.badgeDot}></span>
            Government of India MSME Verified
          </div>

          <h3 className={styles.sidebarTitle}>{currentPage.title}</h3>
          <p className={styles.sidebarSub}>{currentPage.subtitle}</p>

          <div className={styles.highlightSection}>
            <h4 className={styles.highlightHeading}>Key Highlights on this page:</h4>
            <ul className={styles.highlightList}>
              {currentPage.highlights.map((item, idx) => (
                <li key={idx} className={styles.highlightItem}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.cardBox}>
            <div className={styles.cardHeader}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.shieldIcon}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Statutory Compliance Notice</span>
            </div>
            <p className={styles.cardNote}>
              The MathMatriX Academy is a legally registered micro-enterprise under the Ministry of MSME, Government of India (Udyam: UDYAM-MP-48-0022294). Registration confirms statutory registration under the MSME Act, 2006 for academic tutoring services.
            </p>
          </div>

          <div className={styles.quickLinks}>
            <button
              type="button"
              className={styles.fullscreenBtn}
              onClick={handleOpenModal}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
              View Fullscreen Preview
            </button>
            <a
              href="/documents/udyam-registration-certificate.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.openPdfBtn}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Open PDF in Browser Tab
            </a>
          </div>
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleArea}>
                <span className={styles.modalBadge}>Page {currentPage.pageNumber} of {certificatePages.length}</span>
                <h4 className={styles.modalTitle}>{currentPage.title}</h4>
              </div>
              <div className={styles.modalControls}>
                <button
                  type="button"
                  className={styles.modalBtn}
                  onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                  title="Zoom Out"
                >
                  -
                </button>
                <span className={styles.zoomLabel}>{Math.round(zoomLevel * 100)}%</span>
                <button
                  type="button"
                  className={styles.modalBtn}
                  onClick={() => setZoomLevel((z) => Math.min(2, z + 0.25))}
                  title="Zoom In"
                >
                  +
                </button>
                <button
                  type="button"
                  className={styles.modalCloseBtn}
                  onClick={handleCloseModal}
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>
            </div>

            <div className={styles.modalBody}>
              <div
                className={styles.modalImageWrapper}
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <Image
                  src={currentPage.imageSrc}
                  alt={`Udyam Certificate ${currentPage.title}`}
                  width={1100}
                  height={1420}
                  className={styles.modalImage}
                  quality={95}
                />
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button type="button" className={styles.navBtn} onClick={handlePrev}>
                &larr; Previous Page
              </button>
              <div className={styles.modalFooterNote}>
                Govt. of India Udyam Registration No: <strong>UDYAM-MP-48-0022294</strong>
              </div>
              <button type="button" className={styles.navBtn} onClick={handleNext}>
                Next Page &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
