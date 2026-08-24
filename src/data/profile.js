// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH FOR YOUR PERSONAL DETAILS.
// Edit this one file and your name, role, and contact info update everywhere.
// Anything marked TODO is a placeholder you should replace with your real info.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Ralph Gabriel Clemeno', 
  initials: 'RG', 
  role: 'BSCs Student',
  tagline:
    'I do not know anything, I only know what I know.',
  location: 'Philippines',
  email: 'ralphgclemeno@gmail.com', 
  phone: '+63 956 735 2083',
  github: 'https://github.com/rjtnchn',
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
    items: ['React', 'React Router', 'Vite', 'Bootstrap', 'Laravel'],
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
    id: 'bscs',
    title: 'BS Computer Science',
    org: 'University of Cabuyao', 
    period: '2024 — present',
    detail:
      'Coursework in application development, data structures, database systems, and emerging technologies.',
  },
  {
    id: 'shs',
    title: 'Senior High School — STEM Computing',
    org: 'University of Cabuyao',
    period: '2022 — 2024',
    detail:
      'Built my first static websites here, which is what got me into programming.',
  },
];

export const experience = [
  {
    id: 'coursework',
    title: 'Programming Projects (Coursework)',
    org: 'CCS112 Laboratory Activities',
    period: '2024 - Present',
    detail:
      'Built a series of applications from scratch: a product catalog with props-driven components, a searchable student directory with useState, and this multi-page portfolio using React Router with dynamic routes and a deployed Vercel build.',
  },
  {
    id: 'selfstudy',
    title: 'Self-Directed Practice',
    org: 'Personal',
    period: '2024 — present',
    detail:
      'Rebuild interfaces I like as practice.',
  },
];
