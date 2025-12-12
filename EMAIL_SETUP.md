# Email Configuration Setup

## Gmail SMTP Configuration

To enable the forgot password functionality, you need to configure Gmail SMTP settings in your `.env` file.

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Enable 2-Factor Authentication if not already enabled

### Step 2: Generate App Password
1. Go to Google Account > Security > 2-Step Verification
2. Scroll down to "App passwords"
3. Generate a new app password for "Mail"
4. Copy the generated 16-character password

### Step 3: Update Environment Variables
Update your `.env` file with the following:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_character_app_password
FROM_EMAIL=your_email@gmail.com
FROM_NAME=KVS Alumni Portal
```

### Step 4: Replace Placeholder Values
- `SMTP_USER`: Your Gmail address
- `SMTP_PASS`: The 16-character app password (not your regular Gmail password)
- `FROM_EMAIL`: Your Gmail address (same as SMTP_USER)
- `FROM_NAME`: Display name for outgoing emails

### Example Configuration
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=kvs.alumni.portal@gmail.com
SMTP_PASS=abcd efgh ijkl mnop
FROM_EMAIL=kvs.alumni.portal@gmail.com
FROM_NAME=KVS Alumni Portal
```

## Testing Email Functionality

Once configured, you can test the forgot password endpoint:

### Using cURL:
```bash
curl -X POST http://localhost:5000/api/alumni/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Using PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/alumni/forgot-password" -Method POST -ContentType "application/json" -Body '{"email":"test@example.com"}'
```

### Expected Response:
```json
{
  "success": true,
  "message": "If the email is valid, a new password has been sent."
}
```

## Security Notes

1. **Never commit your app password to version control**
2. **Use environment variables for all sensitive data**
3. **The endpoint doesn't reveal whether an email exists in the system**
4. **Generated passwords are 10-12 characters with mixed case, numbers, and symbols**
5. **Only hashed passwords are stored in the database**

## Troubleshooting

### Common Issues:
1. **"Invalid login"** - Check if 2FA is enabled and you're using an app password
2. **"Connection refused"** - Verify SMTP settings and network connectivity
3. **"Authentication failed"** - Double-check the app password

### Email Not Received:
1. Check spam/junk folder
2. Verify the email address exists in the database
3. Check server logs for email sending errors
4. Ensure Gmail account has sufficient sending limits