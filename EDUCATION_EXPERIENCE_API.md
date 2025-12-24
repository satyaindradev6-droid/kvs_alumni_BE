# Alumni Education & Experience API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## EDUCATION ENDPOINTS

### 1. Create Education
**POST** `/educations`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "grade": "Bachelor's",
  "program": "Computer Science",
  "institute": "Delhi University",
  "location": "New Delhi",
  "start_date": "2015-07-01",
  "end_date": "2019-06-30"
}
```

**Response (201):**
```json
{
  "message": "Education created successfully",
  "data": {
    "id": 1,
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "alumni_id": "S1",
    "grade": "Bachelor's",
    "program": "Computer Science",
    "institute": "Delhi University",
    "location": "New Delhi",
    "start_date": "2015-07-01T00:00:00.000Z",
    "end_date": "2019-06-30T00:00:00.000Z",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z",
    "is_deleted": 0
  }
}
```

---

### 2. Get My Educations
**GET** `/educations/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "count": 2,
  "data": [
    {
      "id": 2,
      "uuid": "550e8400-e29b-41d4-a716-446655440001",
      "alumni_id": "S1",
      "grade": "Master's",
      "program": "Data Science",
      "institute": "IIT Delhi",
      "location": "New Delhi",
      "start_date": "2019-08-01T00:00:00.000Z",
      "end_date": "2021-06-30T00:00:00.000Z",
      "created_at": "2024-01-15T10:35:00.000Z",
      "updated_at": "2024-01-15T10:35:00.000Z",
      "is_deleted": 0
    },
    {
      "id": 1,
      "uuid": "550e8400-e29b-41d4-a716-446655440000",
      "alumni_id": "S1",
      "grade": "Bachelor's",
      "program": "Computer Science",
      "institute": "Delhi University",
      "location": "New Delhi",
      "start_date": "2015-07-01T00:00:00.000Z",
      "end_date": "2019-06-30T00:00:00.000Z",
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-15T10:30:00.000Z",
      "is_deleted": 0
    }
  ]
}
```

---

### 3. Get Educations by Alumni ID
**GET** `/educations/alumni/:alumni_id`

**Example:** `/educations/alumni/S1`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "count": 2,
  "data": [...]
}
```

---

### 4. Get Single Education
**GET** `/educations/:id`

**Example:** `/educations/1`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "data": {
    "id": 1,
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "alumni_id": "S1",
    "grade": "Bachelor's",
    "program": "Computer Science",
    "institute": "Delhi University",
    "location": "New Delhi",
    "start_date": "2015-07-01T00:00:00.000Z",
    "end_date": "2019-06-30T00:00:00.000Z",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z",
    "is_deleted": 0
  }
}
```

---

### 5. Update Education
**PATCH** `/educations/:id`

**Example:** `/educations/1`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body (all fields optional):**
```json
{
  "grade": "Bachelor of Technology",
  "program": "Computer Science & Engineering",
  "institute": "University of Delhi",
  "location": "Delhi, India",
  "end_date": "2019-07-15"
}
```

**Response (200):**
```json
{
  "message": "Education updated successfully",
  "data": {
    "id": 1,
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "alumni_id": "S1",
    "grade": "Bachelor of Technology",
    "program": "Computer Science & Engineering",
    "institute": "University of Delhi",
    "location": "Delhi, India",
    "start_date": "2015-07-01T00:00:00.000Z",
    "end_date": "2019-07-15T00:00:00.000Z",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T11:00:00.000Z",
    "is_deleted": 0
  }
}
```

---

### 6. Delete Education
**DELETE** `/educations/:id`

**Example:** `/educations/1`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Education deleted successfully"
}
```

---

## EXPERIENCE ENDPOINTS

