import type { TimelineItem } from "@/components/TimelineLayout";
import type { Locale } from "@/i18n/config";

/*
 * Fallback content. The live site reads the same shapes from the Django API
 * (see src/lib/api.ts); these values are used whenever the API is unreachable.
 */

export type Contact = {
  email: string;
  phone: string;
  whatsapp: string;
  /** CTO direct line, shown next to the main number. */
  ctoPhone?: string;
  address: string;
  socials: { label: string; href: string }[];
};
/** `heroTitle`: the dashboard's hero title (Settings); unset means "use the UI copy". */
export type SiteContent = { badge: string; heroTitle?: string; subtitle: string; about: string; contact: Contact };
export type Seo = { metaTitle?: string; metaDescription?: string; ogImage?: string; noindex?: boolean; canonicalUrl?: string };
export type GalleryImage = { src: string; width: number; height: number; alt: string };
export type Service = {
  id: string; slug: string; title: string; description: string; tags: string[];
  /** Full page copy, paragraphs separated by blank lines. */
  longDescription?: string;
  seo?: Seo;
  updatedAt?: string;
};
export type Result = { value: string; label: string; source?: string };
export type Testimonial = { quote: string; author: string; role?: string; avatar?: string };
export type Faq = { question: string; answer: string };
export type Project = {
  id: string;
  title: string;
  category: string;
  platform: string;
  /** Absent for team projects without approved screenshots — a branded card is shown instead. */
  image?: { src: string; width: number; height: number };
  summary: string;
  features: string[];
  scope: string[];
  liveUrl?: string;
  /** Slugs of the services this project demonstrates. */
  services?: string[];
  // Case-study detail — rendered only when filled in (never invented).
  challenge?: string;
  solution?: string;
  architecture?: string;
  results?: Result[];
  testimonial?: Testimonial | null;
  industry?: string;
  country?: string;
  year?: number | null;
  duration?: string;
  seo?: Seo;
  /** "etqan" = ETQAN company project; "team" = built by our team before ETQAN (never presented as client work). */
  ownership?: "etqan" | "team";
  /** What ETQAN / our team member actually did. */
  contribution?: string;
  technologies?: string[];
  playStoreUrl?: string;
  appStoreUrl?: string;
  /** Screenshots shown on the project page. */
  gallery?: GalleryImage[];
  featured?: boolean;
  updatedAt?: string;
};

export const whatsappLink = (phone: string) => `https://wa.me/${phone.replace(/\D/g, "")}`;

export const SITE: SiteContent = {
  badge: "ETQAN means mastery",
  subtitle:
    "ETQAN designs and builds websites, mobile apps and custom business software for companies in Egypt and the Gulf — software products and solutions, from first idea to launch and support.",
  about:
    "Etqan means mastery — and it is how we work. Engineers and designers under one roof, building websites, apps and business software that perform, from the first idea to long-term support.",
  contact: {
    email: "admin@etqanpp.com",
    phone: "+20 150 585 8198",
    whatsapp: whatsappLink("+20 150 585 8198"),
    ctoPhone: "+20 102 857 7310",
    address: "6th October, Giza, Egypt",
    // Official profiles; the dashboard's Settings → Social links override these when set.
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/etqan-agency-a26111403" },
      { label: "Instagram", href: "https://www.instagram.com/etqan_plusplus1" },
      { label: "Facebook", href: "https://www.facebook.com/share/1Dbejimf3F/" },
    ],
  },
};

