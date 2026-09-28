'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MentorProfile } from '@/data/mentors';
import styles from './MentorGrid.module.css';

interface MentorGridProps {
  mentors: MentorProfile[];
}

export default function MentorGrid({ mentors }: MentorGridProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalMentor, setActiveModalMentor] = useState<MentorProfile | null>(null);

  const subjectOptions = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Science'];
  const curriculumOptions = ['All', 'CBSE', 'ICSE', 'IGCSE', 'USA'];

  const filteredMentors = useMemo(() => {
    return mentors.filter((m) => {
      // Subject filter
      const matchesSubject =
        selectedSubject === 'All' ||
        m.subjects.some((s) => s.toLowerCase().includes(selectedSubject.toLowerCase()));

      // Curriculum filter
      const matchesCurriculum =
        selectedCurriculum === 'All' ||
        m.curricula.some((c) => c.toLowerCase().includes(selectedCurriculum.toLowerCase()));

      // Search query
      const matchesSearch =
        searchQuery.trim() === '' ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesSubject && matchesCurriculum && matchesSearch;
    });
  }, [mentors, selectedSubject, selectedCurriculum, searchQuery]);

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
            placeholder="Search by mentor name, subject or keyword..."
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
            <span className={styles.filterLabel}>Curriculum:</span>
            <div className={styles.pillRow}>
              {curriculumOptions.map((curr) => (
                <button
                  key={curr}
                  type="button"
                  className={`${styles.filterPill} ${
                    selectedCurriculum === curr ? styles.activePill : ''
                  }`}
                  onClick={() => setSelectedCurriculum(curr)}
                >
                  {curr}
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
        {(selectedSubject !== 'All' || selectedCurriculum !== 'All' || searchQuery) && (
          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => {
              setSelectedSubject('All');
              setSelectedCurriculum('All');
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
            Try selecting a different subject or curriculum, or clear your search term.
          </p>
          <button
            type="button"
            className={styles.resetBtnPrimary}
            onClick={() => {
              setSelectedSubject('All');
              setSelectedCurriculum('All');
              setSearchQuery('');
            }}
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredMentors.map((mentor) => (
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
                  {mentor.image ? (
                    <Image
                      src={mentor.image}
                      alt={mentor.name}
                      width={88}
                      height={88}
                      className={styles.avatarImg}
                    />
                  ) : (
                    <div className={styles.avatarFallback}>
                      {mentor.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </div>
                  )}
                  <span className={styles.onlineDot} title="Active Educator"></span>
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
                    <strong>Experience:</strong> {mentor.experience} • {mentor.education}
                  </p>
                </div>
              </div>

              {/* Subjects & Curricula Chips */}
              <div className={styles.chipsSection}>
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

                <div className={styles.chipGroup}>
                  <span className={styles.chipLabel}>Curricula:</span>
                  <div className={styles.chipList}>
                    {mentor.curricula.map((curr, i) => (
                      <span key={i} className={styles.currChip}>
                        {curr}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.chipGroup}>
                  <span className={styles.chipLabel}>Grades:</span>
                  <span className={styles.gradeBadge}>{mentor.grades}</span>
                </div>
              </div>

              {/* Bio Summary */}
              <p className={styles.mentorBio}>{mentor.bio}</p>

              {/* Key Achievements */}
              <div className={styles.achievementsBox}>
                <h4 className={styles.achieveTitle}>Verified Highlights:</h4>
                <ul className={styles.achieveList}>
                  {mentor.achievements.slice(0, 3).map((ach, i) => (
                    <li key={i} className={styles.achieveItem}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.checkIcon}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

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
                    View Full Profile
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
          ))}
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
                    {activeModalMentor.image ? (
                      <Image
                        src={activeModalMentor.image}
                        alt={activeModalMentor.name}
                        width={120}
                        height={120}
                        className={styles.modalAvatar}
                      />
                    ) : (
                      <div className={styles.modalAvatarFallback}>
                        {activeModalMentor.name
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </div>
                    )}
                  </div>
                  <div className={styles.modalMetaCard}>
                    <p>
                      <strong>Experience:</strong> {activeModalMentor.experience}
                    </p>
                    <p>
                      <strong>Qualification:</strong> {activeModalMentor.education}
                    </p>
                    <p>
                      <strong>Grades:</strong> {activeModalMentor.grades}
                    </p>
                  </div>
                </div>

                <div className={styles.modalMain}>
                  <h4 className={styles.modalSectionHeading}>Teaching Methodology & Bio</h4>
                  <p className={styles.modalBioText}>{activeModalMentor.bio}</p>

                  <h4 className={styles.modalSectionHeading}>Subjects Handled</h4>
                  <div className={styles.chipList}>
                    {activeModalMentor.subjects.map((sub, i) => (
                      <span key={i} className={styles.subjectChip}>
                        {sub}
                      </span>
                    ))}
                  </div>

                  <h4 className={styles.modalSectionHeading}>Curricula Expertise</h4>
                  <div className={styles.chipList}>
                    {activeModalMentor.curricula.map((curr, i) => (
                      <span key={i} className={styles.currChip}>
                        {curr}
                      </span>
                    ))}
                  </div>

                  <h4 className={styles.modalSectionHeading}>Credentials & Key Achievements</h4>
                  <ul className={styles.modalAchieveList}>
                    {activeModalMentor.achievements.map((ach, i) => (
                      <li key={i}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={styles.checkIcon}
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
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
