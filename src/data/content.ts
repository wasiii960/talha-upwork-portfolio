import {
  Boxes,
  Camera,
  Cloud,
  Code2,
  Cpu,
  Database,
  FlaskConical,
  Layers,
  Network,
  ShieldCheck,
  Workflow,
} from "lucide-react";

export const trustLogos = [
  "Python",
  "TensorFlow",
  "PyTorch",
  "OpenCV",
  "XGBoost",
  "Scikit-learn",
  "Pandas",
  "PyArrow",
  "Docker",
  "AWS",
  "PostgreSQL",
  "Raspberry Pi",
  "ESP32",
  "Power BI",
  "Apache Spark",
  "RHEL",
];

export const services = [
  {
    icon: Camera,
    title: "Computer Vision & Edge AI",
    description:
      "Camera-based detection and classification systems deployed on edge hardware, with quantized inference tuned for real production cycle-time constraints.",
  },
  {
    icon: FlaskConical,
    title: "Predictive Machine Learning",
    description:
      "XGBoost and scikit-learn models for anomaly detection, predictive maintenance, and classification on structured and time-series sensor data.",
  },
  {
    icon: Boxes,
    title: "Robotics & Embedded Systems",
    description:
      "Camera-guided control systems (image processing, PID control) integrated with microcontrollers and motor hardware, built from scratch.",
  },
  {
    icon: Database,
    title: "Industrial Data Engineering",
    description:
      "High-throughput ETL pipelines converting raw sensor data to compressed, queryable formats at 100+ machine scale, with zero added hardware cost.",
  },
  {
    icon: Network,
    title: "PLC & Hardware Integration",
    description:
      "TCP/IP and serial integration between AI inference running on edge devices and industrial control systems, including PLCs, motor drivers, and microcontrollers.",
  },
  {
    icon: Cpu,
    title: "Model Optimization & Deployment",
    description:
      "INT8 quantization, inference profiling, and deployment for latency-constrained edge environments with no GPU and no network dependency.",
  },
  {
    icon: Workflow,
    title: "Analytics & Reporting Pipelines",
    description:
      "Distributed data processing feeding live dashboards and real-time alerts into the tools operations teams already use, like Power BI and Microsoft Teams.",
  },
  {
    icon: ShieldCheck,
    title: "AI Feasibility & Consulting",
    description:
      "Feasibility studies, architecture reviews, and technical due diligence for teams evaluating a new computer vision or ML initiative.",
  },
];

export const processSteps = [
  {
    title: "Discovery",
    description:
      "Understanding the production constraint, available data, and hardware environment before any model work begins.",
  },
  {
    title: "Data & Architecture",
    description:
      "Defining the data pipeline, model architecture, and edge/on-prem deployment target, with tradeoffs documented up front.",
  },
  {
    title: "Implementation",
    description:
      "Iterative model development and pipeline build in small, testable increments against real production data.",
  },
  {
    title: "Validation",
    description:
      "Evaluating results against real production conditions and domain-expert review, not just held-out accuracy in a notebook.",
  },
  {
    title: "Deployment",
    description:
      "Edge or on-prem rollout with quantization, monitoring, and fallback behavior wired in before go-live, not after.",
  },
  {
    title: "Support",
    description:
      "Post-launch monitoring, retraining cadence, and iterative hardening based on real production behaviour.",
  },
];

export const techGrid = [
  {
    category: "Languages",
    icon: Code2,
    items: ["Python", "MATLAB", "SQL"],
  },
  {
    category: "Deep Learning",
    icon: Layers,
    items: ["TensorFlow", "PyTorch", "Keras"],
  },
  {
    category: "Computer Vision",
    icon: Camera,
    items: ["OpenCV", "Picamera2", "VGG-19 CNN", "Image Processing"],
  },
  {
    category: "Classical ML",
    icon: FlaskConical,
    items: ["XGBoost", "Scikit-learn", "SciPy"],
  },
  {
    category: "Data Engineering",
    icon: Database,
    items: ["PyArrow", "Pandas", "Dask", "Apache Spark"],
  },
  {
    category: "Edge & Robotics",
    icon: Cpu,
    items: ["Raspberry Pi", "ESP32", "Jetson Xavier/Nano", "PLC / TCP-IP"],
  },
  {
    category: "Infrastructure",
    icon: Cloud,
    items: ["Docker", "AWS", "RHEL", "PostgreSQL"],
  },
  {
    category: "Reporting & MLOps",
    icon: Workflow,
    items: ["Power BI", "MLflow", "Streamlit", "Microsoft Teams"],
  },
];