export const SERVICES: Service[] = [
  {
    id: "01",
    title: "Web Development",
    description: "High-performance websites and web platforms built on modern stacks — fast, secure, SEO-ready and easy for your team to manage.",
    tags: ["Next.js & React", "E-commerce", "CMS"],
    slug: "web-development",
    longDescription: "Your website is often the first place a customer decides whether to trust you. We build fast, secure websites and web platforms — company sites, e-commerce stores, customer portals and SaaS products — on modern stacks like Next.js and React, with a content management system your team can use without a developer.\n\nEvery build is SEO-ready from day one: clean URLs, structured data, fast load times on mobile networks and bilingual Arabic/English support with proper right-to-left layouts. Every site also ships with analytics and conversion tracking set up, so you can see which pages bring in leads.",
  },
  {
    id: "02",
    title: "Mobile Apps",
    description: "Native-quality iOS and Android apps with one codebase, designed around your users and engineered to scale with your business.",
    tags: ["iOS & Android", "Flutter", "React Native"],
    slug: "mobile-app-development",
    longDescription: "We build iOS and Android apps from one codebase with React Native and Flutter, so you launch on both stores faster and maintain one product instead of two. Our team has shipped production apps with push notifications, offline-friendly local storage, deep linking, media uploads and smooth animations — including an app used by 60,000+ people.\n\nWe handle the whole journey: UX and interface design, the app itself, the backend and APIs it needs, and store submission and launch. Arabic and English are supported from the start, with interfaces designed for right-to-left reading.",
  },
  {
    id: "03",
    title: "Custom Software",
    description: "ERP, CRM and internal systems tailored to how you actually work — automating operations and connecting every department.",
    tags: ["ERP & CRM", "Integrations", "Cloud & DevOps"],
    slug: "custom-software-development",
    longDescription: "When spreadsheets and off-the-shelf tools stop keeping up, custom software fits the way your business actually works. We build dashboards, admin panels, internal tools, ERP and CRM-style systems, and the integrations that connect them to your store, payment gateway, suppliers and accounting.\n\nA large part of this work is business automation: replacing repetitive manual steps — order processing, data entry, status updates, reporting — with reliable workflows. Our team has built automation platforms that move orders between stores and suppliers at scale, with complex data flows across external APIs.",
  },
  {
    id: "04",
    title: "UI/UX & Branding",
    description: "Brand identities and product interfaces crafted with intent — from logo and visual language to complete design systems.",
    tags: ["Brand Identity", "UI/UX", "Design Systems"],
    slug: "ui-ux-design-branding",
    longDescription: "Good design makes a product easy to use and a brand easy to remember. We create brand identities — logo, colour, typography and visual language — and design the interfaces of websites and apps around how your customers actually behave.\n\nWe design Arabic-first and bilingual interfaces properly: right-to-left layouts, Arabic typography and content that reads naturally, not a mirrored English design. Designs are delivered as reusable design systems, so your product stays consistent as it grows.",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "original-software",
    ownership: "etqan",
    title: "Original Software",
    category: "UI/UX Design · Web Development · E-commerce",
    platform: "Web",
    image: { src: "/images/work/original-software.webp", width: 2200, height: 1240 },
    summary: "An Arabic-first online store for genuine software licences, serving companies, banks and government institutions.",
    industry: "E-commerce · Software licensing",
    country: "Iraq",
    challenge: "Individuals, companies, banks and government departments in Iraq need genuine software licences they can pay for locally and receive straight away.",
    solution: "An online store for genuine software licences in Iraq and the region: Arabic first, with English and Kurdish, prices in Iraqi dinar, secure checkout and digital delivery, all run from a full admin dashboard.\n\nLicences come from more than twenty software companies. Customers pay locally with Zain Cash, FIB, Visa or Mastercard, activate with the original licence code and download from the official site.",
    features: [
      "Full Arabic (RTL) storefront with a premium dark-and-gold identity",
      "Product catalogue, offers, wishlist and cart",
      "Simple three-step flow to buy, download and activate original software",
    ],
    scope: ["UI/UX Design", "Web Development", "E-commerce"],
    contribution: "Designed and built end to end by ETQAN: brand-led UI/UX, the Arabic RTL storefront, catalogue, offers, wishlist, cart and the buy-download-activate flow.",
  },
  {
    id: "etqan-tutor",
    ownership: "etqan",
    title: "Etqan Tutor",
    category: "Web Platform · Education · SaaS",
    platform: "Web",
    image: { src: "/images/work/etqan-tutor.webp", width: 1600, height: 893 },
    liveUrl: "https://tutor.etqanpp.com/en/",
    gallery: [
      { src: "/images/work/etqan-tutor-quran.webp", width: 1600, height: 879, alt: "Etqan Tutor — progress parents can see, surah by surah, verse by verse" },
    ],
    summary:
      "A Quran academy platform that runs a whole online school — students, teachers, live lessons, payments and parents — tracking every student surah by surah and verse by verse.",
    industry: "Education · Quran academies",
    challenge: "An online Quran school juggles students, teachers, live lessons, payments and parents who want to see progress.",
    solution: "Etqan Tutor runs all of it in one platform: subscriptions that generate the sessions, attendance for students and teachers, family invoicing and teacher payroll, and progress tracked surah by surah and verse by verse, with reports parents can follow.\n\nIt works on the web and installs on phones and computers without an app store, in Arabic and English, with four portals: office, teacher, parent and student. All 114 surahs are built in, and every academy gets its own separate database.",
    features: [
      "Subscriptions that generate recurring sessions, with make-ups and trial lessons",
      "Attendance for students and teachers, with absence alerts to parents",
      "Family invoices, Stripe and PayPal, student wallets",
      "Teacher payroll worked out from the sessions taught",
      "Levels linked to surahs and verse ranges, homework, monthly reports and certificates",
      "Four portals: office, teacher, parent and student — Arabic and English",
    ],
    scope: ["Web Platform", "SaaS", "Education"],
    technologies: ["Next.js", "Django", "PostgreSQL", "Stripe", "PayPal", "PWA"],
    contribution:
      "An ETQAN product, founded and built by ETQAN's founder on Next.js and Django: every lesson linked to a surah and verse range across all 114 surahs, with a separate database for every academy.",
  },
  {
    id: "qalamy-academy",
    ownership: "etqan",
    title: "Qalamy Academy",
    category: "Web Platform · Education",
    platform: "Web",
    image: { src: "/images/work/qalamy-academy.webp", width: 1600, height: 893 },
    liveUrl: "https://qalami.tutor.etqanpp.com/",
    summary:
      "An online Quran and Arabic academy with live one-to-one lessons in tajweed, memorisation and Arabic for children and adults, running on Etqan Tutor.",
    industry: "Education · Quran & Arabic",
    challenge: "Families want their children, and themselves, to learn the Quran and Arabic with a dedicated teacher, at times that fit their week.",
    solution: "Qalamy is an online Quran and Arabic academy running on Etqan Tutor: live one-to-one lessons in tajweed, Quran memorisation and Arabic for children from age five and for adults.\n\nStudents choose a male or female teacher and a time that suits them. Families get 20% off when two or more members join, there is an intensive Ramadan programme with daily lessons after Taraweeh, and every student can start with a free trial lesson, with a reply within one working day.",
    features: [
      "Live one-to-one video lessons, at a time the student picks",
      "Tajweed, Quran memorisation and Arabic",
      "Choice of a male or female teacher",
      "Family discount when two or more members join",
      "A free trial lesson",
    ],
    scope: ["Web Platform", "Education"],
    technologies: ["Etqan Tutor", "Next.js", "Django"],
    contribution: "Runs on Etqan Tutor, the academy platform built by ETQAN, in Arabic and English.",
  },
  {
    id: "tazakka",
    ownership: "team",
    title: "Tazakka",
    category: "Mobile App · React Native",
    platform: "iOS & Android",
    image: { src: "/images/work/tazakka.webp", width: 418, height: 436 },
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.tazkiahapp",
    gallery: [
      { src: "/images/work/tazakka-screen-1.webp", width: 890, height: 1616, alt: "Tazakka — accurate prayer times so you never miss Fajr" },
      { src: "/images/work/tazakka-screen-2.webp", width: 892, height: 1612, alt: "Tazakka — a tree that grows when you wake up for prayer" },
      { src: "/images/work/tazakka-screen-3.webp", width: 886, height: 1598, alt: "Tazakka — worship content: articles, audio and video" },
    ],
    summary:
      "An Islamic mobile app that helps people wake up for Fajr prayer and stay consistent with daily worship through reminders, motivational content, challenges and step counting.",
    industry: "Faith & lifestyle",
    challenge: "Waking up for Fajr and keeping every prayer on time is hard to sustain day after day.",
    solution: "Tazakka is an Islamic companion app built in React Native: prayer times from your local time with a live countdown to the next prayer, a Fajr alarm and prayer reminders, and a score and streak for every prayer, from 7 days to a year.\n\nA prayer-by-prayer history grid shows consistency over time, alongside motivational content and step counting. It is on Google Play as “Tazakka: Fajr Alarm & Prayers”, in Arabic and English.",
    features: [
      "Personalised prayer and Fajr wake-up reminders with push notifications",
      "Motivational content and interactive worship challenges",
      "Step counting",
      "Multilingual interface",
      "Deep linking into app content",
      "Fast local storage and smooth animations",
    ],
    scope: ["Mobile App", "Performance", "Animations"],
    technologies: ["React Native", "SWR", "Reanimated", "MMKV", "i18n", "Push Notifications"],
    results: [
      { value: "100K+", label: "downloads", source: "Google Play listing" },
      { value: "60,000+", label: "active users", source: "Google Play Console" },
    ],
    contribution:
      "Built by ETQAN's founder as a React Native engineer before founding ETQAN: app architecture, performance optimisation, smooth animations, multilingual support, push notifications, MMKV local storage, deep linking and data fetching with SWR.",
  },
  {
    id: "hawadeet",
    ownership: "team",
    title: "Hawadeet",
    category: "Mobile App · React Native · Expo",
    platform: "iOS & Android",
    image: { src: "/images/work/hawadeet.webp", width: 660, height: 862 },
    summary:
      "A social platform for Arabic-speaking users to post, like, comment and share content, with a culturally localised experience and smooth media handling.",
    industry: "Social media · Storytelling",
    challenge: "Storytelling is usually a solo act. Hawadeet makes it a shared one for Arabic speakers.",
    solution: "A social app where Arabic speakers write stories together, one segment each: start a story and let others add the next part, with likes, comments and chat.\n\nBuilt in React Native and Expo with React Query, deep linking and lighter media loading, and published by TechYAM on the App Store (iPhone, iPad and Apple-silicon Macs, iOS 15.1 or later) and on Google Play.",
    features: [
      "Feed with posts, likes, comments and shares",
      "Media upload and smooth media handling",
      "Deep links into posts and profiles",
      "iOS and Android from one codebase",
    ],
    scope: ["Mobile App", "Media", "Performance"],
    technologies: ["React Native", "Expo", "React Query", "Deep Linking"],
    contribution:
      "Built by ETQAN's founder as a React Native engineer before founding ETQAN: cross-platform development with Expo, data fetching with React Query, deep linking, media handling and performance optimisation for iOS and Android.",
  },
  {
    id: "ds-mate",
    ownership: "team",
    title: "DS Mate",
    category: "Web Platform · Automation · Integrations",
    platform: "Web",
    image: { src: "/images/work/ds-mate.webp", width: 2200, height: 1231 },
    summary: "A dropshipping automation platform that connects e-commerce stores with suppliers and automates orders at scale.",
    industry: "E-commerce · Dropshipping",
    country: "United Kingdom",
    challenge: "Selling on several marketplaces at once means oversells, orders copied by hand and “where is my order?” tickets.",
    solution: "DS-Mate, built for Almdrasa, a UK company, connects stores on Shopify, Amazon, eBay, TikTok Shop, Walmart, Shein, Temu, WooCommerce and AliExpress to suppliers such as AliExpress and Alibaba, and fulfils orders automatically.\n\nAuto-fulfilment waits six hours by default before paying the supplier, so early cancellations cost nothing. Products are edited once and published to every store, profit reports already take out supplier costs and marketplace fees, and virtual assistants get their own logins with every action in an audit log.",
    features: [
      "Store and supplier integrations in one dashboard",
      "Automation workflows for orders and tracking",
      "Admin panels and operational dashboards",
      "Complex data flows across external APIs",
    ],
    scope: ["Full-stack", "Dashboards", "Automation"],
    technologies: ["Next.js", "React", "Node.js"],
    contribution:
      "Built by ETQAN's founder as a full-stack engineer before founding ETQAN: frontend architecture, dashboards and admin panels, automation workflows, API integrations and complex data flows, with a focus on performance and usability.",
  },
  {
    id: "teslla-study",
    ownership: "team",
    title: "Teslla Study",
    category: "Website · Education",
    platform: "Web",
    image: { src: "/images/work/teslla-study.webp", width: 1600, height: 894 },
    liveUrl: "https://tesllastudy.com/",
    summary:
      "A bilingual Arabic and English site that guides Arab students applying to universities in Türkiye, from shortlist to visa.",
    industry: "Education · Study abroad",
    country: "Türkiye",
    challenge: "Studying in Türkiye from abroad means shortlists, applications and a visa.",
    solution: "Teslla Study is a bilingual Arabic and English site that walks Arab students heading for a bachelor’s, master’s or PhD through all of it in five steps: choose, documents, apply, accept, arrive.\n\nThe team reviews certificates, handles translations and attestations, submits applications on the university portals and guides students on visas, residence permits and housing. Five partner universities in Istanbul, from Işık (1996) to Fenerbahçe (2016), and a free consultation in Arabic on WhatsApp.",
    features: [
      "Five steps: choose, documents, apply, accept, arrive",
      "Certificate review, translations and attestations",
      "Guidance on visas, residence permits and housing",
      "Partner universities in Istanbul",
      "A free consultation form, in Arabic",
    ],
    scope: ["Web Development", "Bilingual"],
    technologies: ["Arabic RTL", "English LTR"],
    contribution: "Built by ETQAN's founder: the bilingual site, right to left and left to right, with the consultation form.",
  },
  {
    id: "agentopia",
    ownership: "team",
    title: "Agentopia",
    category: "AI · Web App",
    platform: "Web",
    image: { src: "/images/work/agentopia.webp", width: 1600, height: 891 },
    liveUrl: "https://agentopia-ai.vercel.app/",
    summary:
      "Turns AI agents into a company: hire AI employees, give them an office, hand the manager a task and review the work before it counts.",
    industry: "AI · Developer tools",
    challenge: "AI agents are easy to start and hard to keep track of.",
    solution: "Agentopia turns them into a company: hire AI employees from six role templates, give them an office, hand the manager a task and review the work before it counts. Every employee has an editable eleven-field prompt, versioned with rollback, and shell commands, network access and file edits wait for your approval.\n\nA live office view shows who is working, waiting or blocked. It is a web app plus a local runner on your computer, signed in to your own Claude Code or OpenAI Codex CLI. Your tokens are never stored, and nothing runs on a model until you connect one.",
    features: [
      "Six role templates: manager, frontend, backend, UI/UX, QA and research",
      "Editable, versioned prompts for every AI employee, with rollback",
      "The AI manager plans the work and hands subtasks to specialists",
      "Shell commands, network access and file edits wait for approval",
      "A live office view of who is working, waiting or blocked",
    ],
    scope: ["AI", "Web App"],
    technologies: ["Next.js", "Claude Code", "OpenAI Codex"],
    contribution: "Built by ETQAN's founder: a Next.js app with a local runner that works on the user's own Claude Code or Codex sign-in, without storing their tokens.",
  },
  {
    id: "lmfoundry",
    ownership: "team",
    title: "LMFoundry",
    category: "AI · Enterprise Platform",
    platform: "Web",
    image: { src: "/images/work/lmfoundry.webp", width: 1600, height: 891 },
    liveUrl: "https://www.lmfoundry.com/",
    summary:
      "An enterprise AI platform for building, fine-tuning and running language models and AI agents in the cloud, on-premise or at the edge.",
    industry: "AI · Enterprise software",
    challenge: "Companies need AI that runs where their data lives, with security and governance built in.",
    solution: "LMFoundry is an enterprise AI platform for building, fine-tuning and running language models and AI agents in the cloud, on-premise or at the edge.\n\nIt brings an AI Workbench to build, train and refine models, a gallery of pre-built and custom models, fine-tuning, evaluation and observability for models in production, AI agents that work together on business tasks, and enterprise knowledge sources with governance built in. In English and French. “Your data never leaves your domain.”",
    features: [
      "AI Workbench to build, train and refine models",
      "A gallery of pre-built and custom models",
      "Fine-tuning, evaluation and observability in production",
      "AI agents that work together on business tasks",
      "Enterprise knowledge sources with governance built in",
    ],
    scope: ["AI", "Enterprise"],
    technologies: ["LLMs", "AI Agents", "On-premise"],
    contribution: "ETQAN's founder worked on the platform as an engineer.",
  },
  {
    id: "ds-mate-tutorial",
    ownership: "team",
    title: "DS-Mate Tutorial",
    category: "Web · Onboarding",
    platform: "Web",
    image: { src: "/images/work/ds-mate-tutorial.webp", width: 1600, height: 894 },
    liveUrl: "https://tutorial.ds-mate.com/",
    summary:
      "The guided onboarding for DS-Mate: five short video lessons that take a new seller from connecting a store to fulfilling the first order.",
    industry: "E-commerce · Onboarding",
    challenge: "New DS-Mate sellers need to get from an empty account to their first order on day one.",
    solution: "Five short video lessons, about fifteen minutes in all, in three modules: setup, daily work and optimise. They cover connecting a store, importing a product, linking existing products, fulfilling orders and handling billing.\n\nA progress tracker lets sellers pick up where they left off or start from any lesson. It is free, with no extra sign-up, and lives alongside the DS-Mate app.",
    features: [
      "Five lessons of about three minutes each, in three modules",
      "Connect a store, import and link products, fulfil orders, handle billing",
      "A progress tracker; start from any lesson",
      "Free, with no extra sign-up",
    ],
    scope: ["Web Development", "Onboarding"],
    technologies: ["Next.js", "TypeScript"],
    contribution: "ETQAN's founder worked on the tutorial site's frontend in Next.js and TypeScript.",
  },
  {
    id: "etqan-studio",
    ownership: "etqan",
    title: "ETQAN",
    category: "Website · CMS · Branding",
    platform: "Web",
    image: { src: "/images/work/etqan-studio.webp", width: 1600, height: 871 },
    liveUrl: "https://www.etqanpp.com/",
    summary:
      "ETQAN's own bilingual website and the content dashboard behind it — the site you are on.",
    industry: "Software & AI studio",
    country: "Egypt",
    challenge: "Companies need one team for the website, the app and the system behind them.",
    solution: "ETQAN is the software and AI studio founded in Giza, Egypt. It builds websites, iOS and Android apps and custom software such as ERP and CRM systems for companies in Egypt and the Gulf, from first idea to launch and support.\n\nIts own site, built in Next.js on a Django back end, is bilingual and edited by the team from a custom admin CMS. Every project follows six steps, from discovery to launch, then support that keeps going.",
    features: [
      "Arabic and English, right to left and left to right",
      "Services, portfolio, blog and contact, edited from a custom dashboard",
      "On-demand updates: dashboard edits reach the site within seconds",
      "SEO, structured data and accessibility built in",
    ],
    scope: ["Web Development", "CMS", "Branding"],
    technologies: ["Next.js", "Django REST", "PostgreSQL", "Tailwind CSS"],
    contribution: "Designed and built by ETQAN: the Next.js site on a Django back end, and the admin CMS the team uses to edit it.",
  },
];

