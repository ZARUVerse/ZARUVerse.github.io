CREATE TABLE kyc_applications (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(140) NOT NULL,
  email VARCHAR(140) NOT NULL UNIQUE,
  phone VARCHAR(60) NOT NULL,
  country VARCHAR(80) NOT NULL,
  nationality VARCHAR(80) NOT NULL,
  account_type VARCHAR(20) NOT NULL,
  doc_front_url TEXT NOT NULL,
  poa_url TEXT NOT NULL,
  selfie_url TEXT NOT NULL,
  corp_url TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'Pending',
  reason TEXT,
  attestation_hash CHAR(66),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_kyc_status ON kyc_applications(status);
CREATE INDEX idx_kyc_email ON kyc_applications(email);
