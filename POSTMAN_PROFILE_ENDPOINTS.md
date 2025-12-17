# Postman Collection: Profile Management Endpoints

## Authentication
All profile endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 1. Student Profile Endpoints

### 1.1 Get Student Profile
```
Method: GET
URL: {{base_url}}/api/alumni/student/profile/me
Headers:
  Authorization: Bearer <token>
  Content-Type: application/json
```

**Expected Response:**
```json
{
  "type": "student",
  "alumni": {
    "alumni_id": "S1",
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "public_url": "john-doe",
    "public_display": "true",
    "admission_no": "ADM001",
    "name": "John Doe",
    "mobile_no": "9876543210",
    "email_id": "john@example.com",
    "profile_image": "/uploads/profile.jpg",
    "gender": "M",
    "dob": "1995-01-01T00:00:00.000Z",
    "relationship_status": "Single",
    "wedding_anniversary": null,
    "add1": "Address Line 1",
    "add2": "Address Line 2",
    "add3": "Address Line 3",
    "add4": "Address Line 4",
    "role": "Student",
    "father_name": "John Sr.",
    "about_me": "About me description",
    "experties": "Web Development",
    "facebook": "https://facebook.com/johndoe",
    "twitter": "https://twitter.com/johndoe",
    "linkedin": "https://linkedin.com/in/johndoe",
    "whatsapp": "9876543210",
    "blog": "https://johndoe.blog",
    "tc_year": 2020,
    "tc_class": "12A",
    "contribution": "My contributions",
    "state_id": 1,
    "ro_id": 1,
    "school_id": 1,
    "user_id": 1,
    "note": "Additional notes",
    "status": "active",
    "is_deleted": "false",
    "created_by": 1,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### 1.2 Update Student Profile
```
Method: PUT
URL: {{base_url}}/api/alumni/student/profile/me
Headers:
  Authorization: Bearer <token>
  Content-Type: application/json
```

**Request Body (All fields optional):**
```json
{
  "public_url": "john-doe-updated",
  "public_display": "true",
  "admission_no": "ADM001-UPDATED",
  "name": "John Doe Updated",
  "mobile_no": "9876543211",
  "email_id": "john.updated@example.com",
  "gender": "M",
  "dob": "1995-01-15",
  "relationship_status": "Married",
  "wedding_anniversary": "2020-12-25",
  "add1": "Updated Address Line 1",
  "add2": "Updated Address Line 2",
  "add3": "Updated Address Line 3",
  "add4": "Updated Address Line 4",
  "role": "Alumni",
  "father_name": "John Sr. Updated",
  "about_me": "Updated about me description with more details about my background and interests.",
  "experties": "Full Stack Development, React, Node.js",
  "facebook": "https://facebook.com/johndoe.updated",
  "twitter": "https://twitter.com/johndoe_updated",
  "linkedin": "https://linkedin.com/in/johndoe-updated",
  "whatsapp": "9876543211",
  "blog": "https://johndoe-updated.blog",
  "tc_year": 2021,
  "tc_class": "12B",
  "contribution": "Updated contributions - mentoring junior students, organizing tech events",
  "state_id": 2,
  "ro_id": 2,
  "school_id": 2,
  "user_id": 2,
  "note": "Updated additional notes",
  "status": "active"
}
```

**Expected Response:**
```json
{
  "message": "Student profile updated successfully",
  "type": "student",
  "alumni": {
    "alumni_id": "S1",
    "name": "John Doe Updated",
    "email_id": "john.updated@example.com",
    "mobile_no": "9876543211",
    // ... all updated fields
    "updated_at": "2024-01-02T10:30:00.000Z"
  }
}
```

---

## 2. Employee Profile Endpoints

### 2.1 Get Employee Profile
```
Method: GET
URL: {{base_url}}/api/alumni/employee/profile/me
Headers:
  Authorization: Bearer <token>
  Content-Type: application/json
