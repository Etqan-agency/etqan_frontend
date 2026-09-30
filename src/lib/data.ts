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
  address: string;
  socials: { label: string; href: string }[];
};
export type SiteContent = { badge: string; subtitle: string; about: string; contact: Contact };
export type Seo = { metaTitle?: string; metaDescription?: string; ogImage?: string; noindex?: boolean; canonicalUrl?: string };
export type GalleryImage = { src: string; width: number; height: number; alt: string };
export type Service = {
  id: string; slug: string; title: string; description: string; tags: string[]; image: string;
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
  badge: "Built with إتقان — mastery",
  subtitle:
    "ETQAN designs, builds and markets websites, mobile apps and custom business software for companies in Egypt and the Gulf — engineering and marketing under one roof.",
  about:
    "Etqan means mastery — and it is how we work. Engineers, designers and marketers under one roof, building software that performs and campaigns that grow, so your product and your brand move forward as one.",
  contact: {
    email: "admin@etqanpp.com",
    phone: "+20 150 731 1232",
    whatsapp: whatsappLink("+20 150 731 1232"),
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
    longDescription: "Your website is often the first place a customer decides whether to trust you. We build fast, secure websites and web platforms — company sites, e-commerce stores, customer portals and SaaS products — on modern stacks like Next.js and React, with a content management system your team can use without a developer.\n\nEvery build is SEO-ready from day one: clean URLs, structured data, fast load times on mobile networks and bilingual Arabic/English support with proper right-to-left layouts. Because we also run marketing, the site ships with analytics and conversion tracking, so you can see which pages bring in leads.",
    image: "/images/services/web-development.webp",
  },
  {
    id: "02",
    title: "Mobile Apps",
    description: "Native-quality iOS and Android apps with one codebase, designed around your users and engineered to scale with your business.",
    tags: ["iOS & Android", "Flutter", "React Native"],
    slug: "mobile-app-development",
    longDescription: "We build iOS and Android apps from one codebase with React Native and Flutter, so you launch on both stores faster and maintain one product instead of two. Our team has shipped production apps with push notifications, offline-friendly local storage, deep linking, media uploads and smooth animations — including an app used by 60,000+ people.\n\nWe handle the whole journey: UX and interface design, the app itself, the backend and APIs it needs, store submission and launch marketing. Arabic and English are supported from the start, with interfaces designed for right-to-left reading.",
    image: "/images/services/mobile-app-development.webp",
  },
  {
    id: "03",
    title: "Custom Software",
    description: "ERP, CRM and internal systems tailored to how you actually work — automating operations and connecting every department.",
    tags: ["ERP & CRM", "Integrations", "Cloud & DevOps"],
    slug: "custom-software-development",
    longDescription: "When spreadsheets and off-the-shelf tools stop keeping up, custom software fits the way your business actually works. We build dashboards, admin panels, internal tools, ERP and CRM-style systems, and the integrations that connect them to your store, payment gateway, suppliers and accounting.\n\nA large part of this work is business automation: replacing repetitive manual steps — order processing, data entry, status updates, reporting — with reliable workflows. Our team has built automation platforms that move orders between stores and suppliers at scale, with complex data flows across external APIs.",
    image: "/images/services/custom-software-development.webp",
  },
  {
    id: "04",
    title: "UI/UX & Branding",
    description: "Brand identities and product interfaces crafted with intent — from logo and visual language to complete design systems.",
    tags: ["Brand Identity", "UI/UX", "Design Systems"],
    slug: "ui-ux-design-branding",
    longDescription: "Good design makes a product easy to use and a brand easy to remember. We create brand identities — logo, colour, typography and visual language — and design the interfaces of websites and apps around how your customers actually behave.\n\nWe design Arabic-first and bilingual interfaces properly: right-to-left layouts, Arabic typography and content that reads naturally, not a mirrored English design. Designs are delivered as reusable design systems, so your product stays consistent as it grows.",
    image: "/images/services/ui-ux-design-branding.webp",
  },
  {
    id: "05",
    title: "Digital Marketing",
    description: "Performance campaigns, SEO, social media and content that turn attention into measurable growth — tracked end to end.",
    tags: ["Paid Ads", "SEO", "Social & Content"],
    slug: "digital-marketing",
    longDescription: "A great product still needs the right people to find it. We plan and run digital marketing that is measured in leads and sales, not likes: search engine optimisation (SEO), paid campaigns on Google and Meta, social media and content.\n\nSEO covers technical fixes, Arabic and English keyword research, content and local search, so you show up when customers search for what you sell. Every campaign is tracked end to end with analytics and conversion tracking, and because we also build websites and apps, we can fix what stops visitors from converting.",
    image: "/images/services/digital-marketing.webp",
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
    features: [
      "Full Arabic (RTL) storefront with a premium dark-and-gold identity",
      "Product catalogue, offers, wishlist and cart",
      "Simple three-step flow to buy, download and activate original software",
    ],
    scope: ["UI/UX Design", "Web Development", "E-commerce"],
    contribution: "Designed and built end to end by ETQAN: brand-led UI/UX, the Arabic RTL storefront, catalogue, offers, wishlist, cart and the buy-download-activate flow.",
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
];

/** Which services each project demonstrates (from each project's delivered scope). */
export const PROJECT_SERVICES: Record<string, string[]> = {
  "original-software": ["web-development", "ui-ux-design-branding"],
  tazakka: ["mobile-app-development"],
  hawadeet: ["mobile-app-development"],
  "ds-mate": ["custom-software-development", "web-development"],
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
  { date: "Step 02", title: "Strategy & Planning", description: "A clear roadmap covering scope, technology, timeline and the marketing plan that will bring users in." },
  { date: "Step 03", title: "Design", description: "Brand, UX and UI designed together and tested with real users before a single line of production code." },
  { date: "Step 04", title: "Develop & Test", description: "Agile sprints with weekly demos, automated testing and full transparency on progress." },
  { date: "Step 05", title: "Launch & Market", description: "We go live and switch on the growth engine — SEO, campaigns and content, all tracked end to end." },
  { date: "Ongoing", title: "Support & Grow", description: "Maintenance, new features and continuous optimisation, so your product and your results keep improving." },
];

/* ------------------------------------------------------------------ */
/* Arabic fallbacks — used until the dashboard's Arabic fields are filled */
/* ------------------------------------------------------------------ */

export const SITE_AR: SiteContent = {
  badge: "صُنع بإتقان",
  subtitle:
    "في إتقان نصمّم ونطوّر ونسوّق المواقع الإلكترونية وتطبيقات الجوال والأنظمة المخصصة للشركات في مصر والخليج — هندسة وتسويق تحت سقف واحد.",
  about:
    "إتقان تعني الإحكام في العمل — وهكذا نعمل. مهندسون ومصممون ومسوّقون تحت سقف واحد، نبني برمجيات تؤدي بكفاءة وحملات تحقق النمو، ليتقدّم منتجك وعلامتك التجارية معاً.",
  contact: { ...SITE.contact, address: "السادس من أكتوبر، الجيزة، مصر" },
};

/** Keyed by service slug so API services can pick up an Arabic fallback. */
export const SERVICES_AR: Record<string, Pick<Service, "title" | "description" | "tags" | "longDescription">> = {
  "web-development": {
    longDescription: "موقعك الإلكتروني هو غالباً المكان الأول الذي يقرر فيه العميل أن يثق بك. نبني مواقع ومنصات ويب سريعة وآمنة — مواقع شركات ومتاجر إلكترونية وبوابات عملاء ومنتجات SaaS — بتقنيات حديثة مثل Next.js وReact، مع نظام لإدارة المحتوى يستطيع فريقك استخدامه دون الحاجة إلى مطوّر.\n\nكل موقع نبنيه جاهز لمحركات البحث منذ اليوم الأول: روابط واضحة وبيانات منظمة وسرعة تحميل عالية على شبكات الجوال ودعم كامل للعربية والإنجليزية بتصميم صحيح من اليمين إلى اليسار. ولأننا ندير التسويق أيضاً، يأتي الموقع مزوّداً بالتحليلات وتتبّع التحويلات لتعرف أي الصفحات تجلب لك العملاء.",
    title: "تطوير المواقع",
    description: "مواقع ومنصات ويب عالية الأداء مبنية بأحدث التقنيات — سريعة وآمنة وجاهزة لمحركات البحث، ويسهل على فريقك إدارتها.",
    tags: ["Next.js و React", "المتاجر الإلكترونية", "أنظمة إدارة المحتوى"],
  },
  "mobile-app-development": {
    longDescription: "نطوّر تطبيقات iOS وAndroid من قاعدة برمجية واحدة باستخدام React Native وFlutter، لتطلق تطبيقك على المتجرين أسرع وتدير منتجاً واحداً بدلاً من اثنين. أطلق فريقنا تطبيقات حقيقية تتضمن الإشعارات والتخزين المحلي والروابط العميقة ورفع الوسائط والحركات الانسيابية — منها تطبيق يستخدمه أكثر من 60,000 شخص.\n\nنتولى الرحلة كاملة: تصميم تجربة المستخدم والواجهات، والتطبيق نفسه، والخادم وواجهات API التي يحتاجها، والنشر على المتاجر وتسويق الإطلاق. ندعم العربية والإنجليزية منذ البداية بواجهات مصممة للقراءة من اليمين إلى اليسار.",
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
  "digital-marketing": {
    longDescription: "حتى المنتج الممتاز يحتاج أن يصل إليه الأشخاص المناسبون. نخطط وندير تسويقاً رقمياً يُقاس بالعملاء المحتملين والمبيعات لا بالإعجابات: تحسين محركات البحث (SEO)، والحملات المدفوعة على Google وMeta، والسوشيال ميديا والمحتوى.\n\nيشمل تحسين محركات البحث الإصلاحات التقنية وأبحاث الكلمات المفتاحية بالعربية والإنجليزية والمحتوى والبحث المحلي، لتظهر عندما يبحث العملاء عمّا تقدمه. نتتبّع كل حملة بالكامل عبر التحليلات وتتبّع التحويلات، ولأننا نبني المواقع والتطبيقات أيضاً، نستطيع إصلاح ما يمنع الزوار من التحوّل إلى عملاء.",
    title: "التسويق الرقمي",
    description: "حملات إعلانية وتحسين لمحركات البحث وإدارة للسوشيال ميديا والمحتوى — تحوّل الاهتمام إلى نمو قابل للقياس، مع تتبّع كامل للنتائج.",
    tags: ["الإعلانات المدفوعة", "SEO", "السوشيال والمحتوى"],
  },
};

/** Keyed by project id/slug. Product names stay in their original form. */
export const PROJECTS_AR: Record<string, Pick<Project, "category" | "platform" | "summary" | "features" | "scope" | "contribution"> & { results?: Result[] }> = {
  "original-software": {
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
};

/** Arabic alt text for built-in screenshots, by project and position. */
export const GALLERY_ALT_AR: Record<string, string[]> = {
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
  { date: "الخطوة 02", title: "الاستراتيجية والتخطيط", description: "خارطة طريق واضحة تشمل النطاق والتقنيات والجدول الزمني، وخطة التسويق التي ستجلب المستخدمين." },
  { date: "الخطوة 03", title: "التصميم", description: "الهوية وتجربة المستخدم والواجهات تُصمَّم معاً وتُختبر مع مستخدمين حقيقيين قبل كتابة أي كود للإنتاج." },
  { date: "الخطوة 04", title: "التطوير والاختبار", description: "دورات عمل رشيقة مع عروض أسبوعية واختبارات آلية وشفافية كاملة في سير العمل." },
  { date: "الخطوة 05", title: "الإطلاق والتسويق", description: "نطلق المنتج ونشغّل محرك النمو — تحسين محركات البحث والحملات والمحتوى، مع تتبّع كامل." },
  { date: "مستمر", title: "الدعم والنمو", description: "صيانة وميزات جديدة وتحسين مستمر، لتواصل منتجاتك ونتائجك التحسّن." },
];

export const processFor = (locale: Locale) => (locale === "ar" ? PROCESS_AR : PROCESS);