/** Which services each project demonstrates (from each project's delivered scope). */
export const PROJECT_SERVICES: Record<string, string[]> = {
  "original-software": ["web-development", "ui-ux-design-branding"],
  tazakka: ["mobile-app-development"],
  hawadeet: ["mobile-app-development"],
  "ds-mate": ["custom-software-development", "web-development"],
  "etqan-tutor": ["custom-software-development", "web-development"],
  "qalamy-academy": ["web-development"],
  "teslla-study": ["web-development"],
  agentopia: ["custom-software-development"],
  lmfoundry: ["custom-software-development"],
  "ds-mate-tutorial": ["web-development"],
  "etqan-studio": ["web-development", "ui-ux-design-branding"],
};

/**
 * Service slugs before the SEO rename (ETQAN-039). The backend creates 301s when a slug changes;
 * this map keeps fallback content, images and redirects working if the API still has old slugs.
 */
export const LEGACY_SERVICE_SLUGS: Record<string, string> = {
  "mobile-apps": "mobile-app-development",
  "custom-software": "custom-software-development",
  "ui-ux-branding": "ui-ux-design-branding",
};
export const canonicalServiceSlug = (slug: string) => LEGACY_SERVICE_SLUGS[slug] ?? slug;

export const PROCESS: TimelineItem[] = [
  { date: "Step 01", title: "Discovery", description: "We learn your business, your customers and your goals — then define what success looks like in numbers." },
  { date: "Step 02", title: "Strategy & Planning", description: "A clear roadmap covering scope, technology, timeline and the milestones up to launch." },
  { date: "Step 03", title: "Design", description: "Brand, UX and UI designed together and tested with real users before a single line of production code." },
  { date: "Step 04", title: "Develop & Test", description: "Agile sprints with weekly demos, automated testing and full transparency on progress." },
  { date: "Step 05", title: "Launch", description: "We deploy to production and, for apps, publish to the App Store and Google Play — then monitor the first days closely." },
  { date: "Ongoing", title: "Support & Improve", description: "Maintenance, new features and continuous optimisation, so your product keeps improving." },
];

