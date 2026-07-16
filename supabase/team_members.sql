-- Team members seed
-- Uses the current people table schema. Run in Supabase SQL Editor to populate
-- editable CMS records. Existing records are updated by name; missing records
-- are inserted.

CREATE TEMP TABLE seed_team_members (
  name text,
  role_title text,
  biography text,
  display_order integer
) ON COMMIT DROP;

INSERT INTO seed_team_members (name, role_title, biography, display_order) VALUES
  ('Gokhan Dikmener', 'Chief Technology Advisor', 'Coordination Team', 1),
  ('Dina Akylbekova', 'Programme Specialist', 'Coordination Team', 2),
  ('Cansu Ozgur', 'Programme Analyst', 'Coordination Team', 3),
  ('Luka Ozay', 'Research Intern', 'Research & Advisory Team', 4),
  ('Ihsan Bilgin', 'Research Intern', 'Research & Advisory Team', 5),
  ('Alper Dincer', 'GIS Analyst', 'GIS & GeoAI Team', 6),
  ('Salsabila Prasetya', 'GIS Analyst', 'GIS & GeoAI Team', 7),
  ('Aykut Sevim', 'Software Development Specialist', 'Software Development Team', 8),
  ('Jackson Onyango', 'Full Stack Developer', 'Software Development Team', 9),
  ('Josue Ushindi', 'Full Stack Developer', 'Software Development Team', 10),
  ('Muhammed Suleman', 'Data Scientist Fellow', 'NLP/LLM Team', 11),
  ('Mert Atay', 'Data Science Analyst', 'NLP/LLM Team', 12),
  ('Cristovao Cacombe', 'Data Science Analyst', 'NLP/LLM Team', 13),
  ('Ipek Beril Benli', 'Programme Analyst', 'Training Team', 14),
  ('Alamou Shola Mouhsine Daouda', 'Data Science Analyst', 'Training Team', 15),
  ('Eda Nur Saruhan', 'Data Science Analyst', 'Training Team', 16);

UPDATE people
SET
  role_title = seed_team_members.role_title,
  biography = seed_team_members.biography,
  group_type = 'team',
  display_order = seed_team_members.display_order,
  status = 'published',
  published_at = COALESCE(people.published_at, now()),
  updated_at = now()
FROM seed_team_members
WHERE people.name = seed_team_members.name;

INSERT INTO people (
  name,
  role_title,
  photo_url,
  group_type,
  biography,
  display_order,
  status,
  published_at
)
SELECT
  seed_team_members.name,
  seed_team_members.role_title,
  null,
  'team',
  seed_team_members.biography,
  seed_team_members.display_order,
  'published',
  now()
FROM seed_team_members
WHERE NOT EXISTS (
  SELECT 1
  FROM people
  WHERE people.name = seed_team_members.name
);
