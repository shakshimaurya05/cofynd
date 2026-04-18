const nodemailer = require('nodemailer');

const REQUIRED_ENV = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'MAIL_FROM'];
const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);

let transporter = null;

if (missingEnv.length > 0) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(`Missing required env var(s): ${missingEnv.join(', ')}`);
  }

  console.warn(
    `Email service disabled in ${process.env.NODE_ENV || 'development'} mode. Missing env var(s): ${missingEnv.join(', ')}`,
  );
} else {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  transporter.verify().catch((err) => {
    console.error('SMTP connection failed:', err.message);
  });
}

async function sendEmail({ to, subject, html }) {
  if (!transporter) {
    console.warn(`Skipping email send because SMTP is not configured. Subject: ${subject}`);
    return { skipped: true, to, subject };
  }

  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: Array.isArray(to) ? to.join(', ') : to,
    subject,
    html,
  });
  return info;
}

module.exports = { sendEmail };
