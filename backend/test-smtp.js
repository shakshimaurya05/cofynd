require('dotenv').config();
const nodemailer = require('nodemailer');

async function testSMTP() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Verify connection
    console.log('📡 Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!');

    // Send test email
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: '✅ SMTP Test - CoworkSpaze',
      text: 'This is a test email from your SMTP configuration.',
      html: '<h2>SMTP Test Successful!</h2><p>If you received this, your Hostinger email is working correctly.</p>',
    });

    console.log('✅ Test email sent! Message ID:', info.messageId);
    console.log(`📧 Check inbox: ${process.env.ADMIN_EMAIL}`);
  } catch (error) {
    console.error('❌ SMTP Error:', error.message);
  } finally {
    process.exit(0);
  }
}

testSMTP();