```

**Expected Response:**
```json
{
  "type": "employee",
  "alumni": {
    "alumni_id": "E1",
    "uuid": "123e4567-e89b-12d3-a456-426614174001",
    "public_url": "jane-smith",
    "emp_code": "EMP001",
    "name": "Jane Smith",
    "mobile_no": "9876543210",
    "email_id": "jane@example.com",
    "profile_image": "profile-jane.jpg",
    "gender": "F",
    "dob": "1980-01-01T00:00:00.000Z",
    "relationship_status": 1,
    "wedding_anniversary": "2005-06-15T00:00:00.000Z",
    "add1": "Employee Address 1",
    "add2": "Employee Address 2",
    "add3": "Employee Address 3",
    "add4": "Employee Address 4",
    "role": 2,
    "father_name": "Jane Sr.",
    "about_me": "About me as an employee",
    "facebook": "https://facebook.com/janesmith",
    "twitter": "https://twitter.com/janesmith",
    "linkedin": "https://linkedin.com/in/janesmith",
    "whatsapp": "9876543210",
    "blog": "https://janesmith.blog",
    "tc_year": "2023",
    "tc_class": "Admin",
    "contribution": "My contributions as employee",
    "state_id": 1,
    "organization": "KVS",
    "organizer_id": 1,
    "user_id": "USER001",
    "note": "Employee notes",
    "status": 1,
    "is_deleted": 0,
    "created_by": 0,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2.2 Update Employee Profile
```
Method: PUT
URL: {{base_url}}/api/alumni/employee/profile/me
Headers:
  Authorization: Bearer <token>
  Content-Type: application/json
```

**Request Body (All fields optional):**
```json
{
  "public_url": "jane-smith-updated",
  "emp_code": "EMP001-UPDATED",
  "name": "Jane Smith Updated",
  "mobile_no": "9876543211",
  "email_id": "jane.updated@example.com",
  "password": "newSecurePassword123!",
  "gender": "F",
  "dob": "1980-01-15",
  "relationship_status": 2,
  "wedding_anniversary": "2005-06-20",
  "add1": "Updated Employee Address 1",
  "add2": "Updated Employee Address 2",
  "add3": "Updated Employee Address 3",
  "add4": "Updated Employee Address 4",
  "father_name": "Jane Sr. Updated",
  "about_me": "Updated about me section with detailed information about my career, achievements, and current interests in education and technology.",
  "facebook": "https://facebook.com/janesmith.updated",
  "twitter": "https://twitter.com/janesmith_updated",
  "linkedin": "https://linkedin.com/in/janesmith-updated",
  "whatsapp": "9876543211",
  "blog": "https://janesmith-updated.blog",
  "tc_year": "2024",
  "tc_class": "Senior Admin",
  "contribution": "Updated contributions - led digital transformation initiatives, mentored new employees, implemented new teaching methodologies",
  "state_id": 2,
  "organization": "KVSHQ",
  "organizer_id": 2,
  "user_id": "USER001-UPDATED",
  "note": "Updated employee notes with recent achievements and future goals"
}
```

**Expected Response:**
```json
{
  "message": "Employee profile updated successfully",
  "type": "employee",
  "alumni": {
    "alumni_id": "E1",
    "name": "Jane Smith Updated",
    "email_id": "jane.updated@example.com",
    "mobile_no": "9876543211",
    "emp_code": "EMP001-UPDATED",
    // ... all updated fields
    "updated_at": "2024-01-02T10:30:00.000Z"
  }
}
```

---

## 3. Generic Profile Endpoints (Backward Compatibility)

### 3.1 Get Profile (Auto-detect)
```
Method: GET
URL: {{base_url}}/api/alumni/profile/me
Headers:
  Authorization: Bearer <token>
  Content-Type: application/json
```

**Response:** Same as student or employee response based on user type

### 3.2 Update Profile (Auto-detect)
```
Method: PUT
URL: {{base_url}}/api/alumni/profile/me
Headers:
  Authorization: Bearer <token>
  Content-Type: application/json
```

**Request Body:** Use student or employee request body based on your user type

---

## 4. Sample Minimal Update Requests

### 4.1 Minimal Student Update
```json
{
  "name": "John Updated",
  "mobile_no": "9876543211"
}
```

### 4.2 Minimal Employee Update
```json
{
  "name": "Jane Updated",
  "mobile_no": "9876543211",
  "emp_code": "EMP002"
}
```

---

## 5. Error Responses

### 5.1 Validation Error
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email_id",
      "message": "Valid email is required"
    },
    {
      "field": "mobile_no",
      "message": "Mobile number must be exactly 10 digits"
    }
  ]
}
```

### 5.2 Unauthorized
```json
{
  "error": "Unauthorized access"
}
```

### 5.3 Not Found
```json
{
  "error": "Student not found"
}
```
or
```json
{
  "error": "Employee not found"
}
```

---

## 6. Postman Environment Variables

Set up these variables in your Postman environment:

```
base_url: http://localhost:3000 (or your server URL)
student_token: <JWT token for student user>
employee_token: <JWT token for employee user>
```

---

## 7. Testing Workflow

1. **Login as Student** → Get student token
2. **Test Student Endpoints** using student token
3. **Login as Employee** → Get employee token  
4. **Test Employee Endpoints** using employee token
5. **Test Generic Endpoints** with both token types

---

## 8. Field Validation Rules

### Common Field Limits:
- `name`: Max 30 characters (for employees), Min 2 characters (for students)
- `email_id`: Valid email format, Max 60 characters (employees), Max 255 characters (students)
- `mobile_no`: Exactly 10 digits
- `password`: Min 6 characters (if provided)
- `emp_code`: Max 25 characters (employees only)
- `tc_year`: String for employees, Number for students
- `gender`: Max 2 characters
- `add1`, `add2`, `add3`, `add4`: Max 60 characters (employees), Max 255 characters (students)

### Employee-specific Limits:
- `organization`: Max 5 characters
- `user_id`: Max 30 characters
- `tc_class`: Max 6 characters

Remember to replace `{{base_url}}` with your actual server URL and use valid JWT tokens for authentication!