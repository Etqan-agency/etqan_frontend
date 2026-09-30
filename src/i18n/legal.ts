import type { Locale } from "./config";

/**
 * Strings for the services menu, the footer's legal links, and the Privacy Policy / Terms of Use
 * pages. Kept apart from en.ts / ar.ts so the long legal copy isn't pulled into every page.
 *
 * The legal copy describes what the site actually does (contact form, lead attribution, consent-gated
 * analytics, Turnstile, WhatsApp links). Update it whenever those change.
 */

/** Rendered in order: paragraphs, list, then `after`. */
export type LegalSection = { heading: string; paragraphs?: string[]; list?: string[]; after?: string[] };

export type LegalDoc = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: LegalSection[];
};

type LegalStrings = {
  /** Navbar services menu. */
  menu: { allServices: string; servicesMenu: string; overview: string };
  /** Footer bottom bar. */
  footer: { privacy: string; terms: string; legalAria: string };
  /** Shared page chrome. */
  page: { lastUpdatedLabel: string; lastUpdated: string; contents: string; questions: string; questionsText: string };
  privacy: LegalDoc;
  terms: LegalDoc;
};

export const LEGAL_EMAIL = "admin@etqanpp.com";
/** ISO date of the last substantive change — shown on both pages. */
export const LEGAL_UPDATED_ISO = "2026-09-30";

