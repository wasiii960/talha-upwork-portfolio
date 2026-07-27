import {
  Boxes,
  Cloud,
  Code2,
  Database,
  FlaskConical,
  GitBranch,
  Layers,
  Network,
  ServerCog,
  ShieldCheck,
  TerminalSquare,
  Workflow,
} from "lucide-react";

export const trustLogos = [
  "Java",
  "Spring Boot",
  "Hibernate",
  "Oracle",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "REST APIs",
  "React",
  "Angular",
  "AWS",
  "Git",
  "JUnit",
  "Mockito",
  "Kafka",
  "RabbitMQ",
];

export const services = [
  {
    icon: ServerCog,
    title: "Enterprise Java Development",
    description:
      "Production-grade Java 17/21 applications built for correctness, testability, and long-term maintainability.",
  },
  {
    icon: Layers,
    title: "Spring Boot APIs",
    description:
      "REST and event-driven APIs designed around clear domain boundaries, versioning strategy, and contract testing.",
  },
  {
    icon: Network,
    title: "Backend Architecture",
    description:
      "System architecture for services that need to scale — from monoliths to event-driven microservices.",
  },
  {
    icon: Boxes,
    title: "System Design",
    description:
      "Pragmatic architecture decisions grounded in real constraints: consistency, throughput, latency, and cost.",
  },
  {
    icon: FlaskConical,
    title: "Performance Optimisation",
    description:
      "Profiling, load testing, and tuning JVM, database, and messaging layers to eliminate real bottlenecks.",
  },
  {
    icon: Database,
    title: "Database Design",
    description:
      "Schema design, indexing strategy, and query optimisation across PostgreSQL, Oracle, and distributed data stores.",
  },
  {
    icon: Cloud,
    title: "Cloud Migration",
    description:
      "Phased, low-risk migrations from on-premises infrastructure to AWS with infrastructure-as-code from day one.",
  },
  {
    icon: ShieldCheck,
    title: "Technical Consulting",
    description:
      "Architecture reviews, code audits, and technical due diligence for teams that need an outside expert opinion.",
  },
];

export const processSteps = [
  {
    title: "Discovery",
    description:
      "Deep-dive into business goals, constraints, and existing systems before a single line of code is written.",
  },
  {
    title: "Architecture",
    description:
      "Define system boundaries, data models, and technology choices with clear tradeoffs documented up front.",
  },
  {
    title: "Implementation",
    description:
      "Iterative delivery in small, reviewable increments with continuous integration from the first commit.",
  },
  {
    title: "Testing",
    description:
      "Unit, integration, and load testing built in throughout — not bolted on at the end of the project.",
  },
  {
    title: "Deployment",
    description:
      "Zero-downtime rollouts, infrastructure-as-code, and observability wired in before go-live, not after.",
  },
  {
    title: "Support",
    description:
      "Post-launch monitoring, incident response, and iterative hardening based on real production behaviour.",
  },
];

export const techGrid = [
  {
    category: "Languages",
    icon: Code2,
    items: ["Java 17/21", "SQL", "TypeScript", "Bash"],
  },
  {
    category: "Frameworks",
    icon: Layers,
    items: ["Spring Boot", "Spring Cloud", "Hibernate", "Spring WebFlux"],
  },
  {
    category: "Databases",
    icon: Database,
    items: ["PostgreSQL", "Oracle", "Redis", "MongoDB"],
  },
  {
    category: "Cloud",
    icon: Cloud,
    items: ["AWS (EKS, RDS, S3)", "Terraform", "Docker", "Kubernetes"],
  },
  {
    category: "Messaging",
    icon: Workflow,
    items: ["Apache Kafka", "RabbitMQ", "Event-driven design"],
  },
  {
    category: "Testing",
    icon: FlaskConical,
    items: ["JUnit 5", "Mockito", "Testcontainers", "Gatling"],
  },
  {
    category: "DevOps",
    icon: TerminalSquare,
    items: ["GitHub Actions", "Jenkins", "Prometheus", "Grafana"],
  },
  {
    category: "Architecture",
    icon: GitBranch,
    items: ["Microservices", "Event Sourcing", "Domain-Driven Design", "CQRS"],
  },
];

export const testimonials = [
  {
    quote:
      "The architecture he designed for our data integration platform handled scale we hadn't even planned for yet. Communication was clear at every step, and the code quality made our whole team's job easier.",
    name: "Director of Engineering",
    role: "Healthcare Technology Company",
  },
  {
    quote:
      "We brought him in to fix a system nobody wanted to touch. Six months later it was the most stable service in our stack, and our team actually understood how it worked.",
    name: "VP of Product",
    role: "B2B SaaS Platform",
  },
  {
    quote:
      "Rare combination of deep technical skill and genuine business judgment. He pushed back on requirements that didn't make sense and explained tradeoffs in plain language.",
    name: "CTO",
    role: "Enterprise Logistics Company",
  },
  {
    quote:
      "Our cloud migration was the thing we'd been avoiding for two years. He scoped it, de-risked it, and delivered it with zero downtime and under budget.",
    name: "Head of Infrastructure",
    role: "Financial Services Firm",
  },
];

export const faqs = [
  {
    question: "What kind of projects do you take on?",
    answer:
      "I focus on backend-heavy engagements: enterprise Java/Spring systems, API design and integration, system architecture, performance issues, and cloud migrations. I'm especially effective on projects involving legacy modernisation, healthcare or regulated data systems, and high-throughput distributed systems.",
  },
  {
    question: "Do you work with existing teams or as a sole contractor?",
    answer:
      "Both. I've led backend workstreams inside larger teams, embedded as a senior IC on an existing squad, and delivered entire systems solo for smaller clients. I adapt to your team's existing process rather than imposing my own.",
  },
  {
    question: "How do you handle confidentiality and NDAs?",
    answer:
      "I sign NDAs as standard practice and treat all client code, data, and business context as confidential by default. The case studies on this site are intentionally anonymised — no client names, logos, or proprietary details are shared.",
  },
  {
    question: "What does your engagement process look like?",
    answer:
      "Most engagements start with a short discovery call to understand the problem, followed by a scoped proposal covering architecture approach, timeline, and milestones. For larger systems, I typically deliver an architecture document before writing implementation code.",
  },
  {
    question: "Can you work within our existing tech stack even if it's not ideal?",
    answer:
      "Yes — most real-world engagements involve legacy constraints. I focus on pragmatic, incremental improvement (strangler-fig patterns, phased migrations) rather than insisting on a rewrite unless a rewrite is genuinely the right call.",
  },
  {
    question: "How do you price engagements?",
    answer:
      "Depending on scope, I work on fixed-price milestones for well-defined projects or hourly/weekly retainers for ongoing architecture and development work. I'll recommend the right model after understanding your project's shape during discovery.",
  },
  {
    question: "What's your availability and time zone coverage?",
    answer:
      "I work async-first and maintain significant overlap with US and European business hours. Response times on active engagements are typically within a few hours.",
  },
];
