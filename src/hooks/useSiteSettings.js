import { useEffect, useState } from 'react';
import { fetchJson } from '../utils/api';

const fallbackSettings = {
  studioName: 'ACEN',
  navLabels: [
    { label: 'Project', path: '/project' },
    { label: "What's On", path: "/what's on" },
    { label: 'About Us', path: '/about us' },
    { label: 'Contact Us', path: '/contact us' },
  ],
  heroTagline: 'Architecture as Narrative',
  heroDescription: 'ACEN is a Jakarta-based architectural studio exploring culture, environment, and narrative through spatial research.',
  projectsSectionTitle: 'project',
  newsSectionTitle: "what's on",
  aboutSectionTitle: 'about us',
  aboutHeroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop',
  aboutParagraphs: [
    'ACEN (Architecture, Culture, Environment, Narrative) is a Jakarta-based group of architects, designers, and thinkers operating within architecture, urbanism, research, and development.',
    "Formed from the curiosity of advancing Tropical Architecture, ACEN believes architecture can be one of the most worth-exploring fields for shaping better and more sustainable responses to today's challenges.",
    'ACEN explores and experiments to redefine the value of architecture in both globalization and localization, connecting history, culture, and multidisciplinary expertise through systematic integration.',
  ],
  recognitions: ['Prix Versailles', 'WAF Finalist', 'AR Emerging Architecture', 'Building of the Year', 'Dezeen Awards', 'IAI Design Award'],
  publications: ['ArchDaily', 'Designboom', 'Gooood', 'Architizer', 'STIR World', 'Superfuture', 'Elle Decor', 'Dezeen', 'C3 Magazine', 'Designverse', 'Indesignlive', 'Tecture Mag'],
  teamSectionTitle: 'The Team',
  recognitionsSectionTitle: 'International Recognitions',
  publicationsSectionTitle: 'Featured In',
  contactSectionTitle: 'contact us',
  contactHeroText: '',
  emailInquiry: 'visionary@acen.archi',
  emailGeneral: 'studio@acen.archi',
  phone: '+62 21 1234 5678',
  instagramUrl: 'https://www.instagram.com/acenarchitects/',
  instagramHandle: '@acenarchitects',
  officeLocations: 'Jakarta - Ubud',
  formTitleOptions: ['Mr.', 'Mrs.', 'Ms.'],
  formHelpTypeOptions: ['Project Inquiry', 'Collaboration', 'Press', 'Other'],
  copyrightYear: '2025',
  footerTagline: 'All rights reserved.',
};

let settingsCache = null;

const mergeSettings = (data) => {
  const cleanData = Object.fromEntries(
    Object.entries(data || {}).filter(([, value]) => value !== null && value !== undefined)
  );
  return { ...fallbackSettings, ...cleanData };
};

export function useSiteSettings() {
  const [settings, setSettings] = useState(settingsCache || fallbackSettings);
  const [loading, setLoading] = useState(!settingsCache);

  useEffect(() => {
    let active = true;

    fetchJson('/settings')
      .then((data) => {
        if (!active) return;
        settingsCache = mergeSettings(data);
        setSettings(settingsCache);
      })
      .catch((error) => {
        console.error('Error fetching site settings, using fallback:', error);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { settings, loading };
}
