export interface ExperienceEntry {
  title: string;
  org: string;
  range: string;
  summary?: string;
  bullets?: string[];
  eng: boolean;
}

export interface EducationEntry {
  degree: string;
  org: string;
  location?: string;
  range: string;
  summary?: string;
  bullets?: string[];
  highlight: boolean;
}

export const stats = ['5+ yrs', '30+ models shipped', 'OSS maintainer'];

export const skills = {
  languages: ['Python', 'C++', 'CUDA', 'Rust', 'Go', 'TypeScript', 'SQL'],
  ml: ['PyTorch', 'Triton', 'Transformers', 'LangChain', 'vLLM', 'ONNX'],
  infra: ['Docker', 'Kubernetes', 'Postgres', 'Redis', 'Terraform', 'GitHub Actions', 'Cloudflare'],
};

export const experience: ExperienceEntry[] = [
  {
    title: 'Full Stack Developer Intern',
    org: 'Mimiqit Oy (Espoo, Finland)',
    range: 'Jul 2024 — Oct 2024',
    summary:
      'Took a two-person team’s social app from concept to launch, building the database, auth, and core social features end to end.',
    bullets: [
      'Part of a two-person team that designed and launched CyphrSpace, a social media app, from concept to full release.',
      'Designed and managed the database using Firebase and AWS for user interactions and media content.',
      'Implemented user authentication, including sign-in, sign-up, and backend services for managing accounts.',
      'Built following, messaging, comments, likes, and shares functionality.',
      'Built and optimized profile management — editing profiles, following others, and managing settings.',
      'Created video recording/publishing features and image editing tools, including cropping and camera access.',
    ],
    eng: true,
  },
  {
    title: 'Food & Beverage Attendant',
    org: 'Cinder House, Four Seasons Hotel St. Louis (MO, USA)',
    range: 'Jun 2023 — Sep 2023',
    summary:
      'Covered food runner, barback, banquet, and pool service shifts at an elite restaurant, often working 100-hour weeks.',
    bullets: [
      'Undertook food runner, barback, banquet server, and pool server roles, demonstrating adaptability and teamwork in a fast-paced elite restaurant.',
      'Developed strong teamwork skills, English speaking proficiency, and the ability to work under intense pressure over an average of 100 hours per week.',
    ],
    eng: false,
  },
  {
    title: 'Backend Developer',
    org: 'BIST100 Stock Market Prediction Research Project',
    range: 'Apr 2023 — Jul 2023',
    summary:
      'Helped build the backend for a national-scale stock-market prediction project alongside senior engineers.',
    bullets: [
      'Worked on a national-scale project involving data management and analysis.',
      'Collaborated with senior backend developers to build RESTful APIs using ASP.NET Core MVC and C#.',
      'Participated in designing and optimizing the database schema for improved performance and scalability.',
      'Worked closely with frontend developers to integrate backend functionality into the user interface.',
      'Contributed to code reviews, providing feedback on code optimization and maintainability.',
    ],
    eng: true,
  },
  {
    title: 'Research Assistant',
    org: 'PURE — Program for Undergraduate Research',
    range: 'Sep 2022 — Feb 2023',
    summary:
      'Ran an NLP study on employee survey data to surface what drives organizational trust and engagement.',
    bullets: [
      'Conducted an academic research study using NLP to process and evaluate 1,120 open-ended employee survey responses from 60 organizations.',
      'Used sentiment analysis, BERTopic-based topic modeling, and exploratory clustering techniques.',
      'Identified key drivers of organizational trust and workforce engagement.',
    ],
    eng: true,
  },
];

export const education: EducationEntry[] = [
  {
    degree: 'B.S. Computer Science',
    org: 'Sabancı University',
    location: 'Istanbul, Tuzla',
    range: 'Sep 2021 — Jun 2025',
    summary:
      'Honors-track CS degree with a 3.69 GPA, full scholarship, and a top 0.0003% national university entrance ranking.',
    bullets: [
      'Honor Scholarship — full (100%) tuition scholarship.',
      'Dean’s List with high honors in all 5 semesters.',
      'Cumulative GPA 3.69 / 4.0.',
      'Ranked in the top 0.0003% among 2.6 million participants in the Turkish National University Examination (YKS 2021).',
      'Coursework: Computational Approach to Problem-Solving (Python), Advanced Programming (C++), Logic & Digital System Design (Verilog), Introduction to Data Science (Python), Mobile Application Development (Java, Kotlin), Systems Modelling & Control (MATLAB Simulink), Internet of Things, Programming Languages (Flex, Bison, Basic Ada), Database Systems (MySQL), Machine Learning, Software Engineering, Data Structures, Algorithms.',
    ],
    highlight: true,
  },
];
