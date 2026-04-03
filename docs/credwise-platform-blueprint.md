# CredWise AI Platform Blueprint

## 1. Product Positioning Statement

CredWise AI is a U.S.-focused financial education SaaS platform that helps people understand credit, debt, housing, student loans, and everyday money systems through structured learning, guided comparisons, scenario-planning tools, and premium digital resources.

Core promise:
- Clear explanations for confusing U.S. financial systems
- Structured decision-support, not individualized advice
- Mobile-first learning for people who need help now
- Premium library + tools that reduce confusion and increase confidence

Suggested master tagline:
- Understand money systems in America with clarity.

Suggested product descriptor:
- Educational finance library and planning platform for U.S. consumers

## 2. Legal-Safe Framing Language

Primary framing:
- For educational purposes only
- General information, not individualized financial advice
- Not legal, tax, investment, lending, credit repair, debt settlement, or mortgage brokerage services
- Scenario-planning tools are informational and do not recommend a specific product, lender, or legal action

Safe marketing language:
- Learn how U.S. credit works
- Compare concepts carefully
- Explore repayment and budgeting scenarios
- Understand housing pathways and program basics
- Build a step-by-step learning plan

Avoid:
- We help you get approved
- We fix your credit
- We negotiate your debt
- We tell you what card to choose
- Best lender for you
- Guaranteed savings or results

## 3. Site Architecture

Top-level product areas:
- Credit Compass: credit education and score mechanics
- Debt Navigator: debt education, prioritization, and payoff planning
- Home Pathways: mortgage, NACA, and housing program education
- Loan Clarity: student loan education and repayment basics
- Money Foundations: banking, budgeting, and bill systems
- Listen Library: short-form audio lessons
- Planning Studio: calculators, worksheets, checklists, and guided planners

Core experience layers:
- Free discovery layer
- Premium subscription layer
- Downloadable digital products
- Audio learning layer
- Admin/editorial layer

## 4. Sitemap

Primary public sitemap:
- `/`
- `/learn`
- `/learn/credit-basics`
- `/learn/debt-help`
- `/learn/home-housing`
- `/learn/student-loans`
- `/learn/banking-money-habits`
- `/learn/new-to-america`
- `/learn/naca`
- `/pricing`
- `/glossary`
- `/glossary/[term]`
- `/tools`
- `/tools/utilization-estimator`
- `/tools/budget-planner`
- `/tools/debt-worksheet`
- `/tools/housing-prep-checklist`
- `/audio`
- `/compare`
- `/disclosures`
- `/editorial-policy`
- `/terms`
- `/privacy`
- `/about`
- `/contact`

Subscriber area:
- `/library`
- `/library/audio`
- `/library/downloads`
- `/library/saved`
- `/account`

Admin area:
- `/admin`
- `/admin/content`
- `/admin/categories`
- `/admin/audio`
- `/admin/tags`
- `/admin/reviews`
- `/admin/subscriptions`

## 5. Page Types

Essential page templates:
- Homepage with problem blocks
- Topic hub pages
- Article pages
- FAQ pages
- Glossary term pages
- Guided pathway pages
- Comparison pages
- Calculator/tool pages
- Pricing page
- Disclosure/policy pages
- Search results page
- Audio lesson pages
- Premium library index

## 6. Database Schema

See [schema.sql](/Users/rodpic/my-video/packages/db/supabase/schema.sql).

Key entities:
- users
- profiles
- subscriptions
- products
- purchases
- categories
- content_items
- content_versions
- faqs
- glossary_terms
- tags
- content_tags
- audio_assets
- download_assets
- learning_paths
- learning_path_items
- calculators
- editorial_reviews

## 7. Admin / CMS Model

Recommended stack:
- Next.js admin surface for editorial operations
- Supabase for auth, database, storage
- Rich text stored as MDX or structured JSON blocks
- Content versioning table + editorial review states

Admin features:
- Create/edit article
- Add summary, FAQ, myths, checklist, glossary links
- Upload audio asset
- Lock premium sections
- Schedule publishing
- Add freshness date and reviewed date
- Manage tags and canonical topic hubs
- Review queue with status: draft, in_review, published, archived

## 8. Subscription Model

Free tier:
- Access to beginner summaries
- Limited glossary
- Select FAQs
- Sample calculators

Subscriber tier:
- Full article library
- Premium “what to do next” sections
- Downloadable worksheets
- Full audio library
- Saved learning paths
- Premium comparison templates

Pricing recommendation:
- `$4/mo` entry tier for mobile users
- `$9/mo` full premium tier with audio + downloads + calculators
- `$19-$39` one-time premium packs for newcomer starter kit, debt organization kit, or first-time homebuyer prep kit

## 9. Homepage Wireframe

1. Trust bar
   - Educational only
   - U.S.-focused
   - Updated regularly
2. Hero
   - Headline
   - Short legal-safe subhead
   - Primary CTA: Start learning free
   - Secondary CTA: Explore premium library