/* ------------------------------------------------------------------ */
/* Arabic fallbacks — used until the dashboard's Arabic fields are filled */
/* ------------------------------------------------------------------ */

export const SITE_AR: SiteContent = {
  badge: "صُنع بإتقان",
  subtitle:
    "في إتقان نصمّم ونطوّر المواقع الإلكترونية وتطبيقات الجوال والأنظمة المخصصة للشركات في مصر والخليج — منتجات وحلول برمجية من الفكرة حتى الإطلاق والدعم.",
  about:
    "إتقان تعني الإحكام في العمل — وهكذا نعمل. مهندسون ومصممون تحت سقف واحد، نبني مواقع وتطبيقات وأنظمة أعمال تؤدي بكفاءة، من الفكرة الأولى حتى الدعم المستمر.",
  contact: { ...SITE.contact, address: "السادس من أكتوبر، الجيزة، مصر" },
};

/** Keyed by service slug so API services can pick up an Arabic fallback. */
export const SERVICES_AR: Record<string, Pick<Service, "title" | "description" | "tags" | "longDescription">> = {
  "web-development": {
    longDescription: "موقعك الإلكتروني هو غالباً المكان الأول الذي يقرر فيه العميل أن يثق بك. نبني مواقع ومنصات ويب سريعة وآمنة — مواقع شركات ومتاجر إلكترونية وبوابات عملاء ومنتجات SaaS — بتقنيات حديثة مثل Next.js وReact، مع نظام لإدارة المحتوى يستطيع فريقك استخدامه دون الحاجة إلى مطوّر.\n\nكل موقع نبنيه جاهز لمحركات البحث منذ اليوم الأول: روابط واضحة وبيانات منظمة وسرعة تحميل عالية على شبكات الجوال ودعم كامل للعربية والإنجليزية بتصميم صحيح من اليمين إلى اليسار. ويأتي كل موقع مزوّداً بالتحليلات وتتبّع التحويلات لتعرف أي الصفحات تجلب لك العملاء.",
    title: "تطوير المواقع",
    description: "مواقع ومنصات ويب عالية الأداء مبنية بأحدث التقنيات — سريعة وآمنة وجاهزة لمحركات البحث، ويسهل على فريقك إدارتها.",
    tags: ["Next.js و React", "المتاجر الإلكترونية", "أنظمة إدارة المحتوى"],
  },
  "mobile-app-development": {
    longDescription: "نطوّر تطبيقات iOS وAndroid من قاعدة برمجية واحدة باستخدام React Native وFlutter، لتطلق تطبيقك على المتجرين أسرع وتدير منتجاً واحداً بدلاً من اثنين. أطلق فريقنا تطبيقات حقيقية تتضمن الإشعارات والتخزين المحلي والروابط العميقة ورفع الوسائط والحركات الانسيابية — منها تطبيق يستخدمه أكثر من 60,000 شخص.\n\nنتولى الرحلة كاملة: تصميم تجربة المستخدم والواجهات، والتطبيق نفسه، والخادم وواجهات API التي يحتاجها، والنشر على المتاجر والإطلاق. ندعم العربية والإنجليزية منذ البداية بواجهات مصممة للقراءة من اليمين إلى اليسار.",
    title: "تطبيقات الجوال",
    description: "تطبيقات iOS وAndroid بجودة التطبيقات الأصلية من قاعدة برمجية واحدة، مصممة حول مستخدميك ومهيأة للنمو مع أعمالك.",
    tags: ["iOS و Android", "Flutter", "React Native"],
  },
  "custom-software-development": {
    longDescription: "عندما تعجز جداول البيانات والأدوات الجاهزة عن مواكبة عملك، تأتي البرمجيات المخصصة لتناسب طريقة عملك الفعلية. نبني لوحات التحكم ولوحات الإدارة والأدوات الداخلية وأنظمة بأسلوب ERP وCRM، والتكاملات التي تربطها بمتجرك وبوابة الدفع والموردين والحسابات.\n\nجزء كبير من هذا العمل هو أتمتة الأعمال: استبدال الخطوات اليدوية المتكررة — معالجة الطلبات وإدخال البيانات وتحديث الحالات والتقارير — بمسارات عمل موثوقة. بنى فريقنا منصات أتمتة تنقل الطلبات بين المتاجر والموردين على نطاق واسع، مع تدفقات بيانات معقدة عبر واجهات API خارجية.",
    title: "البرمجيات المخصصة",
    description: "أنظمة ERP وCRM وأدوات داخلية مصممة على طريقة عملك الفعلية — تؤتمت العمليات وتربط جميع الأقسام ببعضها.",
    tags: ["ERP و CRM", "التكاملات", "السحابة و DevOps"],
  },
  "ui-ux-design-branding": {
    longDescription: "التصميم الجيد يجعل المنتج سهل الاستخدام والعلامة التجارية سهلة التذكّر. نصمّم الهويات البصرية — الشعار والألوان والخطوط واللغة البصرية — ونصمّم واجهات المواقع والتطبيقات حول سلوك عملائك الفعلي.\n\nنصمّم الواجهات العربية وثنائية اللغة كما ينبغي: تخطيط من اليمين إلى اليسار وخطوط عربية ومحتوى يُقرأ بشكل طبيعي، لا مجرد نسخة معكوسة من التصميم الإنجليزي. ونسلّم التصاميم كأنظمة تصميم قابلة لإعادة الاستخدام، ليبقى منتجك متسقاً مع نموه.",
    title: "تصميم UI/UX والهوية",
    description: "هويات بصرية وواجهات منتجات مصممة بعناية — من الشعار واللغة البصرية إلى أنظمة التصميم المتكاملة.",
    tags: ["الهوية البصرية", "UI/UX", "أنظمة التصميم"],
  },
};

