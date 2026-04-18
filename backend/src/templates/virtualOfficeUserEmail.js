const { escapeHtml } = require('../utils/escapeHtml');

function virtualOfficeUserEmailHtml(leadData) {
  const name = escapeHtml(leadData.name);
  const city = escapeHtml(leadData.city);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>CoworkSpaze</h1>
          </div>
          <div class="content">
            <h2>Hi ${name}!</h2>
            <p>Thank you for your virtual office inquiry for <strong>${city}</strong>.</p>
            <p>We have received your details successfully, and our team will connect with you shortly.</p>
            <p>If you have any urgent requirements, feel free to reply to this email.</p>
            <div class="footer">
              <p>Best Regards,<br><strong>The CoworkSpaze Team</strong></p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

module.exports = { virtualOfficeUserEmailHtml };
