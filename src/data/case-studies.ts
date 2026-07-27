export type PerformanceMetric = {
  metric: string;
  before: string;
  after: string;
};

export type ResultStat = {
  label: string;
  value: string;
  description: string;
};

export type TechGroup = {
  category: string;
  items: string[];
};

export type EngineeringDecision = {
  title: string;
  detail: string;
};

export type DiagramLayer = {
  label: string;
  nodes: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  timeframe: string;
  teamSize: string;
  tagline: string;
  technologies: string[];
  accent: string;
  executiveSummary: string;
  businessProblem: string;
  challenges: string[];
  solution: string;
  architectureNotes: string[];
  diagram: "integration" | "lims" | "orders" | "modernisation" | "cloud" | "gateway";
  diagramLayers: DiagramLayer[];
  techStack: TechGroup[];
  role: string[];
  engineeringDecisions: EngineeringDecision[];
  implementation: string[];
  performance: PerformanceMetric[];
  results: ResultStat[];
  lessonsLearned: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "healthcare-data-integration-platform",
    title: "Healthcare Data Integration Platform",
    industry: "Healthcare / HealthTech",
    timeframe: "14 months",
    teamSize: "6 engineers, 1 architect (lead)",
    tagline:
      "An HL7v2 & FHIR interoperability engine that unified patient data across 40+ disparate hospital systems in real time.",
    technologies: ["Java 17", "Spring Boot", "Apache Kafka", "HL7/FHIR", "PostgreSQL", "Kubernetes"],
    accent: "from-blue-500/20 via-sky-400/10 to-transparent",
    executiveSummary:
      "A multi-facility healthcare network needed to consolidate patient records, lab results, and admission events scattered across dozens of legacy hospital information systems. I led backend architecture and delivery of an integration engine that normalizes HL7v2 and FHIR messages into a canonical patient model, enabling real-time interoperability across the network while meeting strict compliance requirements for healthcare data handling.",
    businessProblem:
      "The organization operated 40+ facilities, each running a different combination of EHR, LIS, and RIS systems from different vendors. Clinicians frequently lacked a unified view of patient history, causing duplicated tests, delayed diagnoses, and manual data re-entry between systems. Leadership needed a way to route, transform, and reconcile clinical messages across the network without a multi-year rip-and-replace of existing systems.",
    challenges: [
      "Every source system emitted HL7v2 messages with vendor-specific quirks and non-standard segments, making a single parsing strategy insufficient.",
      "Message volume spiked unpredictably during shift changes and mass-casualty events, requiring the platform to absorb bursts without dropping messages.",
      "Regulatory requirements mandated full auditability, encryption in transit and at rest, and strict role-based access to patient data.",
      "Downstream consumers needed both real-time streaming updates and a queryable FHIR-compliant REST API, with zero tolerance for data loss during transformation.",
    ],
    solution:
      "I designed an event-driven integration layer built around Apache Kafka as the central nervous system. Inbound HL7v2 feeds from MLLP listeners were parsed with a fault-tolerant, per-vendor adapter layer and transformed into canonical FHIR R4 resources. A schema registry enforced contract compatibility between producers and consumers, while a dead-letter pipeline captured malformed messages for manual review instead of blocking the stream.",
    diagram: "integration",
    diagramLayers: [
      { label: "Hospital Sources", nodes: ["EHR Systems", "LIS / RIS", "Admission Feeds"] },
      { label: "Ingestion", nodes: ["MLLP Listeners", "Vendor Adapters"] },
      { label: "Processing", nodes: ["Kafka Event Bus", "FHIR Transformer"] },
      { label: "Delivery", nodes: ["Canonical FHIR Store", "Real-time Subscribers"] },
    ],
    architectureNotes: [
      "MLLP listener tier accepts inbound HL7v2 traffic and immediately acknowledges receipt before async processing, decoupling ingestion from transformation latency.",
      "A vendor-adapter registry pattern isolates per-source quirks so new hospital integrations only require a new adapter, not core engine changes.",
      "Kafka topics are partitioned by facility ID to guarantee ordering per-patient while allowing horizontal consumer scaling.",
      "A canonical FHIR R4 store (PostgreSQL + JSONB) backs a read-optimized REST API, while raw messages are retained in cold storage for audit replay.",
    ],
    techStack: [
      { category: "Languages", items: ["Java 17", "SQL"] },
      { category: "Frameworks", items: ["Spring Boot", "Spring Integration", "HAPI FHIR"] },
      { category: "Messaging", items: ["Apache Kafka", "Kafka Streams", "Schema Registry"] },
      { category: "Data", items: ["PostgreSQL", "Redis (caching)", "Amazon S3 (cold storage)"] },
      { category: "Infrastructure", items: ["Docker", "Kubernetes", "AWS", "Terraform"] },
      { category: "Quality", items: ["JUnit 5", "Mockito", "Testcontainers", "Contract testing"] },
    ],
    role: [
      "Owned backend architecture end-to-end, from HL7 ingestion through FHIR API delivery.",
      "Defined the vendor-adapter pattern that let the team onboard new hospital feeds without touching core logic.",
      "Set up the CI/CD pipeline, observability stack, and on-call runbooks for the integration engine.",
      "Mentored two mid-level engineers and ran architecture review sessions with the client's compliance team.",
    ],
    engineeringDecisions: [
      {
        title: "Kafka over point-to-point integrations",
        detail:
          "Rather than building direct integrations between each hospital system and each consumer, I centralized all clinical events on Kafka. This reduced integration complexity from O(n²) to O(n) and let new consumers subscribe without touching source systems.",
      },
      {
        title: "Canonical model with adapter isolation",
        detail:
          "Instead of writing bespoke parsing logic scattered across the codebase, every vendor quirk lives inside its own adapter implementing a shared interface. This kept the transformation core simple and made onboarding a new facility a matter of days, not weeks.",
      },
      {
        title: "Dead-letter queues instead of hard failures",
        detail:
          "Malformed or partially-invalid messages are quarantined for review rather than blocking the pipeline or being silently dropped, which was critical for both data integrity and clinical safety.",
      },
    ],
    implementation: [
      "Built MLLP listeners with back-pressure aware buffering to handle burst traffic during shift changes without message loss.",
      "Implemented idempotent consumers using message deduplication keys to guarantee exactly-once semantics for critical patient events.",
      "Introduced Testcontainers-based integration tests that spin up real Kafka and PostgreSQL instances in CI to catch schema drift early.",
      "Rolled out canary deployments in Kubernetes so new adapter versions could be validated against production traffic shadowed at low risk.",
    ],
    performance: [
      { metric: "Message processing latency (p95)", before: "4.8s", after: "310ms" },
      { metric: "Peak sustained throughput", before: "~800 msg/min", after: "12,000+ msg/min" },
      { metric: "Failed/dropped message rate", before: "2.1%", after: "0.02%" },
    ],
    results: [
      { label: "Facilities integrated", value: "40+", description: "Hospital systems unified onto one platform" },
      { label: "Manual re-entry reduction", value: "78%", description: "Clinical data entry duplication eliminated" },
      { label: "Uptime", value: "99.97%", description: "Over the trailing 12 months in production" },
    ],
    lessonsLearned: [
      "Investing early in a robust dead-letter and replay strategy paid for itself many times over once real-world message chaos arrived.",
      "Treating each hospital vendor's HL7 dialect as a first-class adapter, rather than special-casing in the core engine, was the single highest-leverage architectural decision.",
      "Close, continuous collaboration with the compliance and clinical informatics teams prevented late-stage rework on auditability requirements.",
    ],
  },
  {
    slug: "laboratory-information-management-system",
    title: "Laboratory Information Management System",
    industry: "Diagnostics / Life Sciences",
    timeframe: "11 months",
    teamSize: "5 engineers",
    tagline:
      "A high-throughput LIMS backend tracking samples from accession to results, built for regulatory-grade traceability.",
    technologies: ["Java", "Spring Boot", "Oracle", "REST APIs", "Docker", "JUnit"],
    accent: "from-emerald-500/20 via-teal-400/10 to-transparent",
    executiveSummary:
      "A diagnostics laboratory processing tens of thousands of samples daily needed to replace a spreadsheet-and-paper-driven workflow with a fully digital Laboratory Information Management System. I served as the lead backend engineer, designing the sample lifecycle state machine, instrument integration layer, and results-reporting pipeline that now underpins the lab's daily operations.",
    businessProblem:
      "Samples moved through accessioning, testing, verification, and reporting stages tracked manually across spreadsheets and printed labels. This created chain-of-custody gaps, delayed turnaround times, and made it nearly impossible to pass increasingly strict laboratory accreditation audits without weeks of manual reconciliation.",
    challenges: [
      "Samples needed full chain-of-custody tracking with immutable audit trails acceptable to accreditation bodies.",
      "The lab operated dozens of different analyzer instruments, each with proprietary result-output formats (ASTM, proprietary CSV, serial protocols).",
      "Turnaround-time SLAs varied by test type and had to trigger automatic escalations when at risk of breach.",
      "Results needed multi-level review and electronic sign-off before release, with full traceability of who approved what and when.",
    ],
    solution:
      "I modeled the sample lifecycle as an explicit finite-state machine (accessioned → in-progress → pending-review → verified → released → archived), with every transition persisted as an immutable audit event. An instrument-integration middleware layer normalized results from analyzer feeds into a common results schema, feeding a rules engine that flagged critical values and SLA breaches automatically.",
    diagram: "lims",
    diagramLayers: [
      { label: "Accessioning", nodes: ["Sample Intake", "Barcode / Labeling"] },
      { label: "Instrumentation", nodes: ["Analyzer Connectors", "ASTM/Serial Middleware"] },
      { label: "Core LIMS", nodes: ["Sample State Machine", "Rules & Alerting Engine"] },
      { label: "Reporting", nodes: ["Review & Sign-off", "Audit Ledger"] },
    ],
    architectureNotes: [
      "A central Sample Lifecycle service enforces valid state transitions, rejecting any illegal state change at the API layer.",
      "Instrument connectors run as isolated services translating ASTM/serial/CSV instrument output into a normalized results contract published to the core system.",
      "A rules engine evaluates incoming results against reference ranges and turnaround SLAs, triggering alerts and escalation workflows.",
      "All state transitions and approvals are appended to an immutable audit ledger, queryable for accreditation reporting.",
    ],
    techStack: [
      { category: "Languages", items: ["Java 11/17", "PL/SQL"] },
      { category: "Frameworks", items: ["Spring Boot", "Spring State Machine", "Spring Batch"] },
      { category: "Data", items: ["Oracle Database", "Redis"] },
      { category: "Integration", items: ["ASTM/HL7 instrument protocols", "REST", "SFTP batch feeds"] },
      { category: "Infrastructure", items: ["Docker", "Jenkins", "On-prem + hybrid cloud"] },
      { category: "Quality", items: ["JUnit", "Mockito", "Postman/Newman contract tests"] },
    ],
    role: [
      "Designed the sample lifecycle state machine and audit ledger from scratch.",
      "Built the instrument-integration middleware supporting 15+ analyzer models.",
      "Partnered directly with laboratory quality assurance staff to map accreditation requirements to system controls.",
      "Led performance tuning of the Oracle schema to sustain peak daily accessioning volume.",
    ],
    engineeringDecisions: [
      {
        title: "Explicit state machine over ad-hoc status flags",
        detail:
          "Early prototypes used a simple status string field, which quickly became unmanageable as business rules multiplied. Formalizing the lifecycle as a state machine made illegal transitions structurally impossible and made the audit trail trivial to generate.",
      },
      {
        title: "Isolated instrument connectors",
        detail:
          "Each analyzer's proprietary protocol was wrapped in its own connector service rather than baked into the core application, so a single misbehaving instrument driver could never take down sample processing for the rest of the lab.",
      },
      {
        title: "Immutable audit ledger as a first-class citizen",
        detail:
          "Rather than relying on database triggers or application logs for audit history, every transition is written as an explicit, versioned audit event — designed from day one to survive an accreditation audit without engineering intervention.",
      },
    ],
    implementation: [
      "Implemented Spring State Machine-backed sample workflows with guard conditions enforcing role-based transition permissions.",
      "Built a critical-value alerting pipeline that pages on-call lab staff within seconds of a life-threatening result being recorded.",
      "Tuned Oracle indexing and partitioning strategy to keep sample lookups sub-100ms at 50,000+ samples/day volume.",
      "Delivered a reporting module generating accreditation-ready audit exports on demand instead of via manual reconciliation.",
    ],
    performance: [
      { metric: "Average sample turnaround time", before: "6.2 hours", after: "2.4 hours" },
      { metric: "Audit reconciliation effort", before: "~3 weeks/quarter", after: "Same-day, on demand" },
      { metric: "Result entry errors", before: "1 in ~450 samples", after: "1 in ~9,000 samples" },
    ],
    results: [
      { label: "Daily sample volume supported", value: "50,000+", description: "Peak accessioning throughput" },
      { label: "Instruments integrated", value: "15+", description: "Analyzer models normalized into one schema" },
      { label: "Audit prep time saved", value: "~95%", description: "From weeks of manual work to on-demand export" },
    ],
    lessonsLearned: [
      "Modeling business processes as explicit state machines pays dividends far beyond the initial complexity, especially under regulatory scrutiny.",
      "Instrument integration is rarely a one-time effort — designing for isolation and independent deployability prevented long-tail maintenance pain.",
      "Involving compliance stakeholders during design, not just at UAT, avoided expensive rework late in the project.",
    ],
  },
  {
    slug: "enterprise-order-processing-platform",
    title: "Enterprise Order Processing Platform",
    industry: "Retail / Distribution",
    timeframe: "9 months",
    teamSize: "7 engineers",
    tagline:
      "A rebuilt order orchestration backend handling multi-warehouse fulfillment, inventory sync, and payment reconciliation at scale.",
    technologies: ["Java", "Spring Boot", "PostgreSQL", "RabbitMQ", "Docker", "AWS"],
    accent: "from-orange-500/20 via-amber-400/10 to-transparent",
    executiveSummary:
      "A mid-market distributor's order processing system could no longer keep pace with growth, causing overselling, delayed fulfillment, and manual payment reconciliation. I led backend delivery of an event-driven order orchestration platform coordinating inventory, payments, and multi-warehouse fulfillment with strong consistency guarantees.",
    businessProblem:
      "Orders were processed through a monolithic batch job that ran every 30 minutes, which meant inventory counts were frequently stale, causing overselling during high-traffic periods. Payment reconciliation with the finance system was a manual, error-prone monthly process, and warehouse routing logic was hardcoded and inflexible as the company added new distribution centers.",
    challenges: [
      "Inventory had to be reserved and decremented in real time across multiple warehouses without overselling under concurrent load.",
      "Payment authorization, capture, and refund flows needed to be reliable in the face of third-party payment gateway timeouts and partial failures.",
      "Order routing rules (nearest warehouse, stock availability, shipping cost) changed frequently and needed to be configurable without code deployments.",
      "The system needed to support both real-time storefront orders and bulk B2B order imports with different consistency and throughput profiles.",
    ],
    solution:
      "I redesigned order processing around the Saga pattern using RabbitMQ for choreographed, event-driven orchestration across inventory, payment, and fulfillment services. Inventory reservation used optimistic locking with compensating transactions on failure, replacing the batch job with real-time, per-order processing while preserving strong consistency guarantees.",
    diagram: "orders",
    diagramLayers: [
      { label: "Order Intake", nodes: ["Storefront API", "B2B Bulk Import"] },
      { label: "Orchestration", nodes: ["Order Orchestrator (Saga)", "RabbitMQ Events"] },
      { label: "Domain Services", nodes: ["Inventory Service", "Payment Service", "Fulfillment Service"] },
      { label: "Operations", nodes: ["Routing Rules Engine", "Saga Monitoring Dashboard"] },
    ],
    architectureNotes: [
      "An Order Orchestrator service coordinates the saga across Inventory, Payment, and Fulfillment services via RabbitMQ events, with compensating actions for each step.",
      "Inventory uses optimistic concurrency control (versioned rows) to prevent overselling without heavy database locking under load.",
      "A configurable rules engine drives warehouse routing decisions, editable by operations staff without a deployment.",
      "Dead-letter queues and a saga-state dashboard give operations visibility into any order stuck mid-flow, with one-click manual intervention.",
    ],
    techStack: [
      { category: "Languages", items: ["Java 17"] },
      { category: "Frameworks", items: ["Spring Boot", "Spring Cloud", "Spring Data JPA"] },
      { category: "Messaging", items: ["RabbitMQ", "Saga orchestration"] },
      { category: "Data", items: ["PostgreSQL", "Redis (inventory cache)"] },
      { category: "Infrastructure", items: ["Docker", "AWS ECS", "Terraform"] },
      { category: "Quality", items: ["JUnit 5", "Mockito", "Testcontainers", "Gatling load tests"] },
    ],
    role: [
      "Designed the saga-based order orchestration architecture replacing the legacy batch system.",
      "Implemented the inventory reservation service with optimistic locking and compensation logic.",
      "Built the configurable warehouse-routing rules engine used daily by operations.",
      "Ran load testing to validate the platform against Black Friday-scale traffic projections.",
    ],
    engineeringDecisions: [
      {
        title: "Choreographed sagas over a central orchestrator god-service",
        detail:
          "I chose event-driven choreography over a single orchestrator owning every step, so each service (inventory, payment, fulfillment) could evolve and scale independently while still participating in a consistent, auditable workflow.",
      },
      {
        title: "Optimistic locking over pessimistic row locks",
        detail:
          "Given very high read/write concurrency on inventory counts, optimistic concurrency with retry-on-conflict outperformed pessimistic locking by an order of magnitude under load testing, at the cost of slightly more complex retry logic.",
      },
      {
        title: "Externalized routing rules",
        detail:
          "Warehouse routing logic was extracted into a rules engine configurable by non-engineers, eliminating a recurring cycle of small deployments every time the business changed fulfillment strategy.",
      },
    ],
    implementation: [
      "Replaced the 30-minute batch order run with real-time, event-driven processing averaging sub-second order confirmation.",
      "Built compensating transaction handlers for every saga step (e.g., release inventory reservation on payment failure).",
      "Instrumented the pipeline with distributed tracing to give support staff full visibility into where an order was in its lifecycle.",
      "Load-tested the platform to 10x historical peak traffic using Gatling, identifying and fixing two connection-pool bottlenecks before go-live.",
    ],
    performance: [
      { metric: "Order confirmation latency", before: "up to 30 min (batch)", after: "< 800ms" },
      { metric: "Overselling incidents / month", before: "~120", after: "~2" },
      { metric: "Peak orders/sec supported", before: "~15", after: "~180" },
    ],
    results: [
      { label: "Overselling reduction", value: "98%", description: "Near-elimination of inventory oversell incidents" },
      { label: "Manual reconciliation time", value: "-90%", description: "Finance payment reconciliation effort" },
      { label: "Peak traffic headroom", value: "10x", description: "Validated capacity above historical peak" },
    ],
    lessonsLearned: [
      "Sagas require investing in first-class observability early — without a saga-state dashboard, debugging distributed failures would have been untenable.",
      "Optimistic concurrency is powerful but requires careful UX and retry design so conflicts resolve invisibly to the customer.",
      "Making business rules configurable outside of code was as valuable to the business as the performance improvements themselves.",
    ],
  },
  {
    slug: "legacy-monolith-modernisation",
    title: "Legacy Monolith Modernisation",
    industry: "Financial Services",
    timeframe: "18 months",
    teamSize: "9 engineers across 3 teams",
    tagline:
      "Incremental strangler-fig migration of a 15-year-old Java monolith into modular services, with zero downtime and no feature freeze.",
    technologies: ["Java", "Spring Boot", "Kubernetes", "PostgreSQL", "Kafka", "Angular"],
    accent: "from-violet-500/20 via-fuchsia-400/10 to-transparent",
    executiveSummary:
      "A financial services firm's core platform was a 15-year-old monolithic Java application that had become a bottleneck for delivery — a single deployment unit shared by all teams, with build times exceeding 40 minutes and a growing backlog of untestable code. I led the backend modernisation effort, applying the strangler-fig pattern to incrementally extract services without a disruptive rewrite or feature freeze.",
    businessProblem:
      "Every team shared one codebase and one deployment pipeline, meaning a single team's bug could block releases for the entire organization. New feature delivery had slowed to a crawl, onboarding new engineers took months, and the business could not confidently estimate how long even modest changes would take.",
    challenges: [
      "The monolith had years of implicit coupling between modules with no clear domain boundaries, undocumented and untested.",
      "The business required continuous feature delivery throughout the modernisation — a multi-month feature freeze was not acceptable.",
      "Data was tightly coupled through a single shared database schema, with dozens of tables cross-referenced by unrelated modules.",
      "Any migration approach had to guarantee zero downtime for a system processing live financial transactions.",
    ],
    solution:
      "I introduced the strangler-fig pattern: an API gateway progressively routed traffic for specific domains to newly extracted services while the monolith continued serving everything else. Domain boundaries were identified through event-storming workshops with business stakeholders, and each extracted service was given its own datastore behind a synchronization layer during transition.",
    diagram: "modernisation",
    diagramLayers: [
      { label: "Traffic Entry", nodes: ["API Gateway", "Per-route Migration Flags"] },
      { label: "Legacy Core", nodes: ["Monolith (shrinking)", "Shared Schema"] },
      { label: "Extracted Services", nodes: ["Account Ledger", "Transaction Reconciliation"] },
      { label: "Consistency Layer", nodes: ["CDC Sync (Debezium)", "Kafka Domain Events"] },
    ],
    architectureNotes: [
      "An API gateway layer intercepts requests and routes them either to the monolith or to newly extracted services based on a per-route migration flag.",
      "Extracted services own their own schema; a dual-write/CDC (change-data-capture) synchronization layer kept the monolith's shared database consistent during the transition window for each domain.",
      "Domain events published to Kafka let new services react to state changes still originating in the monolith, avoiding a big-bang cutover.",
      "A feature-flagged rollback path let any extracted domain's traffic instantly revert to the monolith if the new service showed instability.",
    ],
    techStack: [
      { category: "Languages", items: ["Java 8 → 17 (incremental upgrade)"] },
      { category: "Frameworks", items: ["Spring Boot", "Spring Cloud Gateway", "Angular (frontend)"] },
      { category: "Messaging", items: ["Apache Kafka", "Debezium (CDC)"] },
      { category: "Data", items: ["PostgreSQL", "Oracle (legacy, being retired)"] },
      { category: "Infrastructure", items: ["Docker", "Kubernetes", "Helm", "GitLab CI"] },
      { category: "Quality", items: ["JUnit", "Mockito", "Contract tests", "Characterization tests"] },
    ],
    role: [
      "Defined the modernisation strategy and domain-extraction roadmap alongside the architecture review board.",
      "Personally led extraction of the two highest-risk domains (account ledger and transaction reconciliation).",
      "Built the CDC-based synchronization layer enabling dual-write safety during transition windows.",
      "Established characterization testing practices to safely refactor undocumented legacy code before extraction.",
    ],
    engineeringDecisions: [
      {
        title: "Strangler-fig over big-bang rewrite",
        detail:
          "A full rewrite was rejected early: the risk profile and multi-year timeline were incompatible with the business's need for continuous delivery. Incremental extraction let us ship value every few weeks while reducing monolith surface area over time.",
      },
      {
        title: "CDC-based dual writes during transition",
        detail:
          "Rather than a risky one-time data migration, each extracted domain ran with change-data-capture keeping both the legacy and new schema in sync until confidence was high enough to cut over reads, then writes.",
      },
      {
        title: "Characterization tests before touching legacy code",
        detail:
          "Before extracting any domain, I had the team write characterization tests capturing existing (even undesirable) behavior, so refactors could be verified against real behavior rather than assumed intent.",
      },
    ],
    implementation: [
      "Ran event-storming workshops with product and finance stakeholders to establish clean domain boundaries before writing extraction code.",
      "Extracted the account ledger domain first as a proof of concept, validating the gateway-routing and CDC approach at lower risk.",
      "Built automated contract tests between the monolith and extracted services to catch breaking changes before they reached production.",
      "Migrated CI pipelines per-service, cutting the shared 40-minute build down to under 6 minutes for most extracted services.",
    ],
    performance: [
      { metric: "Monolith build/deploy time", before: "42 min", after: "6 min (extracted services)" },
      { metric: "Mean time to deploy a change", before: "~3 days", after: "~45 minutes" },
      { metric: "Production incidents during migration", before: "n/a", after: "0 downtime incidents" },
    ],
    results: [
      { label: "Domains extracted", value: "7", description: "Independently deployable services, 18 months in" },
      { label: "Deployment frequency", value: "12x", description: "Increase in weekly deployments across teams" },
      { label: "Onboarding time", value: "-60%", description: "New engineer time-to-first-commit" },
    ],
    lessonsLearned: [
      "The hardest part of modernisation is rarely the code — it's establishing shared domain language between engineering and the business first.",
      "Dual-write synchronization layers are more complex to build than they appear, but they de-risk the migration enough to justify the investment.",
      "Extracting the riskiest domain first, rather than the easiest, built organizational trust in the approach faster than starting with quick wins.",
    ],
  },
  {
    slug: "cloud-migration-platform",
    title: "Cloud Migration Platform",
    industry: "Enterprise SaaS",
    timeframe: "8 months",
    teamSize: "5 engineers",
    tagline:
      "Lift-and-optimize migration of an on-premises Java platform to AWS, with containerization and infrastructure-as-code from day one.",
    technologies: ["Java", "Spring Boot", "AWS", "Kubernetes", "Docker", "Terraform"],
    accent: "from-cyan-500/20 via-blue-400/10 to-transparent",
    executiveSummary:
      "A SaaS provider running entirely on aging on-premises hardware faced rising infrastructure costs, capacity constraints, and an inability to scale internationally. I led backend and infrastructure work to migrate the Java platform to AWS, re-architecting for containerization and elastic scaling while keeping the migration transparent to customers.",
    businessProblem:
      "The company's data center contracts were expiring, hardware was aging past vendor support, and scaling for new customer regions meant multi-month procurement cycles. Leadership needed a cloud migration that reduced operational risk and cost while positioning the platform to scale on demand.",
    challenges: [
      "The existing platform assumed static IPs, local file storage, and manually-provisioned servers throughout the codebase.",
      "Customers required guaranteed uptime during migration — no maintenance windows longer than a few minutes were acceptable.",
      "Data residency requirements meant certain customer data needed to remain in specific geographic regions post-migration.",
      "The team had no prior production Kubernetes experience and needed to build operational maturity alongside the migration itself.",
    ],
    solution:
      "I led a phased 'lift-and-optimize' migration: first containerizing the existing Spring Boot services with minimal changes to de-risk the initial move, then incrementally refactoring for cloud-native patterns (externalized config, object storage, managed databases) once running stably on AWS. Infrastructure was defined entirely in Terraform from the outset to eliminate configuration drift.",
    diagram: "cloud",
    diagramLayers: [
      { label: "Edge", nodes: ["Route 53", "CloudFront"] },
      { label: "Compute", nodes: ["Amazon EKS", "Spring Boot Pods (Autoscaled)"] },
      { label: "Data & Storage", nodes: ["RDS (PostgreSQL)", "Amazon S3"] },
      { label: "Foundation", nodes: ["Terraform Modules", "Prometheus / Grafana"] },
    ],
    architectureNotes: [
      "Services were containerized and deployed to Amazon EKS with horizontal pod autoscaling driven by custom application metrics.",
      "Local file storage was replaced with Amazon S3, and hardcoded server references were replaced with service discovery via Kubernetes DNS.",
      "Multi-region deployment topology honored data residency rules by pinning specific customer tenants to their required AWS region.",
      "All infrastructure — networking, EKS clusters, RDS instances, IAM policies — is defined in Terraform modules, code-reviewed like application code.",
    ],
    techStack: [
      { category: "Languages", items: ["Java 17"] },
      { category: "Frameworks", items: ["Spring Boot", "Spring Cloud Config"] },
      { category: "Cloud", items: ["AWS EKS", "RDS (PostgreSQL)", "S3", "CloudFront", "Route 53"] },
      { category: "Infrastructure as Code", items: ["Terraform", "Helm"] },
      { category: "DevOps", items: ["Docker", "GitHub Actions", "Prometheus", "Grafana"] },
      { category: "Quality", items: ["JUnit", "Testcontainers", "Chaos testing (pod termination drills)"] },
    ],
    role: [
      "Led the migration architecture and phased cutover plan across three customer-facing environments.",
      "Wrote the majority of the Terraform modules defining the target AWS infrastructure.",
      "Coached the team through their first production Kubernetes rollout, including on-call readiness.",
      "Designed the data-residency-aware multi-region routing strategy.",
    ],
    engineeringDecisions: [
      {
        title: "Lift-and-optimize over full re-architecture",
        detail:
          "A ground-up cloud-native rewrite was tempting but too risky given the compressed timeline. Containerizing the existing application first, then incrementally modernizing individual concerns, delivered the cost and scaling benefits sooner with far less migration risk.",
      },
      {
        title: "Terraform from day one, no manual console changes",
        detail:
          "Every piece of infrastructure was defined as code from the start, which paid off immediately when replicating the environment across regions for data residency compliance.",
      },
      {
        title: "Chaos drills before go-live",
        detail:
          "Before cutting real customer traffic over, the team ran repeated pod-termination and node-failure drills in staging to validate that Kubernetes' self-healing behavior actually matched expectations under the platform's specific workload.",
      },
    ],
    implementation: [
      "Containerized all services with multi-stage Docker builds, cutting image sizes by more than half.",
      "Migrated traffic customer-by-customer using DNS-weighted routing, keeping instant rollback available at every stage.",
      "Replaced local disk usage with S3-backed storage and refactored file-handling code to stream rather than buffer locally.",
      "Set up Prometheus/Grafana observability before cutover so the team had full visibility from the very first production pod.",
    ],
    performance: [
      { metric: "Infrastructure cost (monthly)", before: "Baseline", after: "-34%" },
      { metric: "New environment provisioning time", before: "~3 weeks", after: "~2 hours" },
      { metric: "Customer-facing downtime during migration", before: "n/a", after: "0 minutes" },
    ],
    results: [
      { label: "Cost reduction", value: "34%", description: "Monthly infrastructure spend after migration" },
      { label: "Provisioning speed", value: "~250x", description: "Faster new-environment setup via Terraform" },
      { label: "Migration downtime", value: "0 min", description: "Fully transparent cutover for customers" },
    ],
    lessonsLearned: [
      "Lift-and-optimize let the business realize cost savings within weeks rather than waiting on a full re-architecture to finish.",
      "Investing in chaos testing before go-live surfaced two real self-healing misconfigurations that would have caused production incidents.",
      "Building operational Kubernetes maturity on the team was as important a deliverable as the migration itself.",
    ],
  },
  {
    slug: "high-performance-rest-api-gateway",
    title: "High Performance REST API Gateway",
    industry: "B2B Platform / Multi-tenant SaaS",
    timeframe: "6 months",
    teamSize: "4 engineers",
    tagline:
      "A purpose-built API gateway handling authentication, rate limiting, and request routing for 200+ downstream services at sub-10ms overhead.",
    technologies: ["Java", "Spring Boot", "Redis", "Kubernetes", "REST APIs", "PostgreSQL"],
    accent: "from-rose-500/20 via-pink-400/10 to-transparent",
    executiveSummary:
      "A multi-tenant B2B platform's off-the-shelf API gateway couldn't scale with its growing partner ecosystem, adding hundreds of milliseconds of latency and struggling with per-tenant rate-limiting requirements. I designed and built a custom high-performance API gateway in Java, cutting gateway overhead by over 90% while adding fine-grained, tenant-aware traffic control.",
    businessProblem:
      "As the platform onboarded more enterprise partners, each with different rate limits, authentication schemes, and SLAs, the existing generic gateway product became both a performance bottleneck and an operational liability — configuration changes required vendor support tickets, and gateway latency was eating into partners' own SLA budgets.",
    challenges: [
      "The gateway needed to support per-tenant rate limiting, quota management, and authentication policies without a shared bottleneck.",
      "Downstream services numbered 200+, each with different routing, versioning, and health-check requirements.",
      "Enterprise partners demanded sub-10ms gateway overhead as part of their contractual SLAs.",
      "The gateway had to support zero-downtime policy updates — rate limit or routing changes could not require a redeploy.",
    ],
    solution:
      "I built a lightweight, reactive API gateway in Java using Spring WebFlux, backed by Redis for distributed rate-limiting state shared across gateway instances. Routing and policy configuration were externalized to a hot-reloadable configuration store, so tenant onboarding and policy changes took effect within seconds without any deployment.",
    diagram: "gateway",
    diagramLayers: [
      { label: "Partner Traffic", nodes: ["200+ API Consumers"] },
      { label: "Gateway Core", nodes: ["Reactive Router (WebFlux)", "Circuit Breakers"] },
      { label: "Policy & Limits", nodes: ["Redis Rate Limiter", "Hot-reload Policy Store"] },
      { label: "Downstream", nodes: ["200+ Backend Services"] },
    ],
    architectureNotes: [
      "A reactive, non-blocking request pipeline (Spring WebFlux + Netty) minimizes thread-per-request overhead under high concurrency.",
      "Redis-backed token-bucket rate limiters enforce per-tenant, per-endpoint quotas consistently across a horizontally-scaled gateway fleet.",
      "Routing rules and tenant policies are stored in PostgreSQL and cached in-memory with a pub/sub invalidation channel for near-instant propagation on change.",
      "Circuit breakers per downstream service prevent a single unhealthy backend from degrading gateway-wide latency.",
    ],
    techStack: [
      { category: "Languages", items: ["Java 17"] },
      { category: "Frameworks", items: ["Spring Boot", "Spring WebFlux", "Project Reactor", "Resilience4j"] },
      { category: "Data", items: ["Redis (rate limiting)", "PostgreSQL (policy store)"] },
      { category: "Infrastructure", items: ["Docker", "Kubernetes", "NGINX Ingress"] },
      { category: "Observability", items: ["Prometheus", "Grafana", "Distributed tracing (OpenTelemetry)"] },
      { category: "Quality", items: ["JUnit 5", "Gatling load testing", "Contract tests"] },
    ],
    role: [
      "Architected and built the gateway core, including the reactive request pipeline and rate-limiting engine.",
      "Designed the hot-reloadable policy configuration system used for zero-downtime tenant onboarding.",
      "Led load testing and latency profiling to hit the sub-10ms overhead SLA.",
      "Owned the production rollout, including a shadow-traffic validation phase against the legacy gateway.",
    ],
    engineeringDecisions: [
      {
        title: "Reactive, non-blocking I/O over traditional servlet stack",
        detail:
          "Given the gateway sits in the critical path of every request across 200+ services, I chose Spring WebFlux's non-blocking model over a traditional thread-per-request servlet stack, which materially reduced tail latency under high concurrency.",
      },
      {
        title: "Redis-backed distributed rate limiting",
        detail:
          "Per-tenant rate limits needed to be enforced consistently regardless of which gateway instance handled a given request. A Redis-backed token-bucket implementation gave accurate, low-latency distributed limits without a central bottleneck.",
      },
      {
        title: "Hot-reloadable policy store over redeploy-per-change",
        detail:
          "Routing and rate-limit policy changes were a frequent operational need. Externalizing configuration with pub/sub cache invalidation turned a redeploy-and-wait process into a sub-second change with no gateway restart.",
      },
    ],
    implementation: [
      "Built the core reactive routing pipeline with circuit breakers (Resilience4j) isolating unhealthy downstream services.",
      "Implemented token-bucket rate limiting in Redis with Lua scripting for atomic check-and-decrement operations.",
      "Ran a multi-week shadow-traffic validation, mirroring production traffic to the new gateway without affecting live responses, to validate correctness before cutover.",
      "Load tested with Gatling to 10x expected peak concurrent connections, tuning connection pools and event-loop thread counts accordingly.",
    ],
    performance: [
      { metric: "Gateway overhead (p95)", before: "~140ms", after: "< 9ms" },
      { metric: "Max sustained concurrent connections", before: "~4,000", after: "~45,000" },
      { metric: "Policy change propagation time", before: "~20 min (redeploy)", after: "< 2 sec" },
    ],
    results: [
      { label: "Latency reduction", value: "94%", description: "Gateway overhead p95, before vs. after" },
      { label: "Downstream services routed", value: "200+", description: "Behind a single gateway fleet" },
      { label: "Partner SLA compliance", value: "100%", description: "All contracted latency SLAs met post-launch" },
    ],
    lessonsLearned: [
      "Reactive programming models add real complexity to debugging and tracing — investing in distributed tracing from day one was non-negotiable.",
      "Shadow-traffic validation before cutover caught two subtle routing edge cases that unit and integration tests alone had missed.",
      "Externalizing operational policy from code turned the gateway from an engineering bottleneck into a self-service tool for the platform operations team.",
    ],
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((cs) => cs.slug === slug);
}
