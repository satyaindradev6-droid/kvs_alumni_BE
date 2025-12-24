-- Add is_deleted field to alumni_educations and alumni_experiences tables

ALTER TABLE alumni_educations 
ADD COLUMN IF NOT EXISTS is_deleted INT DEFAULT 0;

ALTER TABLE alumni_experiences 
ADD COLUMN IF NOT EXISTS is_deleted INT DEFAULT 0;

-- Make uuid unique
ALTER TABLE alumni_educations 
ADD CONSTRAINT alumni_educations_uuid_unique UNIQUE (uuid);

ALTER TABLE alumni_experiences 
ADD CONSTRAINT alumni_experiences_uuid_unique UNIQUE (uuid);
