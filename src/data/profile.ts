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
  coursework?: string[];
  highlight: boolean;
}

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
    title: 'Backend Developer Intern',
    org: 'OdakGIS (Ankara, Turkiye)',
    range: 'Jun 2022 — Sep 2022',
    summary:
      'Helped build the backend for a national-scale data management and analysis project alongside senior engineers.',
    bullets: [
      'Worked on a national-scale project involving data management and analysis.',
      'Collaborated with senior backend developers to develop RESTful APIs for a new project using ASP.NET Core MVC framework and C#.',
      'Participated in designing and optimizing database schema for improved performance and scalability.',
      'Collaborated closely with frontend developers to integrate backend functionalities into the user interface.',
      'Contributed to code reviews, provided feedback and suggestions for code optimization and maintainability.',
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
    degree: 'M.Eng. in Artificial Intelligence',
    org: 'University of California, Los Angeles',
    range: 'Sep 2026 — Jun 2027',
    highlight: false,
  },
  {
    degree: 'B.S. Computer Science',
    org: 'Sabancı University',
    location: 'Istanbul',
    range: 'Sep 2021 — Jun 2025',
    summary:
      'Dean’s List (High Honors) · GPA 3.69 / 4.00 · Honor Scholarship recipient (full tuition, merit-based).',
    bullets: [
      'Ranked in the top 0.04% (first 1,000) among approximately 2.6 million candidates in the 2021 Turkish national university entrance exam (YKS), earning a 4-year scholarship to Sabancı University.',
    ],
    coursework: [
      'Computational Approach to Problem-Solving (Python)',
      'Advanced Programming (C++)',
      'Logic & Digital System Design (Verilog)',
      'Introduction to Data Science (Python, data extraction, feature engineering)',
      'Mobile Application Development (Java, Kotlin)',
      'Systems Modelling & Control (MATLAB, Simulink)',
      'Internet of Things (edge computing, BERT, GRU networks)',
      'Programming Languages (Flex, Bison, Ada)',
      'Database Systems (MySQL)',
      'Machine Learning (unsupervised learning, CNNs)',
      'Software Engineering (Agile practices, Scrum, CI/CD, containerization, microservices)',
      'Data Structures and Algorithms',
    ],
    highlight: false,
  },
];
