CREATE TABLE IF NOT EXISTS evaluations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidate_id TEXT NOT NULL UNIQUE,
  score_motivasi INTEGER NOT NULL DEFAULT 0 CHECK(score_motivasi BETWEEN 0 AND 4),
  score_teknologi INTEGER NOT NULL DEFAULT 0 CHECK(score_teknologi BETWEEN 0 AND 2),
  score_kesukaran INTEGER NOT NULL DEFAULT 0 CHECK(score_kesukaran BETWEEN 0 AND 4),
  status TEXT NOT NULL DEFAULT 'Belum Dinilai'
    CHECK(status IN ('Belum Dinilai','Shortlist','Dipilih','Simpanan','Tidak Dipilih')),
  catatan TEXT DEFAULT '',
  evaluator_email TEXT DEFAULT '',
  updated_at TEXT NOT NULL,
  FOREIGN KEY(candidate_id) REFERENCES applications(candidate_id)
);
CREATE INDEX IF NOT EXISTS idx_evaluations_status ON evaluations(status);
CREATE INDEX IF NOT EXISTS idx_evaluations_updated_at ON evaluations(updated_at);
