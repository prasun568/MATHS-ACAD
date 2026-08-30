'use client';

import React, { useState } from 'react';
import styles from './FAQAccordion.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleItem(index);
    }
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div key={index} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
            <div
              className={styles.questionButton}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              onClick={() => toggleItem(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              <h3 className={styles.question}>{item.question}</h3>
              <span className={styles.icon} aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </div>
            <div
              id={`faq-answer-${index}`}
              className={styles.answerWrapper}
              style={{
                maxHeight: isOpen ? '500px' : '0',
              }}
              aria-hidden={!isOpen}
            >
              <div className={styles.answer}>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
