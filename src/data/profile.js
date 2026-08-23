// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH FOR YOUR PERSONAL DETAILS.
// Edit this one file and your name, role, and contact info update everywhere.
// Anything marked TODO is a placeholder you should replace with your real info.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'RJ Tanchin', // TODO: replace with your full name
  initials: 'RT', // TODO: match your initials
  role: 'BSIT Student & Front-End Web Developer',
  tagline:
    'I build clean, accessible web interfaces with React — and I like the part where messy requirements turn into something that actually works.',
  location: 'Philippines',
  email: 'rjtnchn@example.com', // TODO: replace with your real email
  phone: '+63 900 000 0000', // TODO: replace or delete
  github: 'https://github.com/rjtnchn',
  linkedin: 'https://www.linkedin.com/in/your-handle', // TODO: replace or delete
  resumeNote:
    'Currently taking CCS112 — Application Development and Emerging Technologies.',
};

export const skills = [
  {
    group: 'Languages',
    items: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'PHP', 'Java', 'SQL'],
  },
  {
    group: 'Frameworks & Libraries',
    items: ['React', 'React Router', 'Vite', 'Bootstrap', 'Laravel (basics)'],
  },
  {
    group: 'Tools & Platforms',
    items: ['Git & GitHub', 'Vercel', 'VS Code', 'MySQL', 'Postman', 'Figma'],
  },
  {
    group: 'Concepts',
    items: [
      'Component architecture',
      'Client-side routing (SPA)',
      'React hooks & state',
      'REST APIs',
      'Responsive design',
      'Accessibility basics',
    ],
  },
];

export const education = [
  {
    id: 'bsit',
    title: 'BS Information Technology',
    org: 'Your University', // TODO: replace with your school
    period: '2023 — present',
    detail:
      'Coursework in application development, data structures, database systems, and emerging technologies. Relevant subject: CCS112 — Application Development and Emerging Technologies.',
  },
  {
    id: 'shs',
    title: 'Senior High School — STEM / ICT strand',
    org: 'Your Senior High School', // TODO: replace
    period: '2021 — 2023',
    detail:
      'Built my first static websites here, which is what got me into front-end work in the first place.',
  },
];

export const experience = [
  {
    id: 'coursework',
    title: 'Front-End Projects (Coursework)',
    org: 'CCS112 Laboratory Activities',
    period: '2026',
    detail:
      'Built a series of React applications from scratch: a product catalog with props-driven components, a searchable student directory with useState, and this multi-page portfolio using React Router with dynamic routes and a deployed Vercel build.',
  },
  {
    id: 'selfstudy',
    title: 'Self-Directed Practice',
    org: 'Personal',
    period: '2025 — present',
    detail:
      'Rebuild interfaces I like as practice, focusing on responsive layouts, semantic HTML, and keeping component state predictable.',
  },
];
