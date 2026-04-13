export type BusinessDirectoryEntry = {
  slug: string;
  name: string;
  logoSrc: string;
  logoAlt: string;
  schedule: string;
  unit: string;
  section: 'services' | 'more-options';
  badge?: string;
};

export const BUSINESS_DIRECTORY: BusinessDirectoryEntry[] = [
  {
    slug: 'agua-de-puebla',
    name: 'Agua de Puebla',
    logoSrc: 'images/logosLocales/local1.jpg',
    logoAlt: 'Logo de Agua de Puebla',
    schedule: 'Lun-Vie 9:00 - 18:00',
    unit: 'Local 1',
    section: 'services',
  },
  {
    slug: 'dhl',
    name: 'DHL',
    logoSrc: 'images/logosLocales/local2.svg',
    logoAlt: 'Logo de DHL',
    schedule: 'Lun-Sab 9:00 - 18:00',
    unit: 'Local 2',
    section: 'services',
  },
  {
    slug: 'ecoclean',
    name: 'EcoClean',
    logoSrc: 'images/logosLocales/local3.png',
    logoAlt: 'Logo de EcoClean',
    schedule: 'Lun-Dom 9:00 - 18:00',
    unit: 'Local 3',
    section: 'services',
    badge: 'Nuevo',
  },
  {
    slug: 'local-4',
    name: 'Local 4',
    logoSrc: 'images/logosLocales/logodefault.png',
    logoAlt: 'Logo de Local 4',
    schedule: 'Lun-Dom 9:00 - 18:00',
    unit: 'Local 4',
    section: 'services',
  },
  {
    slug: 'local-5',
    name: 'Local 5',
    logoSrc: 'images/logosLocales/logodefault.png',
    logoAlt: 'Logo de Local 5',
    schedule: 'Lun-Dom 9:00 - 18:00',
    unit: 'Local 5',
    section: 'services',
  },
  {
    slug: 'prime-fitness',
    name: 'Prime Fitness',
    logoSrc: 'images/logosLocales/logodefault.png',
    logoAlt: 'Logo de Prime Fitness',
    schedule: 'Lun-Sab 6:00 - 23:00',
    unit: 'Local 6',
    section: 'more-options',
  },
  {
    slug: 'optica-vision',
    name: 'Óptica Visión',
    logoSrc: 'images/logosLocales/logodefault.png',
    logoAlt: 'Logo de Óptica Visión',
    schedule: 'Lun-Sab 10:00 - 20:00',
    unit: 'Local 7',
    section: 'more-options',
    badge: 'Popular',
  },
  {
    slug: 'la-cueva-bistro',
    name: 'La Cueva Bistro',
    logoSrc: 'images/logosLocales/logodefault.png',
    logoAlt: 'Logo de La Cueva Bistro',
    schedule: 'Lun-Dom 13:00 - 23:00',
    unit: 'Local 8',
    section: 'more-options',
  },
  {
    slug: 'kids-zone',
    name: 'Kids Zone',
    logoSrc: 'images/logosLocales/logodefault.png',
    logoAlt: 'Logo de Kids Zone',
    schedule: 'Lun-Dom 11:00 - 21:00',
    unit: 'Local 9',
    section: 'more-options',
  },
  {
    slug: 'pet-boutique',
    name: 'Pet Boutique',
    logoSrc: 'images/logosLocales/logodefault.png',
    logoAlt: 'Logo de Pet Boutique',
    schedule: 'Lun-Dom 10:00 - 20:30',
    unit: 'Local 10',
    section: 'more-options',
  },
];

export function getBusinessBySlug(slug: string | null): BusinessDirectoryEntry | undefined {
  return BUSINESS_DIRECTORY.find((business) => business.slug === slug);
}