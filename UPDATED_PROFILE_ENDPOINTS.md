# Updated Profile Endpoints with alumni_id

## New Endpoints Using alumni_id in URL

### Student Profile Endpoints

#### Get Student Profile by alumni_id
```
GET /api/alumni/student/profile/{alumni_id}
Authorization: Bearer <token>
```

**Example:**
```
GET /api/alumni/student/profile/S1
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
    // ... other student fields
  }
}
```

#### Update Student Profile by alumni_id
```
PUT /api/alumni/student/profile/{alumni_id}
Authorization: Bearer <token>
Content-Type: application/json
```

**Example:**
```
PUT /api/alumni/student/profile/S1
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe Updated",
  "mobile_no": "9876543211",
  "email_id": "john.updated@example.com"
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
    "mobile_no": "9876543211",
    // ... updated fields
  }
}
```

### Employee Profile Endpoints

#### Get Employee Profile by alumni_id
```
GET /api/alumni/employee/profile/{alumni_id}
Authorization: Bearer <token>
```

**Example:**
```
GET /api/alumni/employee/profile/E1
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
    // ... other employee fields
  }
}
```

#### Update Employee Profile by alumni_id
```
PUT /api/alumni/employee/profile/{alumni_id}
Authorization: Bearer <token>
Content-Type: application/json
```

**Example:**
```
PUT /api/alumni/employee/profile/E1
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Smith Updated",
  "mobile_no": "9876543211",
  "email_id": "jane.updated@example.com",
  "emp_code": "EMP002"
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
    "mobile_no": "9876543211",
    "emp_code": "EMP002",
    // ... updated fields
  }
}
```

## Complete Endpoint List

### Student Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/alumni/student/profile/me` | Get current user's student profile |
| PUT | `/api/alumni/student/profile/me` | Update current user's student profile |
| GET | `/api/alumni/student/profile/{alumni_id}` | Get student profile by alumni_id |
| PUT | `/api/alumni/student/profile/{alumni_id}` | Update student profile by alumni_id |

### Employee Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/alumni/employee/profile/me` | Get current user's employee profile |
| PUT | `/api/alumni/employee/profile/me` | Update current user's employee profile |
| GET | `/api/alumni/employee/profile/{alumni_id}` | Get employee profile by alumni_id |
| PUT | `/api/alumni/employee/profile/{alumni_id}` | Update employee profile by alumni_id |

## Validation Rules

### alumni_id Format Validation
- **Student alumni_id**: Must start with "S" (e.g., "S1", "S2", "S123")
- **Employee alumni_id**: Must start with "E" (e.g., "E1", "E2", "E123")

### Error Responses

#### Invalid alumni_id Format
```json
{
  "error": "Invalid student alumni_id format. Must start with \"S\""
}
```
or
```json
{
  "error": "Invalid employee alumni_id format. Must start with \"E\""
}
```

#### Not Found
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

## Postman Examples

### Update Student Profile by ID
```
PUT http://localhost:5000/api/alumni/student/profile/S1
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "name": "Updated Student Name",
  "mobile_no": "9876543211",
  "email_id": "updated.student@example.com",
  "tc_year": 2021,
  "tc_class": "12A"
}
```

### Update Employee Profile by ID
```
PUT http://localhost:5000/api/alumni/employee/profile/E1
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "name": "Updated Employee Name",
  "mobile_no": "9876543211",
  "email_id": "updated.employee@example.com",
  "emp_code": "EMP002",
  "tc_year": "2024"
}
```

## Key Features

1. **Direct alumni_id Access**: Use specific alumni_id in URL instead of `/me`
2. **Format Validation**: Validates alumni_id format (S* for students, E* for employees)
3. **Type Safety**: Separate endpoints for students and employees
4. **Backward Compatibility**: `/me` endpoints still available
5. **Debug Logging**: Console logs for troubleshooting

## Usage Notes

- Replace `{alumni_id}` with actual alumni_id (e.g., "S1", "E1")
- Ensure JWT token is valid and included in Authorization header
- Use appropriate endpoint based on user type (student vs employee)
- Check server console for debug logs during testing