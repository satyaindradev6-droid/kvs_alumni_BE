-- Fix profile image path for student S19
UPDATE alumni_students 
SET profile_image = '/uploads/alumni_student/profile-1765888306556-522229849.png',
    updated_at = NOW()
WHERE alumni_id = 'S19';

-- Optional: Fix all student profile images that are missing the subfolder
UPDATE alumni_students 
SET profile_image = REPLACE(profile_image, '/uploads/', '/uploads/alumni_student/'),
    updated_at = NOW()
WHERE profile_image LIKE '/uploads/profile-%' 
  AND profile_image NOT LIKE '/uploads/alumni_student/%';
