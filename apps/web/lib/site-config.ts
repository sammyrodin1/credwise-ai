export const siteConfig = {
  name: "CredWise AI",
  title: "CredWise AI | U.S. Financial Learning and Planning Platform",
  description:
    "Educational guides, audio lessons, and planning tools that help people understand credit, debt, housing, student loans, and banking in the United States.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  nav: [
    { label: "Credit", href: "/learn/category/credit-basics" },
    { label: "Debt", href: "/learn/category/debt-help" },
    { label: "Housing", href: "/learn/category/home-housing" },
    { label: "Student Loans", href: "/learn/category/student-loans" },
    { label: "Pricing", href: "/pricing" },
  ],
};
