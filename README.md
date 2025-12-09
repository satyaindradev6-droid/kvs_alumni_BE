# KVS Alumni Portal - Backend

Complete backend API for KVS Alumni Registration System built with Node.js, Express, and PostgreSQL.

## Tech Stack

- **Node.js** + **Express.js** - Server framework
- **PostgreSQL** - Database with pg client
- **Zod** - Schema validation
- **Multer** - File upload handling
- **JWT** - Authentication
- **bcrypt** - Password hashing

## Project Structure

```
src/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   └── alumniController.js # Business logic
├── models/
│   └── alumniModel.js      # Database queries
├── routes/
│   └── alumniRoutes.js     # API routes
├── validations/
│   └── alumniValidation.js # Zod schemas
├── middlewares/
│   ├── auth.js             # JWT authentication
│   ├── errorHandler.js     # Error handling
│   └── upload.js           # Multer config
├── uploads/                # Profile photos storage
└── server.js               # Entry point
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

Run the schema file to create the alumni table:

```bash
psql -U postgres -d alumni_students -f database/schema.sql
```

Or manually create the table using the SQL in `database/schema.sql`.

### 3. Environment Variables

The `.env` file is already configured with your database credentials:

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=root
DB_NAME=alumni_students
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRES_IN=7d
```

**Important:** Change `JWT_SECRET` in production!

### 4. Start Server

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

Server will run on `http://localhost:5000`

## API Endpoints

### Public Routes

#### Register Alumni
```
POST /api/alumni/register
Content-Type: application/json

{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210",
  "kvs_school": "KVS Delhi",
  "passing_year": 2015,
  "current_occupation": "Software Engineer",
  "current_city": "Bangalore",
  "linkedin_profile": "https://linkedin.com/in/johndoe"
}
```

#### Login
```
POST /api/alumni/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get All Alumni (with optional filters)
```
GET /api/alumni/all
GET /api/alumni/all?kvs_school=Delhi&passing_year=2015&current_city=Bangalore
```

#### Get Alumni by ID
```
GET /api/alumni/:id
```

### Protected Routes (Require JWT Token)

Add header: `Authorization: Bearer <token>`

#### Get Own Profile
```
GET /api/alumni/profile/me
```

#### Update Profile
```
PUT /api/alumni/profile/me
Content-Type: application/json

{
  "full_name": "John Updated",
  "phone": "9876543211",
  "current_occupation": "Senior Engineer",
  "current_city": "Mumbai"
}
```

#### Upload Profile Photo
```
POST /api/alumni/profile/photo
Content-Type: multipart/form-data

photo: <file>
```

#### Delete Account
```
DELETE /api/alumni/profile/me
```

## Features Implemented

✅ Complete MVC architecture
✅ PostgreSQL integration with pg client
✅ Zod validation for all inputs
✅ JWT authentication & authorization
✅ Password hashing with bcrypt
✅ Profile photo upload with Multer
✅ CORS enabled
✅ Error handling middleware
✅ Search/filter alumni by school, year, city
✅ RESTful API design
✅ Environment variables with dotenv

## Testing with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/alumni/register \
  -H "Content-Type: application/json" \
  -d '{"full_name":"Test User","email":"test@test.com","password":"test123","phone":"1234567890","kvs_school":"KVS Test","passing_year":2020}'

# Login
curl -X POST http://localhost:5000/api/alumni/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Get profile (use token from login)
curl http://localhost:5000/api/alumni/profile/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Notes

- Profile photos are stored in `src/uploads/` directory
- Maximum file size: 5MB
- Allowed formats: jpeg, jpg, png, gif
- JWT tokens expire in 7 days (configurable)
- All passwords are hashed before storage