3. Problem blocks
   - Understand credit
   - Get organized with debt
   - Prepare to buy a home
   - Learn NACA and housing programs
   - Navigate student loans
   - New to America
4. “How it works”
   - Learn
   - Plan
   - Track
5. Featured topic hubs
6. Premium tools preview
7. Audio learning preview
8. Editorial standards and disclaimers
9. Pricing preview
10. Footer with policies

## 10. Mobile UX Structure

Mobile priorities:
- One-thumb navigation
- Large category cards
- Sticky bottom CTA on high-intent pages
- Expandable summaries before long-form content
- Persistent “listen to this” option
- “What to do next” cards after each article

Navigation model:
- Top search
- Scrollable category pills
- Problem-first cards
- Saved items tab for subscribers

## 11. Content Taxonomy

Primary categories:
- Credit Basics
- Debt Help
- Home, Mortgage, and Housing
- Student Loans
- Banking and Money Habits
- New to America
- Audio Learning
- Tools and Planners

Content types:
- Summary
- Deep Guide
- FAQ
- Checklist
- Myth / Mistake
- Comparison
- Glossary
- Audio Lesson
- Planner / Worksheet
- Learning Path

## 12. Schema Markup Strategy

Use JSON-LD on all core templates:
- `Organization` on homepage and about pages
- `WebSite` with search action
- `BreadcrumbList` on all structured content pages
- `Article` on article/detail pages
- `FAQPage` when page contains substantive FAQ pairs
- `DefinedTerm` on glossary pages
- `Course` or `LearningResource` for multi-step guided educational paths
- `AudioObject` for audio lesson pages
- `Product` only for digital downloads or subscription plan pages, never for financial products

## 13. SEO / Internal Linking Strategy

Hub-and-spoke model:
- Each category has a canonical hub page
- Every article links back to its hub, related glossary terms, and next-step guides
- Each glossary term links to supporting articles
- Each comparison page links to a neutral explainer and risk page

Authority clusters:
- Credit cluster
- Debt cluster
- Housing cluster
- NACA cluster
- Student loan cluster
- Newcomer finance cluster

## 14. Content Update Workflow

Weekly workflow:
1. Review high-priority topics for freshness
2. Update last reviewed date
3. Add new FAQ questions from user search logs
4. Refresh internal links
5. Recheck disclaimers and “program availability may vary” language

Publishing states:
- Draft
- In Review
- Compliance Review
- Published
- Needs Refresh
- Archived

## 15. Monetization Model

Primary monetization:
- Direct consumer subscription

Secondary monetization:
- One-time downloadable kits
- Audio bundles
- Premium calculator templates

Later optional monetization:
- Sponsored educational placements with strict labeling
- Affiliate links only with disclosure and strict editorial separation

## 16. Recommended Disclaimers and Notices

Persistent notices:
- Educational use only
- Not financial, legal, tax, credit repair, or investment advice
- Information may change over time; verify with official sources
- Program eligibility and lender approval vary
- No guarantee of approval, savings, score increases, or outcomes

## 17. Production-Ready Folder Structure

See [apps/web](/Users/rodpic/my-video/apps/web) and [packages/db](/Users/rodpic/my-video/packages/db).

## 18. Starter Code Scaffold

Included in this repo:
- Next.js app scaffold
- Route structure
- UI sections for homepage and pricing
- Content models
- JSON-LD helpers
- Sample topic data
- Supabase SQL schema

## 19. Suggested Homepage Copy

Hero headline:
- Understand money systems in America without the jargon.

Hero subhead:
- Learn how credit, debt, housing, student loans, and everyday banking work in the U.S. through educational guides, audio lessons, and practical planning tools.

## 20. Suggested CTA Copy

Primary CTAs:
- Start Learning Free
- Explore Credit Basics
- See Premium Library
- Listen on the Go
- Build My Starter Plan

Conversion CTAs:
- Unlock Full Guides
- Get Audio + Worksheets
- Compare the Plans

## 21. Suggested Product Area Names

Best naming set for a premium but cautious brand:
- Credit Compass
- Debt Navigator
- Home Pathways
- Loan Clarity
- Money Foundations
- Listen Library
- Planning Studio

## 22. Future Roadmap

Phase 1:
- Launch free + premium library
- Build topic hubs
- Add 3 calculators
- Launch Stripe subscriptions

Phase 2:
- Saved learning plans
- Personalized dashboard based on self-selected goals
- State-by-state housing aid content templates

Phase 3:
- Multilingual content for newcomers
- Audio-first learning tracks
- AI-assisted content discovery with strict educational guardrails

## Recommended Product Name Direction

If the brand remains CredWise AI, the best product direction is:
- CredWise AI: Financial Literacy OS

Best customer-facing product title:
- CredWise AI
  U.S. Financial Learning and Planning Platform

Best short-form label for homepage:
- Learn money systems. Plan with clarity.
