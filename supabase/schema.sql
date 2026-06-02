-- ============================================================
--  ABEYWARDHANE GEMS — SUPABASE DATABASE SCHEMA
-- ============================================================
--  Run this file in: Supabase Dashboard → SQL Editor → New Query
--
--  Images: all image fields store Cloudinary URLs. The pattern is:
--    image_url      → full Cloudinary delivery URL
--    image_public_id → Cloudinary public_id (for delete/transform)
--
--  Auth: uses Supabase Auth. The `admin_profiles` table extends it.
--  RLS:  public tables are readable by everyone (anon),
--        writable only by authenticated admin users.
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- 0. EXTENSIONS
-- ────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";


-- ────────────────────────────────────────────────────────────
-- 1. ADMIN PROFILES (extends Supabase auth.users)
-- ────────────────────────────────────────────────────────────
create table public.admin_profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  email       text,                                     -- synchronized from auth.users
  role        text not null default 'editor' check (role in ('super_admin', 'admin', 'editor')),
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.admin_profiles is 'Extended profile for admin users (linked to Supabase Auth)';

-- Automatic user sync trigger from auth.users to public.admin_profiles
create or replace function public.handle_new_auth_user()
returns trigger as $$
begin
  insert into public.admin_profiles (id, full_name, email, role, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    'editor', -- default role
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = coalesce(nullif(excluded.full_name, ''), public.admin_profiles.full_name);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();


-- ────────────────────────────────────────────────────────────
-- 2. SITE SETTINGS (key-value config)
-- ────────────────────────────────────────────────────────────
create table public.site_settings (
  key         text primary key,
  value       text not null,
  description text,
  updated_at  timestamptz not null default now()
);

comment on table public.site_settings is 'Global config: phone, email, WhatsApp number, map URL, socials, etc.';

-- Seed default settings
insert into public.site_settings (key, value, description) values
  ('site_name',           'Abeywardhane Gems',                       'Business name'),
  ('phone',               '+94 74 030 4669',                        'Display phone number'),
  ('phone_raw',           '+94740304669',                           'Dialable phone (tel: link)'),
  ('email',               'info@abeywardhanegems.com',              'Contact email'),
  ('whatsapp_number',     '94740304669',                            'WhatsApp (no + or spaces)'),
  ('address',             '142/A, Gem Land, Ratnapura, Sri Lanka',  'Business address'),
  ('google_maps_embed',   '',                                       'Google Maps iframe embed URL'),
  ('facebook_url',        '',                                       'Facebook page URL'),
  ('instagram_url',       '',                                       'Instagram profile URL'),
  ('meta_description',    'Exclusive handpicked Ceylon gemstones, custom jewellery, and gem tourism in Sri Lanka.', 'Default SEO description')
on conflict (key) do nothing;


-- ────────────────────────────────────────────────────────────
-- 3. HERO SLIDES
-- ────────────────────────────────────────────────────────────
create table public.hero_slides (
  id                uuid primary key default uuid_generate_v4(),
  sort_order        int not null default 0,
  is_active         boolean not null default true,

  -- Text content (split for typing animation)
  eyebrow           text not null,
  text_prefix       text not null default '',
  text_emphasis     text not null default '',
  text_suffix       text not null default '',
  subtitle          text not null,

  -- CTAs
  cta_label         text not null default 'Find Out More',
  cta_link          text not null default '/gallery',
  cta_secondary_label text,
  cta_secondary_link  text,

  -- Pager
  pager_num         text not null,          -- '01', '02', ...
  pager_label       text not null,          -- 'Our Exquisite\nGem Collection'
  image_tag         text,                   -- badge text on image ('Handpicked Gems')

  -- Image (Cloudinary)
  image_url         text,
  image_public_id   text,

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index idx_hero_slides_order on public.hero_slides (sort_order) where is_active = true;

comment on table public.hero_slides is 'Home page hero carousel slides (4 default)';


-- ────────────────────────────────────────────────────────────
-- 4. GEMS (catalog / collection)
-- ────────────────────────────────────────────────────────────
create type gem_category as enum ('Precious', 'Semi-Precious', 'Rare');

create table public.gems (
  id                uuid primary key default uuid_generate_v4(),
  slug              text not null unique,     -- 'blue-sapphire'
  name              text not null,            -- 'Ceylon Blue Sapphire'
  category          gem_category not null default 'Precious',
  description       text,
  long_description  text,                     -- for detail page

  -- Specs
  carat             decimal(8,2),
  origin            text default 'Sri Lanka',
  colour            text,
  cut               text,
  clarity           text,
  is_certified      boolean not null default false,
  is_sold           boolean not null default false,
  price_visible     boolean not null default false,
  price_usd         decimal(12,2),

  -- Primary image (Cloudinary)
  image_url         text,
  image_public_id   text,

  -- Display
  sort_order        int not null default 0,
  is_published      boolean not null default true,
  is_featured       boolean not null default false,  -- show on home page

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index idx_gems_published on public.gems (sort_order) where is_published = true;
create index idx_gems_featured  on public.gems (sort_order) where is_featured = true;
create index idx_gems_category  on public.gems (category);

comment on table public.gems is 'The gem catalog — each row is one stone in the collection';


-- ────────────────────────────────────────────────────────────
-- 5. GEM IMAGES (multiple photos per gem)
-- ────────────────────────────────────────────────────────────
create table public.gem_images (
  id              uuid primary key default uuid_generate_v4(),
  gem_id          uuid not null references public.gems(id) on delete cascade,
  image_url       text not null,
  image_public_id text not null,
  alt_text        text,
  sort_order      int not null default 0,
  created_at      timestamptz not null default now()
);

create index idx_gem_images_gem on public.gem_images (gem_id, sort_order);

comment on table public.gem_images is 'Additional Cloudinary images for each gem (gallery carousel)';


-- ────────────────────────────────────────────────────────────
-- 6. SERVICES (the 4 main service pages)
-- ────────────────────────────────────────────────────────────
create table public.services (
  id              uuid primary key default uuid_generate_v4(),
  slug            text not null unique,      -- 'gem-purchasing'
  title           text not null,             -- 'Gem Purchasing and Selling'
  short_title     text,                      -- 'Gem Purchasing\nand Selling'
  tag             text,                      -- 'Marketing'
  description     text not null,
  icon_name       text,                      -- lucide icon name e.g. 'Gem'
  sort_order      int not null default 0,
  is_published    boolean not null default true,

  -- Hero image for the service overview card
  image_url       text,
  image_public_id text,

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index idx_services_order on public.services (sort_order) where is_published = true;

comment on table public.services is 'The 4 main services shown on home page + service detail pages';


-- ────────────────────────────────────────────────────────────
-- 7. SERVICE IMAGES (per-section photo galleries)
-- ────────────────────────────────────────────────────────────
--  section examples:
--    gem-purchasing  : 'purchasing', 'selling'
--    international   : 'exhibitions', 'awards'
--    gemology-program: 'garden', 'program'
--    gem-tourism     : 'transport', 'experiences', 'sri-lanka-tours'
-- ────────────────────────────────────────────────────────────
create table public.service_images (
  id              uuid primary key default uuid_generate_v4(),
  service_id      uuid not null references public.services(id) on delete cascade,
  section         text not null,             -- 'garden', 'transport', 'exhibitions', etc.
  title           text,                      -- caption / card title
  description     text,                      -- card body text
  location        text,                      -- for exhibitions / tours
  year            text,                      -- for exhibitions / awards
  issuer          text,                      -- for awards
  image_url       text not null,
  image_public_id text not null,
  alt_text        text,
  sort_order      int not null default 0,
  created_at      timestamptz not null default now()
);

create index idx_service_images_section on public.service_images (service_id, section, sort_order);

comment on table public.service_images is 'Cloudinary images grouped by service + section (exhibitions, garden mine, transport, etc.)';


-- ────────────────────────────────────────────────────────────
-- 8. BLOG POSTS
-- ────────────────────────────────────────────────────────────
create table public.blog_categories (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null unique,          -- 'Gems', 'Gem Tourism', 'Jewellery'
  slug        text not null unique,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

create table public.blog_posts (
  id              uuid primary key default uuid_generate_v4(),
  slug            text not null unique,
  title           text not null,
  excerpt         text,
  content         text not null,             -- markdown or rich text
  category_id     uuid references public.blog_categories(id) on delete set null,

  -- Cover image (Cloudinary)
  cover_image_url       text,
  cover_image_public_id text,

  -- Meta
  author_id       uuid references public.admin_profiles(id) on delete set null,
  is_published    boolean not null default false,
  published_at    timestamptz,
  meta_title      text,
  meta_description text,

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index idx_blog_published on public.blog_posts (published_at desc) where is_published = true;
create index idx_blog_category  on public.blog_posts (category_id);

comment on table public.blog_posts is 'Blog articles — markdown content, Cloudinary cover images';

-- Seed default categories
insert into public.blog_categories (name, slug, sort_order) values
  ('Gems',        'gems',        1),
  ('Gem Tourism',  'gem-tourism',  2),
  ('Jewellery',   'jewellery',   3),
  ('Education',   'education',   4),
  ('Industry',    'industry',    5)
on conflict (slug) do nothing;


-- ────────────────────────────────────────────────────────────
-- 9. GALLERY IMAGES (standalone gallery page)
-- ────────────────────────────────────────────────────────────
create table public.gallery_images (
  id              uuid primary key default uuid_generate_v4(),
  title           text,
  description     text,
  category        text,                      -- 'Sapphires', 'Rubies', 'Workshop', etc.
  image_url       text not null,
  image_public_id text not null,
  alt_text        text,
  width           int,                       -- original dimensions for layout
  height          int,
  sort_order      int not null default 0,
  is_published    boolean not null default true,
  created_at      timestamptz not null default now()
);

create index idx_gallery_published on public.gallery_images (sort_order) where is_published = true;
create index idx_gallery_category  on public.gallery_images (category);

comment on table public.gallery_images is 'Standalone gallery page — general Cloudinary images';


-- ────────────────────────────────────────────────────────────
-- 10. CONTACT SUBMISSIONS
-- ────────────────────────────────────────────────────────────
create type contact_status as enum ('new', 'read', 'replied', 'archived');

create table public.contact_submissions (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  email       text not null,
  phone       text,
  subject     text,
  message     text not null,
  status      contact_status not null default 'new',

  -- Metadata
  source_page text,                          -- which page the form was on
  ip_address  inet,
  user_agent  text,

  read_at     timestamptz,
  replied_at  timestamptz,
  notes       text,                          -- internal admin notes

  created_at  timestamptz not null default now()
);

create index idx_contact_status on public.contact_submissions (status, created_at desc);

comment on table public.contact_submissions is 'Inbound contact form submissions';


-- ────────────────────────────────────────────────────────────
-- 11. TOUR REGISTRATIONS (gem tourism inquiries)
-- ────────────────────────────────────────────────────────────
create type tour_status as enum ('inquiry', 'planning', 'confirmed', 'completed', 'cancelled');

create table public.tour_registrations (
  id                uuid primary key default uuid_generate_v4(),
  name              text not null,
  email             text not null,
  phone             text,
  country           text,
  arrival_date      date,
  departure_date    date,
  num_guests        int default 1,
  interests         text[],                  -- ['sapphires', 'rubies', 'workshop', 'island-tour']
  message           text,
  status            tour_status not null default 'inquiry',

  -- Budget & purchase tracking
  estimated_budget  decimal(12,2),
  actual_purchase   decimal(12,2),
  commission_rate   decimal(5,2) default 10.00,

  -- Island-wide tour add-on
  wants_island_tour boolean not null default false,
  island_tour_destinations text[],           -- ['Sigiriya', 'Kandy', 'Galle']

  -- Admin
  assigned_guide    text,
  internal_notes    text,

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index idx_tour_status on public.tour_registrations (status, created_at desc);

comment on table public.tour_registrations is 'Gem tourism registration / inquiry tracking';


-- ────────────────────────────────────────────────────────────
-- 12. TESTIMONIALS
-- ────────────────────────────────────────────────────────────
create table public.testimonials (
  id              uuid primary key default uuid_generate_v4(),
  name            text not null,
  role            text,                      -- 'Gem Collector, Hong Kong'
  country         text,
  quote           text not null,
  rating          int check (rating between 1 and 5),

  -- Avatar (Cloudinary)
  avatar_url      text,
  avatar_public_id text,

  -- Link to a service or tour
  related_service_id uuid references public.services(id) on delete set null,

  sort_order      int not null default 0,
  is_published    boolean not null default true,
  created_at      timestamptz not null default now()
);

create index idx_testimonials_published on public.testimonials (sort_order) where is_published = true;

comment on table public.testimonials is 'Client testimonials and reviews';


-- ────────────────────────────────────────────────────────────
-- 13. EXHIBITIONS (international gem trade fairs)
-- ────────────────────────────────────────────────────────────
create table public.exhibitions (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,             -- 'JCK Las Vegas'
  location        text not null,             -- 'Las Vegas, USA'
  year            text not null,
  description     text,
  image_url       text,
  image_public_id text,
  sort_order      int not null default 0,
  is_published    boolean not null default true,
  created_at      timestamptz not null default now()
);

create index idx_exhibitions_order on public.exhibitions (sort_order) where is_published = true;

comment on table public.exhibitions is 'International gem exhibitions and trade fairs attended';


-- ────────────────────────────────────────────────────────────
-- 14. AWARDS
-- ────────────────────────────────────────────────────────────
create table public.awards (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,             -- 'Excellence in Ethical Sourcing'
  issuer          text not null,             -- 'Sri Lanka Gem & Jewellery Association'
  year            text not null,
  description     text,
  image_url       text,
  image_public_id text,
  sort_order      int not null default 0,
  is_published    boolean not null default true,
  created_at      timestamptz not null default now()
);

create index idx_awards_order on public.awards (sort_order) where is_published = true;

comment on table public.awards is 'Awards and industry recognition received';


-- ────────────────────────────────────────────────────────────
-- 15. EVENTS
-- ────────────────────────────────────────────────────────────
create table public.events (
  id                uuid primary key default uuid_generate_v4(),
  name              text not null,
  slug              text unique,
  description       text,
  event_date        date,
  venue             text,
  country           text,
  banner_url        text,
  banner_public_id  text,
  status            text default 'upcoming' check (status in ('upcoming', 'completed', 'cancelled')),
  is_published      boolean not null default true,
  sort_order        int not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index idx_events_order on public.events (sort_order) where is_published = true;

comment on table public.events is 'Events (separate from exhibitions)';


-- ────────────────────────────────────────────────────────────
-- 16. ACTIVITY LOGS
-- ────────────────────────────────────────────────────────────
create table public.activity_logs (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid references auth.users(id) on delete set null,
  action          text not null, -- create, update, delete, login, logout
  entity_type     text, -- blog, gem, gallery, etc.
  entity_id       uuid,
  entity_title    text,
  details         jsonb,
  created_at      timestamptz not null default now()
);

create index idx_activity_logs_user on public.activity_logs (user_id);
create index idx_activity_logs_created on public.activity_logs (created_at desc);

comment on table public.activity_logs is 'Audit trail of administrative actions';


-- ════════════════════════════════════════════════════════════
-- AUTO-UPDATE TIMESTAMPS
-- ════════════════════════════════════════════════════════════
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Apply the trigger to every table that has updated_at
do $$
declare
  tbl text;
begin
  foreach tbl in array array[
    'admin_profiles', 'site_settings', 'hero_slides', 'gems',
    'services', 'blog_posts', 'contact_submissions',
    'tour_registrations', 'events'
  ] loop
    execute format(
      'create trigger set_updated_at before update on public.%I
       for each row execute function public.handle_updated_at()',
      tbl
    );
  end loop;
end;
$$;


-- ════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ════════════════════════════════════════════════════════════

-- Enable RLS on all tables
do $$
declare
  tbl text;
begin
  foreach tbl in array array[
    'admin_profiles', 'site_settings', 'hero_slides', 'gems',
    'gem_images', 'services', 'service_images', 'blog_categories',
    'blog_posts', 'gallery_images', 'contact_submissions',
    'tour_registrations', 'testimonials', 'exhibitions', 'awards',
    'events', 'activity_logs'
  ] loop
    execute format('alter table public.%I enable row level security', tbl);
  end loop;
end;
$$;

-- ── PUBLIC READ policies (anon + authenticated) ──
-- Content tables readable by everyone
do $$
declare
  tbl text;
begin
  foreach tbl in array array[
    'site_settings', 'hero_slides', 'gems', 'gem_images',
    'services', 'service_images', 'blog_categories', 'blog_posts',
    'gallery_images', 'testimonials', 'exhibitions', 'awards', 'events'
  ] loop
    execute format(
      'create policy "Public read %1$s" on public.%1$I
       for select using (true)',
      tbl
    );
  end loop;
end;
$$;

-- ── AUTHENTICATED WRITE policies (insert, update, delete) ──
-- Only logged-in admin users can modify content
do $$
declare
  tbl text;
begin
  foreach tbl in array array[
    'admin_profiles', 'site_settings', 'hero_slides', 'gems',
    'gem_images', 'services', 'service_images', 'blog_categories',
    'blog_posts', 'gallery_images', 'testimonials', 'exhibitions', 'awards',
    'events'
  ] loop
    execute format(
      'create policy "Admin insert %1$s" on public.%1$I
       for insert with check (auth.role() = ''authenticated'')',
      tbl
    );
    execute format(
      'create policy "Admin update %1$s" on public.%1$I
       for update using (auth.role() = ''authenticated'')',
      tbl
    );
    execute format(
      'create policy "Admin delete %1$s" on public.%1$I
       for delete using (auth.role() = ''authenticated'')',
      tbl
    );
  end loop;
end;
$$;

-- ── CONTACT SUBMISSIONS: anon can INSERT, only admin can read/update ──
create policy "Anyone can submit contact form"
  on public.contact_submissions
  for insert
  with check (true);

create policy "Admin read contact submissions"
  on public.contact_submissions
  for select
  using (auth.role() = 'authenticated');

create policy "Admin update contact submissions"
  on public.contact_submissions
  for update
  using (auth.role() = 'authenticated');

create policy "Admin delete contact submissions"
  on public.contact_submissions
  for delete
  using (auth.role() = 'authenticated');

-- ── TOUR REGISTRATIONS: anon can INSERT, only admin can read/update ──
create policy "Anyone can register for a tour"
  on public.tour_registrations
  for insert
  with check (true);

create policy "Admin read tour registrations"
  on public.tour_registrations
  for select
  using (auth.role() = 'authenticated');

create policy "Admin update tour registrations"
  on public.tour_registrations
  for update
  using (auth.role() = 'authenticated');

create policy "Admin delete tour registrations"
  on public.tour_registrations
  for delete
  using (auth.role() = 'authenticated');

-- ── ADMIN PROFILES: users can read/update their own profile ──
create policy "Users read own profile"
  on public.admin_profiles
  for select
  using (auth.uid() = id);

-- ── ACTIVITY LOGS: only admin can read/insert ──
create policy "Admin read activity logs"
  on public.activity_logs
  for select
  using (auth.role() = 'authenticated');

create policy "Admin insert activity logs"
  on public.activity_logs
  for insert
  with check (auth.role() = 'authenticated');


-- ════════════════════════════════════════════════════════════
-- SEED DATA (matches current website content)
-- ════════════════════════════════════════════════════════════

-- Hero slides
insert into public.hero_slides (sort_order, eyebrow, text_prefix, text_emphasis, text_suffix, subtitle, cta_label, cta_link, cta_secondary_label, cta_secondary_link, pager_num, pager_label, image_tag) values
  (1, 'Ceylon''s Finest Gemstones',  'Discover our exclusive collection of ', 'handpicked',            ' gems.',                     'Authentic Ceylon sapphires, rubies and rare stones — ethically sourced and gemologist verified, straight from the heart of Sri Lanka.', 'View Collection', '/gallery',   'Our Services',  '/services', '01', 'Our Exquisite\nGem Collection', 'Handpicked Gems'),
  (2, 'Bespoke Craftsmanship',       '',                                      'Custom jewellery design', ' crafted around your vision.', 'From a single sketch to a finished heirloom — our master artisans shape every detail to celebrate the gemstone you choose.',             'Start a Design',  '/services',  'View Gallery',  '/gallery',  '02', 'Custom Jewellery\nDesign',       'Bespoke Design'),
  (3, 'Generations of Expertise',    'A legacy built on ',                    'trust & tradition',      '.',                           'Every stone carries our promise — authenticity, transparency, and the deep heritage of Sri Lanka''s gem trade passed down through generations.', 'About Us', '/contact', 'Contact Us', '/contact', '03', 'Trust &\nTradition',          'Heritage Expertise'),
  (4, 'Experience Sri Lanka',        '',                                      'Gem field tourism',      ' at the source of beauty.',   'Walk the mines of Ratnapura, witness traditional cutting, and explore Ceylon''s living gem heritage with our expert-guided tours.',           'Plan Your Tour',  '/services', 'Learn More',    '/services', '04', 'Gem Field\nTourism',           'Sri Lanka Tours');

-- Services
insert into public.services (slug, title, short_title, tag, description, icon_name, sort_order) values
  ('gem-purchasing',       'Gem Purchasing and Selling',                               'Gem Purchasing\nand Selling',        'Marketing',             'A premier destination for buying and selling high-quality Ceylon gemstones with full authenticity guarantees.',                                        'Gem',      1),
  ('international-market', 'Coordinating International Gem Market and Buyers',          'Coordinating Int''l\nGem Market',     'Marketing · Research',  'Connecting trusted wholesalers, retailers and collectors across continents through our established global network.',                                  'Globe2',   2),
  ('gemology-program',     'Organizing an Expose Visit and Internship Program on Gemology', 'Gemology Expose\n& Internship',  'Education · Research',  'Hands-on programs combining theoretical education with real-world experience inside Sri Lanka''s gem industry.',                                      'BookOpen',  3),
  ('gem-tourism',          'Organizing and Facilitating Gem Tourism',                   'Gem Tourism\nin Sri Lanka',          'Tourism',               'Curated experiences through mines, cutting workshops and Ceylon''s rich gemstone heritage — guided by experts.',                                       'Bus',       4);

-- Gems
insert into public.gems (slug, name, category, description, carat, origin, is_certified, sort_order, is_featured) values
  ('white-sapphire',  'White Sapphire',         'Precious',       'Brilliant, colourless Ceylon sapphire prized for its purity and fire.',              2.45, 'Ratnapura, Sri Lanka', true,  1, true),
  ('blue-sapphire',   'Ceylon Blue Sapphire',    'Precious',       'Sri Lanka''s signature gem — deep cornflower blue with unmatched clarity.',         3.12, 'Ratnapura, Sri Lanka', true,  2, true),
  ('yellow-sapphire', 'Yellow Sapphire',         'Precious',       'Warm golden hues of Ceylon yellow sapphire, untreated and natural.',                2.78, 'Beruwala, Sri Lanka',  true,  3, true),
  ('pink-sapphire',   'Pink Sapphire',           'Rare',           'A rare blush gem, delicate yet vivid in colour saturation.',                        1.85, 'Elahera, Sri Lanka',   true,  4, true),
  ('ruby',            'Ceylon Ruby',             'Precious',       'Fiery red ruby — symbolic of passion, sourced from Sri Lankan deposits.',           2.10, 'Ratnapura, Sri Lanka', true,  5, true),
  ('cats-eye',        'Cat''s Eye Chrysoberyl',  'Rare',           'A mysterious chatoyant gem with a single luminous band of light.',                  4.30, 'Sri Lanka',            true,  6, true),
  ('spinel',          'Ceylon Spinel',           'Semi-Precious',  'Vibrant red and pink spinels with brilliant lustre and clarity.',                    2.65, 'Sri Lanka',            true,  7, true),
  ('garnet',          'Garnet',                  'Semi-Precious',  'Rich, wine-coloured garnet — timeless and elegant.',                                3.50, 'Sri Lanka',            false, 8, true);

-- Blog categories already seeded above

-- Sample blog posts
insert into public.blog_posts (slug, title, excerpt, content, category_id, is_published, published_at) values
  ('ceylon-blue-sapphires',
   'Ceylon Blue Sapphires: The Story Behind the Stone',
   'From the riverbeds of Ratnapura to the world''s finest jewellery houses — discover what makes Ceylon blue sapphires the most sought-after gems on the planet.',
   'Ceylon blue sapphires have been treasured for over two thousand years...',
   (select id from public.blog_categories where slug = 'gems'),
   true, '2023-04-08'::timestamptz),
  ('why-ceylon-gems',
   'Why These Gorgeous Gemstones From Sri Lanka Captivate Collectors',
   'Sri Lanka — known as Ratna-Dweepa or ''Gem Island'' — has produced extraordinary gemstones for centuries.',
   'Few destinations rival Sri Lanka for the sheer variety of precious and semi-precious gems...',
   (select id from public.blog_categories where slug = 'gem-tourism'),
   true, '2023-04-08'::timestamptz),
  ('custom-design-process',
   'From Sketch to Heirloom: Our Custom Jewellery Design Process',
   'A behind-the-scenes look at how we turn an idea into a finished piece of jewellery.',
   'Every custom commission begins with the stone...',
   (select id from public.blog_categories where slug = 'jewellery'),
   true, '2023-03-22'::timestamptz);


-- ════════════════════════════════════════════════════════════
-- VIEWS (convenience queries for the frontend API)
-- ════════════════════════════════════════════════════════════

-- Published gems with image
create or replace view public.v_gems_published as
select
  id, slug, name, category, description, long_description,
  carat, origin, colour, cut, clarity, is_certified, is_sold,
  price_visible, price_usd, image_url, is_featured, sort_order,
  created_at
from public.gems
where is_published = true
order by sort_order;

-- Published blog posts with category name
create or replace view public.v_blog_published as
select
  p.id, p.slug, p.title, p.excerpt, p.content,
  c.name as category, c.slug as category_slug,
  p.cover_image_url, p.author_id,
  p.published_at, p.meta_title, p.meta_description,
  p.created_at
from public.blog_posts p
left join public.blog_categories c on c.id = p.category_id
where p.is_published = true
order by p.published_at desc;

-- Active hero slides
create or replace view public.v_hero_active as
select *
from public.hero_slides
where is_active = true
order by sort_order;

-- Unread contact submissions count (for admin dashboard)
create or replace view public.v_contact_unread_count as
select count(*) as unread
from public.contact_submissions
where status = 'new';


-- ════════════════════════════════════════════════════════════
-- STORAGE BUCKET (for Cloudinary webhook receipts, optional)
-- ════════════════════════════════════════════════════════════
-- Note: images are stored in Cloudinary, NOT Supabase Storage.
-- If you later need Supabase Storage for PDFs / certificates:
--
--   insert into storage.buckets (id, name, public)
--   values ('documents', 'documents', false);
--
-- ════════════════════════════════════════════════════════════