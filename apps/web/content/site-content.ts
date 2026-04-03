import type { ArticleSummary, PricingPlan, ProblemBlock, TopicHub } from "@/lib/types";

export const problemBlocks: ProblemBlock[] = [
  {
    slug: "credit",
    label: "Credit Compass",
    title: "I want to understand credit",
    description: "Learn how scores, utilization, payment history, card types, and beginner mistakes shape credit in the U.S.",
    href: "/learn/credit-basics",
    bullets: ["Score factors", "Secured cards", "Utilization basics"],
  },
  {
    slug: "debt",
    label: "Debt Navigator",
    title: "I need help organizing debt",
    description: "Use educational workflows to compare payoff strategies, prioritize bills, and avoid common debt traps.",
    href: "/learn/debt-help",
    bullets: ["Avalanche vs snowball", "Bill triage", "Consolidation concepts"],
  },
  {
    slug: "housing",
    label: "Home Pathways",
    title: "I want to buy a home",
    description: "Understand mortgage systems, first-time homebuyer support, housing affordability, and NACA in plain language.",
    href: "/learn/home-housing",
    bullets: ["Mortgage basics", "Housing aid", "NACA deep dive"],
  },
  {
    slug: "newcomers",
    label: "New to America",
    title: "I am new in America",
    description: "Start with banking, SSN and ITIN context, credit building basics, bills, and first-year finance systems.",
    href: "/learn/new-to-america",
    bullets: ["Banking setup", "Credit basics", "First-year checklist"],
  },
];

export const topicHubs: TopicHub[] = [
  {
    slug: "credit-basics",
    title: "Credit Basics",
    subtitle: "A clear map of how U.S. credit actually works.",
    audience: "Beginners, newcomers, and people rebuilding foundations",
    freeHighlights: ["What a credit score is", "How utilization works", "Secured vs unsecured cards"],
    premiumHighlights: ["Credit-building sequences", "Common trap checklists", "Audio explainers"],
  },
  {
    slug: "debt-help",
    title: "Debt Help",
    subtitle: "Structured learning for people under payment pressure.",
    audience: "Anyone juggling balances, bills, and payoff stress",
    freeHighlights: ["Debt organization checklist", "Avalanche vs snowball", "Warning-sign guide"],
    premiumHighlights: ["Debt planner worksheet", "Scenario templates", "Bill-priority playbooks"],
  },
  {
    slug: "home-housing",
    title: "Home, Mortgage, and Housing",
    subtitle: "Educational guidance for homebuying pathways and housing support.",
    audience: "First-time buyers and housing researchers",
    freeHighlights: ["FHA, VA, USDA, conventional overviews", "Refinancing basics", "NACA intro"],
    premiumHighlights: ["Housing prep checklist", "Program comparison matrix", "Premium audio lessons"],
  },
];

export const featuredArticles: ArticleSummary[] = [
  {
    slug: "credit-basics",
    title: "How U.S. Credit Works for Beginners",
    summary: "A plain-language starter guide to scores, reports, utilization, and payment behavior.",
    category: "Credit Basics",
    updatedAt: "April 3, 2026",
    access: "free",
    faq: [
      {
        question: "Does checking my own score hurt my credit?",
        answer: "Usually no. Educational score checks are generally soft inquiries.",
      },
      {
        question: "Is carrying a balance required to build credit?",
        answer: "No. The educational guidance explains why on-time payments matter more than interest-bearing balances.",
      },
    ],
  },
  {
    slug: "debt-help",
    title: "How to Organize Debt Before Choosing a Payoff Strategy",
    summary: "Build a complete debt picture before comparing snowball, avalanche, or consolidation concepts.",
    category: "Debt Help",
    updatedAt: "April 3, 2026",
    access: "premium",
    faq: [
      {
        question: "What should I list first?",
        answer: "Start with balance, minimum payment, interest rate, due date, and delinquency status.",
      },
      {
        question: "Is consolidation always cheaper?",
        answer: "No. The platform frames consolidation as something to compare carefully, not assume.",
      },
    ],
  },
  {
    slug: "home-housing",
    title: "Mortgage and Housing Basics for First-Time Buyers",
    summary: "Understand core mortgage pathways, affordability concepts, and housing support programs without sales language.",
    category: "Home, Mortgage, and Housing",
    updatedAt: "April 3, 2026",
    access: "free",
    faq: [
      {
        question: "Does this platform tell me which mortgage to choose?",
        answer: "No. It explains categories and tradeoffs for educational use only.",
      },
      {
        question: "Are housing programs available everywhere?",
        answer: "No. Availability and eligibility can vary by location and program rules.",
      },
    ],
  },
  {
    slug: "student-loans",
    title: "Student Loan Basics: Federal, Private, and Repayment Concepts",
    summary: "Learn the differences between federal and private loans, repayment structures, and key risk areas.",
    category: "Student Loans",
    updatedAt: "April 3, 2026",
    access: "free",
    faq: [
      {
        question: "Is refinancing always a good move?",
        answer: "No. Refinancing is something to evaluate carefully because tradeoffs can matter.",
      },
      {
        question: "What does deferment mean?",
        answer: "It generally refers to a pause in required payments under specific conditions or program rules.",
      },
    ],
  },
  {
    slug: "new-to-america",
    title: "First-Year Money Basics for Newcomers to America",
    summary: "A guided introduction to banking, bills, credit-building context, and common U.S. financial systems.",
    category: "New to America",
    updatedAt: "April 3, 2026",
    access: "free",
    faq: [
      {
        question: "Can I start learning before I fully understand the U.S. system?",
        answer: "Yes. The newcomer pathway is designed to build knowledge from the basics upward.",
      },
      {
        question: "Does opening a bank account automatically build credit?",
        answer: "No. Banking and credit are related systems, but they are not the same thing.",
      },
    ],
  },
  {
    slug: "naca",
    title: "What NACA Is and How to Think About the Program",
    summary: "A structured educational guide to NACA basics, expectations, and how to research the program responsibly.",
    category: "Home, Mortgage, and Housing",
    updatedAt: "April 3, 2026",
    access: "premium",
    faq: [
      {
        question: "Does reading about NACA mean I qualify?",
        answer: "No. Educational content does not imply program eligibility or approval.",
      },
      {
        question: "Will this platform submit anything for me?",
        answer: "No. It is an education platform, not a brokerage or origination service.",
      },
    ],
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    description: "Start with core educational guides and beginner explainers.",
    cta: "Start learning free",
    features: ["Starter topic hubs", "Glossary essentials", "Selected FAQs and summaries"],
  },
  {
    name: "Plus",
    price: "$4/mo",
    description: "Unlock deeper guides and mobile-first audio for everyday learning.",
    cta: "Get Plus",
    features: ["Full written library", "Premium topic blocks", "Audio lesson access"],
  },
  {
    name: "Premium",
    price: "$9/mo",
    description: "Add planners, worksheets, downloadable kits, and guided pathways.",
    cta: "Unlock Premium",
    featured: true,
    features: ["Everything in Plus", "Worksheets and checklists", "Planning Studio tools"],
  },
];

export const disclosures = [
  "CredWise AI provides educational information only.",
  "Nothing on this platform is individualized financial, legal, tax, investment, lending, mortgage, or credit repair advice.",
  "Program availability, lender criteria, rates, and eligibility can change and may vary by provider, location, and personal circumstances.",
  "No outcome, approval, score improvement, savings amount, or debt result is guaranteed.",
];