/** Keyed by project id/slug. Product names stay in their original form. */
export const PROJECTS_AR: Record<string, Pick<Project, "category" | "platform" | "summary" | "features" | "scope" | "contribution" | "challenge" | "solution" | "industry" | "country"> & { results?: Result[] }> = {
  "original-software": {
    industry: "تجارة إلكترونية · تراخيص برمجيات",
    country: "العراق",
    challenge: "يحتاج الأفراد والشركات والبنوك والجهات الحكومية في العراق إلى تراخيص برمجيات أصلية يدفعون ثمنها محلياً ويستلمونها فوراً.",
    solution: "متجر إلكتروني لتراخيص البرمجيات الأصلية في العراق والمنطقة: بالعربية أولاً مع الإنجليزية والكردية، وأسعار بالدينار العراقي، ودفع آمن وتسليم رقمي، وكل ذلك يُدار من لوحة تحكم متكاملة.\n\nالتراخيص من أكثر من عشرين شركة برمجيات. يدفع العميل محلياً عبر زين كاش أو FIB أو فيزا أو ماستركارد، ويفعّل البرنامج بكود الترخيص الأصلي ويحمّله من الموقع الرسمي.",
    category: "تصميم UI/UX · تطوير ويب · تجارة إلكترونية",
    platform: "ويب",
    summary: "متجر إلكتروني عربي لتراخيص البرمجيات الأصلية، يخدم الشركات والبنوك والجهات الحكومية.",
    features: [
      "واجهة متجر عربية بالكامل (RTL) بهوية فاخرة بالأسود والذهبي",
      "كتالوج منتجات وعروض وقائمة أمنيات وسلة مشتريات",
      "ثلاث خطوات بسيطة لشراء البرامج الأصلية وتنزيلها وتفعيلها",
    ],
    scope: ["تصميم UI/UX", "تطوير ويب", "تجارة إلكترونية"],
    contribution: "صمّمته إتقان وطوّرته بالكامل: تجربة وواجهة مستخدم مبنية على الهوية، وواجهة المتجر العربية، والكتالوج والعروض وقائمة الأمنيات والسلة ورحلة الشراء والتنزيل والتفعيل.",
  },
  tazakka: {
    industry: "دين وأسلوب حياة",
    challenge: "الاستيقاظ لصلاة الفجر والمحافظة على كل صلاة في وقتها أمر صعب الاستمرار عليه يوماً بعد يوم.",
    solution: "تزكّى تطبيق إسلامي مبني بـ React Native: مواقيت الصلاة حسب توقيتك المحلي مع عدّاد تنازلي للصلاة القادمة، ومنبّه للفجر وتذكيرات بالصلوات، ونقاط وسلسلة التزام لكل صلاة من 7 أيام حتى سنة كاملة.\n\nجدول تاريخي لكل صلاة يوضح الالتزام مع الوقت، ومعه محتوى تحفيزي وعدّاد خطوات. التطبيق متاح على Google Play باسم “Tazakka: Fajr Alarm & Prayers” بالعربية والإنجليزية.",
    category: "تطبيق جوال · React Native",
    platform: "iOS و Android",
    summary: "تطبيق إسلامي يساعد المستخدمين على الاستيقاظ لصلاة الفجر والمواظبة على العبادة اليومية عبر التذكيرات والمحتوى التحفيزي والتحديات وعدّاد الخطوات.",
    features: [
      "تذكيرات مخصصة للصلاة والاستيقاظ للفجر عبر الإشعارات",
      "محتوى تحفيزي وتحديات تفاعلية للعبادة",
      "عدّاد الخطوات",
      "واجهة متعددة اللغات",
      "روابط عميقة إلى محتوى التطبيق",
      "تخزين محلي سريع وحركات انسيابية",
    ],
    scope: ["تطبيق جوال", "الأداء", "الحركات"],
    results: [
      { value: "+100K", label: "تنزيل", source: "صفحة التطبيق على Google Play" },
      { value: "+60,000", label: "مستخدم نشط", source: "Google Play Console" },
    ],
    contribution: "بناه مؤسس إتقان بصفته مهندس React Native قبل تأسيس إتقان: بنية التطبيق وتحسين الأداء والحركات الانسيابية ودعم تعدد اللغات والإشعارات والتخزين المحلي بـ MMKV والروابط العميقة وجلب البيانات بـ SWR.",
  },
  hawadeet: {
    industry: "تواصل اجتماعي · حكايات",
    challenge: "كتابة الحكايات عادةً عمل فردي، وحواديت تجعلها عملاً مشتركاً للمتحدثين بالعربية.",
    solution: "تطبيق اجتماعي يكتب فيه المتحدثون بالعربية الحكايات معاً، كل واحد جزءاً: ابدأ حكاية واترك غيرك يكمل الجزء التالي، مع الإعجابات والتعليقات والمحادثات.\n\nمبني بـ React Native وExpo مع React Query والروابط العميقة وتحميل أخف للوسائط، ومنشور بواسطة TechYAM على App Store (آيفون وآيباد وأجهزة ماك بمعالجات Apple، بنظام iOS 15.1 أو أحدث) وعلى Google Play.",
    category: "تطبيق جوال · React Native · Expo",
    platform: "iOS و Android",
    summary: "منصة اجتماعية للمستخدمين العرب للنشر والإعجاب والتعليق ومشاركة المحتوى، بتجربة مُكيّفة مع الثقافة المحلية وتعامل سلس مع الوسائط.",
    features: [
      "خلاصة بالمنشورات والإعجابات والتعليقات والمشاركات",
      "رفع الوسائط والتعامل السلس معها",
      "روابط عميقة إلى المنشورات والملفات الشخصية",
      "iOS وAndroid من قاعدة برمجية واحدة",
    ],
    scope: ["تطبيق جوال", "الوسائط", "الأداء"],
    contribution: "بناه مؤسس إتقان بصفته مهندس React Native قبل تأسيس إتقان: تطوير متعدد المنصات باستخدام Expo، وجلب البيانات بـ React Query، والروابط العميقة، والتعامل مع الوسائط، وتحسين الأداء على iOS وAndroid.",
  },
  "ds-mate": {
    industry: "تجارة إلكترونية · دروب شيبينج",
    country: "المملكة المتحدة",
    challenge: "البيع على أكثر من منصة في نفس الوقت يعني بيع منتجات نفدت، ونسخ الطلبات يدوياً، وتذاكر “فين طلبي؟”.",
    solution: "DS-Mate، المبنية لشركة Almdrasa البريطانية، تربط المتاجر على Shopify وAmazon وeBay وTikTok Shop وWalmart وShein وTemu وWooCommerce وAliExpress بالموردين مثل AliExpress وAlibaba، وتنفّذ الطلبات تلقائياً.\n\nالتنفيذ التلقائي ينتظر ست ساعات افتراضياً قبل الدفع للمورد، فلا تكلّف الإلغاءات المبكرة شيئاً. يُعدَّل المنتج مرة واحدة ويُنشر في كل المتاجر، وتقارير الأرباح تخصم تكلفة المورد ورسوم المنصات تلقائياً، وللمساعدين حسابات دخول خاصة مع تسجيل كل إجراء في سجل تدقيق.",
    category: "منصة ويب · أتمتة · تكاملات",
    platform: "ويب",
    summary: "منصة لأتمتة الدروب شيبينج تربط متاجر التجارة الإلكترونية بالموردين وتؤتمت الطلبات على نطاق واسع.",
    features: [
      "ربط المتاجر والموردين في لوحة تحكم واحدة",
      "مسارات أتمتة للطلبات والتتبّع",
      "لوحات إدارة ولوحات تشغيل",
      "تدفقات بيانات معقدة عبر واجهات API خارجية",
    ],
    scope: ["تطوير متكامل", "لوحات التحكم", "الأتمتة"],
    contribution: "بناه مؤسس إتقان بصفته مهندساً متكاملاً (Full-stack) قبل تأسيس إتقان: بنية الواجهة الأمامية، ولوحات التحكم والإدارة، ومسارات الأتمتة، وتكاملات API، وتدفقات البيانات المعقدة، مع التركيز على الأداء وسهولة الاستخدام.",
  },
  "etqan-tutor": {
    industry: "تعليم · أكاديميات القرآن",
    challenge: "المدرسة القرآنية الأونلاين تدير طلاباً ومعلمين وحصصاً مباشرة ومدفوعات وأولياء أمور يريدون متابعة التقدم.",
    solution: "إتقان تيوتر يدير كل ذلك في منصة واحدة: اشتراكات تولّد الحصص، وحضور الطلاب والمعلمين، وفواتير العائلات ورواتب المعلمين، ومتابعة التقدم سورةً سورة وآيةً آية بتقارير يتابعها أولياء الأمور.\n\nتعمل على الويب ويمكن تثبيتها على الجوال والكمبيوتر من غير متجر تطبيقات، بالعربية والإنجليزية، بأربع بوابات: الإدارة والمعلم وولي الأمر والطالب. السور الـ114 كلها مدمجة، ولكل أكاديمية قاعدة بيانات مستقلة.",
    category: "منصة ويب · تعليم · SaaS",
    platform: "ويب",
    summary: "منصة لأكاديميات القرآن تدير مدرسة أونلاين كاملة — الطلاب والمعلمين والحصص المباشرة والمدفوعات وأولياء الأمور — وتتابع كل طالب سورةً سورة وآيةً آية.",
    features: [
      "اشتراكات تولّد الحصص المتكررة، مع حصص التعويض والحصص التجريبية",
      "حضور الطلاب والمعلمين مع تنبيه أولياء الأمور عند الغياب",
      "فواتير عائلية ودفع عبر Stripe وPayPal ومحافظ للطلاب",
      "رواتب المعلمين محسوبة من الحصص التي درّسوها",
      "مستويات مرتبطة بالسور ونطاقات الآيات، وواجبات وتقارير شهرية وشهادات",
      "أربع بوابات: الإدارة والمعلم وولي الأمر والطالب — بالعربية والإنجليزية",
    ],
    scope: ["منصة ويب", "SaaS", "تعليم"],
    contribution: "منتج من إتقان، أسّسه وبناه مؤسس إتقان باستخدام Next.js وDjango: كل حصة مرتبطة بسورة ونطاق آيات عبر السور الـ114 كلها، وقاعدة بيانات مستقلة لكل أكاديمية.",
  },
  "qalamy-academy": {
    industry: "تعليم · القرآن واللغة العربية",
    challenge: "تريد العائلات أن يتعلم أبناؤها، وأن يتعلموا هم أيضاً، القرآن والعربية مع معلم مخصص وفي أوقات تناسب أسبوعهم.",
    solution: "قلمي أكاديمية أونلاين للقرآن واللغة العربية تعمل على إتقان تيوتر: حصص مباشرة فردية في التجويد وحفظ القرآن والعربية للأطفال من عمر خمس سنوات وللكبار.\n\nيختار الطالب معلماً أو معلمة والوقت المناسب له. تحصل العائلات على خصم 20% عند اشتراك فردين أو أكثر، وهناك برنامج رمضاني مكثف بحصص يومية بعد التراويح، ويمكن لكل طالب البدء بحصة تجريبية مجانية مع رد خلال يوم عمل واحد.",
    category: "منصة ويب · تعليم",
    platform: "ويب",
    summary: "أكاديمية أونلاين للقرآن واللغة العربية بحصص مباشرة فردية في التجويد والحفظ والعربية للأطفال والكبار، تعمل على منصة إتقان تيوتر.",
    features: [
      "حصص فيديو مباشرة فردية في الوقت الذي يختاره الطالب",
      "التجويد وحفظ القرآن واللغة العربية",
      "اختيار معلم أو معلمة",
      "خصم عائلي عند اشتراك فردين أو أكثر",
      "حصة تجريبية مجانية",
    ],
    scope: ["منصة ويب", "تعليم"],
    contribution: "تعمل على إتقان تيوتر، منصة الأكاديميات التي بنتها إتقان، بالعربية والإنجليزية.",
  },
  "teslla-study": {
    industry: "تعليم · الدراسة بالخارج",
    country: "تركيا",
    challenge: "الدراسة في تركيا من الخارج تعني اختيار الجامعات، والتقديم، والتأشيرة.",
    solution: "تسلا ستادي موقع ثنائي اللغة بالعربية والإنجليزية يرشد الطلاب العرب المتجهين للبكالوريوس أو الماجستير أو الدكتوراه في كل ذلك عبر خمس خطوات: الاختيار، الأوراق، التقديم، القبول، الوصول.\n\nيراجع الفريق الشهادات، ويتولى الترجمة والتصديقات، ويقدّم الطلبات على بوابات الجامعات، ويرشد الطلاب في التأشيرة والإقامة والسكن. خمس جامعات شريكة في إسطنبول، من Işık (1996) حتى Fenerbahçe (2016)، واستشارة مجانية بالعربية على واتساب.",
    category: "موقع إلكتروني · تعليم",
    platform: "ويب",
    summary: "موقع ثنائي اللغة بالعربية والإنجليزية يرشد الطلاب العرب في التقديم على الجامعات التركية، من اختيار الجامعة حتى التأشيرة.",
    features: [
      "خمس خطوات: الاختيار، الأوراق، التقديم، القبول، الوصول",
      "مراجعة الشهادات والترجمة والتصديقات",
      "إرشاد في التأشيرة والإقامة والسكن",
      "جامعات شريكة في إسطنبول",
      "نموذج استشارة مجانية بالعربية",
    ],
    scope: ["تطوير ويب", "ثنائي اللغة"],
    contribution: "بناه مؤسس إتقان: الموقع ثنائي اللغة من اليمين لليسار ومن اليسار لليمين، مع نموذج الاستشارة.",
  },
  agentopia: {
    industry: "ذكاء اصطناعي · أدوات المطورين",
    challenge: "تشغيل وكلاء الذكاء الاصطناعي سهل، لكن متابعتهم صعبة.",
    solution: "أجنتوبيا تحوّلهم إلى شركة: وظّف موظفين بالذكاء الاصطناعي من ستة قوالب أدوار، وامنحهم مكتباً، وسلّم المدير مهمة، وراجع الشغل قبل اعتماده. لكل موظف تعليمات قابلة للتعديل من أحد عشر حقلاً، بإصدارات وإمكانية الرجوع، وأوامر الطرفية والوصول للشبكة وتعديل الملفات تنتظر موافقتك.\n\nمكتب حي يوضح من يعمل ومن ينتظر ومن متوقف. التطبيق ويب مع مشغّل محلي على جهازك، يعمل بحسابك في Claude Code أو OpenAI Codex. لا يتم تخزين بياناتك، ولا يعمل أي نموذج قبل أن تربطه بنفسك.",
    category: "ذكاء اصطناعي · تطبيق ويب",
    platform: "ويب",
    summary: "يحوّل وكلاء الذكاء الاصطناعي إلى شركة: وظّف موظفين بالذكاء الاصطناعي، وامنحهم مكتباً، وسلّم المدير مهمة، وراجع الشغل قبل اعتماده.",
    features: [
      "ستة قوالب أدوار: مدير، فرونت إند، باك إند، UI/UX، اختبار، وبحث",
      "تعليمات قابلة للتعديل لكل موظف، بإصدارات وإمكانية الرجوع",
      "المدير يخطط للعمل ويوزّع المهام الفرعية على المتخصصين",
      "أوامر الطرفية والوصول للشبكة وتعديل الملفات تنتظر موافقتك",
      "مكتب حي يوضح من يعمل ومن ينتظر ومن متوقف",
    ],
    scope: ["ذكاء اصطناعي", "تطبيق ويب"],
    contribution: "بناه مؤسس إتقان: تطبيق Next.js مع مشغّل محلي يعمل بحساب Claude Code أو Codex الخاص بالمستخدم دون تخزين بياناته.",
  },
  lmfoundry: {
    industry: "ذكاء اصطناعي · برمجيات مؤسسية",
    challenge: "تحتاج الشركات إلى ذكاء اصطناعي يعمل حيث توجد بياناتها، مع أمان وحوكمة مدمجين.",
    solution: "LMFoundry منصة ذكاء اصطناعي للمؤسسات لبناء النماذج اللغوية ووكلاء الذكاء الاصطناعي وضبطها وتشغيلها على السحابة أو داخل الشركة أو على الأطراف.\n\nتضم AI Workbench لبناء النماذج وتدريبها وتحسينها، ومعرضاً لنماذج جاهزة ومخصصة، وضبطاً دقيقاً وتقييماً ومراقبة للنماذج في التشغيل، ووكلاء ذكاء اصطناعي يتعاونون في مهام العمل، ومصادر معرفة مؤسسية مع حوكمة مدمجة. بالإنجليزية والفرنسية. “بياناتك لا تغادر نطاقك أبداً.”",
    category: "ذكاء اصطناعي · منصة مؤسسية",
    platform: "ويب",
    summary: "منصة ذكاء اصطناعي للمؤسسات لبناء النماذج اللغوية ووكلاء الذكاء الاصطناعي وتدريبها وتشغيلها على السحابة أو داخل الشركة أو على الأطراف.",
    features: [
      "AI Workbench لبناء النماذج وتدريبها وتحسينها",
      "معرض لنماذج جاهزة ومخصصة",
      "ضبط دقيق وتقييم ومراقبة للنماذج في التشغيل",
      "وكلاء ذكاء اصطناعي يتعاونون في مهام العمل",
      "مصادر معرفة مؤسسية مع حوكمة مدمجة",
    ],
    scope: ["ذكاء اصطناعي", "أنظمة مؤسسية"],
    contribution: "عمل مؤسس إتقان على المنصة بصفته مهندساً.",
  },
  "ds-mate-tutorial": {
    industry: "تجارة إلكترونية · تهيئة المستخدمين",
    challenge: "يحتاج بائعو DS-Mate الجدد إلى الانتقال من حساب فارغ إلى أول طلب في يومهم الأول.",
    solution: "خمسة دروس فيديو قصيرة، نحو خمس عشرة دقيقة في المجمل، في ثلاث وحدات: الإعداد، والعمل اليومي، والتحسين. تشرح ربط المتجر، واستيراد منتج، وربط المنتجات الموجودة، وتنفيذ الطلبات، والفوترة.\n\nمتتبّع للتقدم يتيح للبائع أن يكمل من حيث توقف أو يبدأ من أي درس. مجاني ومن غير تسجيل إضافي، وموجود بجانب تطبيق DS-Mate.",
    category: "ويب · تهيئة المستخدمين",
    platform: "ويب",
    summary: "دليل البداية لمنصة DS-Mate: خمسة دروس فيديو قصيرة تنقل البائع الجديد من ربط المتجر حتى تنفيذ أول طلب.",
    features: [
      "خمسة دروس مدة كل منها نحو ثلاث دقائق، في ثلاث وحدات",
      "ربط المتجر، واستيراد المنتجات وربطها، وتنفيذ الطلبات، والفوترة",
      "متتبّع للتقدم، مع إمكانية البدء من أي درس",
      "مجاني ومن غير تسجيل إضافي",
    ],
    scope: ["تطوير ويب", "تهيئة المستخدمين"],
    contribution: "عمل مؤسس إتقان على الواجهة الأمامية لموقع الدروس باستخدام Next.js وTypeScript.",
  },
  "etqan-studio": {
    industry: "استوديو برمجيات وذكاء اصطناعي",
    country: "مصر",
    challenge: "تحتاج الشركات إلى فريق واحد للموقع والتطبيق والنظام الذي يقف خلفهما.",
    solution: "إتقان استوديو برمجيات وذكاء اصطناعي تأسس في الجيزة بمصر. يبني المواقع وتطبيقات iOS وAndroid والبرمجيات المخصصة مثل أنظمة ERP وCRM للشركات في مصر والخليج، من الفكرة الأولى حتى الإطلاق والدعم.\n\nموقعه الخاص، المبني بـ Next.js على خلفية Django، ثنائي اللغة ويديره الفريق من لوحة إدارة محتوى مخصصة. كل مشروع يمر بست خطوات، من الاكتشاف حتى الإطلاق، ثم دعم مستمر.",
    category: "موقع إلكتروني · نظام إدارة محتوى · هوية",
    platform: "ويب",
    summary: "موقع إتقان ثنائي اللغة ولوحة إدارة المحتوى الخاصة به — الموقع الذي تتصفحه الآن.",
    features: [
      "بالعربية والإنجليزية، من اليمين لليسار ومن اليسار لليمين",
      "الخدمات والأعمال والمدونة والتواصل، تُدار من لوحة تحكم مخصصة",
      "تحديث فوري: تعديلات لوحة التحكم تظهر على الموقع خلال ثوانٍ",
      "تهيئة لمحركات البحث وبيانات منظمة وإتاحة مدمجة",
    ],
    scope: ["تطوير ويب", "إدارة المحتوى", "الهوية"],
    contribution: "صمّمته إتقان وبنته: موقع Next.js على خلفية Django، ولوحة الإدارة التي يستخدمها الفريق لتعديله.",
  },
};

