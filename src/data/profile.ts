export interface ExperienceEntry {
  title: string;
  org: string;
  range: string;
  description?: string;
  eng: boolean;
}

export interface EducationEntry {
  degree: string;
  org: string;
  description?: string;
  year: string;
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
    title: 'Senior ML Systems Engineer',
    org: 'Solace AI',
    range: '2024 — Present',
    description:
      'Leading the inference platform team; shipped the fused-attention, paged KV-cache serving runtime now running in production.',
    eng: true,
  },
  {
    title: 'ML Engineer',
    org: 'Meridian Labs',
    range: '2022 — 2024',
    description:
      'Owned search relevance and ranking for the core product; built the offline evaluation harness every ranking change runs through.',
    eng: true,
  },
  {
    title: 'Backend Engineer',
    org: 'Northwind Systems',
    range: '2020 — 2022',
    description: 'Built and operated the API gateway and internal tooling platform serving the rest of engineering.',
    eng: true,
  },
  {
    title: 'Research Assistant',
    org: 'Bilkent University',
    range: '2019 — 2020',
    description: 'Worked on approximate nearest-neighbor search for large-scale embedding retrieval.',
    eng: true,
  },
  {
    title: 'Barista',
    org: 'Kahve Dünyası',
    range: '2016 — 2018',
    eng: false,
  },
];

export const education: EducationEntry[] = [
  {
    degree: 'M.S. Computer Science',
    org: 'Bilkent University',
    description: 'Systems & Machine Learning',
    year: '2021',
    highlight: true,
  },
  {
    degree: 'B.S. Computer Engineering',
    org: 'Boğaziçi University',
    year: '2019',
    highlight: false,
  },
];
