# New Profile Management Endpoints

## Overview
Added separate endpoints for student and employee profile management with proper field validation and backward compatibility.

## New Endpoints

### Student Profile Management

#### Get Student Profile
```
GET /api/alumni/student/profile/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "type": "student",
  "alumni": {
    "alumni_id": "S1",
    "name": "John Doe",
    "email_id": "john@example.com",
    "mobile_no": "9876543210",
    "profile_image": "/uploads/profile.jpg",
    "tc_year": 2020,
    "tc_class": "12A",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update Student Profile
```
PUT /api/alumni/student/profile/me
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "mobile_no": "9876543211",
  "email_id": "john.updated@example.com",
  "gender": "M",
  "dob": "1995-01-01",
  "relationship_status": "Single",
  "wedding_anniversary": "2020-12-25",
  "add1": "Address Line 1",
  "add2": "Address Line 2",
  "add3": "Address Line 3",
  "add4": "Address Line 4",
  "father_name": "John Sr.",
  "about_me": "About me text",
  "facebook": "https://facebook.com/johndoe",
  "twitter": "https://twitter.com/johndoe",
  "linkedin": "https://linkedin.com/in/johndoe",
  "whatsapp": "9876543210",
  "blog": "https://johndoe.blog",
  "tc_year": 2020,
  "tc_class": "12A",
  "contribution": "My contributions",
  "state_id": 1,
  "school_id": 1,
  "note": "Additional notes"
}
```

**Response:**
```json
{
  "message": "Student profile updated successfully",
  "type": "student",
  "alumni": {
    "alumni_id": "S1",
    "name": "John Doe Updated",
    // ... updated fields
  }
}
```

### Employee Profile Management

#### Get Employee Profile
```
GET /api/alumni/employee/profile/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "type": "employee",
  "alumni": {
    "alumni_id": "E1",
    "name": "Jane Smith",
    "email_id": "jane@example.com",
    "mobile_no": "9876543210",
    "emp_code": "EMP001",
    "profile_image": "profile.jpg",
    "tc_year": "2023",
    "father_name": "Jane Sr.",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update Employee Profile
```
PUT /api/alumni/employee/profile/me
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Jane Smith Updated",
  "mobile_no": "9876543211",
  "email_id": "jane.updated@example.com",
  "emp_code": "EMP002",
  "password": "newpassword123",
  "public_url": "jane-smith",
  "gender": "F",
  "dob": "1980-01-01",
  "relationship_status": 1,
  "wedding_anniversary": "2005-06-15",
  "add1": "Employee Address 1",
  "add2": "Employee Address 2",
  "add3": "Employee Address 3",
  "add4": "Employee Address 4",
  "father_name": "Jane Sr. Updated",
  "about_me": "Updated about me",
  "facebook": "https://facebook.com/janesmith",
  "twitter": "https://twitter.com/janesmith",
  "linkedin": "https://linkedin.com/in/janesmith",
  "whatsapp": "9876543211",
  "blog": "https://janesmith.blog",
  "tc_year": "2024",
  "tc_class": "Admin",
  "contribution": "My contributions as employee",
  "state_id": 2,
  "organization": "KVS",
  "organizer_id": 1,
  "user_id": "USER001",
  "note": "Employee notes"
}
```

**Response:**
```json
{
  "message": "Employee profile updated successfully",
  "type": "employee",
  "alumni": {
    "alumni_id": "E1",
    "name": "Jane Smith Updated",
    // ... updated fields
  }
}
```

## Backward Compatibility Endpoints

### Generic Profile Endpoints (Auto-detect user type)

#### Get Profile (Generic)
```
GET /api/alumni/profile/me
Authorization: Bearer <token>
```
- Automatically detects if user is student (S1, S2...) or employee (E1, E2...)
- Returns appropriate profile data with type indicator

#### Update Profile (Generic)
```
PUT /api/alumni/profile/me
Authorization: Bearer <token>
```
- Automatically detects user type and applies appropriate validation
- Uses student schema for S-prefixed IDs, employee schema for E-prefixed IDs

## Field Validation

### Student Update Fields
- All fields from `updateAlumniSchema` (snake_case format)
- Includes student-specific fields like `admission_no`, `public_display`, `experties`

### Employee Update Fields
- All fields from `updateEmployeeSchema` (snake_case format)
- Includes employee-specific fields like `emp_code`, `organization`, `organizer_id`
- Supports both camelCase and snake_case input for backward compatibility

## Key Differences

### Student vs Employee Fields

**Student-only fields:**
- `admission_no`
- `public_display`
- `experties`
- `ro_id`
- `school_id`

**Employee-only fields:**
- `emp_code`
- `organization`
- `organizer_id`

**Common fields:**
- `name`, `email_id`, `mobile_no`
- `gender`, `dob`, `relationship_status`, `wedding_anniversary`
- `add1`, `add2`, `add3`, `add4`
- `father_name`, `about_me`
- `facebook`, `twitter`, `linkedin`, `whatsapp`, `blog`
- `tc_year`, `tc_class`, `contribution`
- `state_id`, `user_id`, `note`

## Error Handling

### Validation Errors
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email_id",
      "message": "Valid email is required"
    }
  ]
}
```

### Not Found Errors
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

## Usage Recommendations

1. **Use specific endpoints** (`/student/profile/me`, `/employee/profile/me`) for new applications
2. **Use generic endpoints** (`/profile/me`) for backward compatibility with existing applications
3. **Always check the `type` field** in responses to handle data appropriately
4. **Use snake_case field names** in all new frontend code
5. **Handle both ID formats** (S1, S2... for students, E1, E2... for employees)

## Migration Notes

- Existing applications using `/profile/me` will continue to work
- New applications should use type-specific endpoints for better clarity
- All responses now include a `type` field indicating "student" or "employee"
- Field names in responses are now consistently snake_case