export const testimonials = [
  {
    quote:
      "The vision system he built reads serial numbers inside our robot's cycle time with zero slack, something we weren't sure was even possible on Raspberry Pi-class hardware. It's been running in production without a single unplanned stop.",
    name: "Production Systems Manager",
    role: "Automotive Manufacturing Plant",
  },
  {
    quote:
      "We asked for an AGV built from off-the-shelf trolleys and a tight budget. What we got was a fully autonomous system with PID-tuned tracking that our own engineers could tune for new trolley sizes without touching the code.",
    name: "Manufacturing Engineering Lead",
    role: "Automotive Production Line",
  },
  {
    quote:
      "Our storage bill for time-series data was growing every month with no end in sight. He redesigned the pipeline around Parquet and cut it by over 90% while making the data faster to search than it had ever been.",
    name: "Plant Data Infrastructure Lead",
    role: "Industrial Manufacturing",
  },
  {
    quote:
      "The anomaly detection system catches servo issues weeks before they would have caused a stoppage. Maintenance actually trusts the alerts now because they show up in Teams with real context, not a dashboard nobody checks.",
    name: "Maintenance Operations Manager",
    role: "Fuel-Cell Component Manufacturing",
  },
];

export const faqs = [
  {
    question: "What kind of projects do you take on?",
    answer:
      "I focus on applied AI/ML engagements: computer vision and edge AI deployment, predictive maintenance and anomaly detection on time-series data, robotics/embedded control systems, and large-scale industrial data engineering. I'm especially effective on projects that need a model to actually run reliably in a real environment, on constrained edge hardware, integrated with existing industrial equipment, or against messy real-world data, not just a notebook that scores well on a held-out set.",
  },
  {
    question: "Do you work with existing teams or as a sole contractor?",
    answer:
      "Both. I've led AI/ML workstreams solo end-to-end, from data pipeline through edge deployment, and collaborated closely with hardware, domain expert, and production teams on projects that needed cross-functional input. I adapt to your team's existing process rather than imposing my own.",
  },
  {
    question: "How do you handle confidentiality and NDAs?",
    answer:
      "I sign NDAs as standard practice and treat all client code, data, and business context as confidential by default. The case studies on this site are intentionally anonymised, with no client names, logos, or proprietary details shared.",
  },
  {
    question: "What does your engagement process look like?",
    answer:
      "Most engagements start with a short discovery call to understand the data, hardware constraints, and production environment. For projects with a hardware or edge-deployment component, I typically validate feasibility on real (or representative) data before committing to a full build.",
  },
  {
    question: "Can you deploy models to edge or on-premises hardware?",
    answer:
      "Yes. A large part of my background is specifically edge and on-prem deployment: quantized inference on Raspberry Pi, integration with PLCs and microcontrollers over TCP/IP and serial, and pipelines that run on existing on-premises servers rather than requiring new cloud infrastructure.",
  },
  {
    question: "How do you price engagements?",
    answer:
      "Depending on scope, I work on fixed-price milestones for well-defined projects or hourly/weekly retainers for ongoing model development and support. I'll recommend the right model after understanding your project's shape during discovery.",
  },
  {
    question: "What's your availability and time zone coverage?",
    answer:
      "I work async-first and maintain significant overlap with US, European, and Asia-Pacific business hours. Response times on active engagements are typically within a few hours.",
  },
];
