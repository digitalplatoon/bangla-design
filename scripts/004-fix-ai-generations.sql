-- Fix ai_generations table schema to match application code
-- This migration renames 'type' to 'generation_type' and adds missing columns

-- Add missing columns if they don't exist
ALTER TABLE ai_generations 
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending' NOT NULL;

ALTER TABLE ai_generations 
ADD COLUMN IF NOT EXISTS error_message TEXT;

-- Rename 'type' column to 'generation_type' if it exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'ai_generations' AND column_name = 'type'
  ) THEN
    ALTER TABLE ai_generations RENAME COLUMN type TO generation_type;
  END IF;
END $$;

-- Update result column type from jsonb to text if needed
ALTER TABLE ai_generations 
ALTER COLUMN result TYPE TEXT USING result::TEXT;
