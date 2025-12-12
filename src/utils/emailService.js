import nodemailer from 'nodemailer';

// Create transporter for Gmail SMTP
const createTransporter = () => {
  const config = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Additional options for better compatibility
    tls: {
      rejectUnauthorized: false
    }
  };

  console.log('📧 Creating email transporter with config:', {
    host: config.host,
    port: config.port,
    user: config.auth.user,
    secure: config.secure
  });

  return nodemailer.createTransport(config);
};

// Send email function
export const sendEmail = async (to, subject, text, html = null) => {
  try {
    // Validate required environment variables
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error('Email configuration missing. Please set SMTP_USER and SMTP_PASS in .env file');
    }

    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"${process.env.FROM_NAME || 'KVS Alumni Portal'}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html: html || text,
    };

    console.log('📤 Sending email:', {
      to: mailOptions.to,
      subject: mailOptions.subject,
      from: mailOptions.from
    });

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email, newPassword) => {
  const subject = 'Your New Password';
  const text = `
Hello,

Your password has been reset successfully. Here is your new password:

Password: ${newPassword}

Please log in with this new password.

For security reasons, please do not share this password with anyone.

Best regards,
KVS Alumni Portal Team
  `.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333;">Password Reset - KVS Alumni Portal</h2>
      
      <p>Hello,</p>
      
      <p>Your password has been reset successfully. Here is your new password:</p>
      
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <strong style="font-size: 18px; color: #2c3e50;">Password: ${newPassword}</strong>
      </div>
      
      <p>Please log in with this new password and consider changing it to something more memorable.</p>
      
      <p style="color: #e74c3c;"><strong>For security reasons, please do not share this password with anyone.</strong></p>
      
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
      
      <p style="color: #666; font-size: 14px;">
        Best regards,<br>
        KVS Alumni Portal Team
      </p>
    </div>
  `;

  return await sendEmail(email, subject, text, html);
};