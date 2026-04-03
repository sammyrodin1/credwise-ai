create extension if not exists "pgcrypto";

create type access_tier as enum ('free', 'plus', 'premium');
create type content_kind as enum (
  'hub',
  'article',
  'faq',
  'checklist',
  'comparison',
  'tool',
  'audio',
  'glossary',
  'learning_path',
  'policy'
);
create type review_status as enum (
  'draft',
  'in_review',
  'compliance_review',
  'published',
  'needs_refresh',
  'archived'
);
create type product_kind as enum ('subscription', 'digital_download');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  onboarding_goal text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  kind product_kind not null,
  access_level access_tier,
  stripe_product_id text,
  stripe_price_id text,
  price_cents integer not null,
  billing_interval text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references products(id),
  status text not null,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references products(id),
  stripe_checkout_session_id text,
  amount_cents integer not null,
  currency text not null default 'usd',
  created_at timestamptz not null default now()
);

create table categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_description text not null,
  hero_title text,
  seo_title text,
  seo_description text,
  sort_order integer not null default 0,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table content_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id) on delete set null,
  slug text not null unique,
  title text not null,
  kind content_kind not null,
  summary text not null,
  body_mdx text,
  access_level access_tier not null default 'free',
  review_state review_status not null default 'draft',
  seo_title text,
  seo_description text,
  canonical_url text,
  reading_minutes integer,
  listening_minutes integer,
  last_reviewed_at timestamptz,
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index content_items_category_idx on content_items(category_id);
create index content_items_kind_idx on content_items(kind);
create index content_items_review_state_idx on content_items(review_state);

create table content_versions (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid not null references content_items(id) on delete cascade,
  version_number integer not null,
  title text not null,
  summary text not null,
  body_mdx text,
  change_notes text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (content_item_id, version_number)
);

create table faqs (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid not null references content_items(id) on delete cascade,
  question text not null,
  answer text not null,
  sort_order integer not null default 0
);

create table glossary_terms (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  term text not null unique,
  definition text not null,
  plain_language_example text,
  related_content_id uuid references content_items(id) on delete set null,
  access_level access_tier not null default 'free',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table tags (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null unique
);

create table content_tags (
  content_item_id uuid not null references content_items(id) on delete cascade,
  tag_id uuid not null references tags(id) on delete cascade,
  primary key (content_item_id, tag_id)
);

create table audio_assets (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid not null references content_items(id) on delete cascade,
  storage_path text not null,
  duration_seconds integer,
  transcript text,
  is_premium boolean not null default false,
  created_at timestamptz not null default now()
);

create table download_assets (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid references content_items(id) on delete set null,
  product_id uuid references products(id) on delete set null,
  title text not null,
  storage_path text not null,
  file_type text not null,
  is_premium boolean not null default true,
  created_at timestamptz not null default now()
);

create table learning_paths (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null,
  audience text not null,
  access_level access_tier not null default 'free',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table learning_path_items (
  id uuid primary key default gen_random_uuid(),
  learning_path_id uuid not null references learning_paths(id) on delete cascade,
  content_item_id uuid not null references content_items(id) on delete cascade,
  step_number integer not null,
  step_label text,
  unique (learning_path_id, step_number)
);

create table calculators (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  access_level access_tier not null default 'premium',
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table editorial_reviews (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid not null references content_items(id) on delete cascade,
  reviewer_id uuid references auth.users(id) on delete set null,
  review_type text not null,
  status review_status not null,
  notes text,
  reviewed_at timestamptz not null default now()
);
