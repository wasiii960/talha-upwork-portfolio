export const profile = {
  name: "Abdul Rehman",
  role: "Full-Stack React Developer",
  tagline:
    "I design and build fast, accessible, production-grade web applications with React, TypeScript, and modern tooling.",
  location: "Available for remote work, worldwide",
  email: "hello@abdulrehman.dev",
  resumeUrl: "/resume.pdf",
  social: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    upwork: "https://www.upwork.com/",
  },
};

export const stats = [
  { label: "Years of experience", value: "5+" },
  { label: "Projects delivered", value: "40+" },
  { label: "Client satisfaction", value: "98%" },
];

export const skills = [
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux Toolkit"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "REST APIs", "GraphQL", "PostgreSQL"],
  },
  {
    category: "Tooling & Practice",
    items: ["Vite", "Git", "Docker", "CI/CD", "Testing (Jest/RTL)"],
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    title: "E-Commerce Storefront",
    description:
      "A high-performance storefront with product search, cart, and checkout, built with React, TypeScript, and a headless CMS.",
    tags: ["React", "TypeScript", "Stripe", "Tailwind CSS"],
  },
  {
    title: "SaaS Analytics Dashboard",
    description:
      "A real-time analytics dashboard with interactive charts, role-based access, and exportable reports for a B2B SaaS product.",
    tags: ["React", "Node.js", "PostgreSQL", "Chart.js"],
  },
  {
    title: "Project Management Tool",
    description:
      "A Kanban-style collaboration tool with drag-and-drop boards, live updates, and team notifications.",
    tags: ["React", "Redux Toolkit", "WebSockets", "Express"],
  },
];

export const experience = [
  {
    role: "Senior Frontend Developer",
    company: "Freelance / Upwork",
    period: "2022 — Present",
    description:
      "Delivering full-stack React applications for startups and agencies, from architecture through deployment.",
  },
  {
    role: "Frontend Developer",
    company: "Software Consultancy",
    period: "2020 — 2022",
    description:
      "Built and maintained client-facing web applications, collaborating closely with designers and backend teams.",
  },
];
