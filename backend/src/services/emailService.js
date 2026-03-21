const nodemailer = require('nodemailer');

const REQUIRED_ENV = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'MAIL_FROM'];
for (const key of REQUIRED_ENV) {
  if (!process.env[key]) throw new Error(`Missing required env var: ${key}`);
}

const transporter = nodemailer.createTransport({
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

async function sendEmail({ to, subject, html }) {
  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: Array.isArray(to) ? to.join(', ') : to,
    subject,
    html,
  });
  return info;
}

module.exports = { sendEmail };
