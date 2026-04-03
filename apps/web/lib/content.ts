import type { AccessTier } from "@/lib/types";

export interface Category {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  audience: string;
  heroTitle: string;
  heroSummary: string;
  icon: string;
  featureBullets: string[];
  premiumBullets: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Article {
  slug: string;
  categorySlug: string;
  title: string;
  description: string;
  accessTier: AccessTier;
  updatedAt: string;
  readTime: string;
  intro: string;
  sections: Array<{
    title: string;
    body: string[];
  }>;
  checklist: string[];
  nextSteps: string[];
  glossaryTerms: string[];
  faqs: FaqItem[];
}

export const categories: Category[] = [
  {
    slug: "credit-basics",
    title: "Credit Basics",
    shortTitle: "Credit",
    description: "How scores, reports, utilization, payment history, and starter cards work in the U.S.",
    audience: "Beginners, newcomers, and people building a fresh foundation",
    heroTitle: "Learn the rules of U.S. credit without the confusion.",
    heroSummary: "Understand score factors, beginner card choices, and the mechanics behind healthy credit habits.",
    icon: "CC",
    featureBullets: ["What affects scores", "Secured vs unsecured cards", "Common first-card mistakes"],
    premiumBullets: ["Credit-building pathways", "Audio lessons", "Starter worksheet pack"],
  },
  {
    slug: "debt-help",
    title: "Debt Help",
    shortTitle: "Debt",
    description: "Educational guidance for bill triage, payoff strategies, and debt organization.",
    audience: "People overwhelmed by balances, due dates, and tradeoffs",
    heroTitle: "Organize debt clearly before making a big move.",
    heroSummary: "Compare payoff concepts, understand warning signs, and build an educational debt snapshot.",
    icon: "DN",
    featureBullets: ["Avalanche vs snowball", "Bill prioritization", "Debt warning signs"],
    premiumBullets: ["Planner templates", "Scenario toolkits", "Subscriber checklists"],
  },
  {
    slug: "home-housing",
    title: "Home, Mortgage, and Housing",
    shortTitle: "Housing",
    description: "Educational explainers for mortgages, affordability, NACA, and first-time homebuyer programs.",
    audience: "First-time buyers and renters researching homeownership paths",
    heroTitle: "Understand homebuying pathways before you compare options.",
    heroSummary: "Learn the language behind mortgages, housing support programs, and affordability planning.",
    icon: "HP",
    featureBullets: ["Mortgage basics", "NACA overview", "First-time buyer support"],
    premiumBullets: ["Prep checklists", "Program comparison pages", "Housing learning paths"],
  },
  {
    slug: "student-loans",
    title: "Student Loans",
    shortTitle: "Loans",
    description: "Beginner education for repayment structures, deferment, forbearance, and refinancing concepts.",
    audience: "Borrowers trying to understand the student loan system",
    heroTitle: "Make sense of repayment paths before you react.",
    heroSummary: "Learn the difference between federal and private loans, and how to evaluate repayment concepts cautiously.",
    icon: "LC",
    featureBullets: ["Federal vs private", "Repayment basics", "Refinance tradeoffs"],
    premiumBullets: ["Scenario planners", "Audio explainers", "Premium FAQ library"],
  },
  {
    slug: "money-habits",
    title: "Banking and Money Habits",
    shortTitle: "Money",
    description: "Foundational education on checking, savings, direct deposit, overdrafts, and cash-flow habits.",
    audience: "Anyone building stronger everyday money systems",
    heroTitle: "Start with the money habits that make everything else easier.",
    heroSummary: "Build a better base with banking knowledge, bill systems, and practical beginner workflows.",
    icon: "MF",
    featureBullets: ["Checking vs savings", "Overdraft traps", "Emergency fund basics"],
    premiumBullets: ["Budget planners", "Auto-pay workflows", "Monthly reset templates"],
  },
  {
    slug: "new-to-america",
    title: "New to America",
    shortTitle: "Newcomers",
    description: "A guided financial onboarding system for immigrants and newcomers learning U.S. money systems.",
    audience: "People in their first months or years in the U.S.",
    heroTitle: "Build your first-year money map in America.",
    heroSummary: "Learn how banking, bills, credit, and basic financial systems fit together in the U.S.",
    icon: "NA",
    featureBullets: ["First-year roadmap", "Banking setup", "Credit context"],
    premiumBullets: ["Newcomer toolkit", "Audio tracks", "Printable setup checklist"],
  },
];

export const articles: Article[] = [
  {
    slug: "how-us-credit-works-for-beginners",
    categorySlug: "credit-basics",
    title: "How U.S. Credit Works for Beginners",
    description: "A plain-language starter guide to scores, reports, utilization, and payment behavior.",
    accessTier: "free",
    updatedAt: "April 3, 2026",
    readTime: "8 min read",
    intro: "This guide explains the moving parts behind U.S. credit so readers can understand the system before making product decisions.",
    sections: [
      {
        title: "What credit is actually tracking",
        body: [
          "In broad terms, credit data reflects how you have handled certain borrowing obligations over time. It is not a measure of personal worth, and it does not guarantee future approvals.",
          "A beginner-friendly platform should teach users that lenders, landlords, insurers, and other institutions may use credit-related data differently depending on the context.",
        ],
      },
      {
        title: "Why payment history and utilization matter",
        body: [
          "On-time payments and revolving utilization are often central concepts in educational credit content because they help people understand two common areas of behavior they can monitor.",
          "The platform should avoid promising specific score outcomes and instead explain that changes in reports, balances, history, and models can affect results differently.",
        ],
      },
    ],
    checklist: [
      "Learn the difference between a credit report and a credit score",
      "Understand soft inquiries versus hard inquiries",
      "Know your credit card statement date and due date",
    ],
    nextSteps: [
      "Read the utilization explainer",
      "Compare secured and unsecured starter cards conceptually",
      "Open the beginner glossary path",
    ],
    glossaryTerms: ["credit utilization", "hard inquiry", "secured credit card"],
    faqs: [
      {
        question: "Does checking my own credit score hurt my credit?",
        answer: "Usually educational score checks are soft inquiries, which generally do not have the same effect as an application-related hard inquiry.",
      },
      {
        question: "Do I need to carry a balance to build credit?",
        answer: "No. The platform should teach that carrying interest-bearing debt is not required to understand or practice healthy credit habits.",
      },
    ],
  },
  {
    slug: "organize-debt-before-picking-a-payoff-strategy",
    categorySlug: "debt-help",
    title: "Organize Debt Before Picking a Payoff Strategy",
    description: "Build a complete debt picture before comparing snowball, avalanche, or consolidation concepts.",
    accessTier: "premium",
    updatedAt: "April 3, 2026",
    readTime: "10 min read",
    intro: "This premium article demonstrates locked sections for subscribers and downloadable planning assets.",
    sections: [
      {
        title: "Start with clarity, not urgency",
        body: [
          "A useful debt education workflow starts by listing balances, rates, due dates, and account status before comparing any strategy language.",
          "This reduces the chance that users jump into a product or program they do not fully understand.",
        ],
      },
      {
        title: "Compare payoff frameworks carefully",
        body: [
          "Educational content can explain how avalanche and snowball differ conceptually without declaring one strategy universally best.",
          "The platform should also frame consolidation as a concept to evaluate, not a guaranteed improvement.",
        ],
      },
    ],
    checklist: [
      "List every balance and minimum payment",
      "Mark which accounts are current or delinquent",
      "Separate secured debts from unsecured debts",
    ],
    nextSteps: [
      "Download the debt organization worksheet",
      "Review the bill-priority checklist",
      "Listen to the mobile audio lesson",
    ],
    glossaryTerms: ["debt avalanche", "debt snowball", "consolidation"],
    faqs: [
      {
        question: "Is consolidation always a lower-cost option?",
        answer: "No. It should be evaluated carefully because fees, rates, timelines, and risk can vary widely.",
      },
      {
        question: "Does this platform negotiate debt for users?",
        answer: "No. The platform is positioned as educational only and does not provide debt settlement services.",
      },
    ],
  },
  {
    slug: "mortgage-basics-for-first-time-homebuyers",
    categorySlug: "home-housing",
    title: "Mortgage Basics for First-Time Homebuyers",
    description: "Understand the major mortgage categories, affordability concepts, and first-time buyer preparation steps.",
    accessTier: "free",
    updatedAt: "April 3, 2026",
    readTime: "9 min read",
    intro: "This template shows how housing pages can mix neutral explanations, checklists, and glossary support without crossing into brokerage language.",
    sections: [
      {
        title: "Mortgage categories are not recommendations",
        body: [
          "Educational content should clarify that FHA, VA, USDA, and conventional loans are broad categories with different rules, tradeoffs, and eligibility criteria.",
          "A cautious platform explains concepts and risks without implying lender endorsement or suitability for a specific user.",
        ],
      },
      {
        title: "Affordability is more than a monthly payment",
        body: [
          "A first-time buyer education platform should frame affordability as a wider planning topic that may include maintenance, reserves, insurance, taxes, and payment stability.",
          "This is especially important for mobile-first users who often arrive wanting a quick answer but need structured context.",
        ],
      },
    ],
    checklist: [
      "Understand down payment basics",
      "Learn what closing costs are",
      "Review your broader monthly housing budget",
    ],
    nextSteps: [
      "Read the NACA overview",
      "Open the housing prep checklist",
      "Browse first-time buyer support content",
    ],
    glossaryTerms: ["down payment", "closing costs", "debt-to-income ratio"],
    faqs: [
      {
        question: "Does this site help me get approved?",
        answer: "No. It helps users understand concepts and prepare educationally, but it does not offer approvals or brokerage services.",
      },
      {
        question: "Are all first-time homebuyer programs national?",
        answer: "No. Some programs are national, while many are state or local and may have different criteria.",
      },
    ],
  },
  {
    slug: "first-year-money-setup-for-newcomers",
    categorySlug: "new-to-america",
    title: "First-Year Money Setup for Newcomers",
    description: "A clear orientation to banking, bills, credit, and practical financial systems in the U.S.",
    accessTier: "premium",
    updatedAt: "April 3, 2026",
    readTime: "11 min read",
    intro: "This guide is designed for people who need a steady, non-judgmental introduction to U.S. financial systems.",
    sections: [
      {
        title: "Build your system one layer at a time",
        body: [
          "Newcomers often need banking, bill management, identity documentation context, and credit education at the same time.",
          "A good learning path breaks these topics into a sequence that feels manageable on a phone.",
        ],
      },
      {
        title: "Avoid assuming that every product builds credit",
        body: [
          "The platform should explain that checking accounts, savings accounts, debit cards, and credit products do different jobs.",
          "This helps reduce confusion for users who are trying to understand why some financial actions affect credit and others do not.",
        ],
      },
    ],
    checklist: [
      "Open a safe banking base",
      "Set up a due-date tracker",
      "Learn which products can affect credit reporting",
    ],
    nextSteps: [
      "Open the newcomer finance roadmap",
      "Listen to the banking setup audio guide",
      "Review the glossary of essential terms",
    ],
    glossaryTerms: ["direct deposit", "credit report", "overdraft"],
    faqs: [
      {
        question: "Will opening a bank account automatically build credit?",
        answer: "Not by itself. Banking and credit are connected parts of personal finance, but they are not the same reporting system.",
      },
      {
        question: "Does this platform provide immigration or legal advice?",
        answer: "No. It provides financial education only and is not a legal service.",
      },
    ],
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(categorySlug: string) {
  return articles.filter((article) => article.categorySlug === categorySlug);
}
