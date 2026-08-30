import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import IntroAnimationWrapper from '@/components/IntroAnimationWrapper';

export const metadata: Metadata = {
  title: 'The MathMatriX Academy | Personalized Online Classes for Grades 3–12',
  description:
    'Elite concept-based online tutoring for CBSE, ICSE, ISC, IGCSE & USA Curricula. Mathematics, Science, Physics, Chemistry, Biology, Economics, and Computer Science.',
  keywords: [
    'Online Maths Classes',
    'Online Classes for Grades 3-12',
    'CBSE Online Classes',
    'ICSE Online Classes',
    'IGCSE Online Classes',
    'Personalized Online Learning',
    'Academic Assessment',
    'Tutor for Physics and Chemistry',
    'Coding and Computer Science Tutor',
  ],
  authors: [{ name: 'Vidur Namdev', url: 'mailto:themathmatrixacademy@gmail.com' }],
  creator: 'Vidur Namdev',
  publisher: 'The MathMatriX Academy',
  openGraph: {
    title: 'The MathMatriX Academy | Personalized Online Classes for Grades 3–12',
    description:
      'Bridge learning gaps and build academic confidence. Dedicated 1-on-1 and small group online tutoring for Grades 3–12 by verified subject experts.',
    url: 'https://themathmatrixacademy.com',
    siteName: 'The MathMatriX Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The MathMatriX Academy | Online Tutoring for Grades 3–12',
    description:
      'Personalized academic coaching in Maths, Science, English & Coding for CBSE, ICSE, IGCSE & USA boards.',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <IntroAnimationWrapper>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </IntroAnimationWrapper>
      </body>
    </html>
  );
}
