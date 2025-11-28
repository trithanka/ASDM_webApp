export const BASE_URL = 'https://skillmissionassam.org';
export const JOBMELA_URL = 'https://skillmissionassam.org/jobmela/';
export const SCHEME_URL = `${BASE_URL}/course/scheme/`;
export const EXTERNAL_EMP_EXCHANGE_URL =
  'https://sewasetu.assam.gov.in/site/service-apply/re-registration-of-employment-seeker-in-employment-exchange';
export const ACTIVE_COLOR = 'rgba(52, 211, 153, 0.8)';

export const EXTERNAL_LINKS = [
  { label: 'Emp Exchange', description: 'Register to get Employment Exchange number in Assam', url: EXTERNAL_EMP_EXCHANGE_URL },
  { label: 'নিyukti', description: 'State recruitment listings', url: 'https://niyukti.assam.gov.in/' },
  { label: 'Assam Career', description: 'Jobs and recruitment updates in Assam', url: 'https://www.assamcareer.com/' },
  { label: 'Advancing North East Web Portal', description: 'Career and livelihood resources for North East youth', url: 'https://www.advancingnortheast.in/' },
  { label: 'National Career Service Portal', description: 'Career and livelihood resources for North East youth', url: 'https://betacloud.ncs.gov.in/' },
  { label: 'Naukri', description: 'National job opportunities portal', url: 'https://www.naukri.com/' },

  { label: 'NIIT Foundation Digital SKILLS', description: 'NIIT Foundation skill programs', url: 'https://niitfoundation.org/skilling_program/' },
  { label: 'Wadhani Foundation', description: 'Wadhani Foundation Employability skills', url: 'https://skilling.wadhwanifoundation.org/en/guest' },
  { label: 'Skill India Digital Sectors', description: 'Skill India Digital Sectors', url: 'https://www.skillindiadigital.gov.in/sector/list?forCourse=true' }
];

export const SOCIAL_LINKS = [
  // {
  //   label: 'Facebook',
  //   icon: 'facebook',
  //   url: 'https://www.facebook.com/share/1AKLXgk7yV/?mibextid=wwXIfr',
  //   bgColor: '#1877f2',
  // },
  {
    label: 'WhatsApp',
    icon: 'whatsapp',
    url: 'https://wa.me/?text=Hello%20ASDM%20Prativa',
    bgColor: '#25D366',
  },
  // {
  //   label: 'Instagram',
  //   icon: 'instagram',
  //   url: 'https://www.instagram.com/asdmassam/',
  //   bgColor: '#E1306C',
  // },
];

export const MENU_ITEMS = [
  { label: 'Course', url: '/course/', type: 'course', icon: 'school-outline' },
  { label: 'Scheme', url: '/course/scheme/', type: 'internal', icon: 'star-outline' },
  { label: 'Job Board', url: '/jobboard/', type: 'internal', icon: 'clipboard-text-outline' },
  { label: 'Job Mela', url: JOBMELA_URL, type: 'jobmela', icon: 'briefcase-outline' },
  { label: 'More', url: null, type: 'externalModal', icon: 'menu' },
];

