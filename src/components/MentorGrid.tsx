'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MentorProfile } from '@/data/mentors';
import styles from './MentorGrid.module.css';

interface MentorGridProps {
  mentors: MentorProfile[];
}

// Resilient Avatar component that falls back seamlessly
function MentorAvatar({ name, image, size = 84 }: { name: string; image: string; size?: number }) {
  const [hasError, setHasError] = useState(false);

  // Generate initials (e.g. "Luxmikant Sir" -> "LS", "Manjunath Sir" -> "MS")
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  if (!image || hasError) {
    return (
      <div
        className={styles.avatarFallback}
        style={{ width: size, height: size, fontSize: size * 0.38 }}
        title={name}
      >
        {initials || 'MM'}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt={name}
      width={size}
      height={size}
      onError={() => setHasError(true)}
      className={styles.avatarImg}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
}

export default function MentorGrid({ mentors }: MentorGridProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedBoard, setSelectedBoard] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalMentor, setActiveModalMentor] = useState<MentorProfile | null>(null);

  const subjectOptions = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Science'];
  const boardOptions = ['All', 'CBSE', 'ICSE', 'State Boards', 'IB/IGCSE'];

  const filteredMentors = useMemo(() => {
    return mentors.filter((m) => {
      // Subject filter
      const matchesSubject =
        selectedSubject === 'All' ||
        m.subjects.some((s) => s.toLowerCase().includes(selectedSubject.toLowerCase()));

      // Board filter
      const mentorBoards = m.boards || m.curricula || [];
      const matchesBoard =
        selectedBoard === 'All' ||
        mentorBoards.some((b) => b.toLowerCase().includes(selectedBoard.toLowerCase()));

      // Search query
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        m.name.toLowerCase().includes(query) ||
        (m.qualification && m.qualification.toLowerCase().includes(query)) ||
        (m.classes && m.classes.toLowerCase().includes(query)) ||
        (m.specialization && m.specialization.toLowerCase().includes(query)) ||
        m.subjects.some((s) => s.toLowerCase().includes(query)) ||
        mentorBoards.some((b) => b.toLowerCase().includes(query));

      return matchesSubject && matchesBoard && matchesSearch;
    });
  }, [mentors, selectedSubject, selectedBoard, searchQuery]);

  return (
    <div className={styles.wrapper}>
      {/* Search & Filter Toolbar */}
      <div className={styles.filterBar}>
        <div className={styles.searchBox}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.searchIcon}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search mentor by name, qualification, board, or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className={styles.clearBtn}
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className={styles.filterGroups}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Subject:</span>
            <div className={styles.pillRow}>
              {subjectOptions.map((subj) => (
                <button
                  key={subj}
                  type="button"
                  className={`${styles.filterPill} ${
                    selectedSubject === subj ? styles.activePill : ''
                  }`}
                  onClick={() => setSelectedSubject(subj)}
                >
                  {subj}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Board:</span>
            <div className={styles.pillRow}>
              {boardOptions.map((brd) => (
                <button
                  key={brd}
                  type="button"
                  className={`${styles.filterPill} ${
                    selectedBoard === brd ? styles.activePill : ''
                  }`}
                  onClick={() => setSelectedBoard(brd)}
                >
                  {brd}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className={styles.metaRow}>
        <p className={styles.resultsCount}>
          Showing <strong>{filteredMentors.length}</strong> verified mentor
          {filteredMentors.length === 1 ? '' : 's'}
        </p>
        {(selectedSubject !== 'All' || selectedBoard !== 'All' || searchQuery) && (
          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => {
              setSelectedSubject('All');
              setSelectedBoard('All');
              setSearchQuery('');
            }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Mentor Cards Grid */}
      {filteredMentors.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>No mentors found matching your filters</p>
          <p className={styles.emptyText}>
            Try selecting a different subject or board, or clear your search term.
          </p>
          <button
            type="button"
            className={styles.resetBtnPrimary}
            onClick={() => {
              setSelectedSubject('All');
              setSelectedBoard('All');
              setSearchQuery('');
            }}
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredMentors.map((mentor) => {
            const mentorBoards = mentor.boards || mentor.curricula || [];
            const mentorClasses = mentor.classes || mentor.grades;
            const mentorQualification = mentor.qualification || mentor.education;

            return (
              <div
                key={mentor.id}
                className={`${styles.card} ${mentor.featured ? styles.featuredCard : ''}`}
              >
                {mentor.featured && (
                  <div className={styles.featuredRibbon}>
                    <span>ACADEMIC DIRECTOR</span>
                  </div>
                )}

                {/* Card Header: Avatar & Key Meta */}
                <div className={styles.cardHeader}>
                  <div className={styles.avatarWrapper}>
                    <MentorAvatar name={mentor.name} image={mentor.image} size={84} />
                    <span className={styles.onlineDot} title="Verified Active Educator"></span>
                  </div>

                  <div className={styles.headerMeta}>
                    <div className={styles.badgesRow}>
                      {mentor.badges.map((b, i) => (
                        <span key={i} className={styles.badge}>
                          {b}
                        </span>
                      ))}
                    </div>
                    <h3 className={styles.mentorName}>{mentor.name}</h3>
                    <p className={styles.mentorRole}>{mentor.role}</p>
                    <p className={styles.mentorExp}>
                      <strong>Experience:</strong> {mentor.experience}
                    </p>
                  </div>
                </div>

                {/* Profile Key Details: Qualification, Classes, Boards */}
                <div className={styles.chipsSection}>
                  {/* Qualification */}
                  <div className={styles.chipGroup}>
                    <span className={styles.chipLabel}>Qualification:</span>
                    <span className={styles.qualText}>{mentorQualification}</span>
                  </div>

                  {/* Classes They Teach */}
                  <div className={styles.chipGroup}>
                    <span className={styles.chipLabel}>Classes Taught:</span>
                    <span className={styles.gradeBadge}>{mentorClasses}</span>
                  </div>

                  {/* Boards They Teach */}
                  <div className={styles.chipGroup}>
                    <span className={styles.chipLabel}>Boards Taught:</span>
                    <div className={styles.chipList}>
                      {mentorBoards.map((board, i) => (
                        <span key={i} className={styles.currChip}>
                          {board}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Subjects */}
                  <div className={styles.chipGroup}>
                    <span className={styles.chipLabel}>Subjects:</span>
                    <div className={styles.chipList}>
                      {mentor.subjects.map((sub, i) => (
                        <span key={i} className={styles.subjectChip}>
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Specialization / Topics */}
                {mentor.specialization && (
                  <p className={styles.mentorBio}>
                    <strong>Specialization:</strong> {mentor.specialization}
                  </p>
                )}

                {/* Action Buttons */}
                <div className={styles.cardActions}>
                  <Link href="/#assessment" className={styles.primaryAction}>
                    Book Free Assessment with Mentor &rarr;
                  </Link>
                  <div className={styles.subActions}>
                    <button
                      type="button"
                      className={styles.viewProfileBtn}
                      onClick={() => setActiveModalMentor(mentor)}
                    >
                      View Profile Details
                    </button>
                    <a
                      href={`https://wa.me/918319531258?text=Hello%20MathMatriX%20Academy%2C%20I%20would%20like%20to%20enquire%20about%20classes%20with%20${encodeURIComponent(
                        mentor.name
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.whatsappBtn}
                      title="Enquire on WhatsApp"
                    >
                      WhatsApp Enquire
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Full Profile Modal */}
      {activeModalMentor && (
        <div className={styles.modalOverlay} onClick={() => setActiveModalMentor(null)}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderInfo}>
                <span className={styles.modalBadge}>VERIFIED EDUCATOR PROFILE</span>
                <h3 className={styles.modalTitle}>{activeModalMentor.name}</h3>
                <p className={styles.modalRole}>{activeModalMentor.role}</p>
              </div>
              <button
                type="button"
                className={styles.modalClose}
                onClick={() => setActiveModalMentor(null)}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalGrid}>
                <div className={styles.modalSidebar}>
                  <div className={styles.modalAvatarBox}>
                    <MentorAvatar
                      name={activeModalMentor.name}
                      image={activeModalMentor.image}
                      size={110}
                    />
                  </div>
                  <div className={styles.modalMetaCard}>
                    <p>
                      <strong>Experience:</strong> {activeModalMentor.experience}
                    </p>
                    <p>
                      <strong>Classes:</strong> {activeModalMentor.classes || activeModalMentor.grades}
                    </p>
                  </div>
                </div>

                <div className={styles.modalMain}>
                  <h4 className={styles.modalSectionHeading}>Academic Qualification</h4>
                  <p className={styles.modalBioText}>
                    {activeModalMentor.qualification || activeModalMentor.education}
                  </p>

                  <h4 className={styles.modalSectionHeading}>Classes &amp; Grades Handled</h4>
                  <div className={styles.gradeBadge}>
                    {activeModalMentor.classes || activeModalMentor.grades}
                  </div>

                  <h4 className={styles.modalSectionHeading}>Boards Handled</h4>
                  <div className={styles.chipList}>
                    {(activeModalMentor.boards || activeModalMentor.curricula || []).map((board, i) => (
                      <span key={i} className={styles.currChip}>
                        {board}
                      </span>
                    ))}
                  </div>

                  <h4 className={styles.modalSectionHeading}>Subjects Handled</h4>
                  <div className={styles.chipList}>
                    {activeModalMentor.subjects.map((sub, i) => (
                      <span key={i} className={styles.subjectChip}>
                        {sub}
                      </span>
                    ))}
                  </div>

                  {activeModalMentor.specialization && (
                    <>
                      <h4 className={styles.modalSectionHeading}>Key Specialization</h4>
                      <p className={styles.modalBioText}>{activeModalMentor.specialization}</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <Link
                href="/#assessment"
                className={styles.modalPrimaryBtn}
                onClick={() => setActiveModalMentor(null)}
              >
                Schedule Free Assessment Demo
              </Link>
              <button
                type="button"
                className={styles.modalSecondaryBtn}
                onClick={() => setActiveModalMentor(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
