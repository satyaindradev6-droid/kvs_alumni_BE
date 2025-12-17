# Frontend Migration Guide: Alumni Employee Field Changes

## Overview
The backend `alumni_employee` model has been updated to use snake_case field names instead of camelCase for consistency. This affects all API responses and requires updates to frontend code.

## Critical Changes

### 1. Primary Key Change
- **OLD**: `alumniid` (number) - e.g., `1, 2, 3`
- **NEW**: `alumni_id` (string) - e.g., `"E1", "E2", "E3"`

⚠️ **IMPORTANT**: The ID format has changed from numeric to string with "E" prefix!

## Field Name Mapping

### Required Fields
| Old Field Name (camelCase) | New Field Name (snake_case) | Type | Notes |
|---------------------------|----------------------------|------|-------|
| `alumniid` | `alumni_id` | string | **ID format changed!** Now "E1", "E2", etc. |
| `empcode` | `emp_code` | string | Employee code |
| `mobileno` | `mobile_no` | string | 10-digit mobile number |
| `emailid` | `email_id` | string | Email address |
| `fathername` | `father_name` | string | Father's name |
| `tcyear` | `tc_year` | string | Retirement year |

### Optional Fields
| Old Field Name (camelCase) | New Field Name (snake_case) | Type | Notes |
|---------------------------|----------------------------|------|-------|
| `publicurl` | `public_url` | string | Public profile URL |
| `profileimage` | `profile_image` | string | Profile image filename |
| `relationshipstatus` | `relationship_status` | number | Relationship status ID |
| `weddinganniversary` | `wedding_anniversary` | date | Wedding anniversary date |
| `aboutme` | `about_me` | string | About me text |
| `tcclass` | `tc_class` | string | Class information |
| `stateid` | `state_id` | number | State ID |
| `organizerid` | `organizer_id` | number | Organizer ID |
| `userid` | `user_id` | string | User ID |
| `isdeleted` | `is_deleted` | number | Soft delete flag (0/1) |
| `createdby` | `created_by` | number | Created by user ID |
| `createdat` | `created_at` | datetime | Creation timestamp |
| `updatedat` | `updated_at` | datetime | Update timestamp |

### Removed Fields
- `alumni_code` - This field has been completely removed

## API Response Changes

### Employee Registration Response
```javascript
// OLD Response Format
{
  "message": "Alumni employee registered successfully",
  "data": {
    "alumniid": 1,
    "empcode": "EMP001",
    "emailid": "john@example.com",
    "mobileno": "9876543210",
    "fathername": "John Sr.",
    "profileimage": "profile.jpg",
    "tcyear": "2023",
    "createdat": "2024-01-01T00:00:00.000Z"
  }
}

// NEW Response Format
{
  "message": "Alumni employee registered successfully",
  "data": {
    "alumni_id": "E1",
    "emp_code": "EMP001",
    "email_id": "john@example.com",
    "mobile_no": "9876543210",
    "father_name": "John Sr.",
    "profile_image": "profile.jpg",
    "tc_year": "2023",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### Login Response
```javascript
// OLD Response Format
{
  "message": "Login successful",
  "type": "employee",
  "alumni": {
    "alumniid": 1,
    "emailid": "john@example.com",
    "empcode": "EMP001"
  },
  "token": "jwt_token_here"
}

// NEW Response Format
{
  "message": "Login successful",
  "type": "employee",
  "alumni": {
    "alumni_id": "E1",
    "email_id": "john@example.com",
    "emp_code": "EMP001"
  },
  "token": "jwt_token_here"
}
```

### Get Alumni by ID
```javascript
// OLD URL: GET /api/alumni/1
// NEW URL: GET /api/alumni/E1

// OLD Response
{
  "type": "employee",
  "alumni": {
    "alumniid": 1,
    "emailid": "john@example.com"
  }
}

// NEW Response
{
  "type": "employee",
  "alumni": {
    "alumni_id": "E1",
    "email_id": "john@example.com"
  }
}
```

## Frontend Code Updates Required

### 1. Form Field Names
Update all form field names in registration/edit forms:

```javascript
// OLD form fields
const formData = {
  empcode: "EMP001",
  emailid: "john@example.com",
  mobileno: "9876543210",
  fathername: "John Sr.",
  tcyear: "2023"
};

