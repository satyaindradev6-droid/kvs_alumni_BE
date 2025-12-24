# Commands to Fix the Education/Experience API

Run these commands in order:

## 1. Apply the SQL migration to add is_deleted field
```bash
psql -U postgres -d kvs_alumni -f add_is_deleted_field.sql
```

OR connect to your database and run:
```sql
ALTER TABLE alumni_educations ADD COLUMN IF NOT EXISTS is_deleted INT DEFAULT 0;
ALTER TABLE alumni_experiences ADD COLUMN IF NOT EXISTS is_deleted INT DEFAULT 0;
ALTER TABLE alumni_educations ADD CONSTRAINT alumni_educations_uuid_unique UNIQUE (uuid);
ALTER TABLE alumni_experiences ADD CONSTRAINT alumni_experiences_uuid_unique UNIQUE (uuid);
```

## 2. Regenerate Prisma Client
```bash
npx prisma generate
```

## 3. Start the server
```bash
npm start
```

## 4. Test in Postman

### First, login to get token:
```
POST http://localhost:5000/api/alumni/login
Body:
{
  "email": "your_email@example.com",
  "password": "your_password",
  "type": "student"
}
```

### Then create education:
```
POST http://localhost:5000/api/educations
Headers:
  Authorization: Bearer <your_token>
  Content-Type: application/json
Body:
{
  "grade": "Bachelor's",
  "program": "Computer Science",
  "institute": "Delhi University",
  "location": "New Delhi",
  "start_date": "2015-07-01",
  "end_date": "2019-06-30"
}
```

## Important Notes:
- Don't run `npx prisma db pull` again - it will overwrite your schema!
- Use `npx prisma db push` if you need to sync schema changes to database
- The tables already exist, we just need to add the is_deleted column
