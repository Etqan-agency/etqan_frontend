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
  page: { lastUpdatedLabel: string; lastUpdated: string; template: string; contents: string; questions: string; questionsText: string };
  privacy: LegalDoc;
  terms: LegalDoc;
};

export const LEGAL_EMAIL = "hello@etqanagency.com";
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
    template: "This page is a template and should be reviewed by a qualified lawyer before relying on it.",
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
        heading: "How we use your information",
        list: [
          "To reply to your enquiry, discuss your project and prepare a proposal.",
          "To follow up with you about the enquiry you sent.",
          "To understand which channels and campaigns bring enquiries, so we can improve our marketing.",
          "To protect the website and the form against spam and abuse.",
        ],
        after: ["We do not sell your personal information, and we do not add you to a mailing list unless you ask us to."],
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
        heading: "WhatsApp and other third parties",
        paragraphs: [
          "Our WhatsApp links open WhatsApp, a service operated by Meta. Anything you send there is handled under WhatsApp's own privacy policy.",
          "We also rely on service providers to host the website, store enquiries and deliver email, as well as the analytics and security providers named above. They process information on our behalf only as needed to provide their services. Some of them may process information outside Egypt.",
        ],
      },
      {
        heading: "How long we keep information",
        paragraphs: [
          "We keep enquiries for as long as we need them to respond to you, work with you and keep reasonable business records. When they are no longer needed, or when you ask us to delete them, we delete them unless we are required by law to keep them.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "Under Egypt's Personal Data Protection Law (Law No. 151 of 2020), you can ask to access the personal information we hold about you, correct it, have it deleted, or withdraw your consent where we rely on it.",
          `If you are in Saudi Arabia, the UAE or another Gulf country, you can send any request under your local data protection law to the same address. Email ${LEGAL_EMAIL} and we will respond as soon as we can.`,
        ],
      },
      {
        heading: "Security",
        paragraphs: [
          "We take reasonable technical and organisational measures to protect the information you share with us. No website or transmission over the internet is completely secure, so please avoid sending highly sensitive information through the form.",
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
    template: "هذه الصفحة نموذج أوّلي، ويجب أن يراجعها محامٍ مختص قبل الاعتماد عليها.",
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
        heading: "كيف نستخدم معلوماتك",
        list: [
          "للرد على طلبك ومناقشة مشروعك وإعداد عرض مناسب.",
          "لمتابعة التواصل معك بشأن الطلب الذي أرسلته.",
          "لمعرفة القنوات والحملات التي تأتي منها الطلبات، حتى نحسّن تسويقنا.",
          "لحماية الموقع والنموذج من الرسائل المزعجة وإساءة الاستخدام.",
        ],
        after: ["لا نبيع بياناتك الشخصية، ولا نضيفك إلى أي قائمة بريدية إلا إذا طلبت ذلك."],
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
        heading: "واتساب والأطراف الأخرى",
        paragraphs: [
          "روابط واتساب في موقعنا تفتح تطبيق واتساب، وهو خدمة تديرها شركة Meta. وأي رسالة ترسلها هناك تخضع لسياسة الخصوصية الخاصة بواتساب.",
          "نعتمد كذلك على مزوّدي خدمات لاستضافة الموقع وحفظ الطلبات وإرسال البريد الإلكتروني، إلى جانب مزوّدي التحليلات والحماية المذكورين أعلاه. ويعالج هؤلاء المعلومات نيابةً عنا وبالقدر اللازم لتقديم خدماتهم فقط، وقد يعالج بعضهم المعلومات خارج مصر.",
        ],
      },
      {
        heading: "مدة الاحتفاظ بالمعلومات",
        paragraphs: [
          "نحتفظ بالطلبات طوال المدة التي نحتاجها للرد عليك والعمل معك والاحتفاظ بسجلات عمل معقولة. وعندما لا نعود بحاجة إليها، أو عندما تطلب حذفها، نحذفها ما لم يُلزمنا القانون بالاحتفاظ بها.",
        ],
      },
      {
        heading: "حقوقك",
        paragraphs: [
          "وفقًا لقانون حماية البيانات الشخصية المصري (القانون رقم 151 لسنة 2020)، يحق لك طلب الاطلاع على بياناتك الشخصية التي نحتفظ بها، أو تصحيحها، أو حذفها، أو سحب موافقتك في الحالات التي نعتمد فيها عليها.",
          `وإذا كنت في المملكة العربية السعودية أو الإمارات أو أي دولة خليجية أخرى، يمكنك إرسال أي طلب بموجب قانون حماية البيانات المعمول به لديك إلى العنوان نفسه. راسلنا على ${LEGAL_EMAIL} وسنرد عليك في أقرب وقت ممكن.`,
        ],
      },
      {
        heading: "أمن المعلومات",
        paragraphs: [
          "نتخذ إجراءات تقنية وتنظيمية معقولة لحماية المعلومات التي تشاركها معنا. ولكن لا يوجد موقع أو نقل عبر الإنترنت آمن تمامًا، لذا نرجو ألا ترسل معلومات بالغة الحساسية عبر النموذج.",
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
          "تخضع هذه الشروط لقوانين جمهورية مصر العربية، وتختص محاكم الجيزة المختصة بنظر أي نزاع يتعلق بها أو بالموقع.",
        ],
      },
    ],
  },
};

const LEGAL: Record<Locale, LegalStrings> = { en, ar };

export const getLegal = (locale: Locale): LegalStrings => LEGAL[locale];