// NEW form fields
const formData = {
  emp_code: "EMP001",
  email_id: "john@example.com",
  mobile_no: "9876543210",
  father_name: "John Sr.",
  tc_year: "2023"
};
```

### 2. API Response Handling
Update all code that processes API responses:

```javascript
// OLD response handling
const handleEmployeeData = (response) => {
  const employee = response.data;
  setEmployeeId(employee.alumniid);
  setEmail(employee.emailid);
  setMobile(employee.mobileno);
  setFatherName(employee.fathername);
};

// NEW response handling
const handleEmployeeData = (response) => {
  const employee = response.data;
  setEmployeeId(employee.alumni_id);  // Note: now string format "E1"
  setEmail(employee.email_id);
  setMobile(employee.mobile_no);
  setFatherName(employee.father_name);
};
```

### 3. ID References
Update all ID references and URL construction:

```javascript
// OLD ID usage
const employeeId = 1; // numeric
const apiUrl = `/api/alumni/${employeeId}`;

// NEW ID usage
const employeeId = "E1"; // string with prefix
const apiUrl = `/api/alumni/${employeeId}`;
```

### 4. Local Storage/State Management
Update stored data structures:

```javascript
// OLD localStorage data
localStorage.setItem('employee', JSON.stringify({
  alumniid: 1,
  emailid: "john@example.com"
}));

// NEW localStorage data
localStorage.setItem('employee', JSON.stringify({
  alumni_id: "E1",
  email_id: "john@example.com"
}));
```

### 5. Table/List Display
Update table headers and data mapping:

```javascript
// OLD table columns
const columns = [
  { key: 'alumniid', title: 'ID' },
  { key: 'empcode', title: 'Employee Code' },
  { key: 'emailid', title: 'Email' },
  { key: 'mobileno', title: 'Mobile' }
];

// NEW table columns
const columns = [
  { key: 'alumni_id', title: 'ID' },
  { key: 'emp_code', title: 'Employee Code' },
  { key: 'email_id', title: 'Email' },
  { key: 'mobile_no', title: 'Mobile' }
];
```

## Validation Updates

### Form Validation
Update validation rules to use new field names:

```javascript
// OLD validation schema
const validationSchema = {
  empcode: { required: true, maxLength: 25 },
  emailid: { required: true, email: true, maxLength: 60 },
  mobileno: { required: true, length: 10 }
};

// NEW validation schema
const validationSchema = {
  emp_code: { required: true, maxLength: 25 },
  email_id: { required: true, email: true, maxLength: 60 },
  mobile_no: { required: true, length: 10 }
};
```

## Testing Checklist

### ✅ Registration Flow
- [ ] Employee registration form uses new field names
- [ ] Form validation works with new field names
- [ ] Success response displays correct data
- [ ] Profile image upload works

### ✅ Authentication Flow
- [ ] Login form works with new field names
- [ ] JWT token contains correct user data
- [ ] User session stores correct field names

### ✅ Profile Management
- [ ] Profile display shows correct field names
- [ ] Profile editing uses new field names
- [ ] Profile image display works

### ✅ Employee Listing
- [ ] Employee list displays correct data
- [ ] Search/filter works with new field names
- [ ] Pagination works with new ID format

### ✅ Employee Details
- [ ] Individual employee pages work with new ID format (E1, E2, etc.)
- [ ] Employee details display correctly
- [ ] Edit employee functionality works

## Backward Compatibility

The backend validation layer supports both old and new field names during the transition period. However, **API responses will only return the new snake_case field names**.

## Migration Timeline

1. **Phase 1**: Update frontend code to handle new field names
2. **Phase 2**: Test all functionality with new API responses
3. **Phase 3**: Remove any old field name references
4. **Phase 4**: Update documentation and type definitions

## Support

If you encounter any issues during migration:
1. Check the field mapping table above
2. Verify API response format matches expectations
3. Test with new ID format (string "E1" instead of number 1)
4. Contact backend team for any API-related issues

---

**Note**: The `alumni_students` table remains unchanged and continues to use snake_case field names as before.