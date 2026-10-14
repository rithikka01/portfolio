export type SkillGroup = {
  title: string;
  icon: string;
  color: string;
  items: { name: string; level: number; tag?: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "PROGRAMMING LANGUAGES",
    icon: "⌨",
    color: "var(--neon-cyan)",
    items: [
      { name: "Python", level: 45, tag: "BASIC" },
      { name: "Java", level: 70, tag: "INTERMEDIATE" },
      { name: "SQL", level: 65 },
    ],
  },
  {
    title: "MOBILE APP DEVELOPMENT",
    icon: "▣",
    color: "var(--neon-pink)",
    items: [
      { name: "Flutter", level: 85 },
      { name: "Firebase", level: 80 },
      { name: "REST APIs", level: 70 },
    ],
  },
  {
    title: "WEB DEVELOPMENT",
    icon: "◈",
    color: "var(--neon-green)",
    items: [
      { name: "HTML", level: 85 },
      { name: "CSS", level: 80 },
      { name: "JavaScript", level: 70 },
      { name: "Flask", level: 65 },
    ],
  },
  {
    title: "CLOUD & DATABASES",
    icon: "☁",
    color: "var(--neon-blue)",
    items: [
      { name: "Google Cloud Platform", level: 60 },
      { name: "Firebase Firestore", level: 80 },
      { name: "PostgreSQL", level: 70 },
      { name: "Render", level: 60 },
    ],
  },
  {
    title: "AI & MACHINE LEARNING",
    icon: "✦",
    color: "var(--neon-purple)",
    items: [
      { name: "TensorFlow", level: 70 },
      { name: "Scikit-learn", level: 75 },
      { name: "Pandas", level: 80 },
      { name: "NumPy", level: 80 },
      { name: "NLP", level: 75 },
    ],
  },
  {
    title: "UI/UX DESIGN",
    icon: "✎",
    color: "var(--neon-yellow)",
    items: [
      { name: "Figma", level: 85 },
      { name: "Canva", level: 85 },
      { name: "Wireframing", level: 80 },
      { name: "Prototyping", level: 80 },
    ],
  },
  {
    title: "TESTING & DEBUGGING",
    icon: "⚙",
    color: "var(--neon-cyan)",
    items: [{ name: "Postman (API Testing)", level: 70 }],
  },
  {
    title: "VERSION CONTROL",
    icon: "⑂",
    color: "var(--neon-green)",
    items: [
      { name: "Git", level: 75 },
      { name: "GitHub", level: 80 },
    ],
  },
];

