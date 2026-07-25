export interface UIStrings {
  nav: {
    projects: string;
    blog: string;
    contact: string;
    languageLabel: string;
    themeToggle: string;
    themePicker: string;
    menuToggle: string;
  };
  footer: {
    copy: (year: number) => string;
  };
  filter: {
    all: string;
    filterLabel: string;
    tagLabel: string;
    projectsNoun: string;
    postsNoun: string;
    showing: (visible: number | string, total: number | string, noun: string) => string;
  };
  home: {
    heroGreeting: string;
    heroName: string;
    heroLead: string;
    viewProjects: string;
    downloadCv: string;
    skillsHeading: string;
    skillsLanguages: string;
    skillsMl: string;
    skillsInfra: string;
    experienceHeading: string;
    experienceFilterAll: string;
    experienceFilterEng: string;
    experienceFilterAriaLabel: string;
    experienceNonEngLabel: string;
    educationHeading: string;
    educationCoursework: string;
    projectsHeading: string;
    projectsViewAll: string;
    blogHeading: string;
    blogAllPosts: string;
    contactHeading: string;
    contactName: string;
    contactEmail: string;
    contactSubject: string;
    contactMessage: string;
    contactSend: string;
    contactSending: string;
    contactNameLabel: string;
    contactEmailLabel: string;
    contactSubjectLabel: string;
    contactMessageLabel: string;
    contactSuccess: string;
    contactError: string;
  };
  projectsPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  blogPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  project: {
    breadcrumb: string;
    walkthrough: string;
    screenshots: string;
    architecture: string;
    relatedNotes: string;
    liveDemo: string;
    repo: string;
    allProjects: string;
    devBlog: string;
  };
  post: {
    breadcrumb: string;
    backToProject: string;
    readingTime: (minutes: number) => string;
    prev: string;
    next: string;
  };
  notFound: {
    eyebrow: string;
    title: string;
    message: string;
    cta: string;
  };
}

export const en: UIStrings = {
  nav: {
    projects: 'Projects',
    blog: 'Blog',
    contact: 'Contact',
    languageLabel: 'Language',
    themeToggle: 'Toggle light/dark mode',
    themePicker: 'Color theme',
    menuToggle: 'Toggle menu',
  },
  footer: {
    copy: (year) => `${year} Ayberk Kara — Designed and Built With Astro From Scratch`,
  },
  filter: {
    all: 'all',
    filterLabel: 'FILTER',
    tagLabel: 'TAG',
    projectsNoun: 'projects',
    postsNoun: 'posts',
    showing: (visible, total, noun) => `SHOWING ${visible} / ${total} ${noun}`,
  },
  home: {
    heroGreeting: "Hey, I'm",
    heroName: 'Ayberk',
    heroLead:
      'I\'m an engineer. I like making things well. I design and build software, and I enjoy the whole of that range, from shaping how using it feels and how beautiful it looks to designing the backstage that makes it efficient and reliable. The best part is watching something I built get used, seeing it make a task lighter or solve a problem. That is what keeps me building: not just the craft of it, but the satisfaction I get when I see the good it does once it is in people\'s hands.',
    viewProjects: 'View projects',
    downloadCv: 'Download CV',
    skillsHeading: 'SKILLS',
    skillsLanguages: 'LANGUAGES',
    skillsMl: 'ML / AI',
    skillsInfra: 'INFRA',
    experienceHeading: 'EXPERIENCE',
    experienceFilterAll: 'All',
    experienceFilterEng: 'Engineering only',
    experienceFilterAriaLabel: 'Filter experience',
    experienceNonEngLabel: 'Non-engineering',
    educationHeading: 'EDUCATION',
    educationCoursework: 'Relevant coursework & projects',
    projectsHeading: 'PROJECTS',
    projectsViewAll: 'view all projects',
    blogHeading: 'DEV BLOG & RELEASES',
    blogAllPosts: 'all posts',
    contactHeading: 'CONTACT',
    contactName: 'Name',
    contactEmail: 'Email',
    contactSubject: 'Subject',
    contactMessage: 'Message…',
    contactSend: 'Send message →',
    contactSending: 'Sending…',
    contactNameLabel: 'Your name',
    contactEmailLabel: 'Your email address',
    contactSubjectLabel: 'Subject',
    contactMessageLabel: 'Your message',
    contactSuccess: "Thanks, your message is on its way. I'll get back to you soon.",
    contactError: 'Something went wrong sending that. Please try again in a moment.',
  },
  projectsPage: {
    eyebrow: 'THE WHOLE SHELF',
    title: 'PROJECTS',
    subtitle:
      'Inference systems, GPU kernels, search infrastructure, and the small tools that make them usable. Filter by what they are built on.',
  },
  blogPage: {
    eyebrow: 'DEV NOTES & RELEASES',
    title: 'THE BLOG',
    subtitle:
      'Notes from the kernel mines — deep dives, short dev notes, and release logs. Cross-linked to the projects they came out of.',
  },
  project: {
    breadcrumb: '← PROJECTS',
    walkthrough: 'Walkthrough',
    screenshots: 'Screenshots',
    architecture: 'Architecture',
    relatedNotes: 'Related dev notes',
    liveDemo: 'Live demo ↗',
    repo: 'GitHub repo →',
    allProjects: '← all projects',
    devBlog: 'dev blog →',
  },
  post: {
    breadcrumb: '← THE BLOG',
    backToProject: '↳ back to',
    readingTime: (minutes) => `${minutes} min read`,
    prev: '← PREVIOUS',
    next: 'NEXT →',
  },
  notFound: {
    eyebrow: 'ERROR',
    title: '404 / PAGE NOT FOUND',
    message: "The page you're looking for doesn't exist or has moved.",
    cta: '← back home',
  },
};
