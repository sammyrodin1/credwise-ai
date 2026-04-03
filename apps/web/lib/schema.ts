import { siteConfig } from "@/lib/site-config";
import type { ArticleSummary } from "@/lib/types";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    areaServed: "US",
    knowsAbout: [
      "Credit education",
      "Debt education",
      "Mortgage education",
      "Student loan education",
      "Financial literacy",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/learn?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function articleSchema(article: ArticleSummary) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    dateModified: article.updatedAt,
    about: article.category,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    educationalUse: "Financial literacy",
    audience: {
      "@type": "Audience",
      audienceType: "U.S. consumers seeking educational financial information",
    },
  };
}

export function faqSchema(article: ArticleSummary) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
