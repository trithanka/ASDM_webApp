export const BASE_URL = 'https://skillmissionassam.org';
export const JOBMELA_URL = 'https://skillmissionassam.org/jobmela/';
export const EXTERNAL_EMP_EXCHANGE_URL =
  'https://sewasetu.assam.gov.in/site/service-apply/re-registration-of-employment-seeker-in-employment-exchange';
export const ACTIVE_COLOR = 'rgba(52, 211, 153, 0.8)';

export const ONLINE_COURSE_LINKS = [
  { 
    label: 'SOAR-Skilling for AI Readiness', 
    description: 'Build practical, industry- relevant cybersecurity and AI skills through interactive online learning', 
    url: 'https://www.skillindiadigital.gov.in/soar-redirection',
    image: 'https://asdm.assam.gov.in/sites/default/files/styles/76x84/public/swf_utility_folder/departments/egm_labour_uneecopscloud_com_oid_15/slider/soar.jpg?itok=QlKfAkko'
  },
  { 
    label: 'Future Skills Prime', 
    description: 'Acquire industry-relevant skills to grow in your career and stand out to prospective employers.', 
    url: 'https://www.futureskillsprime.in/',
    image: 'https://www.futureskillsprime.in/per/g10/pub/32914/iDH/instance/1/template/4/final/image/future_skill.webp'
  },
  { 
    label: 'Skill India Digital Sectors', 
    description: 'Explore Skill India Digital Sector Skill Courses', 
    url: 'https://www.skillindiadigital.gov.in/sector/list?forCourse=true',
    image: 'https://www.ibef.org/uploads/govtschemes/skill-India-july-2025.png'
  },
  { 
    label: 'NIIT Foundation Digital SKILLS', 
    description: 'Land your dream job and safeguard your future !', 
    url: 'https://niitfoundation.org/skilling_program/',
    image: 'https://niitfoundation.org/wp-content/uploads/2023/10/niitfoundatinLogonew.png'
  },
  { 
    label: 'Wadhani Foundation', 
    description: 'Curated collection of courses to help you gain skills to break into a new career or advance your current career', 
    url: 'https://wadhwanifoundation.org/',
    image: 'https://asdm.assam.gov.in/sites/default/files/styles/76x84/public/swf_utility_folder/departments/egm_labour_uneecopscloud_com_oid_15/slider/580-01.png?itok=MRP2D1Qt'
  }
];

export const EXTERNAL_LINKS = [

  { label: 'Advancing North East Web Portal', description: 'Career and livelihood resources for North East youth', url: 'https://www.advancingnortheast.in/' },
  { label: 'Emp Exchange', description: 'Register to get Employment Exchange number in Assam', url: EXTERNAL_EMP_EXCHANGE_URL },
  { label: 'নিyukti', description: 'State recruitment listings', url: 'https://niyukti.assam.gov.in/' },
  { label: 'Assam Career', description: 'Jobs and recruitment updates in Assam', url: 'https://www.assamcareer.com/' },
  { label: 'National Career Service Portal', description: 'Career and livelihood resources for North East youth', url: 'https://betacloud.ncs.gov.in/' },
  { label: 'Naukri', description: 'National job opportunities portal', url: 'https://www.naukri.com/' },
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
    url: `https://wa.me/?text=${encodeURIComponent('Check out ASDM Prativa courses: ' + BASE_URL + '/course/')}`,
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
  { label: 'Self Learn', url: '/online-course/', type: 'onlineCourse', icon: 'book-open-variant-outline' },
  { label: 'Job Board', url: '/jobboard/', type: 'internal', icon: 'clipboard-text-outline' },
  { label: 'Job Mela', url: JOBMELA_URL, type: 'jobmela', icon: 'briefcase-outline' },
  { label: 'More', url: null, type: 'externalModal', icon: 'menu' },
];

