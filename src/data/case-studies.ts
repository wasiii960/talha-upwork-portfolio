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
  architectureImage?: string;
  closingImage?: string;
  executiveSummary: string;
  businessProblem: string;
  challenges: string[];
  solution: string;
  architectureNotes: string[];
  diagram: "vision" | "robotics" | "pipeline" | "ml";
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
    slug: "chassis-serial-number-recognition",
    title: "Automated Chassis Serial-Number Recognition System",
    industry: "Automotive Manufacturing / Industrial Computer Vision",
    timeframe: "Concept to production rollout",
    teamSize: "Solo AI/ML engineer, with hardware & PLC integration support",
    tagline:
      "An edge-deployed CNN that reads robot-written chassis serial numbers in under 3 seconds and reports pass/fail straight to the PLC — eliminating 320 hours of manual verification a month.",
    technologies: ["Python", "TensorFlow", "VGG-19 CNN", "OpenCV", "Raspberry Pi 4B", "TOYOPUC PLC"],
    accent: "from-amber-500/20 via-orange-400/10 to-transparent",
    heroImage: "/case-studies/chassis-serial-number-recognition-hero.jpg",
    architectureImage: "/case-studies/chassis-serial-number-recognition-architecture.jpg",
    closingImage: "/case-studies/chassis-serial-number-recognition-results.jpg",
    executiveSummary:
      "On an automotive chassis production line, a robot-mounted marker writes a 2-digit serial number onto each chassis part, which line workers had been manually reading and verifying against the production order — a slow, error-prone step inside an otherwise fully automated line. I designed and deployed an edge-AI system that captures the freshly-written digits with a Raspberry Pi camera, classifies them with a VGG-19 convolutional neural network, and signals a pass/fail result directly to the line's TOYOPUC PLC — all within the robot's existing 3-second cycle time, with no changes to the line's physical layout or lighting.",
    businessProblem:
      "Every chassis on the line needed its robot-written serial number checked against the expected value before moving to the next station, and that check had been a manual, visual task performed by an operator standing at the line. It was slow relative to the automated cycle around it, inconsistent across shifts and operators, and impossible to scale without adding headcount as production volume grew. The plant needed a way to verify both digits reliably, inside the existing 3-second robot cycle time, using hardware that could be retrofitted onto an active line without a new enclosure, extra lighting rigs, or a production stoppage to install.",
    challenges: [
      "The classifier had to return a verified/rejected signal to the PLC inside the robot's existing 3-second cycle time, with no slack for retries or a second camera pass.",
      "Marker ink density, chassis surface reflectivity, and ambient lighting on the shop floor varied enough that a naive brightness-based read would misclassify digits under certain conditions.",
      "The edge device had to run CNN inference fast enough on Raspberry Pi-class hardware — no GPU, no cloud round-trip — since a network dependency was not acceptable on a production line.",
      "Communication with the TOYOPUC PLC had to be reliable over the line's existing EF-10 port with no additional PLC-side logic changes.",
    ],
    solution:
      "I built the system as two connected pipelines: a training pipeline that prepared a robust 10-class digit dataset, and an inference pipeline that ran continuously on a Raspberry Pi 4B at the line. Training data was extracted from real chassis captures and expanded by sampling within 4 standard deviations of the natural distribution of writing variation, then pre-processed with LAB color-space filtering and binarization to normalize out illumination differences before they ever reached the model. A VGG-19 CNN was trained on the resulting 10-class digit set (0–9) and exported with INT8 quantization for fast inference on-device. At runtime, the Raspberry Pi Camera Module 2 captures each chassis as it passes, the same LAB-filtering and binarization pipeline runs in real time, the quantized VGG-19 model classifies both digits, and the result is sent to the TOYOPUC PLC over TCP/IP — all inside the robot's 3-second cycle.",
    diagram: "vision",
    diagramLayers: [
      { label: "Capture", nodes: ["Raspberry Pi Camera Module 2", "Chassis in Position"] },
      { label: "Pre-processing", nodes: ["LAB Color Filtering", "Binarization"] },
      { label: "Inference", nodes: ["VGG-19 CNN (INT8 Quantized)", "10-Class Digit Classification"] },
      { label: "PLC Response", nodes: ["TCP/IP Signal", "TOYOPUC PLC OK/NG"] },
    ],
    architectureNotes: [
      "Training data was built from real captured digits, expanded by sampling within a 4-sigma range of the natural writing-variation distribution, so the model generalized across the actual range of marker strokes seen on the line rather than an idealized set.",
      "LAB color-space filtering was chosen over simple grayscale thresholding specifically because it stayed robust against the shop floor's inconsistent illumination, removing the need for a dedicated lighting rig or camera enclosure.",
      "The VGG-19 model was quantized to INT8 for both calibration and inference, cutting inference time enough to comfortably fit within the 3-second robot cycle on Raspberry Pi-class hardware.",
      "The Raspberry Pi connects to the TOYOPUC PLC over TCP/IP via the line's existing EF-10 port, so the PLC-side logic needed no modification — the edge device simply appears as another signal source.",
    ],
    techStack: [
      { category: "Languages", items: ["Python 3.8"] },
      { category: "ML / Computer Vision", items: ["TensorFlow", "VGG-19 CNN", "INT8 Quantization", "OpenCV", "Picamera2"] },
      { category: "Edge Hardware", items: ["Raspberry Pi 4B (4GB RAM)", "Raspberry Pi Camera Module 2"] },
      { category: "Industrial Integration", items: ["TOYOPUC PLC", "TCP/IP", "LAN (EF-10 port)"] },
    ],
    role: [
      "Designed the end-to-end data pipeline: extraction, 4-sigma-based randomization, and LAB-filter/binarization pre-processing for model training.",
      "Trained and quantized the VGG-19 CNN for 10-class digit classification, optimizing for INT8 inference speed on Raspberry Pi hardware.",
      "Built the real-time inference pipeline on the Raspberry Pi 4B, including camera capture, pre-processing, and classification within the 3-second cycle budget.",
      "Implemented the TCP/IP communication layer between the edge device and the TOYOPUC PLC over the line's existing EF-10 port.",
    ],
    engineeringDecisions: [
      {
        title: "LAB color filtering over grayscale thresholding",
        detail:
          "Grayscale binarization alone was too sensitive to the shop floor's variable lighting and marker ink density. Switching to LAB color-space filtering before binarization made the pipeline robust against illumination changes without needing any additional hardware or a dedicated lighting enclosure.",
      },
      {
        title: "INT8 quantization over full-precision inference",
        detail:
          "A full-precision VGG-19 model was too slow to guarantee a result inside the robot's 3-second cycle on Raspberry Pi-class hardware. Quantizing to INT8 brought latency down enough to fit comfortably within the cycle time, at an acceptable and tested cost to classification accuracy.",
      },
      {
        title: "4-sigma data sampling over raw data collection",
        detail:
          "Rather than training only on however many real digit captures happened to be available, I extracted the natural distribution of writing variation and sampled within 4 standard deviations of it to build a training set that generalized to the real range of marker strokes the robot actually produces.",
      },
      {
        title: "Edge inference over a cloud/network round-trip",
        detail:
          "A network dependency was not acceptable for a signal that gates the PLC's next action. Running classification entirely on the Raspberry Pi kept the system correct and available even if the plant network had issues.",
      },
    ],
    implementation: [
      "Extracted and randomized digit image data to form a normal distribution, then selected the 4-sigma pattern range to build the training set for 10-class digit classification (0–9).",
      "Applied LAB color-space filtering followed by binarization as a pre-processing step, tuned specifically to stay robust against shop-floor illumination variation.",
      "Trained a VGG-19 CNN on the pre-processed dataset, then quantized it to INT8 for fast on-device inference.",
      "Deployed the trained model to a Raspberry Pi 4B with a Raspberry Pi Camera Module 2, running the full capture-to-classification pipeline in real time.",
      "Implemented TCP/IP communication from the Raspberry Pi to the TOYOPUC PLC over the line's EF-10 port to deliver the verified/rejected signal.",
    ],
    performance: [
      { metric: "Serial-number verification method", before: "Manual visual inspection by line operator", after: "Automated VGG-19 CNN classification" },
      { metric: "Verification cycle time", before: "Operator-paced, variable", after: "< 3 seconds — inside the robot's existing cycle" },
      { metric: "Monthly manual verification effort", before: "~320 hours/month", after: "0 hours/month" },
    ],
    results: [
      { label: "Man-hours saved", value: "320/month", description: "Manual serial-number verification fully automated" },
      { label: "Digit classes learned", value: "10", description: "0–9 classification via VGG-19 CNN, both digits per chassis" },
      { label: "Inference budget", value: "< 3s", description: "Fits inside the robot arm's existing write cycle time" },
    ],
    lessonsLearned: [
      "Solving for illumination robustness at the pre-processing stage (LAB filtering) was far cheaper than solving for it with hardware — no lighting rig or enclosure was ever needed.",
      "INT8 quantization was the difference between a model that worked in a notebook and one that could actually hit the line's cycle-time budget on edge hardware.",
      "Building the training set around the real distribution of writing variation, rather than a small hand-picked sample, made the classifier reliable across shifts and operators without additional retraining.",
    ],
  },
  {
    slug: "in-house-trolley-agv",
    title: "In-House Vision-Guided Trolley AGV",
    industry: "Automotive Manufacturing / Robotics & Industrial AI",
    timeframe: "Concept to production rollout",
    teamSize: "Solo AI/ML engineer, with hardware team collaboration",
    tagline:
      "A cost-effective, camera-guided AGV retrofit that turned standard production trolleys into autonomous logistics vehicles — eliminating 96 man-hours a month and winning a company-wide excellence award.",
    technologies: ["Python", "OpenCV", "ESP32", "Raspberry Pi 4B", "PID Control", "Picamera2"],
    accent: "from-lime-500/20 via-emerald-400/10 to-transparent",
    heroImage: "/case-studies/trolley-agv-hero.jpg",
    architectureImage: "/case-studies/trolley-agv-architecture.jpg",
    closingImage: "/case-studies/trolley-agv-results.jpg",
    executiveSummary:
      "In-line logistics on the production floor relied on workers manually pushing trolleys of parts between stations — a repetitive task that pulled staff away from higher-value work. Collaborating with the hardware team, I led development of an in-house Automated Guided Vehicle (AGV) retrofit: existing trolleys were fitted with motors, wheels, and a low-cost edge-vision system that lets them autonomously follow a taped path, pivot at corners, and stop for obstacles — all built from scratch in Python, without relying on any commercial AGV platform.",
    businessProblem:
      "In-line parts logistics depended on manual trolley pushing between stations, consuming roughly 96 man-hours a month of staff time on a task that added no direct manufacturing value. A commercial AGV solution would have meant replacing existing trolleys and integrating a vendor platform at significant cost. The plant needed an autonomous alternative that reused the trolleys already on the floor, used inexpensive, readily available hardware, and could be tuned to different trolley sizes without a redesign — all while running reliably enough to trust with real production movement.",
    challenges: [
      "Retrofitting motorized AGV capability onto existing trolleys meant designing a mechanical system — motors, wheels, and a lever mechanism — that could engage and disengage AGV mode without permanently altering the trolley's normal manual use.",
      "Guiding the AGV reliably along a taped path required real-time image processing fast enough to keep the vehicle centered and correct its heading continuously, not just at fixed checkpoints.",
      "The AGV needed to handle more than straight-line following: detecting 90-degree corners, pivoting accurately, and stopping safely when the guide tape was obstructed or missing.",
      "The system had to be generalizable — tunable to different trolley dimensions, base speeds, and tape colors via configuration rather than a hardware or code rewrite for every new trolley.",
    ],
    solution:
      "The hardware team added Oriental Motor units with rubber wheels to the underside of standard trolleys, mounted on springs with a lever that presses the AGV wheels down to engage AGV mode. On the software side, a Raspberry Pi 4B with a wide-angle Camera Module 3 reads the floor at 60 FPS, uses OpenCV to detect the blue guide tape and calculate a lateral position error, and computes a PID correction value. That PID output is sent to an ESP32 microcontroller over serial, which relays a power signal to the motor driver, setting the left and right wheel power ratio to keep the AGV centered on the tape, pivot 90 degrees at corners, and stop when the tape is obstructed or missing. Every parameter — trolley dimensions, base speed, guide tape color — is configurable in software, so the same codebase supports any trolley size.",
    diagram: "robotics",
    diagramLayers: [
      { label: "Perception", nodes: ["Raspberry Pi Camera Module 3 (60 FPS)", "OpenCV Tape Detection"] },
      { label: "Control", nodes: ["Lateral Error Calculation", "PID Controller"] },
      { label: "Actuation", nodes: ["ESP32 (Serial/TCP-IP)", "Motor Driver", "Left/Right Wheel Power"] },
      { label: "Behavior", nodes: ["Forward Tracking", "90° Pivot", "Obstruction Stop"] },
    ],
    architectureNotes: [
      "AGV mode is mechanically engaged via a spring-loaded lever that pushes motorized wheels down beneath the trolley, so the same trolley can still be pushed manually when AGV mode isn't needed.",
      "Real-time image processing runs at 60 FPS on the Raspberry Pi, calculating the lateral offset between the vehicle's center point and the detected blue tape centerline on every frame.",
      "A PID controller converts that lateral error into a continuous left/right wheel power ratio, rather than a discrete steer-then-correct loop, which is what let the AGV track smoothly instead of oscillating around the tape.",
      "The ESP32 sits between the Raspberry Pi's vision/PID output and the motor driver, relaying power signals over serial and TCP/IP so the vision compute and motor control stay decoupled.",
      "Corner handling, obstruction detection, and stop behavior are all derived from the same tape-detection pipeline: a detected 90-degree tape corner triggers a pivot, and a missing or obstructed tape triggers an immediate stop.",
      "Trolley dimensions, base speed (tunable up to 300mm/sec), and guide tape color are all parameterized in software settings, so onboarding a new trolley size is a configuration change, not a rebuild.",
    ],
    techStack: [
      { category: "Languages", items: ["Python 3.8"] },
      { category: "Computer Vision / Control", items: ["OpenCV", "Picamera2", "PID Control Loop"] },
      { category: "Edge Hardware", items: ["Raspberry Pi 4B (4GB RAM)", "Raspberry Pi Camera Module 3 (wide)", "ESP32"] },
      { category: "Actuation", items: ["Oriental Motor", "Motor Driver"] },
      { category: "Communication", items: ["Serial I/O", "TCP/IP"] },
    ],
    role: [
      "Designed and led development of the entire AGV software stack from scratch in Python, in collaboration with the hardware team's mechanical retrofit.",
      "Built the real-time, 60 FPS image-processing pipeline for blue-tape detection and lateral error calculation using OpenCV.",
      "Implemented the PID control loop converting lateral error into left/right wheel power ratios, tuned for stable tracking at up to 300mm/sec.",
      "Built the serial/TCP-IP communication layer between the Raspberry Pi's vision system and the ESP32-driven motor control.",
      "Parameterized the system for trolley dimensions, base speed, and tape color so new trolleys could be onboarded through configuration alone.",
    ],
    engineeringDecisions: [
      {
        title: "PID control over discrete steer-correct logic",
        detail:
          "An early discrete correction approach caused visible oscillation around the tape centerline. Moving to a continuous PID loop converting lateral error directly into a wheel power ratio produced smooth, stable tracking, at the cost of needing careful tuning of the PID constants for the trolley's actual mass and wheel response.",
      },
      {
        title: "Cost-effective retrofit over a commercial AGV platform",
        detail:
          "Rather than purchasing a commercial AGV system, the team retrofitted existing trolleys with motors, wheels, and a spring-loaded engagement lever. This kept the hardware cost low and let the same trolleys serve their original manual-push purpose, at the cost of more upfront mechanical design work.",
      },
      {
        title: "ESP32 as a dedicated motor-control intermediary",
        detail:
          "Rather than driving the motor driver directly from the Raspberry Pi, an ESP32 was placed between vision/PID compute and actuation. This decoupled the vision workload from real-time motor signaling and kept the control loop responsive even under camera-processing load.",
      },
      {
        title: "Fully parameterized configuration over per-trolley code",
        detail:
          "Trolley dimensions, base speed, and tape color were built as configuration values from the start rather than hardcoded per deployment, which meant every additional trolley size the plant wanted to automate was a settings change, not new development.",
      },
    ],
    implementation: [
      "Collaborated with the hardware team to retrofit production trolleys with Oriental Motor units, rubber wheels, and a spring-loaded lever mechanism for AGV-mode engagement.",
      "Built the 60 FPS real-time image-processing pipeline in OpenCV to detect the blue guide tape and calculate lateral positioning error against the vehicle's center point.",
      "Implemented the PID controller translating lateral error into left/right wheel power ratios, tuned for stable tracking at speeds up to 300mm/sec.",
      "Programmed the ESP32 to receive PID output over serial and relay power signals to the motor driver.",
      "Implemented corner-pivot (90°) and obstruction-stop behaviors driven by the same tape-detection pipeline used for forward tracking.",
      "Parameterized trolley dimensions, base speed, and guide tape color as software settings to support onboarding new trolley sizes without code changes.",
    ],
    performance: [
      { metric: "In-line logistics labor", before: "Manual trolley pushing between stations", after: "Fully autonomous AGV operation" },
      { metric: "Image processing / control loop rate", before: "n/a (manual)", after: "60 FPS real-time PID control" },
      { metric: "New trolley size onboarding", before: "Would require a hardware/code rebuild", after: "Parameterized software configuration" },
    ],
    results: [
      { label: "Man-hours saved", value: "96/month", description: "In-line logistics fully automated" },
      { label: "Recognition", value: "Excellence Award", description: "Company-wide award for the in-house AGV development" },
      { label: "Tunable travel speed", value: "300mm/sec", description: "Configurable AGV base speed" },
    ],
    lessonsLearned: [
      "A continuous PID loop outperformed discrete correction logic enough that it was worth the extra tuning effort — the resulting tracking stability was the difference between a demo and a trustworthy production system.",
      "Designing for parameterization from day one — trolley dimensions, speed, tape color — paid off directly when the plant wanted to onboard additional trolley sizes with zero new development.",
      "Splitting vision compute (Raspberry Pi) from real-time motor signaling (ESP32) kept the control loop responsive even when the camera pipeline was under load, which a single-board design would not have handled as cleanly.",
    ],
  },
  {
    slug: "time-series-etl-parquet-pipeline",
    title: "High-Volume Time-Series ETL & Parquet Compression Pipeline",
    industry: "Automotive Manufacturing / Data Engineering",
    timeframe: "Production data pipeline",
    teamSize: "Solo data engineer",
    tagline:
      "A real-time CSV-to-Parquet pipeline for 100+ PLC devices that cut annual storage from 2,300GB to ~130GB while enabling instant, real-time search across the entire dataset.",
    technologies: ["Python", "PyArrow", "PostgreSQL", "Watchdog", "Multiprocessing", "RHEL"],
    accent: "from-cyan-500/20 via-teal-400/10 to-transparent",
    heroImage: "/case-studies/time-series-etl-parquet-pipeline-hero.jpg",
    architectureImage: "/case-studies/time-series-etl-parquet-pipeline-architecture.jpg",
    closingImage: "/case-studies/time-series-etl-parquet-pipeline-results.jpg",
    executiveSummary:
      "More than 100 PLC devices on the production floor generated time-series data as CSV files continuously while running — averaging 10GB and roughly 160,000 files a day, or 2,300GB+ a year. Because each machine's data landed as fixed-row, variable-column CSVs, it had to be merged by machine ID and data type before it was usable for search or analytics. I designed and built a real-time ETL pipeline that converts incoming CSVs to Parquet as they arrive, with a nightly batch job merging them into one file per machine-and-type, cutting storage by over 90% while making the entire dataset instantly and virtually searchable.",
    businessProblem:
      "Every PLC device on the line wrote its own time-series data as CSV files continuously — fixed at 32 rows per file but with variable columns depending on the data type — accumulating to roughly 0.16 million files and 10GB per day across 100+ machines. Meaningful analysis meant merging files by machine ID and data type, which nobody could do in real time against raw CSV without either a slow on-demand merge or a growing storage bill. The plant needed a way to make this legacy time-series data efficiently searchable and retrievable at scale, without adding new hardware cost.",
    challenges: [
      "Incoming data arrived as ~0.16 million CSV files a day across 100+ PLC devices, each with a fixed 32-row structure but variable columns depending on the data type being recorded.",
      "Meaningful search and analytics required merging files by machine ID and data type, but doing that merge on-demand against raw CSV volume would have been far too slow for real-time use.",
      "Raw CSV storage was on pace to reach 2,300GB+ a year, an unsustainable growth rate without either a storage budget increase or a fundamentally different storage format.",
      "The solution had to run on existing on-premises hardware with zero additional infrastructure cost, and be idempotent and fault-tolerant against a constantly-landing stream of files.",
    ],
    solution:
      "I built a real-time pipeline that converts each CSV to Parquet format as it lands, rather than merging in real time. A watchdog process monitors the server's landing directory for new CSV filenames, and a PostgreSQL table acts as a FIFO queue to track and process incoming files in a cost-efficient, idempotent way — so a crash or restart never causes a file to be double-processed or lost. A worker pool reads each queued CSV with PyArrow and writes it out as Parquet in real time. A nightly batch job then merges the day's Parquet files into one consolidated file per machine-ID-and-data-type combination. Because Parquet files can be virtually concatenated in memory while being read, this gave instant search and extraction across the full dataset without ever needing to merge raw CSVs on demand.",
    diagram: "pipeline",
    diagramLayers: [
      { label: "Ingestion", nodes: ["100+ PLC Devices", "CSV File Stream", "Watchdog Monitor"] },
      { label: "Real-time Processing", nodes: ["PostgreSQL FIFO Queue", "Worker Pool", "PyArrow CSV → Parquet"] },
      { label: "Nightly Compaction", nodes: ["Merge by Machine ID + Type", "Consolidated Parquet Files"] },
      { label: "Query", nodes: ["In-Memory Concatenation", "Instant Search & Extraction"] },
    ],
    architectureNotes: [
      "A watchdog process monitors the server's landing directory for new CSV filenames the instant they arrive, triggering processing without polling overhead.",
      "A PostgreSQL table is used as a FIFO queue to track which CSVs have and haven't been processed, chosen specifically for cost efficiency and idempotency — reprocessing a file after a crash or restart never produces duplicate or corrupted output.",
      "A multiprocessing worker pool reads queued CSVs with PyArrow and writes Parquet output in real time, keeping ingestion throughput at roughly 300 CSV-to-Parquet conversions per minute.",
      "A nightly batch job merges the day's per-file Parquet output into one consolidated file per machine-ID-and-data-type combination, which is what turns thousands of small files into a small number of efficiently queryable datasets.",
      "Because Parquet supports virtual concatenation in memory while being read, machine-and-type datasets can be queried across many merged files without a physical re-merge, giving effectively instant search over the full historical dataset.",
      "The entire pipeline runs on existing on-premises RHEL servers, with zero additional hardware cost — the storage savings from the Parquet conversion alone offset the entire engineering investment.",
    ],
    techStack: [
      { category: "Languages", items: ["Python 3.9"] },
      { category: "Data Engineering", items: ["PyArrow (Parquet)", "Multiprocessing", "Watchdog"] },
      { category: "Queue / Storage", items: ["PostgreSQL 16 (FIFO queue)"] },
      { category: "Infrastructure", items: ["RHEL", "On-premises server (zero additional hardware cost)"] },
    ],
    role: [
      "Designed the full real-time ETL architecture, from CSV landing detection through Parquet conversion to nightly compaction.",
      "Implemented the PostgreSQL-backed FIFO queue and watchdog-based file monitoring for idempotent, cost-efficient processing.",
      "Built the multiprocessing worker pool converting CSV to Parquet with PyArrow, sustaining roughly 300 conversions/minute.",
      "Designed the nightly batch merge strategy that consolidates per-file Parquet output into one file per machine-ID-and-data-type combination.",
    ],
    engineeringDecisions: [
      {
        title: "Real-time CSV-to-Parquet conversion over real-time merging",
        detail:
          "Merging files by machine ID and type in real time against a constant stream of 0.16 million files a day would have been prohibitively slow. Converting each CSV to Parquet immediately as it landed, and deferring the actual merge to a nightly batch job, let ingestion stay real-time while keeping the expensive merge operation off the hot path.",
      },
      {
        title: "PostgreSQL as a FIFO queue over a message broker",
        detail:
          "Rather than introducing a dedicated message queue system, an existing PostgreSQL table was used as a FIFO queue for tracking incoming CSV files. This kept the solution cost-efficient — no new infrastructure — while still guaranteeing idempotent, ordered processing.",
      },
      {
        title: "Watchdog-based detection over polling",
        detail:
          "Using a watchdog process to react to new CSV filenames as they landed, instead of periodically polling the directory, reduced both processing latency and unnecessary I/O against the landing directory.",
      },
      {
        title: "Nightly compaction over per-file querying",
        detail:
          "Leaving Parquet output as one file per source CSV would have kept file count high and query performance poor. Nightly compaction into one file per machine-and-type struck the balance between real-time ingestion and efficient long-term query performance.",
      },
    ],
    implementation: [
      "Built the watchdog-based file monitor to detect new CSV filenames landing in the server directory in real time.",
      "Implemented the PostgreSQL FIFO queue to track processing state per file, ensuring idempotent handling across restarts and crashes.",
      "Built the multiprocessing worker pool using PyArrow to convert queued CSVs to Parquet, sustaining roughly 300 conversions per minute.",
      "Implemented the nightly batch job that merges the day's Parquet output into one consolidated file per machine-ID-and-data-type combination.",
      "Validated that virtual, in-memory concatenation of merged Parquet files supported instant search and large-scale data extraction without a physical re-merge step.",
      "Deployed the pipeline on existing on-premises RHEL infrastructure with zero additional hardware cost.",
    ],
    performance: [
      { metric: "Annual storage footprint", before: "~2,300 GB/year (raw CSV)", after: "~130 GB/year (Parquet)" },
      { metric: "Conversion throughput", before: "Manual/batch merge only", after: "~300 CSV → Parquet conversions/min" },
      { metric: "Search & retrieval", before: "Required merging CSVs on demand", after: "Instant, virtual concatenation of Parquet files" },
    ],
    results: [
      { label: "Storage reduction", value: "~94%", description: "Annual raw data footprint cut from 2,300GB to ~130GB" },
      { label: "Conversion throughput", value: "300/min", description: "CSV files converted to Parquet per minute in real time" },
      { label: "Source PLC devices", value: "100+", description: "Machines streaming time-series data into the pipeline" },
    ],
    lessonsLearned: [
      "Separating real-time ingestion (convert as it lands) from expensive consolidation (merge nightly) was the single decision that made both real-time throughput and efficient storage possible at the same time.",
      "Reusing PostgreSQL as a FIFO queue, instead of standing up new queueing infrastructure, delivered idempotent processing at effectively zero added infrastructure cost.",
      "Parquet's support for virtual, in-memory concatenation meant the storage-format change alone delivered a search-speed improvement, without any separate indexing or database layer.",
    ],
  },
  {
    slug: "servo-motor-anomaly-prediction",
    title: "Early Anomaly Prediction for Production-Line Servo Motors",
    industry: "Automotive Manufacturing / Predictive Maintenance",
    timeframe: "Production monitoring system",
    teamSize: "Solo ML engineer, in collaboration with domain/maintenance experts",
    tagline:
      "An XGBoost-based early-warning system monitoring 500+ servo motors that improved anomaly detection by 86% and cut production stoppage time by 20 hours a month.",
    technologies: ["Python", "XGBoost", "SciPy", "Pandas", "PyArrow", "Power BI"],
    accent: "from-rose-500/20 via-red-400/10 to-transparent",
    heroImage: "/case-studies/servo-motor-anomaly-prediction-hero.jpg",
    architectureImage: "/case-studies/servo-motor-anomaly-prediction-architecture.jpg",
    closingImage: "/case-studies/servo-motor-anomaly-prediction-results.jpg",
    executiveSummary:
      "Servo motors across the production line degrade under sustained high-production stress, and by the time wear became visible in normal monitoring, it had often already caused downstream part damage or unplanned stoppage. I built a generalized anomaly-prediction system that ingests time-series torque, speed, and position data from 500+ motors, algorithmically segments each motor's operating cycles regardless of their shape, converts each cycle into a statistical feature vector, and scores it with an XGBoost model — surfacing early-warning anomalies in a Power BI dashboard and Microsoft Teams before they became line-stopping failures.",
    businessProblem:
      "With 500+ servos operating continuously in high-production conditions, wear-driven anomalies in torque, speed, and position needed to be caught early enough to schedule targeted maintenance rather than react to an unplanned stoppage. Servo cycles varied in shape across different motors and use cases, so any detection approach limited to one fixed cycle pattern would miss most of the fleet. The team needed a generalizable way to identify meaningful cycles in each motor's continuous signal, score them for anomalous behavior, and get that information in front of maintenance staff before a failure occurred — not just after.",
    challenges: [
      "Servo cycles differed in shape and duration across the 500+ motors on the line, so a detection approach tuned to one cycle pattern would not generalize across the fleet.",
      "Raw torque, speed, and position signals needed to be reliably split into individual operating cycles before any meaningful feature extraction or scoring could happen.",
      "The scoring model had to distinguish genuinely anomalous behavior from normal cycle-to-cycle variation without producing so many false positives that maintenance staff stopped trusting the alerts.",
      "Results needed to reach maintenance and production teams in a format they'd actually act on — not a data science notebook, but a live dashboard and real-time notifications.",
    ],
    solution:
      "I worked with domain experts on the production line to build a generalistic cycle-cutting algorithm capable of splitting motor cycles of differing shapes, so the same pipeline could be applied across the fleet's varied servo behavior. Once a cycle was identified, it was transformed into a set of statistical feature values — capturing the shape and magnitude characteristics of that cycle's torque, speed, and position data — and compiled into a feature vector. That feature vector was fed into an XGBoost model trained to score each cycle as normal or anomalous. The pipeline runs continuously across every motor on the line with a cyclic operating pattern, and all resulting analytics, anomaly notifications, and trends are surfaced in a Power BI dashboard with real-time alerts pushed to Microsoft Teams.",
    diagram: "ml",
    diagramLayers: [
      { label: "Signal Ingestion", nodes: ["500+ Servo Motors", "Torque / Speed / Position Time-Series"] },
      { label: "Feature Engineering", nodes: ["Generalistic Cycle Cutting", "Statistical Feature Vector"] },
      { label: "Scoring", nodes: ["XGBoost Model", "Anomaly Score"] },
      { label: "Reporting", nodes: ["Power BI Dashboard", "Microsoft Teams Alerts"] },
    ],
    architectureNotes: [
      "A generalistic cycle-cutting algorithm, developed with production domain experts, splits each motor's continuous time-series into individual operating cycles regardless of that motor's specific cycle shape — the key step that let one pipeline scale across all 500+ motors.",
      "Each identified cycle is transformed into a statistical feature vector summarizing its torque, speed, and position characteristics, rather than feeding raw time-series directly into the model, which made the scoring step both faster and more interpretable.",
      "An XGBoost model scores each feature vector for anomalous versus normal behavior, chosen for its strength on structured, tabular feature data and its relatively fast inference at fleet scale.",
      "The pipeline runs across every motor on the production line that exhibits a cyclic operating pattern, rather than being scoped to a single machine type, so coverage scales with the fleet automatically.",
      "Results are delivered through a Power BI dashboard for trend analysis and Microsoft Teams notifications for real-time alerts, so maintenance staff act on anomalies without needing to query the underlying data themselves.",
    ],
    techStack: [
      { category: "Languages", items: ["Python 3.10"] },
      { category: "Machine Learning", items: ["XGBoost", "SciPy", "Pandas"] },
      { category: "Data", items: ["PyArrow"] },
      { category: "Reporting", items: ["Power BI", "Microsoft Teams"] },
      { category: "Infrastructure", items: ["On-premises server"] },
    ],
    role: [
      "Collaborated with production domain experts to design a generalistic cycle-cutting algorithm that works across motors with different cycle shapes.",
      "Built the statistical feature-extraction pipeline converting identified cycles into feature vectors for scoring.",
      "Trained and tuned the XGBoost anomaly-scoring model across the fleet of 500+ servo motors.",
      "Built the Power BI reporting layer and Microsoft Teams alerting integration used by production and maintenance teams.",
    ],
    engineeringDecisions: [
      {
        title: "Generalistic cycle-cutting over per-motor tuned detection",
        detail:
          "Servo cycles varied enough in shape across the fleet that a detection approach tuned to one motor's cycle pattern would have needed re-tuning for every new motor type. Investing in a generalistic, shape-independent cycle-cutting algorithm up front meant the same pipeline scaled to all 500+ motors without per-motor customization.",
      },
      {
        title: "Statistical feature vectors over raw time-series input",
        detail:
          "Feeding raw torque/speed/position time-series directly into a model would have been slower to score and harder to reason about. Converting each cycle into a statistical feature vector first made the XGBoost model both faster at fleet scale and easier to validate against domain experts' intuition about what 'normal' looks like.",
      },
      {
        title: "XGBoost over a deep learning approach",
        detail:
          "For structured, per-cycle feature data at this scale, XGBoost gave strong classification performance with faster training iteration and easier interpretability than a deep learning approach would have, which mattered when validating results with production domain experts who needed to trust the model's reasoning.",
      },
      {
        title: "Power BI + Teams over a custom reporting UI",
        detail:
          "Rather than building a bespoke dashboard, results were delivered through Power BI, which the production and maintenance teams already used, with Microsoft Teams alerts for anything time-sensitive. This got the system adopted immediately instead of requiring teams to learn a new tool.",
      },
    ],
    implementation: [
      "Developed the generalistic cycle-cutting algorithm in collaboration with production domain experts, validated across motors with differing cycle shapes.",
      "Built the statistical feature-extraction step transforming each identified cycle's torque, speed, and position data into a feature vector.",
      "Trained and tuned an XGBoost model to score feature vectors as normal or anomalous, iterating with domain experts on threshold and false-positive tolerance.",
      "Deployed the scoring pipeline to run continuously across all 500+ motors with a cyclic operating pattern on the production line.",
      "Built the Power BI dashboard for anomaly trends and history, and wired real-time anomaly alerts into Microsoft Teams.",
    ],
    performance: [
      { metric: "Anomaly detection lead time", before: "Reactive, post-failure detection", after: "86% improvement in early detection" },
      { metric: "Production stoppage (maintenance-related)", before: "Baseline unplanned stoppage time", after: "-20 hours/month via targeted maintenance" },
      { metric: "Motor coverage", before: "Manual spot-checks", after: "500+ motors continuously scored" },
    ],
    results: [
      { label: "Earlier anomaly detection", value: "86%", description: "Improvement in early detection of servo degradation" },
      { label: "Stoppage time saved", value: "20 hrs/month", description: "Reduced production downtime via targeted maintenance" },
      { label: "Motors monitored", value: "500+", description: "Continuously scored across the production line" },
    ],
    lessonsLearned: [
      "Solving cycle segmentation generically, rather than per-motor, was the single highest-leverage decision — it's what let the system scale to the full fleet without linear engineering effort per motor added.",
      "Converting raw signals into statistical feature vectors before scoring made the model both faster and easier to validate with the domain experts who ultimately had to trust and act on its output.",
      "Delivering results through tools maintenance teams already used (Power BI, Teams) mattered as much as the model's accuracy — an accurate system nobody looks at doesn't reduce stoppage time.",
    ],
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((cs) => cs.slug === slug);
}
