# CredWise AI MVP Scaffold

This folder now includes a working MVP application structure for the SaaS platform:

- Homepage with problem blocks and subscriber value section
- Category hub pages at `/learn/category/[slug]`
- Article template at `/learn/[slug]`
- Premium content lock based on viewer tier
- Subscriber dashboard routes
- Admin content index
- Legal placeholder pages
- Mobile bottom navigation
- JSON-LD helpers for organization, website, breadcrumb, article, and FAQ schema
- Supabase and Stripe starter utilities
- Demo session toggles for free, plus, premium, and admin states

Recommended next implementation steps:

1. Install dependencies inside [apps/web](/Users/rodpic/my-video/apps/web).
2. Replace demo cookie sessions with real Supabase auth.
3. Connect Stripe Checkout and webhook sync to the `subscriptions` table.
4. Move article and category data from in-memory arrays to Supabase or MDX.
5. Add editor forms, file uploads, and role-based admin protection.
