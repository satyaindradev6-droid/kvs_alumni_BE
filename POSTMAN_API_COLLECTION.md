# Alumni Portal API - Postman Collection

Base URL: `http://localhost:5000`

---

## 1. Register Alumni Student
**POST** `/api/alumni/register-student`

### Headers
```
Content-Type: application/json
```

### Body (JSON)
```json
{
  "admission_no": "KVS2024001",
  "name": "John Doe",
  "mobile_no": "9876543210",
  "email_id": "john.doe@example.com",
  "password": "SecurePass123!",
  "gender": "Male",
  "dob": "2000-05-15",
  "relationship_status": "Single",
  "add1": "123 Main Street",
  "add2": "Apartment 4B",
  "add3": "Downtown",
  "add4": "Near City Mall",
  "father_name": "Robert Doe",
  "about_me": "Passionate software developer and KVS alumni",
  "experties": "Web Development, Cloud Computing",
  "facebook": "https://facebook.com/johndoe",
  "twitter": "https://twitter.com/johndoe",
  "linkedin": "https://linkedin.com/in/johndoe",
  "whatsapp": "9876543210",
  "blog": "https://johndoe.dev",
  "tc_year": 2018,
  "tc_class": "12th",
  "contribution": "Organized alumni meetup 2023",
  "state_id": 1,
  "ro_id": 5,
  "school_id": 101,
  "role": "Software Engineer",
  "public_display": true,
  "status": "active"
}
```

### Minimal Body (Required fields only)
```json
{
  "name": "John Doe",
  "father_name": "Robert Doe",
  "mobile_no": "9876543210",
  "email_id": "john.doe@example.com",
  "state_id": 1,
  "school_id": 101,
  "tc_year": 2018,
  "tc_class": "12th",
  "profile_image": "/uploads/john-doe-photo.jpg"
}
```

### With Password (Recommended)
```json
{
  "name": "John Doe",
  "father_name": "Robert Doe",
  "mobile_no": "9876543210",
  "email_id": "john.doe@example.com",
  "password": "SecurePass123!",
  "state_id": 1,
  "school_id": 101,
  "tc_year": 2018,
  "tc_class": "12th",
  "profile_image": "/uploads/john-doe-photo.jpg"
}
```

**Note:** Upload the photo first using a separate upload endpoint, then use the returned path in registration.

---

## 2. Login
**POST** `/api/alumni/login`

### Headers
```
Content-Type: application/json
```

### Body (JSON)
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

### Response
```json
{
  "message": "Login successful",
  "alumni": {
    "id": 1,
    "email": "john.doe@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 3. Forgot Password
**POST** `/api/alumni/forgot-password`

### Headers
```
Content-Type: application/json
```

### Body (JSON)
```json
{
  "email": "john.doe@example.com"
}
```

### Response
```json
{
  "success": true,
  "message": "If the email is valid, a new password has been sent."
}
```

### Notes
- If the email exists in the system (student or employee), a new strong password will be generated and sent via email
- The response is always the same regardless of whether the email exists (for security)
- The new password is 10-12 characters long with uppercase, lowercase, numbers, and symbols
- Only the hashed password is stored in the database
- The plain password is only sent via email and not stored anywhere

---

## 4. Get All Alumni Students
**GET** `/api/alumni/all`

### Headers
```
Content-Type: application/json
```

### Query Parameters (Optional)
```
?name=John
&tc_year=2018
&tc_class=12th
&state_id=1
&school_id=101
&status=active
&public_display=true
```

### Example URL
```
http://localhost:5000/api/alumni/all?tc_year=2018&state_id=1
```

---

## 5. Get Alumni by ID
**GET** `/api/alumni/:id`

### Headers
```
Content-Type: application/json
```

### Example URL
```
http://localhost:5000/api/alumni/1
```

---

## 6. Get My Profile (Protected)
**GET** `/api/alumni/profile/me`

### Headers
```
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

---

## 7. Update My Profile (Protected)
**PUT** `/api/alumni/profile/me`

### Headers
```
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### Body (JSON) - Update any fields
```json
{
  "name": "John Updated Doe",
  "mobile_no": "9999999999",
  "about_me": "Updated bio information",
  "relationship_status": "Married",
  "wedding_anniversary": "2023-06-15",
  "role": "Senior Software Engineer",
  "linkedin": "https://linkedin.com/in/johnupdated",
  "contribution": "Led alumni tech workshop 2024",
  "public_display": false
}
```

---

## 8. Upload Profile Photo (Protected)
**POST** `/api/alumni/profile/photo`

### Headers
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### Body (form-data)
```
Key: photo
Type: File
Value: [Select your image file]
```

### Note
- Supported formats: JPG, JPEG, PNG, GIF
- Max file size: Check your upload middleware settings

---

## 9. Delete My Account (Protected)
**DELETE** `/api/alumni/profile/me`

### Headers
```
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

