export interface MentorProfile {
  id: string;
  name: string;
  role: string;
  image: string;
  experience: string;
  education: string;
  subjects: string[];
  curricula: string[];
  grades: string;
  bio: string;
  achievements: string[];
  badges: string[];
  featured?: boolean;
}

export const initialMentors: MentorProfile[] = [
  {
    id: 'vidur-namdev',
    name: 'Vidur Namdev',
    role: 'Founder & Academic Director',
    image: '/images/vidur.jpg',
    experience: '8+ Years',
    education: 'Senior Academician & Master Trainer',
    subjects: ['Pure Mathematics', 'Calculus', 'Algebra', 'Physics', 'Quantitative Aptitude'],
    curricula: ['CBSE', 'ICSE', 'ISC', 'IGCSE', 'USA Common Core'],
    grades: 'Grades 8–12 & Competitive',
    bio: 'Experienced educator and Master Trainer with over 8 years of teaching expertise in Mathematics, Physics, and analytical reasoning. Trained students for school boards, Olympiads, and competitive aptitude benchmarks with a focus on first-principles conceptual clarity.',
    achievements: [
      'Master Trainer in Mathematics & Aptitude',
      'Certified Facilitator (Wadhwani Foundation)',
      'Mentored 1000+ students across school boards and competitive tracks',
      'Specialist in high-school Calculus and Foundation Mechanics',
    ],
    badges: ['Founder', 'Master Trainer', 'Verified Educator'],
    featured: true,
  },
  {
    id: 'senior-stem-mentor',
    name: 'Senior Physics & STEM Mentor',
    role: 'Physics & Secondary Science Lead',
    image: '',
    experience: '6+ Years',
    education: 'M.Sc. Physics (Specialization in Mechanics & Electrodynamics)',
    subjects: ['Physics', 'Integrated Science', 'Applied Mechanics'],
    curricula: ['CBSE', 'ICSE', 'Cambridge IGCSE'],
    grades: 'Grades 9–12',
    bio: 'Dedicated physics educator passionate about experimental demonstrations, visual problem solving, and breaking complex multi-step numericals into intuitive mental models.',
    achievements: [
      'Top-rated STEM mentor with 95%+ student score improvements',
      'Guided students to top percentiles in competitive science exams',
      'Specialist in numerical problem solving and board exam strategy',
    ],
    badges: ['Verified Educator', 'Physics Specialist'],
    featured: false,
  },
  {
    id: 'mathematics-foundations-mentor',
    name: 'Foundations & Primary Maths Specialist',
    role: 'Primary & Middle School Lead',
    image: '',
    experience: '5+ Years',
    education: 'B.Ed. & Certified Mathematical Thinker',
    subjects: ['Foundational Mathematics', 'Vedic Mental Maths', 'Geometry & Pre-Algebra'],
    curricula: ['CBSE', 'ICSE', 'Cambridge Primary'],
    grades: 'Grades 3–8',
    bio: 'Expert at eliminating math anxiety in early and middle school learners through gamified visualization, interactive puzzles, and patient step-by-step conceptual scaffolding.',
    achievements: [
      'Expert in bridging conceptual math gaps for primary students',
      '100% positive parent feedback on student confidence transformation',
      'Pioneer of interactive digital whiteboard drills for visual learners',
    ],
    badges: ['Verified Educator', 'Foundations Lead'],
    featured: false,
  },
  {
    id: 'chemistry-biology-mentor',
    name: 'Life & Chemical Sciences Mentor',
    role: 'Chemistry & Biology Faculty',
    image: '',
    experience: '5+ Years',
    education: 'Postgraduate in Chemical Sciences',
    subjects: ['Chemistry', 'Biology', 'Environmental Science'],
    curricula: ['CBSE', 'ICSE / ISC', 'IGCSE'],
    grades: 'Grades 9–12',
    bio: 'Makes organic chemistry, atomic models, and biological systems accessible and memorable through structured memory frameworks and real-world scientific analogies.',
    achievements: [
      'Helped 150+ students secure A* / 90%+ marks in board examinations',
      'Author of structured revision notes and reaction roadmaps',
      'Deep focus on diagrammatic clarity and exam question decoding',
    ],
    badges: ['Verified Educator', 'Science Specialist'],
    featured: false,
  },
];
