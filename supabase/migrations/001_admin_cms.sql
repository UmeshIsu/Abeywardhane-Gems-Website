-- =====================================================
-- CMS Admin Panel — Database Migrations
-- Run this AFTER the existing schema.sql
-- =====================================================

-- 1. Events table (separate from exhibitions)
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  event_date DATE,
  venue TEXT,
  country TEXT,
  banner_url TEXT,
  banner_public_id TEXT,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed', 'cancelled')),
  is_published BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Activity logs
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL, -- create, update, delete, login, logout
  entity_type TEXT, -- blog, gem, gallery, etc.
  entity_id UUID,
  entity_title TEXT,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Admin profiles (if not already existing)
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT DEFAULT 'editor' CHECK (role IN ('super_admin', 'admin', 'editor')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Site settings key-value store
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Awards table (if not existing)
CREATE TABLE IF NOT EXISTS awards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  issuer TEXT,
  year TEXT,
  description TEXT,
  image_url TEXT,
  image_public_id TEXT,
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Contact submissions — add status fields if not present
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'status') THEN
    ALTER TABLE contact_submissions ADD COLUMN status TEXT DEFAULT 'new';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'read_at') THEN
    ALTER TABLE contact_submissions ADD COLUMN read_at TIMESTAMPTZ;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contact_submissions' AND column_name = 'replied_at') THEN
    ALTER TABLE contact_submissions ADD COLUMN replied_at TIMESTAMPTZ;
  END IF;
END $$;

-- 7. Blog posts — add SEO columns if not present
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'meta_title') THEN
    ALTER TABLE blog_posts ADD COLUMN meta_title TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'meta_description') THEN
    ALTER TABLE blog_posts ADD COLUMN meta_description TEXT;
  END IF;
END $$;

-- 8. Row Level Security for new tables
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;

-- Public read for published events
CREATE POLICY IF NOT EXISTS "Public read published events"
  ON events FOR SELECT USING (is_published = true);

-- Auth admin full access to events
CREATE POLICY IF NOT EXISTS "Admin full access events"
  ON events FOR ALL USING (auth.role() = 'authenticated');

-- Auth admin read activity logs
CREATE POLICY IF NOT EXISTS "Admin read activity logs"
  ON activity_logs FOR SELECT USING (auth.role() = 'authenticated');

-- Auth admin insert activity logs
CREATE POLICY IF NOT EXISTS "Admin insert activity logs"
  ON activity_logs FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Admin profile: users can read their own
CREATE POLICY IF NOT EXISTS "Users read own profile"
  ON admin_profiles FOR SELECT USING (auth.uid() = id);

-- Admin profile: full access for authenticated
CREATE POLICY IF NOT EXISTS "Admin manage profiles"
  ON admin_profiles FOR ALL USING (auth.role() = 'authenticated');

-- Site settings: public read
CREATE POLICY IF NOT EXISTS "Public read settings"
  ON site_settings FOR SELECT USING (true);

-- Site settings: auth write
CREATE POLICY IF NOT EXISTS "Admin write settings"
  ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- Awards: public read
CREATE POLICY IF NOT EXISTS "Public read awards"
  ON awards FOR SELECT USING (is_published = true);

CREATE POLICY IF NOT EXISTS "Admin full access awards"
  ON awards FOR ALL USING (auth.role() = 'authenticated');

-- 9. Seed default settings
INSERT INTO site_settings (key, value) VALUES
  ('site_name', 'Abeywardhane Gems'),
  ('phone', '+94 (74) 030 4669'),
  ('phone_raw', '+94740304669'),
  ('email', 'info@abeywardhanegems.com'),
  ('whatsapp_number', '94740304669'),
  ('address', '142/A, Gem Land, Ratnapura, Sri Lanka'),
  ('facebook_url', ''),
  ('instagram_url', ''),
  ('meta_description', 'Sri Lanka''s premier destination for certified natural gemstones since 1970.')
ON CONFLICT (key) DO NOTHING;

-- 10. Create a trigger for updated_at on new tables
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_events') THEN
    CREATE TRIGGER set_updated_at_events
      BEFORE UPDATE ON events
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_admin_profiles') THEN
    CREATE TRIGGER set_updated_at_admin_profiles
      BEFORE UPDATE ON admin_profiles
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;
