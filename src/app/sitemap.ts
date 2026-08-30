import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://themathmatrixacademy.com';
  const routes = [
    '',
    '/about',
    '/programs',
    '/curricula',
    '/subjects',
    '/how-it-works',
    '/results',
    '/faqs',
    '/contact',
    '/apply-mentor',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));
}