### 1. Create Experience
**POST** `/experiences`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "designation": "Software Engineer",
  "company_name": "Tech Solutions Pvt Ltd",
  "location": "Bangalore",
  "start_date": "2019-07-01",
  "end_date": "2021-12-31"
}
```

**Response (201):**
```json
{
  "message": "Experience created successfully",
  "data": {
    "id": 1,
    "uuid": "650e8400-e29b-41d4-a716-446655440000",
    "alumni_id": "S1",
    "designation": "Software Engineer",
    "company_name": "Tech Solutions Pvt Ltd",
    "location": "Bangalore",
    "start_date": "2019-07-01T00:00:00.000Z",
    "end_date": "2021-12-31T00:00:00.000Z",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z",
    "is_deleted": 0
  }
}
```

---

### 2. Get My Experiences
**GET** `/experiences/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "count": 2,
  "data": [
    {
      "id": 2,
      "uuid": "650e8400-e29b-41d4-a716-446655440001",
      "alumni_id": "S1",
      "designation": "Senior Software Engineer",
      "company_name": "Global Tech Inc",
      "location": "Mumbai",
      "start_date": "2022-01-01T00:00:00.000Z",
      "end_date": null,
      "created_at": "2024-01-15T10:35:00.000Z",
      "updated_at": "2024-01-15T10:35:00.000Z",
      "is_deleted": 0
    },
    {
      "id": 1,
      "uuid": "650e8400-e29b-41d4-a716-446655440000",
      "alumni_id": "S1",
      "designation": "Software Engineer",
      "company_name": "Tech Solutions Pvt Ltd",
      "location": "Bangalore",
      "start_date": "2019-07-01T00:00:00.000Z",
      "end_date": "2021-12-31T00:00:00.000Z",
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-15T10:30:00.000Z",
      "is_deleted": 0
    }
  ]
}
```

---

### 3. Get Experiences by Alumni ID
**GET** `/experiences/alumni/:alumni_id`

**Example:** `/experiences/alumni/S1`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "count": 2,
  "data": [...]
}
```

---

### 4. Get Single Experience
**GET** `/experiences/:id`

**Example:** `/experiences/1`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "data": {
    "id": 1,
    "uuid": "650e8400-e29b-41d4-a716-446655440000",
    "alumni_id": "S1",
    "designation": "Software Engineer",
    "company_name": "Tech Solutions Pvt Ltd",
    "location": "Bangalore",
    "start_date": "2019-07-01T00:00:00.000Z",
    "end_date": "2021-12-31T00:00:00.000Z",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z",
    "is_deleted": 0
  }
}
```

---

### 5. Update Experience
**PATCH** `/experiences/:id`

**Example:** `/experiences/1`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body (all fields optional):**
```json
{
  "designation": "Senior Software Engineer",
  "company_name": "Tech Solutions Private Limited",
  "location": "Bangalore, Karnataka"
}
```

**Response (200):**
```json
{
  "message": "Experience updated successfully",
  "data": {
    "id": 1,
    "uuid": "650e8400-e29b-41d4-a716-446655440000",
    "alumni_id": "S1",
    "designation": "Senior Software Engineer",
    "company_name": "Tech Solutions Private Limited",
    "location": "Bangalore, Karnataka",
    "start_date": "2019-07-01T00:00:00.000Z",
    "end_date": "2021-12-31T00:00:00.000Z",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T11:00:00.000Z",
    "is_deleted": 0
  }
}
```

---

### 6. Delete Experience
**DELETE** `/experiences/:id`

**Example:** `/experiences/1`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Experience deleted successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "institute",
      "message": "String must contain at most 150 character(s)"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "No token provided"
}
```

### 404 Not Found
```json
{
  "error": "Education not found"
}
```

---

## Field Constraints

### Education Fields
- `grade`: max 50 characters (optional)
- `program`: max 100 characters (optional)
- `institute`: max 150 characters (optional)
- `location`: max 100 characters (optional)
- `start_date`: ISO date format (optional)
- `end_date`: ISO date format (optional)

### Experience Fields
- `designation`: max 100 characters (optional)
- `company_name`: max 150 characters (optional)
- `location`: max 100 characters (optional)
- `start_date`: ISO date format (optional)
- `end_date`: ISO date format (optional, null for current position)

---

## Notes

1. All dates should be in ISO format: `YYYY-MM-DD`
2. `end_date` can be `null` for ongoing education/experience
3. Records are soft-deleted (is_deleted flag)
4. Results are ordered by start_date in descending order
5. Users can only access/modify their own records
6. Alumni ID is automatically extracted from JWT token
