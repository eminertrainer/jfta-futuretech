CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidate_id TEXT NOT NULL UNIQUE,
  submitted_at TEXT NOT NULL,
  nama TEXT NOT NULL,
  jantina TEXT NOT NULL,
  sekolah TEXT NOT NULL,
  komputer_rumah TEXT,
  telefon_penjaga TEXT,
  word TEXT,
  excel TEXT,
  ai TEXT,
  coding TEXT,
  sebab TEXT NOT NULL,
  teknologi TEXT NOT NULL,
  bila_sukar TEXT NOT NULL,
  persetujuan TEXT NOT NULL,
  ip_hash_hint TEXT,
  user_agent TEXT
);
CREATE INDEX IF NOT EXISTS idx_applications_submitted_at ON applications(submitted_at);
CREATE INDEX IF NOT EXISTS idx_applications_sekolah ON applications(sekolah);