/** Logos served from Iconify (Simple Icons), recolored white for the dark theme. */
export const toolLogos: { name: string; slug: string }[] = [
  { name: "Python", slug: "python" },
  { name: "Java", slug: "openjdk" },
  { name: "MySQL", slug: "mysql" },
  { name: "Flutter", slug: "flutter" },
  { name: "Firebase", slug: "firebase" },
  { name: "HTML", slug: "html5" },
  { name: "CSS", slug: "css" },
  { name: "JavaScript", slug: "javascript" },
  { name: "Flask", slug: "flask" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Figma", slug: "figma" },
  { name: "Canva", slug: "canva" },
  { name: "Postman", slug: "postman" },
  { name: "GitHub", slug: "github" },
  { name: "NLP", slug: "huggingface" },
  { name: "AI", slug: "openai" },
  { name: "ML", slug: "tensorflow" },
];

export const missions = [
  {
    id: "MISSION 01",
    org: "Codsoft Technologies",
    project: "Product Visual Design",
    role: "UI/UX Intern",
    duration: "Feb 2024 — Mar 2024",
    details: [
      "Designed product visuals in Figma and Canva.",
      "Focused on usability, accessibility, and brand consistency.",
      "Applied iterative feedback to refine layouts and enhance design quality.",
    ],
  },
  {
    id: "MISSION 02",
    org: "Pantech eLearning",
    project: "Government Schemes Chatbot",
    role: "NLP Intern",
    duration: "Jun 2024",
    details: [
      "Created a chatbot to facilitate easier access to public information on government initiatives.",
      "Acquired practical experience in Python, machine learning algorithms, and NLP techniques.",
      "Engaged in model training, evaluation, and performance tuning to boost chatbot accuracy.",
    ],
  },
  {
    id: "MISSION 03",
    org: "Sri Sairam Techno Incubator Foundation",
    project: "Skoolinq Educational App",
    role: "App Developer Intern",
    duration: "Sep 2024 — Jan 2025",
    details: [
      "Managed frontend development and UI/UX design of Skoolinq educational app with Flutter.",
      "Designed responsive layouts to improve user experience.",
      "Created and launched key frontend functionalities including personalized dashboards, anonymous messaging, and educational contests.",
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  tech: string[];
  short: string;
  description: string;
  color: string;
  repo: string;
};

export const projects: Project[] = [
  {
    id: "WORLD 1-1",
    title: "SMART HARVEST ANALYTICS",
    category: "AI + ML + IoT",
    tech: ["Python", "Machine Learning", "IoT", "Predictive Analytics"],
    short: "ML + IoT system for crop yield prediction.",
    description:
      "An AI ML+ IoT agriculture system that analyzes crop and environmental data to predict crop yield and provide farming insights.",
    color: "var(--neon-green)",
    repo: "https://github.com/rithikka01/smart-harvest-analytics",
  },
  {
    id: "WORLD 1-2",
    title: "HUNGERHEAL",
    category: "Mobile Application",
    tech: ["Flutter", "Firebase", "PostgreSQL", "Python", "GitHub Actions"],
    short: "Mobile platform connecting food donors and volunteers.",
    description:
      "A food-donation platform connecting donors and volunteers for donation coordination, scheduling, location tracking, and delivery management. Includes automated expired-listing archiving.",
    color: "var(--neon-pink)",
    repo: "https://github.com/rithikka01/hungerheal01",
  },
  {
    id: "WORLD 1-3",
    title: "SKOOLINQ",
    category: "Career Guidance / Mobile App",
    tech: ["Flutter", "Firebase", "Figma"],
    short: "Career guidance application designed to help students navigate their career journey.",
    description:
      "A mobile career-guidance application that helps students explore career opportunities through personalized dashboards and interactive features.",
    color: "var(--neon-cyan)",
    repo: "https://github.com/rithikka01/skoolinq-final",
  },
  {
    id: "WORLD 1-4",
    title: "GOVERNMENT DRIVING AI ASSISTANT",
    category: "NLP / AI",
    tech: ["Python", "NLP", "Flask"],
    short: "NLP chatbot for instant answers on government schemes.",
    description:
      "An NLP chatbot that lets users ask questions about government driving schemes and receive relevant information through automated responses.",
    color: "var(--neon-yellow)",
    repo: "https://github.com/rithikka01/government-driving-ai-assistant",
  },
  {
    id: "WORLD 1-5",
    title: "CONTRACT RISK BOT — MVP",
    category: "AI / NLP",
    tech: ["Python", "Streamlit", "NLP", "OpenAI", "ReportLab"],
    short:
      "AI-powered contract analyzer that detects risks, explains clauses, and suggests safer alternatives with automated PDF/JSON reports.",
    description:
      "An AI-powered contract analyzer that identifies potential risks, explains clauses, suggests safer alternatives, and generates PDF/JSON reports.",
    color: "var(--neon-purple)",
    repo: "https://github.com/rithikka01/contract-bot",
  },
  
    
  {
    id: "WORLD 1-6",
    title: "PULSEGUARD NEXUS",
    category: "Industrial IoT / AI",
    tech: ["Python", "Flask", "SQLite", "JavaScript", "Groq API", "psutil"],
    short: "Industrial IoT command center for asset monitoring, alerts, and anomaly analysis.",
    description:
      "A Flask-based industrial IoT dashboard that centralizes asset inventory, system status, alerts, anomaly monitoring, and maintenance information, with SQLite integration and AI-powered analysis using Groq.",
    color: "var(--neon-green)",
    repo: "https://github.com/rithikka01/PulseGuard-Nexus",
  },
  {
    id: "WORLD 1-7",
    title: "AI DOCUMENT INTELLIGENCE",
    category: "GenAI / Document Analysis",
    tech: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Gemini API"],
    short: "AI-powered platform for contract analysis, clause detection, and risk assessment.",
    description:
      "A document intelligence platform that analyzes uploaded PDF contracts, generates summaries, identifies important clauses, highlights potential risks with a risk score, and answers questions using document context.",
    color: "var(--neon-purple)",
    repo: "https://github.com/rithikka01/ai-document-intelligence",
  },
  {
    id: "WORLD 1-8",
    title: "HUSHBUDGET",
    category: "Web Application / Personal Finance",
    tech: ["HTML5", "CSS3", "JavaScript", "Chart.js", "LocalStorage"],
    short: "Personal finance dashboard for tracking transactions, balances, and spending.",
    description:
      "A responsive personal finance dashboard that supports adding and deleting transactions, visualizing category-wise expenses and balance trends, exporting transactions to CSV, and switching between light and dark themes.",
    color: "var(--neon-cyan)",
    repo: "https://github.com/rithikka01/finance-dashboard",
  },
  {
    id: "WORLD 1-9",
    title: "SWIPEHIRE",
    category: "Project in Development",
    tech: ["Coming Soon"],
    short: "An upcoming project. More details coming soon.",
    description:
      "SwipeHire is currently in development. Project features and technical details will be announced soon.",
    color: "var(--neon-pink)",
    repo: "https://github.com/rithikka01/SwipeHire",
  },
  
];

export const achievements = [
  {
    badge: "9TH PLACE",
    title: "BUILD2GETHER – AI SDG HACKATHON 2026",
    note: "9th among 500 teams",
    detail:
      "Competed in an AI-focused hackathon aimed at solving Sustainable Development Goal (SDG) challenges. Our team developed and presented a solution and secured 9th place among 500 participating teams, in collaboration with ETH Zürich and Nanyang Technological University.",
    color: "var(--neon-yellow)",
    icon: "★",
  },
  {
    badge: "FINALIST",
    title: "HCL × GUVI – Sairam 24-Hour Hackathon League 2025",
    note: "Finalist",
    detail:
      "Participated in a 24-hour hackathon where we worked under a strict time constraint to develop a solution from idea to prototype and pitch. Our project successfully reached the finalist stage.",
    color: "var(--neon-pink)",
    icon: "♦",
  },
  {
    badge: "SEMIFINALIST",
    title: "Project Deep Blue Hackathon — Mastek 2025",
    note: "Semifinalist",
    detail:
      "Worked on a technology-based problem statement as part of the Mastek Project Deep Blue Hackathon. Our solution progressed through the initial rounds and reached the semifinal stage.",
    color: "var(--neon-cyan)",
    icon: "▲",
  },
  {
    badge: "TOP 50 FINALIST",
    title: "HackHerVerse-1 — Google Developer Group & Rajalakshmi Engineering College 2025",
    note: "Top 50 finalist",
    detail:
      "Participated in a competitive hackathon organized by Google Developer Group and Rajalakshmi Engineering College, where our project was selected among the Top 50 finalists.",
    color: "var(--neon-purple)",
    icon: "✦",
  },
  {
    badge: "DESIGN LEAD",
    title: "Department Symposium",
    note: "Design Lead",
    detail:
      "Took responsibility for the creative and visual side of the department symposium, including event branding, promotional designs, and maintaining a consistent visual identity.",
    color: "var(--neon-green)",
    icon: "✎",
  },
  {
    badge: "VOLUNTEER",
    title: "Sairam Model United Nations",
    note: "Volunteer",
    detail:
      "Worked with the organizing committee to help coordinate the Model United Nations event, supporting event planning, coordination, and smooth execution.",
    color: "var(--neon-blue)",
    icon: "◉",
  },
];

export const education = [
  {
    title: "B.E. Computer Science and Engineering (AI & ML)",
    place: "Sri Sairam Engineering College",
    period: "2022 — 2026",
    score: "GPA: 7.93",
    progress: 95,
  },
  {
    title: "12th Grade",
    place: "SBOA Matriculation Hr Sec School",
    period: "May 2021",
    score: "86.52%",
    progress: 86,
  },
  {
    title: "10th Grade",
    place: "SBOA Matriculation Hr Sec School",
    period: "May 2019",
    score: "86%",
    progress: 86,
  },
];

export const certifications = [
  {
    issuer: "Cisco Networking Academy",
    color: "var(--neon-cyan)",
    items: ["CCNA", "Cybersecurity", "Python Essentials", "Data Science"],
  },
  {
    issuer: "NPTEL",
    color: "var(--neon-pink)",
    items: ["Deep Learning", "Data Analytics with Python", "Compiler Design"],
  },
  {
    issuer: "GUVI",
    color: "var(--neon-green)",
    items: ["Information Retrieval Technologies"],
  },
  {
    issuer: "LinkedIn Learning",
    color: "var(--neon-yellow)",
    items: ["Chatbots", "OpenAI & Dialogflow"],
  },
];

export const navItems = [
  { id: "home", label: "HOME", short: "HOME" },
  { id: "player", label: "ABOUT", short: "ABT" },
  { id: "skills", label: "SKILLS", short: "SKIL" },
  { id: "missions", label: "EXPERIENCE", short: "EXP" },
  { id: "projects", label: "PROJECTS", short: "PROJ" },
  { id: "achievements", label: "ACHIEVEMENTS", short: "ACHV" },
  { id: "education", label: "EDUCATION", short: "EDU" },
  { id: "certifications", label: "CERTIFICATIONS", short: "CERT" },
  { id: "contact", label: "CONTACT", short: "CTCT" },
];

export const links = {
  linkedin: "https://www.linkedin.com/in/rithikka-n-7018a2257/",
  github: "https://github.com/rithikka01",
  email: "rithikka014@gmail.com",
};
