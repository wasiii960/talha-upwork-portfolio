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
  heroImage?: string;
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
    heroImage: "/case-studies/healthcare-data-integration-platform.jpg",
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
    slug: "electronic-laboratory-reporting-platform",
    title: "Enterprise Electronic Laboratory Reporting (ELR) Platform",
    industry: "Healthcare / Public Health Interoperability",
    timeframe: "12 months",
    teamSize: "5 engineers, 1 architect (lead)",
    tagline:
      "A secure, standards-based ELR platform that automates laboratory result reporting from providers to public health authorities using LOINC-to-SNOMED mapping and eICR.",
    technologies: ["Java", "Spring Boot", "Oracle", "HL7", "LOINC/SNOMED CT", "WildFly"],
    accent: "from-cyan-500/20 via-blue-500/10 to-transparent",
    heroImage: "/case-studies/electronic-laboratory-reporting-platform.jpg",
    executiveSummary:
      "A public health technology provider needed to automate how laboratory results move from provider systems to public health authorities. I led backend delivery of an Electronic Laboratory Reporting (ELR) platform that validates, transforms, and standardizes HL7 lab results in real time — mapping LOINC test codes to SNOMED CT concepts, generating Electronic Initial Case Reports (eICR) where applicable, and transmitting standardized reports securely to receiving authorities.",
    businessProblem:
      "Laboratories and provider systems reported results to public health authorities using inconsistent local codes, formats, and manual submission processes, creating delays in notifiable disease detection and unreliable data quality for public health surveillance. Authorities needed standardized, machine-readable reports arriving in real time, while providers needed a platform that didn't require them to change their existing HL7 messaging infrastructure.",
    challenges: [
      "Incoming HL7 ORU messages varied significantly between provider systems, with inconsistent local test and result codes that had no direct public health meaning.",
      "Laboratory codes (LOINC) needed reliable mapping to SNOMED CT clinical concepts, plus a separate layer of local provider code mapping for legacy systems still using proprietary identifiers.",
      "Certain conditions required an Electronic Initial Case Report (eICR) to be generated and submitted automatically, driven by real-time trigger-code evaluation against incoming results.",
      "The platform needed to handle both high-volume nightly batch submissions and real-time individual result reporting, with full audit traceability and secure transmission to government-operated endpoints.",
    ],
    solution:
      "I designed a pipeline that ingests HL7 ORU messages, runs them through a validation engine, maps LOINC observation codes to SNOMED CT concepts alongside local provider code mapping, normalizes the result into a canonical model, and generates either a standardized report (HL7 CDA, HL7 ORU, CSV, or PDF) or an eICR when trigger conditions are met. Every message is transmitted over a secure channel to the receiving public health authority, with acknowledgements and queries tracked back to the originating provider.",
    diagram: "lims",
    diagramLayers: [
      { label: "Provider Laboratory", nodes: ["HL7 ORU Messages", "Order Entry"] },
      { label: "Validation & Mapping", nodes: ["Validation Engine", "LOINC → SNOMED Mapping", "Local Provider Codes"] },
      { label: "Reporting Engine", nodes: ["Standardized Report Generator", "eICR Generator"] },
      { label: "Public Health Delivery", nodes: ["Secure Transmission", "Acknowledgements & Audit"] },
    ],
    architectureNotes: [
      "Inbound HL7 ORU messages are received and immediately persisted before processing, so no result is ever lost even if downstream mapping or transmission temporarily fails.",
      "A validation engine checks message structure, required fields, and code-system conformance before any data enters the mapping pipeline, quarantining malformed messages for review instead of blocking the queue.",
      "LOINC-to-SNOMED CT mapping and local provider code mapping run as independent, versioned lookup services, so terminology updates never require a code deployment.",
      "A trigger-code evaluation step determines whether an eICR must be generated alongside the standard report, based on real-time matching against reportable condition rule sets.",
      "Standardized reports (HL7 CDA, HL7 ORU, CSV, PDF) are generated from the same canonical result model, guaranteeing consistency across output formats.",
      "All transmissions to public health authorities happen over secure, authenticated channels, with acknowledgements, queries, and responses tracked back to the submitting provider for full bidirectional traceability.",
    ],
    techStack: [
      { category: "Languages", items: ["Java 11/17", "PL/SQL"] },
      { category: "Frameworks", items: ["Spring Boot", "Hibernate", "Spring Batch"] },
      { category: "Data", items: ["Oracle Database", "JSON / XML"] },
      { category: "Interoperability Standards", items: ["HL7 v2/v3", "LOINC", "SNOMED CT", "CDA", "eICR"] },
      { category: "Infrastructure", items: ["WildFly", "REST APIs", "Secure Transmission (TLS mutual auth)"] },
      { category: "Quality", items: ["JUnit", "Mockito", "HL7 conformance test suites"] },
    ],
    role: [
      "Owned the validation engine and LOINC-to-SNOMED CT mapping architecture end-to-end.",
      "Designed the trigger-code evaluation logic that determines when an eICR must be generated alongside the standard report.",
      "Built the audit logging and acknowledgement-tracking layer used for regulatory compliance reporting.",
      "Defined the testing strategy against public health authority HL7 conformance suites, and led the WildFly deployment and cutover.",
    ],
    engineeringDecisions: [
      {
        title: "Versioned mapping services over hardcoded lookup tables",
        detail:
          "LOINC and SNOMED CT terminology changes several times a year, and local provider codes shift per onboarding. Building mapping as independently versioned services meant terminology updates were a data change, not a code deployment — critical for a platform that can't afford downtime during a code-system update.",
      },
      {
        title: "Quarantine over hard rejection in the validation engine",
        detail:
          "Rather than rejecting non-conformant HL7 messages outright, the validation engine routes them to a review queue. Public health data quality matters more than strict rejection, and this let operations staff fix and resubmit instead of losing a report entirely.",
      },
      {
        title: "Rule-driven eICR generation",
        detail:
          "Instead of embedding reportable-condition logic directly in the reporting pipeline, trigger codes are evaluated against an externally configurable rule set, so public health authorities can update reportable conditions without engineering involvement.",
      },
      {
        title: "Dual batch and real-time processing paths",
        detail:
          "Nightly batch volume and real-time individual reports have very different throughput and latency profiles. Separating them into distinct processing paths sharing the same validation and mapping core avoided a one-size-fits-all pipeline that would have compromised either use case.",
      },
    ],
    implementation: [
      "Built the validation engine to check HL7 structure, required segments, and code-system conformance before mapping, with a dedicated quarantine queue for review.",
      "Implemented LOINC-to-SNOMED CT and local provider code mapping as versioned, independently deployable lookup services.",
      "Built the eICR generation workflow, evaluating incoming results against configurable reportable-condition trigger codes in real time.",
      "Implemented retry with exponential backoff and dead-letter handling for secure transmission failures to public health authority endpoints.",
      "Established a testing strategy combining JUnit/Mockito unit coverage with HL7 conformance test suites required by receiving public health authorities.",
      "Deployed the platform on WildFly with a blue-green cutover, validating message parity against the legacy manual reporting process before full go-live.",
    ],
    performance: [
      { metric: "Time from result to authority report", before: "24-48 hours (manual)", after: "< 2 minutes" },
      { metric: "Reporting data quality (valid codes)", before: "~82%", after: "99.6%" },
      { metric: "Peak reports processed / hour", before: "~500 (manual batch)", after: "40,000+" },
    ],
    results: [
      { label: "Reporting accuracy", value: "99.6%", description: "Valid, standards-conformant reports post-mapping" },
      { label: "Manual reporting effort", value: "-85%", description: "Reduction in staff time spent on manual submission" },
      { label: "Facilities onboarded", value: "200+", description: "Provider and laboratory systems reporting through the platform" },
    ],
    lessonsLearned: [
      "Treating terminology mapping (LOINC/SNOMED) as versioned data rather than code was the single decision that kept the platform maintainable as standards evolved.",
      "Public health reporting rewards graceful degradation — quarantining bad messages for review preserved far more data than strict validation rejection would have.",
      "Close collaboration with public health authorities on conformance testing early avoided late-stage surprises that are far more expensive to fix after go-live.",
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
    slug: "oneload-digital-financial-services-platform",
    title: "OneLoad — Digital Financial Services & eLoad Platform",
    industry: "FinTech / Digital Financial Services",
    timeframe: "10 months",
    teamSize: "4 engineers (backend contributor)",
    tagline:
      "A digital financial services platform unifying mobile top-ups (eLoad), loan disbursement, and multi-provider payments — with automated package management that eliminated redeploys for pricing changes.",
    technologies: ["Java", "Spring Boot", "Spring Security", "PostgreSQL", "Redis", "REST APIs"],
    accent: "from-violet-500/20 via-purple-400/10 to-transparent",
    heroImage: "/case-studies/oneload-digital-financial-services-platform.jpg",
    executiveSummary:
      "OneLoad is a digital financial services platform providing electronic mobile top-ups (eLoad), digital payments, and loan integrations through a single backend. As backend software engineer on the platform, I integrated three external financial providers — KUUNDA Easy-Cash Loan, Easypaisa Magic Box, and the PayFast Payment Gateway — and automated package management so pricing changes no longer required a production deployment.",
    businessProblem:
      "The platform needed to combine mobile top-ups, loan disbursement, and payments from multiple external financial providers into one reliable backend, without any single integration becoming an operational bottleneck. Package and pricing updates for eLoad bundles required a full production deployment every time, slowing down routine business changes and adding unnecessary engineering overhead to non-engineering decisions.",
    challenges: [
      "Each external financial provider (KUUNDA Easy-Cash Loan, Easypaisa Magic Box, PayFast, mobile network operators) had a different authentication scheme, transaction lifecycle, and settlement process to integrate against.",
      "The loan integration required a relational schema capable of tracking a loan's full lifecycle — requested, disbursed, active, repaid — not just mirroring the external API's response shape.",
      "Every eLoad package price change or new bundle required a full backend deployment, creating operational overhead and slowing time-to-market for routine pricing decisions.",
      "The platform needed to stay secure and auditable across payment, loan, and top-up flows spanning multiple third-party financial providers.",
    ],
    solution:
      "I integrated each external financial provider behind its own isolated REST client and adapter, kept the relational schema modeled around the loan lifecycle rather than any single provider's API shape, and replaced hardcoded package pricing with a database-backed configuration layer that operations staff can update without engineering involvement. Every integration was documented in a full Technical Design Document adopted by the wider engineering team.",
    diagram: "integration",
    diagramLayers: [
      { label: "Client Applications", nodes: ["Mobile App", "Web App", "Third-Party Apps"] },
      { label: "Gateway & Auth", nodes: ["API Gateway", "Authentication Service (JWT)"] },
      { label: "Core Services", nodes: ["User Service", "Payment Service", "Loan Service", "Package Service", "Notification Service", "Reporting Service"] },
      { label: "External Financial APIs", nodes: ["KUUNDA Easy-Cash Loan", "Easypaisa Magic Box", "PayFast Payment Gateway", "Mobile Network Operators"] },
    ],
    architectureNotes: [
      "An API gateway routes all inbound traffic to backend services, with JWT-based authentication enforced via Spring Security before a request reaches any downstream service.",
      "Each capability — users, payments, loans, packages, notifications, reporting — is implemented as an independently maintainable Spring Boot service, sharing a PostgreSQL-backed relational schema designed specifically around the loan integration lifecycle.",
      "Redis caches frequently accessed package/pricing configuration and token validation, keeping the hot path fast across payment and top-up flows.",
      "Package pricing and bundle configuration were externalized from application code into a database-backed, admin-editable configuration layer, removing the need for a production deployment on every pricing change.",
      "Each external integration is isolated behind its own REST client and adapter, so a provider-specific API change or outage cannot cascade into unrelated services.",
      "Docker-based builds and Git-based version control underpin a repeatable deployment process across environments.",
    ],
    techStack: [
      { category: "Languages", items: ["Java"] },
      { category: "Frameworks", items: ["Spring Boot", "Spring Security"] },
      { category: "Data", items: ["PostgreSQL", "Redis"] },
      { category: "Integration", items: ["REST APIs", "JWT", "External financial provider REST clients"] },
      { category: "Infrastructure", items: ["Docker", "Git"] },
      { category: "Quality", items: ["JUnit", "Mockito"] },
    ],
    role: [
      "Integrated KUUNDA Easy-Cash Loan across roughly 9 REST APIs, including designing the relational database schema required for the loan integration.",
      "Authored the complete Technical Design Document describing the KUUNDA integration workflow end-to-end for the wider engineering team.",
      "Designed the Easypaisa Magic Box integration flow, covering authentication, transaction lifecycle, and settlement process.",
      "Integrated the PayFast Payment Gateway, expanding available payment options and contributing to roughly 20% growth in the platform's user base.",
      "Automated eLoad package management, removing the need for a production deployment whenever package prices or bundles changed.",
      "Produced technical documentation covering integration architecture, deployment flow, and operational automation for internal engineering reference.",
    ],
    engineeringDecisions: [
      {
        title: "Isolated adapters per external financial provider",
        detail:
          "Each provider was integrated behind its own dedicated REST client and adapter rather than a shared generic 'payment provider' abstraction. Every provider had different authentication schemes, transaction lifecycles, and settlement semantics — forcing a shared abstraction too early would have leaked provider-specific quirks into the core domain model.",
      },
      {
        title: "Config-driven package management over code-based pricing",
        detail:
          "Package prices and bundle definitions moved out of application code into an admin-editable, database-backed configuration layer. This was a deliberate trade-off: a small amount of schema and validation complexity up front, in exchange for eliminating a recurring production deployment every time the business wanted to change a price or add a bundle.",
      },
      {
        title: "Schema designed around the loan lifecycle, not the API response shape",
        detail:
          "Rather than mirroring the loan provider's API response structure directly in the database, the schema was modeled around the actual lifecycle of a loan (requested, disbursed, active, repaid), so the same schema could support additional lenders later without a redesign.",
      },
      {
        title: "Stateless JWT authentication across services",
        detail:
          "Spring Security with JWT was chosen over server-side session state so authentication could scale horizontally across services without a shared session store becoming a bottleneck or single point of failure.",
      },
    ],
    implementation: [
      "Built the KUUNDA Easy-Cash Loan integration across roughly 9 REST endpoints, including request/response mapping, error handling, and retry logic for transient provider failures.",
      "Implemented the Easypaisa Magic Box authentication and transaction lifecycle, including settlement reconciliation against provider callbacks.",
      "Integrated PayFast's payment gateway APIs, handling card payments, bank transfers, and online checkout flows end-to-end.",
      "Replaced hardcoded package/pricing logic with a configuration-driven service, validated with unit and integration tests, so operations staff could update offers without engineering involvement.",
      "Wrote JUnit and Mockito test suites covering payment, loan, and package service logic, with particular focus on external API failure and retry paths.",
      "Used Docker to containerize services for consistent builds across environments, with Git-based version control underpinning the release process.",
    ],
    performance: [
      { metric: "Time to change eLoad package pricing", before: "Full deployment required", after: "Immediate, self-service via admin config" },
      { metric: "External financial providers integrated", before: "0", after: "3 providers + mobile network operators" },
      { metric: "Payment option coverage", before: "Single payment method", after: "Cards, bank transfer, digital wallet, eLoad" },
    ],
    results: [
      { label: "User growth after payment gateway integration", value: "~20%", description: "Additional payment options directly contributed to platform user growth" },
      { label: "External REST APIs integrated", value: "9+", description: "Loan disbursement integration alone" },
      { label: "Deployment dependency removed", value: "100%", description: "Package/pricing changes no longer require a backend deployment" },
    ],
    lessonsLearned: [
      "Isolating each external financial integration behind its own adapter made onboarding new providers additive instead of disruptive to existing ones.",
      "Externalizing pricing and package configuration turned a recurring engineering bottleneck into a self-service operational capability — a small schema investment with an outsized reduction in operational overhead.",
      "Writing a thorough Technical Design Document before implementation paid off most during the loan integration, where the lifecycle had more edge cases than the API documentation initially suggested.",
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
    accent: "from-indigo-500/20 via-blue-400/10 to-transparent",
    heroImage: "/case-studies/high-performance-rest-api-gateway.jpg",
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
