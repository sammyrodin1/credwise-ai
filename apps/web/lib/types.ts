export type AccessTier = "free" | "plus" | "premium";

export type TopicKey =
  | "credit"
  | "debt"
  | "housing"
  | "student-loans"
  | "money-habits"
  | "newcomers";

export interface ProblemBlock {
  slug: TopicKey;
  label: string;
  title: string;
  description: string;
  href: string;
  bullets: string[];
}

export interface TopicHub {
  slug: string;
  title: string;
  subtitle: string;
  audience: string;
  freeHighlights: string[];
  premiumHighlights: string[];
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  cta: string;
  featured?: boolean;
  features: string[];
}

export interface ArticleSummary {
  slug: string;
  title: string;
  summary: string;
  category: string;
  updatedAt: string;
  access: AccessTier;
  faq: Array<{ question: string; answer: string }>;
}
