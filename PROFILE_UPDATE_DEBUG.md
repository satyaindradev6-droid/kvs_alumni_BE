# Profile Update Debug Guide

## Current Implementation Status

### ✅ What's Already Correct:

1. **JWT Token Creation** (Login):
   ```javascript
   // For students
   const token = jwt.sign(
     { id: student.alumni_id, email: student.email_id, type: 'student' },
     process.env.JWT_SECRET
   );
   
   // For employees  
   const token = jwt.sign(
     { id: employee.alumni_id, email: employee.email_id, type: 'employee' },
     process.env.JWT_SECRET
   );
   ```

2. **Route Order** (Fixed):
   - Specific routes (`/student/profile/me`) come before generic routes
   - Dynamic routes (`/:id`) come last

3. **Model Functions**:
   - `updateAlumniStudent(alumni_id, updateData)` - uses correct field
   - `updateAlumniEmployee(alumni_id, updateData)` - uses correct field

4. **Controller Functions**:
   - Uses `req.user.id` which contains the `alumni_id` from JWT

## 🔍 Debug Steps Added:

### 1. Debug Token Endpoint
```
GET /api/alumni/debug/token
Authorization: Bearer <your_token>
```
This will show you what's in your JWT token.

### 2. Console Logging
Added debug logs to:
- Controller functions (shows JWT user data and request body)
- Model functions (shows alumni_id and update data)

## 🧪 Testing Steps:

### Step 1: Check Your Token
```bash
GET /api/alumni/debug/token
Authorization: Bearer <your_token>
```

Expected response:
```json
{
  "user": {
    "id": "S1",  // or "E1" for employee
    "email": "user@example.com",
    "type": "student"  // or "employee"
  },
  "message": "Token parsed successfully"
}
```

### Step 2: Test Student Profile Update
```bash
PUT /api/alumni/student/profile/me
Authorization: Bearer <student_token>
Content-Type: application/json

{
  "name": "Updated Name",
  "mobile_no": "9876543211"
}
```

### Step 3: Test Employee Profile Update
```bash
PUT /api/alumni/employee/profile/me
Authorization: Bearer <employee_token>
Content-Type: application/json

{
  "name": "Updated Name",
  "mobile_no": "9876543211",
  "emp_code": "EMP002"
}
```

## 🔧 What to Check:

1. **Server Console**: Look for debug logs showing:
   - JWT user data
   - Alumni ID being used
   - Update data being processed

2. **Token Format**: Ensure your JWT contains:
   - `id`: Should be "S1", "S2" for students or "E1", "E2" for employees
   - `type`: Should be "student" or "employee"
   - `email`: User's email

3. **Request Headers**: Ensure you have:
   - `Authorization: Bearer <valid_jwt_token>`
   - `Content-Type: application/json`

## 🚨 Common Issues:

1. **Wrong Token**: Using old token format or expired token
2. **Wrong Endpoint**: Using `/profile/me` instead of `/student/profile/me`
3. **Server Not Restarted**: Changes not picked up
4. **Database Connection**: Prisma connection issues

## 📝 Expected Flow:

1. **Login** → Get JWT with `alumni_id` as `id`
2. **Request** → Send to `/student/profile/me` or `/employee/profile/me`
3. **Auth Middleware** → Extract `alumni_id` from JWT as `req.user.id`
4. **Controller** → Call model function with `req.user.id`
5. **Model** → Update record where `alumni_id = req.user.id`
6. **Response** → Return updated profile data

## 🔄 Next Steps:

1. **Restart your server** to pick up all changes
2. **Test the debug endpoint** first to verify token
3. **Check server console** for debug logs
4. **Try profile update** with minimal data

The implementation should work correctly based on `alumni_id` from the JWT token!