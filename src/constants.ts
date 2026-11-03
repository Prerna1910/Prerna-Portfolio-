import { Project, Experience, SkillGroup, Achievement } from './types';

export const DEVELOPER_INFO = {
  name: "PRERNA GHARGE",
  role: "Frontend Engineer",
  experience: "4+ Years",
  location: "Vadodara, Gujarat, India",
  tagline: "Frontend Engineer building high-performance, modern web applications & scalable UI solutions.",
  about: "I am a Software Engineer currently working at AV DEVS Solutions, specializing in architecting modern web applications, scalable frontend architectures, and responsive user interfaces. With hands-on experience across React, Angular, TypeScript, modern JavaScript, and component-driven development, I love transforming complex product requirements into clean, performant, and delightful digital experiences.",
  email: "prerugharge19@gmail.com",
  linkedin: "https://linkedin.com/in/prerna-gharge",
  github: "https://github.com/Prerna1910",
  resumeUrl: "#resume"
};

export const SKILLS: SkillGroup[] = [
  {
    category: "Core & Languages",
    skills: [
      { name: "JavaScript (ES6+)", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "HTML5 & Semantic Web", level: 98 },
      { name: "CSS3 & Modern Layouts", level: 95 },
    ]
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 85 },
      { name: "Angular", level: 80 },
      { name: "REST API Integration", level: 92 },
    ]
  },
  {
    category: "Styling & UI Systems",
    skills: [
      { name: "Tailwind CSS", level: 98 },
      { name: "SCSS / SASS", level: 90 },
      { name: "Design Systems & Tokens", level: 88 },
      { name: "Responsive & Mobile-First", level: 96 },
    ]
  },
  {
    category: "Tools, Architecture & AI",
    skills: [
      { name: "Git & GitHub Workflows", level: 92 },
      { name: "Vite & Build Tools", level: 90 },
      { name: "Web Performance & CWV", level: 88 },
      { name: "Gemini AI & Voice Integration", level: 85 },
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    company: "AV DEVS Solutions",
    role: "Software Engineer",
    duration: "2026 - Present",
    description: [
      "Currently working as a Software Engineer at AV DEVS Solutions (Bhayli, Vadodara), engineering robust web applications and interactive client solutions.",
      "Architecting responsive, reusable UI components and client portals with React, TypeScript, and Tailwind CSS adhering to modular design principles.",
      "Collaborating closely with cross-functional teams to integrate complex REST APIs, optimize state management, and ensure seamless end-to-end data flow.",
      "Optimizing frontend build pipelines and runtime performance, achieving sub-second page loads and high Lighthouse accessibility scores."
    ]
  },
  {
    id: "exp-2",
    company: "TenUp Software Services",
    role: "Frontend Engineer",
    duration: "2023 - 2026",
    description: [
      "Developed interactive and responsive web interfaces for production applications using React, JavaScript (ES6+), and modern CSS.",
      "Implemented dynamic data visualization dashboards, client-side routing, and seamless API integrations with backend services.",
      "Conducted cross-browser and mobile device compatibility testing to maintain uniform user experiences across all screen viewports.",
      "Collaborated with UI/UX designers to translate Figma design prototypes into pixel-perfect, accessible web components."
    ]
  },
  {
    id: "exp-3",
    company: "Ekzero enterprise",
    role: "Junior Software Developer / Intern",
    duration: "2022 - 2023",
    description: [
      "Built semantic HTML5/CSS3 landing pages and responsive web modules for business clients.",
      "Integrated third-party APIs and client-side form validations to improve user engagement and data accuracy.",
      "Strengthened foundational expertise in JavaScript algorithms, DOM manipulation, asynchronous programming, and Git version control."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "The Supply Register",
    description: "A centralized enterprise web application for client management, real-time analytics, and operational metrics with interactive charts and role-based views.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Recharts", "REST APIs"],
    liveUrl: "#",
    githubUrl: "#",
    image: "/projects/supply-register.svg"
  },
  {
    id: "proj-2",
    title: "Cadogan Tate",
    description: "Designed and developed the user interface for the entire quotation module of a warehouse management system using React, SCSS, and React Bootstrap. The module features intuitive layout, responsive design, and clear typography, ensuring a seamless user experience.",
    techStack: ["React", "Next.js", "Redux Toolkit", "Bootstrap"],
    liveUrl: "#",
    githubUrl: "#",
    image: "/projects/cadogan-tate.svg"
  },
  {
    id: "proj-3",
    title: "Society Management System",
    description: "Contributed to a membership management system used by various organizations, clubs, housing corporations, and medical societies. My role involved refining the user interface and resolving front-end bugs to enhance system performance.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Lucide Icons"],
    liveUrl: "#",
    githubUrl: "#",
    image: "/projects/society-management.svg"
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-1",
    title: "Software Engineering Impact",
    description: "Delivering mission-critical web applications and client portals at AV DEVS Solutions  with clean code and robust architecture.",
    icon: "Award"
  },
  {
    id: "ach-2",
    title: "Frontend Architecture & Systems",
    description: "Built scalable, reusable component libraries accelerating delivery timelines across multiple project sprints.",
    icon: "Layers"
  },
  {
    id: "ach-3",
    title: "Performance & UX Excellence",
    description: "Consistently achieving 95+ Core Web Vitals and Lighthouse scores through proactive code-splitting and asset optimization.",
    icon: "Zap"
  }
];

