# Alumni Registration API Documentation

## Base URL
```
http://localhost:5000/api/alumni
```

---

## 1. Alumni Student Registration

Register a former student in the alumni database.

### Endpoint
```
POST /api/alumni/register-student
```

### Request Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "name": "John Doe",
  "father_name": "Robert Doe",
  "mobile_number": "9876543210",
  "email": "john.doe@example.com",
  "state": "Delhi",
  "last_school": "KVS School Name",
  "year_of_issue_tc": 2020,
  "class_studied": "Class 12",
  "admission_no": "KVS12345"
}
```

### Field Descriptions
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Full name of the student (min 2 chars) |
| father_name | string | Yes | Father's name (min 2 chars) |
| mobile_number | string | Yes | Mobile number (10-15 digits) |
| email | string | Yes | Valid email address (must be unique) |
| state | string | Yes | State name (min 2 chars) |
| last_school | string | Yes | Last school attended (min 2 chars) |
| year_of_issue_tc | number | Yes | Year of TC issue (1950 - current year) |
| class_studied | string | Yes | Last class studied |
| admission_no | string | No | Admission number (optional) |

### Success Response (201 Created)
```json
{
  "message": "Alumni student registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "father_name": "Robert Doe",
    "mobile_number": "9876543210",
    "email": "john.doe@example.com",
    "state": "Delhi",
    "last_school": "KVS School Name",
    "year_of_issue_tc": 2020,
    "class_studied": "Class 12",
    "admission_no": "KVS12345",
    "photo_url": null,
    "created_at": "2024-12-02T10:30:00.000Z"
  }
}
```

### Error Responses

**409 Conflict - Email Already Exists**
```json
{
  "error": "Email already registered"
}
```

**400 Bad Request - Validation Error**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

---

## 2. Ex-Employee Registration

Register a retired employee in the alumni database.

### Endpoint
```
POST /api/alumni/register-employee
```

### Request Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "name": "Jane Smith",
  "father_name": "Michael Smith",
  "mobile_number": "9876543211",
  "email": "jane.smith@example.com",
  "employee_code": "EMP001",
  "retirement_year": "2023",
  "retired_from": "Principal",
  "organization": "KVS Regional Office"
}
```

### Field Descriptions
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Full name of the employee (min 2 chars) |
| father_name | string | Yes | Father's name (min 2 chars) |
| mobile_number | string | Yes | Mobile number (10-15 digits) |
| email | string | Yes | Valid email address (must be unique) |
| employee_code | string | Yes | Unique employee code |
| retirement_year | string | Yes | Year of retirement (min 4 chars) |
| retired_from | string | Yes | Position retired from (min 2 chars) |
| organization | string | Yes | Organization name (min 2 chars) |

### Success Response (201 Created)
```json
{
  "message": "Ex-employee registered successfully",
  "data": {
    "id": 1,
    "name": "Jane Smith",
    "father_name": "Michael Smith",
    "mobile_number": "9876543211",
    "email": "jane.smith@example.com",
    "employee_code": "EMP001",
    "retirement_year": "2023",
    "retired_from": "Principal",
    "organization": "KVS Regional Office",
    "photo_url": null,
    "created_at": "2024-12-02T10:30:00.000Z"
  }
}
```

### Error Responses

**409 Conflict - Email Already Exists**
```json
{
  "error": "Email already registered"
}
```

**409 Conflict - Employee Code Already Exists**
```json
{
  "error": "Employee code already exists"
}
```

**400 Bad Request - Validation Error**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "employee_code",
      "message": "Employee code is required"
    }
  ]
}
```

---

## Testing with cURL

### Register Student
```bash
curl -X POST http://localhost:5000/api/alumni/register-student \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "father_name": "Robert Doe",
    "mobile_number": "9876543210",
    "email": "john.doe@example.com",
    "state": "Delhi",
    "last_school": "KVS School Name",
    "year_of_issue_tc": 2020,
    "class_studied": "Class 12",
    "admission_no": "KVS12345"
  }'
```

### Register Employee
```bash
curl -X POST http://localhost:5000/api/alumni/register-employee \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "father_name": "Michael Smith",
    "mobile_number": "9876543211",
    "email": "jane.smith@example.com",
    "employee_code": "EMP001",
    "retirement_year": "2023",
    "retired_from": "Principal",
    "organization": "KVS Regional Office"
  }'
```

---

## Notes

- All endpoints return JSON responses
- Validation is performed using Zod schemas
- Email addresses must be unique across the system
- Employee codes must be unique
- Mobile numbers should be 10-15 digits
- Year of TC issue must be between 1950 and current year
