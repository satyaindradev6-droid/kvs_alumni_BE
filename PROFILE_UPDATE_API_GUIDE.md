# Profile Update API Guide

## Student Profile Update

### Endpoint
```
PUT http://localhost:5000/api/alumni/student/profile/{alumni_id}
```

### Headers
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

### Example Request
```
PUT http://localhost:5000/api/alumni/student/profile/S1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

### Complete Request Body (All Fields Optional)
```json
{
  "public_url": "john-doe-updated",
  "public_display": "true",
  "admission_no": "ADM2024001",
  "name": "John Doe Updated",
  "mobile_no": "9876543211",
  "email_id": "john.updated@example.com",
  "gender": "M",
  "dob": "1995-01-15",
  "relationship_status": "Married",
  "wedding_anniversary": "2020-12-25",
  "add1": "House No. 123, Street Name",
  "add2": "Locality/Area Name",
  "add3": "City Name",
  "add4": "State Name - 123456",
  "role": "Alumni",
  "father_name": "John Sr. Updated",
  "about_me": "I am a software engineer with 5+ years of experience in web development. Passionate about technology and education.",
  "experties": "Full Stack Development, React, Node.js, Python, Machine Learning",
  "facebook": "https://facebook.com/johndoe.updated",
  "twitter": "https://twitter.com/johndoe_updated",
  "linkedin": "https://linkedin.com/in/johndoe-updated",
  "whatsapp": "9876543211",
  "blog": "https://johndoe-tech.blog",
  "tc_year": 2021,
  "tc_class": "12A",
  "contribution": "Mentoring junior students, organizing coding workshops, contributing to open source projects",
  "state_id": 2,
  "ro_id": 1,
  "school_id": 5,
  "user_id": 123,
  "note": "Active alumni member, regularly participates in school events",
  "status": "active"
}
```

### Minimal Request Body (Only Required Updates)
```json
{
  "name": "John Doe Updated",
  "mobile_no": "9876543211",
  "email_id": "john.new@example.com"
}
```

### Success Response
```json
{
  "message": "Student profile updated successfully",
  "type": "student",
  "alumni": {
    "alumni_id": "S1",
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "public_url": "john-doe-updated",
    "public_display": "true",
    "admission_no": "ADM2024001",
    "name": "John Doe Updated",
    "mobile_no": "9876543211",
    "email_id": "john.updated@example.com",
    "profile_image": "/uploads/profile.jpg",
    "gender": "M",
    "dob": "1995-01-15T00:00:00.000Z",
    "relationship_status": "Married",
    "wedding_anniversary": "2020-12-25T00:00:00.000Z",
    "add1": "House No. 123, Street Name",
    "add2": "Locality/Area Name",
    "add3": "City Name",
    "add4": "State Name - 123456",
    "role": "Alumni",
    "father_name": "John Sr. Updated",
    "about_me": "I am a software engineer with 5+ years of experience...",
    "experties": "Full Stack Development, React, Node.js, Python...",
    "facebook": "https://facebook.com/johndoe.updated",
    "twitter": "https://twitter.com/johndoe_updated",
    "linkedin": "https://linkedin.com/in/johndoe-updated",
    "whatsapp": "9876543211",
    "blog": "https://johndoe-tech.blog",
    "tc_year": 2021,
    "tc_class": "12A",
    "contribution": "Mentoring junior students, organizing coding workshops...",
    "state_id": 2,
    "ro_id": 1,
    "school_id": 5,
    "user_id": 123,
    "note": "Active alumni member, regularly participates in school events",
    "status": "active",
    "is_deleted": "false",
    "created_by": 1,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-02T10:30:00.000Z"
  }
}
```

---

## Employee Profile Update

### Endpoint
```
PUT http://localhost:5000/api/alumni/employee/profile/{alumni_id}
```

### Headers
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

### Example Request
```
PUT http://localhost:5000/api/alumni/employee/profile/E1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

### Complete Request Body (All Fields Optional)
```json
{
  "public_url": "jane-smith-updated",
  "emp_code": "EMP2024001",
  "name": "Jane Smith Updated",
  "mobile_no": "9876543211",
  "email_id": "jane.updated@kvs.gov.in",
  "password": "newSecurePassword123!",
  "gender": "F",
  "dob": "1980-01-15",
  "relationship_status": 2,
  "wedding_anniversary": "2005-06-20",
  "add1": "Quarters No. 45, KVS Campus",
  "add2": "Sector 12, Government Colony",
  "add3": "New Delhi",
  "add4": "Delhi - 110001",
  "father_name": "Jane Sr. Updated",
  "about_me": "Dedicated educator with 25+ years of experience in KVS. Specialized in Mathematics and Computer Science education. Passionate about innovative teaching methods.",
  "facebook": "https://facebook.com/janesmith.educator",
  "twitter": "https://twitter.com/janesmith_kvs",
  "linkedin": "https://linkedin.com/in/janesmith-educator",
  "whatsapp": "9876543211",
  "blog": "https://janesmith-education.blog",
  "tc_year": "2024",
  "tc_class": "Principal",
  "contribution": "Led digital transformation initiatives, mentored 100+ teachers, implemented innovative STEM programs, organized national level competitions",
  "state_id": 7,
  "organization": "KVS",
  "organizer_id": 5,
  "user_id": "KVSEMP001",
  "note": "Retired as Principal, currently working as educational consultant. Available for mentoring and training programs."
}
```