/** Arabic alt text for built-in screenshots, by project and position. */
export const GALLERY_ALT_AR: Record<string, string[]> = {
  "etqan-tutor": ["إتقان تيوتر — تقدّم يراه أولياء الأمور، سورةً سورة وآيةً آية"],
  tazakka: [
    "تزكّى — مواقيت الصلاة بالدقيقة لتدرك الفجر كل يوم",
    "تزكّى — شجرة تنمو بقيامك للصلاة",
    "تزكّى — محتوى تزكوي: مقالات وصوتيات ومرئيات",
  ],
};

/** Arabic labels for the backend's project categories. */
export const PLATFORM_AR: Record<string, string> = {
  Web: "ويب",
  Mobile: "جوال",
  "UI/UX Design": "تصميم UI/UX",
  Enterprise: "أنظمة مؤسسية",
};

export const PROCESS_AR: TimelineItem[] = [
  { date: "الخطوة 01", title: "الاكتشاف", description: "نتعرّف على أعمالك وعملائك وأهدافك — ثم نحدد معايير النجاح بالأرقام." },
  { date: "الخطوة 02", title: "الاستراتيجية والتخطيط", description: "خارطة طريق واضحة تشمل النطاق والتقنيات والجدول الزمني ومراحل التسليم حتى الإطلاق." },
  { date: "الخطوة 03", title: "التصميم", description: "الهوية وتجربة المستخدم والواجهات تُصمَّم معاً وتُختبر مع مستخدمين حقيقيين قبل كتابة أي كود للإنتاج." },
  { date: "الخطوة 04", title: "التطوير والاختبار", description: "دورات عمل رشيقة مع عروض أسبوعية واختبارات آلية وشفافية كاملة في سير العمل." },
  { date: "الخطوة 05", title: "الإطلاق", description: "ننشر المنتج على بيئة التشغيل، ونرفع التطبيقات على App Store وGoogle Play — ثم نتابع الأيام الأولى عن قرب." },
  { date: "مستمر", title: "الدعم والتطوير", description: "صيانة وميزات جديدة وتحسين مستمر، ليواصل منتجك التحسّن." },
];

export const processFor = (locale: Locale) => (locale === "ar" ? PROCESS_AR : PROCESS);
