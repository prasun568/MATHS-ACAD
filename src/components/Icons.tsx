import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const GraduationCapIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
  </svg>
);

export const TargetIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

export const BarChartIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

export const BrainIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22a7 7 0 0 0 7-7c0-2.41-1.35-3.86-3-4.58A6 6 0 0 0 6 8.5C6 11.23 8.35 12 10 13a7 7 0 0 0 2 9Z"/>
    <path d="M12 2a5 5 0 0 0-5 5c0 1 .5 2 1 3"/>
    <path d="M12 2a5 5 0 0 1 5 5c0 1-.5 2-1 3"/>
  </svg>
);

export const ChatIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

export const LaptopIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
    <line x1="12" y1="17" x2="12" y2="20"/>
  </svg>
);

export const RulerIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2L5 3z"/>
    <line x1="6" y1="18" x2="6" y2="18.01"/>
    <line x1="10" y1="18" x2="10" y2="18.01"/>
    <line x1="14" y1="18" x2="14" y2="18.01"/>
    <line x1="18" y1="18" x2="18" y2="18.01"/>
    <line x1="6" y1="14" x2="6" y2="14.01"/>
    <line x1="6" y1="10" x2="6" y2="10.01"/>
    <line x1="6" y1="6" x2="6" y2="6.01"/>
  </svg>
);

export const TestTubeIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"/>
    <path d="M16 19a4 4 0 0 1-8 0V7h8v12z"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
  </svg>
);

export const LightningIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

export const AtomIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/>
    <path d="M12 5c-4.4 0-8 2-8 4.5S7.6 14 12 14s8-2 8-4.5S16.4 5 12 5z"/>
    <path d="M12 10c-4.4 0-8 2-8 4.5s3.6 4.5 8 4.5 8-2 8-4.5-3.6-4.5-8-4.5z"/>
  </svg>
);

export const LeafIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2z"/>
    <path d="M19 2L11 20"/>
  </svg>
);

export const BookIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

export const TrendingUpIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

export const InstagramIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

export const renderPremiumIcon = (iconKey: string, className?: string) => {
  const props = { className, size: 28, style: { strokeWidth: 2, color: 'var(--secondary)' } };
  switch (iconKey) {
    case 'graduation-cap': return <GraduationCapIcon {...props} />;
    case 'target': return <TargetIcon {...props} />;
    case 'bar-chart': return <BarChartIcon {...props} />;
    case 'brain': return <BrainIcon {...props} />;
    case 'chat': return <ChatIcon {...props} />;
    case 'laptop': return <LaptopIcon {...props} />;
    case 'ruler': return <RulerIcon {...props} />;
    case 'test-tube': return <TestTubeIcon {...props} />;
    case 'lightning': return <LightningIcon {...props} />;
    case 'atom': return <AtomIcon {...props} />;
    case 'leaf': return <LeafIcon {...props} />;
    case 'book': return <BookIcon {...props} />;
    case 'trending-up': return <TrendingUpIcon {...props} />;
    case 'instagram': return <InstagramIcon {...props} />;
    default: return null;
  }
};
