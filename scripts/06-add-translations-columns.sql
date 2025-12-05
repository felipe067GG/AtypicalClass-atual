-- Add translation columns to questions and content tables
ALTER TABLE questions
ADD COLUMN IF NOT EXISTS question_text_en TEXT,
ADD COLUMN IF NOT EXISTS question_text_es TEXT,
ADD COLUMN IF NOT EXISTS explanation_en TEXT,
ADD COLUMN IF NOT EXISTS explanation_es TEXT;

ALTER TABLE content
ADD COLUMN IF NOT EXISTS content_en TEXT,
ADD COLUMN IF NOT EXISTS content_es TEXT;

ALTER TABLE posts
ADD COLUMN IF NOT EXISTS content_en TEXT,
ADD COLUMN IF NOT EXISTS content_es TEXT;

-- Add language preference column to teachers
ALTER TABLE teachers
ADD COLUMN IF NOT EXISTS preferred_language VARCHAR(2) DEFAULT 'pt';
