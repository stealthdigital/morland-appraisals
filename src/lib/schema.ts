/**
 * Shared JSON-LD for the site.
 *
 * `BaseLayout` emits `business` on every page, so everything else can point at
 * `BUSINESS_ID` with a bare `{ '@id': ... }` reference instead of restating the
 * firm's details. Only facts published on the site itself belong in here.
 */

const BASE = 'https://res.cloudinary.com/dj76bnpni/image/upload/';
const SITE = 'https://morlandappraisals.org';

export const BUSINESS_ID = `${SITE}/#business`;

/** Communities named on /service-area. */
const AREA_SERVED = [
  'North Bay',
  'Sudbury',
  'Warren',
  'Mattawa',
  'Sundridge',
  'Restoule',
  'Loring',
].map((name) => ({ '@type': 'City', name }));

export const business = {
  '@context': 'https://schema.org',
  // ProfessionalService is a LocalBusiness subtype and the closer fit for an
  // appraisal firm. RealEstateAgent would be wrong: they appraise, not sell.
  '@type': 'ProfessionalService',
  '@id': BUSINESS_ID,
  name: 'Morland Real Estate Appraisals Ltd',
  url: `${SITE}/`,
  telephone: '+1-705-474-3500',
  faxNumber: '+1-705-495-4423',
  email: 'info@morlandappraisals.org',
  image: `${BASE}f_auto,q_auto,w_756/v1788982277/morland-appraisals-logo-dark_phj6wc.jpg`,
  logo: `${BASE}f_auto,q_auto,w_756/v1788982277/morland-appraisals-logo-dark_phj6wc.jpg`,
  description:
    'A full service professional appraisal company approved and licensed by the Appraisal Institute of Canada, specializing in residential and commercial real estate appraisals in North Bay and Northeastern Ontario.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '382 Fraser Street',
    addressLocality: 'North Bay',
    addressRegion: 'ON',
    postalCode: 'P1B 3W7',
    addressCountry: 'CA',
  },
  hasMap: 'https://maps.google.com/?q=382+Fraser+Street+North+Bay+ON+P1B+3W7',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  ],
  areaServed: [...AREA_SERVED, { '@type': 'AdministrativeArea', name: 'Northeastern Ontario' }],
  memberOf: { '@type': 'Organization', name: 'Appraisal Institute of Canada', url: 'https://www.aicanada.ca/' },
  knowsAbout: [
    'Residential real estate appraisal',
    'Commercial real estate appraisal',
    'Hunting and fishing lodge valuation',
    'Golf course valuation',
  ],
  // TODO: add `sameAs` with the Google Business Profile URL once it is to hand,
  // and `foundingDate` once the exact year is confirmed. The site says only
  // "the late 1980s", which is not precise enough to publish as a date.
};

interface ServiceInput {
  /** Route, e.g. `/residential-appraisals`. */
  route: string;
  name: string;
  serviceType: string;
  description: string;
  /** City name for a location page; omit for a service page. */
  city?: string;
}

/** `Service` node for a service or location page, provided by the business. */
export function service({ route, name, serviceType, description, city }: ServiceInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE}${route}#service`,
    name,
    serviceType,
    description,
    provider: { '@id': BUSINESS_ID },
    areaServed: city
      ? { '@type': 'City', name: city, containedInPlace: { '@type': 'AdministrativeArea', name: 'Ontario' } }
      : { '@type': 'AdministrativeArea', name: 'Northeastern Ontario' },
  };
}

/** `ContactPage` node for /contact-us. */
export const contactPage = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${SITE}/contact-us#page`,
  name: 'Contact Morland Real Estate Appraisals',
  mainEntity: { '@id': BUSINESS_ID },
};

interface TeamMember {
  name: string;
  title: string;
  cell?: { href: string };
}

/**
 * `AboutPage` for /about-us, with a `Person` per team member.
 *
 * Designations are read off each member's published title, so a title change on
 * the page carries through to the markup rather than drifting from it.
 */
export function aboutPage(team: TeamMember[]) {
  const credential = (title: string) => {
    const match = /AACI|P\.\s?App|CRA/i.test(title) ? title.replace(/^Certified\s+/i, '').replace(/\s+Appraiser$/i, '') : null;
    return match
      ? {
          hasCredential: {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: match,
            recognizedBy: { '@type': 'Organization', name: 'Appraisal Institute of Canada' },
          },
        }
      : {};
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE}/about-us#page`,
    mainEntity: { '@id': BUSINESS_ID },
    mentions: team.map((m) => ({
      '@type': 'Person',
      name: m.name,
      jobTitle: m.title,
      worksFor: { '@id': BUSINESS_ID },
      ...(m.cell ? { telephone: m.cell.href.replace('tel:', '') } : {}),
      ...credential(m.title),
    })),
  };
}