---

## Complete Alumni Student Registration Body (All Fields)

```json
{
  "public_url": "john-doe-2024",
  "public_display": true,
  "admission_no": "KVS2024001",
  "name": "John Doe",
  "mobile_no": "9876543210",
  "email_id": "john.doe@example.com",
  "password": "SecurePass123!",
  "gender": "Male",
  "dob": "2000-05-15",
  "relationship_status": "Single",
  "wedding_anniversary": null,
  "add1": "123 Main Street",
  "add2": "Apartment 4B",
  "add3": "Downtown",
  "add4": "Near City Mall",
  "role": "Software Engineer",
  "father_name": "Robert Doe",
  "about_me": "Passionate software developer and KVS alumni. Love coding and teaching.",
  "experties": "Web Development, Cloud Computing, Machine Learning",
  "facebook": "https://facebook.com/johndoe",
  "twitter": "https://twitter.com/johndoe",
  "linkedin": "https://linkedin.com/in/johndoe",
  "whatsapp": "9876543210",
  "blog": "https://johndoe.dev",
  "tc_year": 2018,
  "tc_class": "12th",
  "contribution": "Organized alumni meetup 2023, Mentored 10+ students",
  "state_id": 1,
  "ro_id": 5,
  "school_id": 101,
  "user_id": null,
  "note": "Active member, regular contributor",
  "status": "active",
  "created_by": 1
}
```

---

## Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `alumni_id` | Integer | Auto | Primary key (auto-generated) |
| `uuid` | UUID | Auto | Unique identifier (auto-generated) |
| `public_url` | String | No | Custom URL slug for public profile |
| `public_display` | Boolean | No | Show profile publicly (default: true) |
| `admission_no` | String | No | Student admission number |
| `name` | String | Yes | Full name |
| `mobile_no` | String | No | Mobile number |
| `email_id` | String | No | Email address |
| `password` | String | No | Password (hashed automatically) |
| `profile_image` | String | No | Profile image path |
| `gender` | String | No | Gender (Male/Female/Other) |
| `dob` | Date | No | Date of birth (YYYY-MM-DD) |
| `relationship_status` | String | No | Single/Married/Other |
| `wedding_anniversary` | Date | No | Anniversary date (YYYY-MM-DD) |
| `add1-4` | String | No | Address lines |
| `role` | String | No | Current role/occupation |
| `father_name` | String | No | Father's name |
| `about_me` | Text | No | Bio/description |
| `experties` | Text | No | Areas of expertise |
| `facebook` | String | No | Facebook profile URL |
| `twitter` | String | No | Twitter profile URL |
| `linkedin` | String | No | LinkedIn profile URL |
| `whatsapp` | String | No | WhatsApp number |
| `blog` | String | No | Blog URL |
| `tc_year` | Integer | No | Transfer certificate year |
| `tc_class` | String | No | Class when TC issued |
| `contribution` | Text | No | Contributions to alumni |
| `state_id` | Integer | No | State reference ID |
| `ro_id` | Integer | No | Regional office ID |
| `school_id` | Integer | No | School reference ID |
| `user_id` | Integer | No | User reference ID |
| `note` | Text | No | Additional notes |
| `status` | String | No | active/inactive (default: active) |
| `is_deleted` | Boolean | Auto | Soft delete flag (default: false) |
| `created_by` | Integer | No | Creator user ID |
| `created_at` | Timestamp | Auto | Creation timestamp |
| `updated_at` | Timestamp | Auto | Last update timestamp |

---

## Testing Flow

1. **Register** a new alumni student using endpoint #1
2. **Login** with credentials using endpoint #2 (save the token)
3. **Get Profile** using endpoint #5 (use token from step 2)
4. **Update Profile** using endpoint #6 (use token)
5. **Upload Photo** using endpoint #7 (use token)
6. **Get All Alumni** using endpoint #3 (test filters)
7. **Get by ID** using endpoint #4

---

## Environment Variables

Create these in Postman Environment:

- `base_url`: `http://localhost:5000`
- `token`: (will be set after login)

Then use `{{base_url}}` and `{{token}}` in your requests.