const en: LegalStrings = {
  menu: {
    allServices: "All services",
    servicesMenu: "Services menu",
    overview: "Software, apps and marketing — designed, built and grown by one team.",
  },
  footer: { privacy: "Privacy", terms: "Terms", legalAria: "Legal" },
  page: {
    lastUpdatedLabel: "Last updated",
    lastUpdated: "30 September 2026",
    contents: "On this page",
    questions: "Questions?",
    questionsText: "Email us and a member of the team will reply.",
  },
  privacy: {
    metaTitle: "Privacy Policy | ETQAN",
    metaDescription:
      "How ETQAN collects, uses and protects the information you share through this website — the contact form, analytics cookies and your choices.",
    eyebrow: "Privacy Policy",
    h1: "Privacy Policy",
    intro:
      "This policy explains what information ETQAN collects when you use this website or contact us through it, why we collect it, and the choices you have. We keep it short and specific to what the site actually does.",
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          "ETQAN is a software development and digital marketing agency based in 6th of October, Giza, Egypt. We are responsible for the personal information described in this policy.",
          `For any privacy question or request, email ${LEGAL_EMAIL}.`,
        ],
      },
      {
        heading: "Information you give us",
        paragraphs: ["When you send an enquiry through our contact form, we collect the details you enter:"],
        list: [
          "Your name and email address.",
          "Your phone or WhatsApp number.",
          "Your company name.",
          "The service you need and your budget range.",
          "Your message and anything else you choose to include in it.",
        ],
      },
      {
        heading: "Information sent with your enquiry",
        paragraphs: [
          "To understand how people find us, the form also sends some technical details about your visit along with your enquiry:",
        ],
        list: [
          "Campaign parameters in the link you arrived from (UTM source, medium, campaign, term and content).",
          "Advertising click identifiers, if present in the link (Google's gclid and Meta's fbclid).",
          "The website that referred you, the first page you landed on, the page you sent the form from, and the language you were browsing in.",
        ],
      },
      {
        heading: "How we use your information, and why",
        paragraphs: [
          "We use your information only for the purposes below. For each one, this is the reason the law allows us to do it:",
        ],
        list: [
          "To reply to your enquiry, discuss your project and prepare a proposal — because you asked us to, as a step before a possible agreement, and on the basis of the consent you give by sending the form.",
          "To follow up with you about that enquiry — for the same reasons.",
          "To understand which channels and campaigns bring enquiries (the visit details sent with the form) — our legitimate interest in improving our marketing, or your consent where your local law requires it.",
          "To measure how the website is used with analytics cookies — only with your consent, which you can withdraw at any time.",
          "To protect the website and the form against spam and abuse — our legitimate interest in keeping the service secure.",
          "To keep records we are required to keep by law — our legal obligations.",
        ],
        after: [
          "We do not sell your personal information, we do not use it for decisions made solely by automated means, and we do not send you marketing emails unless you ask us to.",
        ],
      },
      {
        heading: "What happens when you submit the form",
        paragraphs: [
          "Your enquiry is stored in ETQAN's own system, where our team manages incoming requests, and a copy is emailed to our team so we can respond quickly.",
          "We also send an automatic confirmation email to the address you provide, so you know your message has arrived.",
        ],
      },
      {
        heading: "Cookies and analytics",
        paragraphs: [
          "When you first visit, we ask whether you accept analytics cookies. Until you accept, analytics storage and advertising storage stay switched off by default (using Google Consent Mode v2).",
          "Only if you accept, we may use Google Tag Manager, Google Analytics 4 and Microsoft Clarity to measure how the site is used — for example which pages are visited, how visitors move between them, and basic device and browser information. Microsoft Clarity can also record interactions such as clicks and scrolling to help us find usability problems.",
          "If you decline, these analytics cookies are not used. To change your choice later, clear this website's data in your browser and the consent banner will appear again.",
        ],
      },
      {
        heading: "Information stored in your browser",
        paragraphs: ["The site uses your browser's local storage for two small items:"],
        list: [
          "Your cookie choice (accept or decline), so we don't ask you on every visit. It stays until you clear your browser data.",
          "The details of your first visit described above (campaign parameters, click identifiers, referrer and landing page), kept for 30 days and sent to us only if you submit the contact form.",
        ],
      },
      {
        heading: "Spam protection",
        paragraphs: [
          "When enabled, the contact form uses Cloudflare Turnstile to check that a real person is submitting it. Turnstile processes technical signals from your browser and connection for this purpose, under Cloudflare's own privacy terms.",
        ],
      },
      {
        heading: "WhatsApp and other service providers",
        paragraphs: [
          "Our WhatsApp links open WhatsApp, a service operated by Meta. Anything you send there is handled under WhatsApp's own privacy policy.",
          "We rely on service providers to host the website, store enquiries and deliver email, and on the analytics and security providers named above. They process information on our behalf only as needed to provide their services.",
        ],
      },
      {
        heading: "Transfers between countries",
        paragraphs: [
          "ETQAN operates from Egypt. If you contact us from Saudi Arabia, the UAE or another country, your enquiry is transferred to us in Egypt so we can reply. Our hosting, email and analytics providers may also store data in other countries.",
          "We transfer only the information needed for the purposes in this policy, protect it with the safeguards described here, and follow the rules on transfers outside your country that apply under your local data protection law.",
        ],
      },
      {
        heading: "How long we keep information",
        list: [
          "Enquiries that don't lead to a project: deleted within 24 months of our last contact with you.",
          "Enquiries that lead to a project: kept for the duration of our work together and afterwards for as long as commercial, tax or accounting laws require.",
          "Analytics data (only if you accepted cookies): kept for up to 14 months.",
          "Visit details stored in your browser: 30 days, then discarded unless you send the form.",
        ],
        after: [
          "You can ask us to delete your information sooner, and we will do so unless the law requires us to keep it.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "Depending on where you live, you have the following rights over your personal data:",
        ],
        list: [
          "Egypt — under the Personal Data Protection Law (Law No. 151 of 2020): to know what data we hold and get a copy, to correct, update or delete it, to restrict or object to its processing, to withdraw your consent, and to be told about a breach that affects your data.",
          "Saudi Arabia — under the Personal Data Protection Law (Royal Decree No. M/19 of 1443H, as amended): to be informed about how your data is processed, to access it and receive a copy in a readable format, to correct it, to request its destruction when it is no longer needed, and to withdraw your consent.",
          "United Arab Emirates — under Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data: to obtain information about the processing, to access your data and receive it in a portable format, to correct or erase it, to restrict or object to processing (including for direct marketing), and not to be subject to decisions based solely on automated processing.",
        ],
        after: [
          `To use any of these rights, email ${LEGAL_EMAIL}. We will reply within 30 days, and we may ask you to confirm your identity first.`,
          "If you are not satisfied with our answer, you can complain to the data protection authority in your country: in Egypt, the Personal Data Protection Center; in Saudi Arabia, the Saudi Data & AI Authority (SDAIA); in the UAE, the UAE Data Office.",
        ],
      },
      {
        heading: "Security",
        paragraphs: [
          "We take reasonable technical and organisational measures to protect the information you share with us, including encrypted connections (HTTPS) and access limited to the team members who handle enquiries. No website or transmission over the internet is completely secure, so please don't send highly sensitive information through the form.",
          "If a breach affects your personal data, we will notify you and the relevant authority where the law requires it.",
        ],
      },
      {
        heading: "Children",
        paragraphs: [
          "This website is intended for businesses and adults. We do not knowingly collect personal information from anyone under 18. If you believe a child has sent us their information, email us and we will delete it.",
        ],
      },
      {
        heading: "Changes to this policy",
        paragraphs: [
          "If we change how the website handles personal information, we will update this page and the date at the top.",
        ],
      },
    ],
  },
  terms: {
    metaTitle: "Terms of Use | ETQAN",
    metaDescription: "The terms that apply when you use the ETQAN website — acceptable use, content, intellectual property, third-party links and governing law.",
    eyebrow: "Terms of Use",
    h1: "Terms of Use",
    intro:
      "These terms apply to your use of the ETQAN website. By using the site, you agree to them. If you don't agree, please don't use the site.",
    sections: [
      {
        heading: "About these terms",
        paragraphs: [
          "The website is operated by ETQAN, a software development and digital marketing agency based in 6th of October, Giza, Egypt.",
          "These terms cover the website only. Any project we carry out for you is governed by the separate written proposal or agreement we sign with you.",
        ],
      },
      {
        heading: "Using the website",
        paragraphs: ["You may browse the website and contact us through it. When you do, please don't:"],
        list: [
          "Use the site in a way that breaks any law or regulation.",
          "Try to gain unauthorised access to the site, its servers or any connected system, or interfere with how it works.",
          "Send spam, false information or harmful code through the contact form.",
          "Copy or collect the site's content in bulk using automated tools.",
        ],
      },
      {
        heading: "Content on the website",
        paragraphs: [
          "The content on this website is provided for general information about ETQAN and our services. We work to keep it accurate and up to date, but it is provided “as is”, without warranties of any kind, and it may change without notice.",
          "Nothing on the website is a binding offer. Scope, prices and timelines are agreed only in a written proposal or agreement.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the extent permitted by law, ETQAN is not liable for any loss or damage arising from your use of the website or your reliance on its content, or from the site being unavailable at any time.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "The ETQAN name and logo, and the website's text, design, graphics and code, belong to ETQAN or are used with permission. You may view and share pages for personal or internal business purposes, but you may not copy, modify or reuse them commercially without our written permission.",
          "Names, logos and screenshots of client projects shown on the site remain the property of their respective owners and are shown to illustrate our work.",
        ],
      },
      {
        heading: "Enquiries",
        paragraphs: [
          "Sending an enquiry through the website does not create a contract or oblige either of us to work together. How we handle the information you send is explained in our Privacy Policy.",
        ],
      },
      {
        heading: "Links to other websites",
        paragraphs: [
          "The website links to services and sites we don't control, such as WhatsApp, social networks and our clients' websites. We aren't responsible for their content or practices, and their own terms and privacy policies apply when you use them.",
        ],
      },
      {
        heading: "Changes",
        paragraphs: [
          "We may update the website and these terms from time to time. The date at the top of this page shows when they last changed. Continuing to use the site after a change means you accept the updated terms.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of the Arab Republic of Egypt. Any dispute relating to them or to the website falls under the jurisdiction of the competent courts of Giza, Egypt.",
          "If you use the website from Saudi Arabia, the UAE or another country, nothing in these terms takes away rights you have under the mandatory consumer or data protection laws of your country.",
        ],
      },
      {
        heading: "Language",
        paragraphs: [
          "These terms and our Privacy Policy are published in Arabic and English. If the two versions differ, the Arabic version prevails.",
        ],
      },
    ],
  },
};

