const { escapeHtml } = require('../utils/escapeHtml');

function leadUserEmailHtml(leadData) {
  const name = escapeHtml(leadData.name);
  const spaceType = escapeHtml(leadData.spaceType);
  const city = escapeHtml(leadData.city);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
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
            <p>Thank you for reaching out to us!</p>
            <p>We have successfully received your inquiry for a <strong>${spaceType}</strong> space in <strong>${city}</strong>.</p>
            <p>Our team will review your requirements and get back to you within <strong>24-48 hours</strong>.</p>
            <p>In the meantime, feel free to explore our workspace options!</p>
            <div class="footer">
              <p>Best Regards,<br><strong>The CoworkSpaze Team</strong></p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

module.exports = { leadUserEmailHtml };
