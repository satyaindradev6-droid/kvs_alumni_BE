# Alumni Employee Registration API

## Endpoint
`POST /api/alumni/register-employee`

## Description
Register a new alumni employee (ex-employee) with mandatory fields and photo upload.

## Request Type
`multipart/form-data`

## Mandatory Fields

| Field Name | Type | Description | Validation |
|------------|------|-------------|------------|
| name | String | Employee's full name | Required, min 1 character |
| fathername | String | Father's name | Required, min 1 character |
| mobileno | String | Mobile number | Required, exactly 10 digits |
| emailid | String | Email address | Required, valid email format |
| empcode | String | Employee code | Required, min 1 character |
| tcyear | String | Retirement year | Required, min 1 character |
| photo | File | Profile photo | Required, image file (jpeg/jpg/png/gif), max 5MB |

## Optional Fields

| Field Name | Type | Description |
|------------|------|-------------|
| password | String | Account password (min 6 characters) |
| publicurl | String | Public profile URL |
| gender | String | Gender (2 characters) |
| dob | String | Date of birth (YYYY-MM-DD) |
| relationshipstatus | Number | Relationship status code |
| weddinganniversary | String | Wedding anniversary (YYYY-MM-DD) |
| add1 | String | Address line 1 |
| add2 | String | Address line 2 |
| add3 | String | Address line 3 |
| add4 | String | Address line 4 |
| aboutme | String | About me description |
| facebook | String | Facebook profile URL |
| twitter | String | Twitter profile URL |
| linkedin | String | LinkedIn profile URL |
| whatsapp | String | WhatsApp number |
| blog | String | Blog URL |
| tcclass | String | TC class |
| contribution | String | Contribution details |
| stateid | Number | State ID |
| organization | String | Organization name |
| organizerid | Number | Organizer ID |
| userid | String | User ID |
| note | String | Additional notes |

## Example Request (using cURL)

```bash
curl -X POST http://localhost:3000/api/alumni/register-employee \
  -F "name=John Doe" \
  -F "fathername=Robert Doe" \
  -F "mobileno=9876543210" \
  -F "emailid=john.doe@example.com" \
  -F "empcode=EMP12345" \
  -F "tcyear=2023" \
  -F "photo=@/path/to/photo.jpg" \
  -F "password=securepass123" \
  -F "gender=M" \
  -F "organization=KVS"
```

## Example Request (using Postman)

1. Set method to `POST`
2. URL: `http://localhost:3000/api/alumni/register-employee`
3. Go to Body tab
4. Select `form-data`
5. Add the following key-value pairs:
   - name: John Doe
   - fathername: Robert Doe
   - mobileno: 9876543210
   - emailid: john.doe@example.com
   - empcode: EMP12345
   - tcyear: 2023
   - photo: [Select File] (change type to File)
   - (Add optional fields as needed)

## Success Response

**Status Code:** `201 Created`

```json
{
  "message": "Alumni employee registered successfully. Your registration is pending approval.",
  "data": {
    "alumniid": 1,
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "fathername": "Robert Doe",
    "mobileno": "9876543210",
    "emailid": "john.doe@example.com",
    "empcode": "EMP12345",
    "tcyear": "2023",
    "profileimage": "/uploads/alumni_employee/profile-1733654400000-123456789.jpg",
    "role": 2,
    "status": 0,
    "isdeleted": 0,
    "createdat": "2024-12-08T10:00:00.000Z"
  }
}
```

## Error Responses

### Missing Required Field
**Status Code:** `400 Bad Request`
```json
{
  "error": "Validation error details"
}
```

### Email Already Registered
**Status Code:** `409 Conflict`
```json
{
  "error": "Email already registered"
}
```

### Employee Code Already Exists
**Status Code:** `409 Conflict`
```json
{
  "error": "Employee code already exists"
}
```

### No Photo Uploaded
**Status Code:** `400 Bad Request`
```json
{
  "error": "Profile photo is required"
}
```

### Invalid File Type
**Status Code:** `400 Bad Request`
```json
{
  "error": "Only image files are allowed (jpeg, jpg, png, gif)"
}
```

## Notes

- Profile photos are stored in `src/uploads/alumni_employee/` directory
- New registrations have status = 0 (pending approval)
- Employee role is automatically set to 2
- Maximum file size for photo upload is 5MB
- Accepted image formats: JPEG, JPG, PNG, GIF
- All date fields should be in ISO format (YYYY-MM-DD)
