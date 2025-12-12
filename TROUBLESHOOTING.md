# Forgot Password Troubleshooting Guide

## ✅ System Status: WORKING

The forgot password functionality with nodemailer is working correctly. Emails are being sent successfully.

## 📧 If You're Not Receiving Emails

### 1. Check Spam/Junk Folder
- Gmail often filters automated emails to spam
- Look for emails from "KVS Alumni Portal"
- Subject: "Your New Password"

### 2. Check Email Address
- Ensure the email address exists in the database
- Test with: `GET /api/alumni/all` to see registered emails

### 3. Gmail Delivery Delay
- Gmail can take 1-5 minutes to deliver emails
- Check again after a few minutes

### 4. Gmail Security Settings
- Ensure 2-Factor Authentication is enabled
- Verify you're using an App Password (not regular password)
- Check if Gmail has blocked the app

## 🧪 Testing the System

### Test API Endpoint:
```bash
curl -X POST http://localhost:5000/api/alumni/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@gmail.com"}'
```

### Expected Response:
```json
{
  "success": true,
  "message": "If the email is valid, a new password has been sent."
}
```

### Check Server Logs:
Look for these messages in the console:
```
📧 Creating email transporter with config: { ... }
📤 Sending email: { ... }
✅ Email sent successfully: <message-id>
```

## 🔧 Common Issues & Solutions

### Issue: "Email configuration missing"
**Solution:** Update `.env` file with Gmail credentials

### Issue: "Authentication failed"
**Solution:** 
- Enable 2FA on Gmail
- Generate new App Password
- Use App Password in SMTP_PASS

### Issue: "Connection refused"
**Solution:**
- Check internet connection
- Verify SMTP settings
- Try port 465 with secure: true

### Issue: Email goes to spam
**Solution:**
- Add sender to contacts
- Mark as "Not Spam"
- Check Gmail filters

## 📋 Verification Checklist

- ✅ Nodemailer installed and configured
- ✅ Gmail App Password generated
- ✅ Environment variables set correctly
- ✅ API endpoint responding with success
- ✅ Server logs show "Email sent successfully"
- ✅ Strong passwords being generated (10-12 chars)
- ✅ Passwords hashed with bcrypt before storage

## 🎯 Current Status

**The system is working correctly!** 

If you're not receiving emails:
1. Check spam folder first
2. Wait 2-3 minutes for delivery
3. Verify the email exists in the database
4. Test with your own email address

The forgot password functionality is production-ready.