### Minimal Request Body (Only Required Updates)
```json
{
  "name": "Jane Smith Updated",
  "mobile_no": "9876543211",
  "email_id": "jane.new@kvs.gov.in",
  "emp_code": "EMP2024002"
}
```

### Success Response
```json
{
  "message": "Employee profile updated successfully",
  "type": "employee",
  "alumni": {
    "alumni_id": "E1",
    "uuid": "123e4567-e89b-12d3-a456-426614174001",
    "public_url": "jane-smith-updated",
    "emp_code": "EMP2024001",
    "name": "Jane Smith Updated",
    "mobile_no": "9876543211",
    "email_id": "jane.updated@kvs.gov.in",
    "profile_image": "profile-jane.jpg",
    "gender": "F",
    "dob": "1980-01-15T00:00:00.000Z",
    "relationship_status": 2,
    "wedding_anniversary": "2005-06-20T00:00:00.000Z",
    "add1": "Quarters No. 45, KVS Campus",
    "add2": "Sector 12, Government Colony",
    "add3": "New Delhi",
    "add4": "Delhi - 110001",
    "role": 2,
    "father_name": "Jane Sr. Updated",
    "about_me": "Dedicated educator with 25+ years of experience...",
    "facebook": "https://facebook.com/janesmith.educator",
    "twitter": "https://twitter.com/janesmith_kvs",
    "linkedin": "https://linkedin.com/in/janesmith-educator",
    "whatsapp": "9876543211",
    "blog": "https://janesmith-education.blog",
    "tc_year": "2024",
    "tc_class": "Principal",
    "contribution": "Led digital transformation initiatives...",
    "state_id": 7,
    "organization": "KVS",
    "organizer_id": 5,
    "user_id": "KVSEMP001",
    "note": "Retired as Principal, currently working as educational consultant...",
    "status": 1,
    "is_deleted": 0,
    "created_by": 0,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-02T10:30:00.000Z"
  }
}
```

---

## Field Validation Rules

### Student Fields
- **name**: Minimum 2 characters
- **email_id**: Valid email format or empty string
- **mobile_no**: String (typically 10 digits)
- **tc_year**: Number (graduation year)
- **tc_class**: String (class/section)
- **state_id**: Number (state ID)
- **school_id**: Number (school ID)
- **ro_id**: Number (regional office ID)
- **user_id**: Number (user ID)

### Employee Fields
- **name**: Minimum 2 characters
- **email_id**: Valid email format or empty string
- **mobile_no**: String (typically 10 digits)
- **emp_code**: String (employee code)
- **password**: Minimum 6 characters (if provided)
- **tc_year**: String (retirement year)
- **tc_class**: String (designation/position)
- **state_id**: Number (state ID)
- **organizer_id**: Number (organizer ID)
- **user_id**: String (user ID)
- **organization**: String, max 5 characters
- **relationship_status**: Number (1=Single, 2=Married, etc.)

---

## Error Responses

### Validation Error
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email_id",
      "message": "Invalid email"
    },
    {
      "field": "name",
      "message": "String must contain at least 2 character(s)"
    }
  ]
}
```

### Not Found Error
```json
{
  "error": "Student not found",
  "message": "No student found with alumni_id: S999"
}
```

### Authentication Error
```json
{
  "error": "Authentication required"
}
```

---

## Quick Test Examples

### Update Student Name and Mobile
```bash
PUT http://localhost:5000/api/alumni/student/profile/S1
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Student Name",
  "mobile_no": "9999888877"
}
```

### Update Employee with New Email and Code
```bash
PUT http://localhost:5000/api/alumni/employee/profile/E1
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Employee Name",
  "mobile_no": "9999888877",
  "email_id": "updated.employee@kvs.gov.in",
  "emp_code": "NEWCODE123"
}
```

### Update Only About Me Section
```bash
PUT http://localhost:5000/api/alumni/student/profile/S1
Authorization: Bearer <token>
Content-Type: application/json

{
  "about_me": "I am a passionate software developer with expertise in modern web technologies. Currently working as a full-stack developer and contributing to open source projects."
}
```

---

## Important Notes

1. **All fields are optional** - You can update just the fields you need
2. **alumni_id in URL** - Use the actual alumni_id (S1, S2, E1, E2, etc.)
3. **Authentication required** - Valid JWT token must be provided
4. **Field format matters** - Follow the validation rules for each field
5. **Date format** - Use YYYY-MM-DD format for dates
6. **Empty strings allowed** - For email_id, you can pass empty string if needed