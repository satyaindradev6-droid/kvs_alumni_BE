# Profile Photo Update Guide

## Overview
Users can update their profile photo after registration using the dedicated endpoint.

## Methods to Update Profile Photo

### Method 1: Dedicated Photo Upload Endpoint (Recommended)

**Endpoint:** `POST /api/alumni/profile/photo`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data
```

**Body (form-data):**
- `photo`: [Image File] (jpeg, jpg, png, gif - max 5MB)

**Example using cURL:**
```bash
curl -X POST http://localhost:5000/api/alumni/profile/photo \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "photo=@/path/to/your/image.jpg"
```

**Example using JavaScript (Fetch API):**
```javascript
const formData = new FormData();
formData.append('photo', fileInput.files[0]);

fetch('http://localhost:5000/api/alumni/profile/photo', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
  // data.profile_image contains the new image path
})
.catch(error => console.error('Error:', error));
```

**Response:**
```json
{
  "message": "Profile photo uploaded successfully",
  "profile_image": "/uploads/alumni_student/profile-1766489586123-987654321.png",
  "type": "student"
}
```

---

### Method 2: Update via Profile Update Endpoint

You can also include the photo when updating other profile fields.

**For Students:**
- Endpoint: `PUT /api/alumni/student/profile/me`
- Or: `PUT /api/alumni/student/profile/:alumni_id`

**For Employees:**
- Endpoint: `PUT /api/alumni/employee/profile/me`
- Or: `PUT /api/alumni/employee/profile/:alumni_id`

**Note:** This method updates the profile_image field in the database but doesn't handle file upload. Use Method 1 for actual file uploads.

---

## Complete Workflow Example

### Frontend Implementation (React/Vue/Angular)

```javascript
// 1. User selects a new photo
const handlePhotoChange = (event) => {
  const file = event.target.files[0];
  
  // Validate file
  if (!file) return;
  
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    alert('Only JPEG, PNG, and GIF images are allowed');
    return;
  }
  
  if (file.size > 5 * 1024 * 1024) {
    alert('File size must be less than 5MB');
    return;
  }
  
  // Upload the photo
  uploadProfilePhoto(file);
};

// 2. Upload function
const uploadProfilePhoto = async (file) => {
  const token = localStorage.getItem('token'); // or from your state management
  
  const formData = new FormData();
  formData.append('photo', file);
  
  try {
    const response = await fetch('http://localhost:5000/api/alumni/profile/photo', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('Photo updated successfully:', data);
      // Update UI with new photo URL
      const imageUrl = `http://localhost:5000${data.profile_image}`;
      // Update your state/UI with imageUrl
    } else {
      console.error('Upload failed:', data.error);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

// 3. Display the profile photo
const ProfilePhoto = ({ profileImage }) => {
  const imageUrl = profileImage 
    ? `http://localhost:5000${profileImage}`
    : '/default-avatar.png';
  
  return (
    <img 
      src={imageUrl} 
      alt="Profile" 
      onError={(e) => e.target.src = '/default-avatar.png'}
    />
  );
};
```

---

## HTML Form Example

```html
<!DOCTYPE html>
<html>
<head>
  <title>Update Profile Photo</title>
</head>
<body>
  <h2>Update Profile Photo</h2>
  
  <form id="photoForm">
    <input type="file" id="photoInput" accept="image/*" required>
    <button type="submit">Upload Photo</button>
  </form>
  
  <div id="result"></div>
  <img id="profileImage" style="max-width: 200px; display: none;">
  
  <script>
    const token = 'YOUR_JWT_TOKEN'; // Get from login
    
    document.getElementById('photoForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const fileInput = document.getElementById('photoInput');
      const file = fileInput.files[0];
      
      if (!file) {
        alert('Please select a file');
        return;
      }
      
      const formData = new FormData();
      formData.append('photo', file);
      
      try {
        const response = await fetch('http://localhost:5000/api/alumni/profile/photo', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
          document.getElementById('result').innerHTML = 
            `<p style="color: green;">${data.message}</p>`;
          
          // Display the uploaded image
          const img = document.getElementById('profileImage');
          img.src = `http://localhost:5000${data.profile_image}`;
          img.style.display = 'block';
        } else {
          document.getElementById('result').innerHTML = 
            `<p style="color: red;">Error: ${data.error}</p>`;
        }
      } catch (error) {
        document.getElementById('result').innerHTML = 
          `<p style="color: red;">Network error: ${error.message}</p>`;
      }
    });
  </script>
</body>
</html>
```

---

## Postman/Thunder Client Testing

1. **Create a new POST request**
   - URL: `http://localhost:5000/api/alumni/profile/photo`

2. **Add Authorization Header**
   - Key: `Authorization`
   - Value: `Bearer YOUR_JWT_TOKEN`

3. **Set Body Type to form-data**
   - Key: `photo`
   - Type: File
   - Value: Select your image file

4. **Send the request**

---

## Image Access URLs

After uploading, you can access images at:

**Students:**
```
http://localhost:5000/uploads/alumni_student/profile-TIMESTAMP-RANDOM.png
```

**Employees:**
```
http://localhost:5000/uploads/alumni_employee/profile-TIMESTAMP-RANDOM.png
```

The full URL is constructed as:
```
BASE_URL + profile_image_from_database
```

Example:
```javascript
const imageUrl = `http://localhost:5000${alumni.profile_image}`;
```

---

## Error Handling

**Common Errors:**

1. **No file uploaded**
   ```json
   { "error": "No file uploaded" }
   ```

2. **Invalid file type**
   ```json
   { "error": "Only image files are allowed (jpeg, jpg, png, gif)" }
   ```

3. **File too large**
   ```json
   { "error": "File too large" }
   ```

4. **Unauthorized**
   ```json
   { "error": "Unauthorized" }
   ```

---

## Security Notes

1. ✅ File type validation (only images)
2. ✅ File size limit (5MB)
3. ✅ Authentication required (JWT token)
4. ✅ Automatic user type detection (student/employee)
5. ✅ Separate folders for students and employees

---

## Database Storage

The `profile_image` field stores the relative path:
- Students: `/uploads/alumni_student/profile-xxx.png`
- Employees: `/uploads/alumni_employee/profile-xxx.png`

This path is returned in all profile API responses and can be used to construct the full URL.