const ar: LegalStrings = {
  menu: {
    allServices: "كل الخدمات",
    servicesMenu: "قائمة الخدمات",
    overview: "برمجيات وتطبيقات وتسويق — نصمّمها ونبنيها وننمّيها بفريق واحد.",
  },
  footer: { privacy: "الخصوصية", terms: "شروط الاستخدام", legalAria: "روابط قانونية" },
  page: {
    lastUpdatedLabel: "آخر تحديث",
    lastUpdated: "30 سبتمبر 2026",
    contents: "في هذه الصفحة",
    questions: "لديك سؤال؟",
    questionsText: "راسلنا عبر البريد الإلكتروني وسيردّ عليك أحد أعضاء الفريق.",
  },
  privacy: {
    metaTitle: "سياسة الخصوصية | إتقان",
    metaDescription:
      "كيف تجمع إتقان المعلومات التي تشاركها عبر هذا الموقع وتستخدمها وتحميها — نموذج التواصل وملفات تعريف الارتباط التحليلية وخياراتك.",
    eyebrow: "سياسة الخصوصية",
    h1: "سياسة الخصوصية",
    intro:
      "توضّح هذه السياسة المعلومات التي تجمعها إتقان عند استخدامك لهذا الموقع أو تواصلك معنا من خلاله، وسبب جمعها، والخيارات المتاحة لك. حرصنا على أن تكون موجزة ومقتصرة على ما يفعله الموقع فعلًا.",
    sections: [
      {
        heading: "من نحن",
        paragraphs: [
          "إتقان وكالة لتطوير البرمجيات والتسويق الرقمي، مقرّها مدينة السادس من أكتوبر بمحافظة الجيزة في مصر، وهي المسؤولة عن البيانات الشخصية الموضّحة في هذه السياسة.",
          `لأي استفسار أو طلب يتعلق بالخصوصية، راسلنا على ${LEGAL_EMAIL}.`,
        ],
      },
      {
        heading: "المعلومات التي تقدّمها لنا",
        paragraphs: ["عند إرسال طلب عبر نموذج التواصل، نجمع البيانات التي تُدخلها:"],
        list: [
          "اسمك وبريدك الإلكتروني.",
          "رقم هاتفك أو رقم واتساب.",
          "اسم شركتك.",
          "الخدمة التي تحتاجها ونطاق ميزانيتك.",
          "رسالتك وأي معلومات أخرى تختار إضافتها إليها.",
        ],
      },
      {
        heading: "معلومات تُرسَل مع طلبك",
        paragraphs: ["لنفهم كيف يصل إلينا الزوّار، يُرسل النموذج مع طلبك بعض التفاصيل التقنية عن زيارتك:"],
        list: [
          "معاملات الحملة الموجودة في الرابط الذي وصلت منه (مصدر UTM والوسيط والحملة والكلمة المفتاحية والمحتوى).",
          "معرّفات النقر الإعلانية إن وُجدت في الرابط (gclid من Google وfbclid من Meta).",
          "الموقع الذي أحالك إلينا، وأول صفحة وصلت إليها، والصفحة التي أرسلت منها النموذج، ولغة التصفّح.",
        ],
      },
      {
        heading: "كيف نستخدم معلوماتك ولماذا",
        paragraphs: [
          "نستخدم معلوماتك للأغراض التالية فقط، ومع كل غرض الأساس الذي يسمح لنا به القانون:",
        ],
        list: [
          "للرد على طلبك ومناقشة مشروعك وإعداد عرض مناسب — لأنك طلبت ذلك منا كخطوة تسبق أي اتفاق محتمل، وبناءً على الموافقة التي تمنحها بإرسال النموذج.",
          "لمتابعة التواصل معك بشأن هذا الطلب — للأسباب نفسها.",
          "لمعرفة القنوات والحملات التي تأتي منها الطلبات (تفاصيل الزيارة المرسلة مع النموذج) — لمصلحتنا المشروعة في تحسين تسويقنا، أو بموافقتك إذا اشترط قانون بلدك ذلك.",
          "لقياس استخدام الموقع عبر ملفات تعريف الارتباط التحليلية — بموافقتك فقط، ويمكنك سحبها في أي وقت.",
          "لحماية الموقع والنموذج من الرسائل المزعجة وإساءة الاستخدام — لمصلحتنا المشروعة في الحفاظ على أمان الخدمة.",
          "للاحتفاظ بالسجلات التي يُلزمنا القانون بها — التزامًا بواجباتنا القانونية.",
        ],
        after: [
          "لا نبيع بياناتك الشخصية، ولا نتخذ بشأنك قرارات قائمة على المعالجة الآلية وحدها، ولا نرسل إليك رسائل تسويقية إلا إذا طلبت ذلك.",
        ],
      },
      {
        heading: "ماذا يحدث عند إرسال النموذج",
        paragraphs: [
          "يُحفظ طلبك في نظام إتقان الخاص الذي يدير فيه فريقنا الطلبات الواردة، وتُرسَل نسخة منه إلى فريقنا عبر البريد الإلكتروني حتى نتمكن من الرد بسرعة.",
          "كما نرسل رسالة تأكيد تلقائية إلى البريد الإلكتروني الذي أدخلته، لتعرف أن رسالتك وصلت.",
        ],
      },
      {
        heading: "ملفات تعريف الارتباط والتحليلات",
        paragraphs: [
          "في زيارتك الأولى نسألك إن كنت توافق على ملفات تعريف الارتباط (الكوكيز) التحليلية. وإلى أن توافق، يظل تخزين بيانات التحليلات والإعلانات معطّلًا افتراضيًا (باستخدام وضع موافقة Google، الإصدار الثاني).",
          "فقط في حال موافقتك، قد نستخدم Google Tag Manager وGoogle Analytics 4 وMicrosoft Clarity لقياس طريقة استخدام الموقع — مثل الصفحات التي تُزار، وكيف يتنقّل الزوّار بينها، ومعلومات أساسية عن الجهاز والمتصفح. ويمكن لـ Microsoft Clarity أيضًا تسجيل التفاعلات مثل النقرات والتمرير لمساعدتنا على اكتشاف مشكلات الاستخدام.",
          "إذا رفضت، فلن تُستخدم ملفات تعريف الارتباط التحليلية. ولتغيير اختيارك لاحقًا، امسح بيانات هذا الموقع من متصفحك وستظهر لك رسالة الموافقة مجددًا.",
        ],
      },
      {
        heading: "معلومات تُحفظ في متصفحك",
        paragraphs: ["يستخدم الموقع مساحة التخزين المحلي في متصفحك لعنصرين صغيرين:"],
        list: [
          "اختيارك بشأن ملفات تعريف الارتباط (قبول أو رفض)، حتى لا نسألك في كل زيارة. ويبقى محفوظًا حتى تمسح بيانات متصفحك.",
          "تفاصيل زيارتك الأولى المذكورة أعلاه (معاملات الحملة ومعرّفات النقر والموقع المُحيل وصفحة الوصول)، وتُحفظ لمدة 30 يومًا ولا تُرسَل إلينا إلا إذا أرسلت نموذج التواصل.",
        ],
      },
      {
        heading: "الحماية من الرسائل المزعجة",
        paragraphs: [
          "عند تفعيلها، يستخدم نموذج التواصل خدمة Cloudflare Turnstile للتحقق من أن من يرسل النموذج شخص حقيقي. وتعالج Turnstile لهذا الغرض إشارات تقنية من متصفحك واتصالك، وفق شروط الخصوصية الخاصة بـ Cloudflare.",
        ],
      },
      {
        heading: "واتساب ومزودو الخدمات",
        paragraphs: [
          "تفتح روابط واتساب في موقعنا تطبيق واتساب الذي تشغّله شركة Meta، وأي شيء ترسله عبره يخضع لسياسة الخصوصية الخاصة بواتساب.",
          "نعتمد على مزودي خدمات لاستضافة الموقع وحفظ الطلبات وإرسال البريد الإلكتروني، إضافة إلى مزودي التحليلات والحماية المذكورين أعلاه. ويعالجون المعلومات نيابةً عنا وبالقدر اللازم لتقديم خدماتهم فقط.",
        ],
      },
      {
        heading: "نقل البيانات بين الدول",
        paragraphs: [
          "تعمل إتقان من مصر. فإذا تواصلت معنا من المملكة العربية السعودية أو الإمارات العربية المتحدة أو أي دولة أخرى، يُنقل طلبك إلينا في مصر حتى نتمكن من الرد عليك. وقد يحفظ مزودو الاستضافة والبريد الإلكتروني والتحليلات البيانات في دول أخرى أيضًا.",
          "لا ننقل إلا المعلومات اللازمة للأغراض الواردة في هذه السياسة، ونحميها بالضمانات الموضّحة فيها، ونلتزم بقواعد نقل البيانات خارج بلدك وفق قانون حماية البيانات المعمول به لديك.",
        ],
      },
      {
        heading: "مدة الاحتفاظ بالمعلومات",
        list: [
          "الطلبات التي لا تتحول إلى مشروع: تُحذف خلال 24 شهرًا من آخر تواصل بيننا.",
          "الطلبات التي تتحول إلى مشروع: نحتفظ بها طوال مدة عملنا معًا، ثم للمدة التي تفرضها القوانين التجارية والضريبية والمحاسبية.",
          "بيانات التحليلات (فقط إذا وافقت على ملفات تعريف الارتباط): تُحفظ لمدة أقصاها 14 شهرًا.",
          "تفاصيل الزيارة المحفوظة في متصفحك: 30 يومًا، ثم تُحذف ما لم ترسل النموذج.",
        ],
        after: [
          "يمكنك أن تطلب منا حذف معلوماتك قبل ذلك، وسنحذفها ما لم يُلزمنا القانون بالاحتفاظ بها.",
        ],
      },
      {
        heading: "حقوقك",
        paragraphs: [
          "بحسب البلد الذي تقيم فيه، تتمتع بالحقوق التالية على بياناتك الشخصية:",
        ],
        list: [
          "مصر — وفق قانون حماية البيانات الشخصية (القانون رقم 151 لسنة 2020): أن تعرف البيانات التي نحتفظ بها وتحصل على نسخة منها، وأن تصحّحها أو تحدّثها أو تحذفها، وأن تقيّد معالجتها أو تعترض عليها، وأن تسحب موافقتك، وأن تُبلَّغ بأي خرق يمسّ بياناتك.",
          "المملكة العربية السعودية — وفق نظام حماية البيانات الشخصية (الصادر بالمرسوم الملكي رقم م/19 لعام 1443هـ وتعديلاته): أن تُبلَّغ بكيفية معالجة بياناتك، وأن تطّلع عليها وتحصل على نسخة منها بصيغة مقروءة، وأن تصحّحها، وأن تطلب إتلافها متى انتفت الحاجة إليها، وأن تسحب موافقتك.",
          "الإمارات العربية المتحدة — وفق المرسوم بقانون اتحادي رقم 45 لسنة 2021 بشأن حماية البيانات الشخصية: أن تحصل على معلومات عن المعالجة، وأن تطّلع على بياناتك وتتسلّمها بصيغة قابلة للنقل، وأن تصحّحها أو تمحوها، وأن تقيّد معالجتها أو تعترض عليها (بما في ذلك لأغراض التسويق المباشر)، وألا تخضع لقرارات قائمة على المعالجة الآلية وحدها.",
        ],
        after: [
          `لممارسة أي من هذه الحقوق، راسلنا على ${LEGAL_EMAIL}. سنرد خلال 30 يومًا، وقد نطلب منك تأكيد هويتك أولًا.`,
          "وإذا لم يرضِك ردّنا، يمكنك تقديم شكوى إلى جهة حماية البيانات في بلدك: في مصر مركز حماية البيانات الشخصية، وفي السعودية الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا)، وفي الإمارات مكتب الإمارات للبيانات.",
        ],
      },
      {
        heading: "أمن المعلومات",
        paragraphs: [
          "نتخذ تدابير تقنية وتنظيمية معقولة لحماية المعلومات التي تشاركها معنا، منها الاتصال المشفّر (HTTPS) وقصر الوصول على أعضاء الفريق الذين يتولون الطلبات. ولا يوجد موقع أو نقل عبر الإنترنت آمن تمامًا، لذا نرجو ألا ترسل عبر النموذج معلومات شديدة الحساسية.",
          "إذا وقع خرق يمسّ بياناتك الشخصية، فسنُبلغك ونُبلغ الجهة المختصة متى اشترط القانون ذلك.",
        ],
      },
      {
        heading: "الأطفال",
        paragraphs: [
          "هذا الموقع موجّه إلى الشركات والبالغين، ولا نجمع عن علم أي معلومات شخصية ممن هم دون 18 عامًا. إذا كنت تعتقد أن طفلًا أرسل إلينا معلوماته، فراسلنا وسنحذفها.",
        ],
      },
      {
        heading: "التغييرات على هذه السياسة",
        paragraphs: ["إذا غيّرنا طريقة تعامل الموقع مع البيانات الشخصية، فسنحدّث هذه الصفحة والتاريخ المذكور في أعلاها."],
      },
    ],
  },
  terms: {
    metaTitle: "شروط الاستخدام | إتقان",
    metaDescription: "الشروط التي تنطبق عند استخدامك لموقع إتقان — الاستخدام المقبول، والمحتوى، والملكية الفكرية، وروابط الأطراف الأخرى، والقانون الواجب التطبيق.",
    eyebrow: "شروط الاستخدام",
    h1: "شروط الاستخدام",
    intro: "تنطبق هذه الشروط على استخدامك لموقع إتقان، وباستخدامك للموقع فإنك توافق عليها. إذا لم تكن موافقًا عليها، نرجو ألا تستخدم الموقع.",
    sections: [
      {
        heading: "عن هذه الشروط",
        paragraphs: [
          "يُدار هذا الموقع من قِبل إتقان، وكالة لتطوير البرمجيات والتسويق الرقمي مقرّها مدينة السادس من أكتوبر بمحافظة الجيزة في مصر.",
          "تغطي هذه الشروط الموقع فقط. أما أي مشروع ننفّذه لك فيخضع للعرض أو الاتفاق المكتوب المستقل الذي نوقّعه معك.",
        ],
      },
      {
        heading: "استخدام الموقع",
        paragraphs: ["يمكنك تصفّح الموقع والتواصل معنا من خلاله، ونرجو عند ذلك ألا تقوم بما يلي:"],
        list: [
          "استخدام الموقع بطريقة تخالف أي قانون أو لائحة.",
          "محاولة الوصول غير المصرّح به إلى الموقع أو خوادمه أو أي نظام مرتبط به، أو التأثير على طريقة عمله.",
          "إرسال رسائل مزعجة أو معلومات غير صحيحة أو برمجيات ضارة عبر نموذج التواصل.",
          "نسخ محتوى الموقع أو جمعه بكميات كبيرة باستخدام أدوات آلية.",
        ],
      },
      {
        heading: "محتوى الموقع",
        paragraphs: [
          "يُقدَّم محتوى هذا الموقع لأغراض التعريف العام بإتقان وخدماتها. ونحرص على أن يكون دقيقًا ومحدّثًا، لكنه يُقدَّم «كما هو» دون أي ضمانات من أي نوع، وقد يتغير دون إشعار مسبق.",
          "لا يُعدّ أي شيء في الموقع عرضًا ملزمًا. فنطاق العمل والأسعار والجداول الزمنية لا يُتفق عليها إلا في عرض أو اتفاق مكتوب.",
        ],
      },
      {
        heading: "حدود المسؤولية",
        paragraphs: [
          "في الحدود التي يسمح بها القانون، لا تتحمل إتقان أي مسؤولية عن أي خسارة أو ضرر ينشأ عن استخدامك للموقع أو اعتمادك على محتواه، أو عن عدم توفر الموقع في أي وقت.",
        ],
      },
      {
        heading: "الملكية الفكرية",
        paragraphs: [
          "اسم إتقان وشعارها، ونصوص الموقع وتصميمه ورسوماته وشيفرته البرمجية، مملوكة لإتقان أو مستخدمة بإذن من أصحابها. يمكنك عرض الصفحات ومشاركتها لأغراض شخصية أو لأغراض العمل الداخلية، لكن لا يجوز نسخها أو تعديلها أو إعادة استخدامها تجاريًا دون إذن كتابي منا.",
          "أسماء مشاريع العملاء وشعاراتها ولقطات الشاشة المعروضة في الموقع تظل ملكًا لأصحابها، وتُعرض للتعريف بأعمالنا.",
        ],
      },
      {
        heading: "الطلبات والاستفسارات",
        paragraphs: [
          "إرسال طلب عبر الموقع لا يُنشئ عقدًا ولا يُلزم أيًّا منا بالعمل معًا. ونوضّح في سياسة الخصوصية كيف نتعامل مع المعلومات التي ترسلها.",
        ],
      },
      {
        heading: "روابط لمواقع أخرى",
        paragraphs: [
          "يتضمن الموقع روابط لخدمات ومواقع لا نتحكم فيها، مثل واتساب وشبكات التواصل الاجتماعي ومواقع عملائنا. ولسنا مسؤولين عن محتواها أو ممارساتها، وتنطبق شروطها وسياسات الخصوصية الخاصة بها عند استخدامك لها.",
        ],
      },
      {
        heading: "التغييرات",
        paragraphs: [
          "قد نحدّث الموقع وهذه الشروط من وقت لآخر، ويوضّح التاريخ المذكور في أعلى الصفحة موعد آخر تغيير. واستمرارك في استخدام الموقع بعد أي تغيير يعني موافقتك على الشروط المحدّثة.",
        ],
      },
      {
        heading: "القانون الواجب التطبيق",
        paragraphs: [
          "تخضع هذه الشروط لقوانين جمهورية مصر العربية، وتختص المحاكم المختصة في الجيزة بمصر بنظر أي نزاع يتعلق بها أو بالموقع.",
          "إذا استخدمت الموقع من المملكة العربية السعودية أو الإمارات العربية المتحدة أو أي دولة أخرى، فلا يسلبك أي شيء في هذه الشروط الحقوق التي تكفلها لك القوانين الإلزامية لحماية المستهلك أو حماية البيانات في بلدك.",
        ],
      },
      {
        heading: "اللغة",
        paragraphs: [
          "تُنشر هذه الشروط وسياسة الخصوصية باللغتين العربية والإنجليزية، وعند وجود أي اختلاف بين النسختين يُعتدّ بالنسخة العربية.",
        ],
      },
    ],
  },
};

const LEGAL: Record<Locale, LegalStrings> = { en, ar };

export const getLegal = (locale: Locale): LegalStrings => LEGAL[locale];
