import React from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import FAQAccordion from '@/components/FAQAccordion';
import AssessmentForm from '@/components/AssessmentForm';
import { renderPremiumIcon } from '@/components/Icons';
import styles from './page.module.css';

export default function Home() {
  const benefits = [
    {
      title: 'Expert & Verified Mentors',
      description: 'Experienced educators selected through a rigorous process for subject knowledge and teaching ability.',
      icon: 'graduation-cap',
    },
    {
      title: 'Personalized Attention',
      description: 'One-to-one and highly focused small-group classes customized specifically to your child\'s learning speed.',
      icon: 'target',
    },
    {
      title: 'Regular Assessments',
      description: 'Frequent assessments, mock tests, assignments, and detailed progress tracking to identify improvement areas.',
      icon: 'bar-chart',
    },
    {
      title: 'Concept-Based Learning',
      description: 'Focusing on building strong foundational concepts and analytical thinking, moving away from rote memorization.',
      icon: 'brain',
    },
    {
      title: 'Transparent Parent Feedback',
      description: 'Structured progress reports, active mentor communications, and alignment on your child\'s developmental needs.',
      icon: 'chat',
    },
    {
      title: 'Interactive Online Classes',
      description: 'Live interactive tools, convenient learning from home, flexible scheduling, and active visual environments.',
      icon: 'laptop',
    },
  ];

  const programs = [
    {
      grades: 'Grades 3–5',
      focus: 'Primary Foundation',
      subjects: 'Mathematics, Science, English, School-Support subjects.',
      desc: 'Nurtures interest and curiosity while establishing key math, spelling, and reading skills.',
      cta: 'Request Primary Support',
    },
    {
      grades: 'Grades 6–8',
      focus: 'Middle School Concepts',
      subjects: 'Mathematics, Science, English, Social Science, Computer Science.',
      desc: 'Transition from basic operations to logical thinking, algebra, chemistry basics, and literature.',
      cta: 'Explore Middle School Plans',
    },
    {
      grades: 'Grades 9–10',
      focus: 'Secondary & Board Prep',
      subjects: 'Mathematics, Science, English, Social Science, Computer Science, and board exams.',
      desc: 'Rigorous academic preparation focusing on CBSE/ICSE board patterns, deep science concepts, and mock tests.',
      cta: 'Schedule Board Preparation',
    },
    {
      grades: 'Grades 11–12',
      focus: 'Higher Secondary Specialization',
      subjects: 'Mathematics, Physics, Chemistry, Biology, Economics, English, Computer Science & IT.',
      desc: 'Advanced level subjects focused on board performance, conceptual depth, and preparatory alignment.',
      cta: 'Consult Academic Counselor',
    },
  ];

  const curricula = [
    { name: 'CBSE', desc: 'Central Board of Secondary Education. Standard national curriculum.' },
    { name: 'ICSE / ISC', desc: 'Indian Certificate of Secondary Education. High English standards and comprehensive science.' },
    { name: 'IGCSE', desc: 'International General Certificate of Secondary Education. Global analytical curriculum.' },
    { name: 'Cambridge', desc: 'Cambridge International Curriculum. Focus on research and critical thinking.' },
    { name: 'USA Curriculum', desc: 'Grade-level support matching US Common Core standards (Algebra 1/2, Geometry, Calculus, Physics).' },
  ];

  const subjectsList = [
    { name: 'Mathematics', icon: 'ruler' },
    { name: 'Science (Grades 3-10)', icon: 'test-tube' },
    { name: 'English Literature & Lang', icon: 'book' },
    { name: 'Physics (Grades 11-12)', icon: 'lightning' },
    { name: 'Chemistry (Grades 11-12)', icon: 'atom' },
    { name: 'Biology (Grades 11-12)', icon: 'leaf' },
    { name: 'Economics', icon: 'trending-up' },
    { name: 'Computer Science & IT', icon: 'laptop' },
  ];

  const steps = [
    {
      num: '01',
      title: 'Tell Us About Your Child',
      desc: 'Fill out a simple enquiry form. Share grade level, board, and subject requirements.',
    },
    {
      num: '02',
      title: 'Free Academic Assessment',
      desc: 'Our counselor conducts an assessment session to understand strengths and identify concept gaps.',
    },
    {
      num: '03',
      title: 'Meet the Mentor',
      desc: 'Attend a free live demo/trial class with a verified educator matching your child\'s profile.',
    },
    {
      num: '04',
      title: 'Personalized Learning Plan',
      desc: 'Get recommended session packages, lesson outlines, and flexible timing allocations.',
    },
    {
      num: '05',
      title: 'Learn and Track Progress',
      desc: 'Begin regular interactive online classes, get weekly reports, and see confidence grow.',
    },
  ];

  const faqs = [
    {
      question: 'Are classes one-to-one?',
      answer: 'Yes, we offer both dedicated 1-on-1 private tutoring and small-group interactive cohorts (typically capped at 3-5 students). This ensures that every child receives proper attention and learns at their own comfortable pace.',
    },
    {
      question: 'Which grades do you teach?',
      answer: 'We provide academic coaching and tutoring support for school students in Grades 3 all the way through Grade 12.',
    },
    {
      question: 'Which boards do you teach?',
      answer: 'We cover all major local and global boards: CBSE (national board), ICSE/ISC (council board), IGCSE/Cambridge (international syllabus), and US Curriculum Common Core standards.',
    },
    {
      question: 'Do you offer a trial class?',
      answer: 'Yes, once you fill out the Academic Assessment Form, we will arrange a complimentary assessment, followed by a free trial/demo session with the proposed subject mentor.',
    },
    {
      question: 'How are mentors selected?',
      answer: 'Our mentors undergo a thorough selection process. We review their educational credentials, test their subject knowledge, assess their communication ability, and verify their prior teaching experience before onboarding them.',
    },
    {
      question: 'How do parents track progress?',
      answer: 'We maintain complete transparency. Parents receive detailed monthly assessment reports, mock test scores, updates on completed homework, and direct feedback from the subject mentor.',
    },
    {
      question: 'Can classes be scheduled around our availability?',
      answer: 'Yes, we offer flexible timing slots. You can pick evening or weekend batches that align with your child\'s school schedule and other extra-curricular timings.',
    },
    {
      question: 'Do you teach students outside India?',
      answer: 'Yes, our online classes support students across multiple time zones (including Middle East, UK, US, and Southeast Asia) with curricula suited for those regions.',
    },
    {
      question: 'How do I get started?',
      answer: 'The best way is to fill out our Free Academic Assessment form. Our team will contact you on WhatsApp to organize a quick diagnostic call.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        {/* Background Visual Wrapper with Split Curve and Mother-Child Photo */}
        <div className={styles.heroBackground}>
          <div className={styles.heroImageWrapper}>
            <Image
              src="/images/mother-child-hero.jpg"
              alt="An Indian mother and her son smiling and learning mathematics online using a laptop screen"
              fill
              className={styles.heroImage}
              priority
            />
          </div>
          {/* Curved SVG overlay defining the split and the golden border line */}
          <div className={styles.heroSvgOverlay}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.splitSvg}>
              {/* Left navy blue solid shape */}
              <path d="M 0 0 H 62 C 57 30, 50 70, 42 100 H 0 Z" fill="#061320" />
              {/* Golden dividing line */}
              <path d="M 62 0 C 57 30, 50 70, 42 100" fill="none" stroke="#B8860B" strokeWidth="0.5" />
              {/* Math floating symbols floating in background */}
              <text x="10" y="25" fill="rgba(255, 255, 255, 0.05)" fontSize="4" fontFamily="var(--font-headings)" fontWeight="bold">a² + b² = c²</text>
              <text x="35" y="15" fill="rgba(255, 255, 255, 0.05)" fontSize="3" fontFamily="var(--font-headings)" fontWeight="bold">a</text>
              <text x="42" y="32" fill="rgba(255, 255, 255, 0.05)" fontSize="3" fontFamily="var(--font-headings)" fontWeight="bold">b</text>
              <text x="30" y="35" fill="rgba(255, 255, 255, 0.05)" fontSize="3" fontFamily="var(--font-headings)" fontWeight="bold">c</text>
              {/* Small triangle representing geometric shapes */}
              <path d="M 32 18 L 40 30 L 32 30 Z" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.2" />
              <text x="15" y="55" fill="rgba(255, 255, 255, 0.05)" fontSize="4.5" fontFamily="var(--font-headings)" fontWeight="bold">d/dx(x²) = 2x</text>
              <text x="25" y="80" fill="rgba(255, 255, 255, 0.05)" fontSize="4" fontFamily="var(--font-headings)" fontWeight="bold">y = sin x</text>
              {/* Small wave */}
              <path d="M 5 80 Q 12 75 20 80 T 32 80" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.25" />
            </svg>
          </div>
        </div>

        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              {/* Badge: Trusted by Parents. Loved by Students. */}
              <div className={styles.heroBadgeBox}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.shieldIcon}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span className={styles.heroBadgeText}>Trusted by Parents. Loved by Students.</span>
              </div>

              {/* Headline matching screenshot layout */}
              <h1 className={styles.heroTitle}>
                <span className={styles.whiteText}>Stronger Concepts.</span>
                <span className={styles.goldText}>Better Grades.</span>
                <span className={styles.whiteText}>Brighter Future.</span>
              </h1>

              {/* Subtitle */}
              <p className={styles.heroSubtitle}>
                Personalized online classes for Grades 3–12.<br />
                Expert mentors. Concept-based learning. Real results.
              </p>

              {/* Curricula Pills */}
              <div className={styles.curriculaBox}>
                <span className={styles.curriculumPill}>CBSE</span>
                <span className={styles.divider}>|</span>
                <span className={styles.curriculumPill}>ICSE</span>
                <span className={styles.divider}>|</span>
                <span className={styles.curriculumPill}>ISC</span>
                <span className={styles.divider}>|</span>
                <span className={styles.curriculumPill}>IGCSE / Cambridge</span>
                <span className={styles.divider}>|</span>
                <span className={styles.curriculumPill}>USA Curriculum</span>
              </div>


              {/* CTAs */}
              <div className={styles.heroCtas}>
                <Button variant="secondary" size="lg" href="#assessment" className={styles.ctaPrimary}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.calendarIcon}>
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  BOOK FREE ASSESSMENT
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  href="https://wa.me/918319531258?text=Hello%20MathMatriX%20Academy%2C%20I%20would%20like%20to%20know%20more%20about%20your%20online%20classes."
                  external
                  className={styles.ctaSecondary}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.whatsappIcon}>
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  WHATSAPP US
                </Button>
              </div>

              {/* Social Proof */}
              <div className={styles.socialProof}>
                <div className={styles.avatarStack}>
                  <div className={`${styles.avatar} ${styles.avatarGreen}`}>PA</div>
                  <div className={`${styles.avatar} ${styles.avatarGold}`}>SR</div>
                  <div className={`${styles.avatar} ${styles.avatarSage}`}>NK</div>
                  <div className={`${styles.avatar} ${styles.avatarCream}`}>MD</div>
                </div>
                <span className={styles.socialProofText}>1000+ Parents trust our personalized learning approach</span>
              </div>
            </div>
            {/* The right column is empty on desktop to let the mother-child photo background show through cleanly */}
            <div className={styles.emptyCol}></div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section">
        <div className="container">
          <SectionHeading
            title="Why Parents Choose Us"
            subtitle="We don't just prepare children for exams; we build active learning habits and mental clarity."
            centered
          />
          <div className="grid-3">
            {benefits.map((b, idx) => (
              <div key={idx} className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  {renderPremiumIcon(b.icon)}
                </div>
                <h3 className={styles.benefitTitle}>{b.title}</h3>
                <p className={styles.benefitDesc}>{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Programs */}
      <section className="section-alt" id="programs">
        <div className="container">
          <SectionHeading
            title="Tailored Academic Programs"
            subtitle="Customized syllabus coverage matching different learning milestones from primary foundation to high school boards."
            centered
          />
          <div className="grid-2">
            {programs.map((p, idx) => (
              <div key={idx} className={styles.programCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardBadge}>{p.focus}</span>
                  <h3 className={styles.cardGrades}>{p.grades}</h3>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cardSubjects}>
                    <strong>Subjects Covered:</strong> {p.subjects}
                  </p>
                  <p className={styles.cardDesc}>{p.desc}</p>
                </div>
                <div className={styles.cardFooter}>
                  <Button variant="outline" size="sm" href="#assessment" className={styles.cardCta}>
                    {p.cta} &rarr;
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curricula Section */}
      <section className="section">
        <div className="container">
          <SectionHeading
            title="Curricula We Support"
            subtitle="Our mentors are trained in board-specific methodologies to provide targeted homework and preparation support."
            centered
          />
          <div className={styles.curriculumFlex}>
            {curricula.map((c, idx) => (
              <div key={idx} className={styles.curriculumCard}>
                <h3 className={styles.curriculumName}>{c.name}</h3>
                <p className={styles.curriculumDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="section-alt" id="subjects">
        <div className="container">
          <SectionHeading
            title="Subjects We Teach"
            subtitle="Engaging lessons in core STEM fields and languages to foster conceptual understanding."
            centered
          />
          <div className="grid-4">
            {subjectsList.map((s, idx) => (
              <div key={idx} className={styles.subjectCard}>
                <div className={styles.subjectIcon}>{renderPremiumIcon(s.icon)}</div>
                <h4 className={styles.subjectName}>{s.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section" id="how-it-works">
        <div className="container">
          <SectionHeading
            title="How It Works"
            subtitle="A transparent, child-centric 5-step journey to ensure compatibility, conceptual clarity, and results."
            centered
          />
          <div className={styles.processSteps}>
            {steps.map((s, idx) => (
              <div key={idx} className={styles.stepCard}>
                <div className={styles.stepNum}>{s.num}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1-on-1 vs Small Group Comparison */}
      <section className="section-alt">
        <div className="container">
          <SectionHeading
            title="Choose the Best Fit for Your Child"
            subtitle="We offer two structured formats to support different learning styles and budgets."
            centered
          />
          <div className={`grid-2 ${styles.comparisonSection}`}>
            <div className={styles.comparisonCard}>
              <div className={styles.compHeader}>
                <span className={styles.compBadge}>Maximum Focus</span>
                <h3 className={styles.compTitle}>One-to-One Private Tutoring</h3>
              </div>
              <ul className={styles.compList}>
                <li>Individual undivided teacher attention</li>
                <li>Customized pace tailored to the student</li>
                <li>Instant resolution of doubts</li>
                <li>Flexible scheduling built around child's routines</li>
              </ul>
              <Button variant="primary" href="#assessment" className={styles.compBtn}>
                Request Private Sessions
              </Button>
            </div>

            <div className={styles.comparisonCard}>
              <div className={styles.compHeader}>
                <span className={styles.compBadge}>Collaborative Learning</span>
                <h3 className={styles.compTitle}>Small Group Batches (Max 3-5)</h3>
              </div>
              <ul className={styles.compList}>
                <li>Interactive learning with peer discussion</li>
                <li>Competitive and encouraging environment</li>
                <li>More affordable investment per class</li>
                <li>Collaborative problem solving and challenges</li>
              </ul>
              <Button variant="outline" href="#assessment" className={styles.compBtn}>
                Explore Group Classes
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Planner (Encourage Enquiries) */}
      <section className="section">
        <div className={`container ${styles.plannerContainer}`}>
          <div className={styles.plannerContent}>
            <h2 className={styles.plannerTitle}>Find the Right Learning Plan</h2>
            <p className={styles.plannerDesc}>
              Academic needs vary by grade, board, and subject depth. Tell us your requirements and we will build a custom billing proposal that works for you.
            </p>
            <div className={styles.plannerCta}>
              <Button
                variant="whatsapp"
                size="lg"
                href="https://wa.me/918319531258?text=Hello%20MathMatriX%20Academy%2C%20I%20would%20like%20a%20pricing%20quote%20for%20classes."
                external
              >
                REQUEST CUSTOM TIMELINE & PRICING QUOTE
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Free Academic Assessment Conversion Form */}
      <section className={styles.assessmentSection} id="assessment">
        <div className={`container ${styles.assessmentGrid}`}>
          <div className={styles.assessmentInfo}>
            <span className="badge badge-secondary">LIMITED SLOTS AVAILABLE</span>
            <h2 className={styles.assessTitle}>Give Your Child a FREE Academic Assessment</h2>
            <p className={styles.assessDesc}>
              Our assessments are not competitive tests. They are diagnostic reviews designed by senior academics to understand:
            </p>
            <ul className={styles.assessList}>
              <li><strong>Concept Clarity:</strong> Core formulas or grammar structures they struggle to apply.</li>
              <li><strong>Strengths:</strong> Subjects and styles where they excel.</li>
              <li><strong>Learning Gaps:</strong> Key syllabus items they missed in prior semesters.</li>
              <li><strong>Academic Level:</strong> Their performance in comparison to curriculum standards.</li>
              <li><strong>Improvement Strategy:</strong> Practical steps to bridge concepts and boost marks.</li>
            </ul>
            <div className={styles.assessTrust}>
              <p>🎓 Over 40+ points evaluated by verified education experts.</p>
            </div>
          </div>
          <div className={styles.assessmentFormWrapper}>
            <AssessmentForm />
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="section" id="faq">
        <div className="container">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our enrollment process, classes, and tutor credentials."
            centered
          />
          <FAQAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}
