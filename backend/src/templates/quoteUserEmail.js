const { escapeHtml } = require('../utils/escapeHtml');

function quoteUserEmailHtml(quoteData) {
  const name = escapeHtml(quoteData.name);
  const spaceTitle = escapeHtml(quoteData.spaceTitle);
  const spaceLocation = escapeHtml(quoteData.spaceLocation);
  const phone = escapeHtml(quoteData.phone);
  const type = quoteData.type
    ? escapeHtml(quoteData.type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))
    : 'Not specified';
  const seats = escapeHtml(quoteData.seats || 'Not specified');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .property-box { background: white; border: 2px solid #667eea; border-radius: 10px; padding: 20px; margin: 20px 0; }
          .property-title { font-size: 18px; font-weight: bold; color: #667eea; margin-bottom: 5px; }
          .property-location { color: #666; font-size: 14px; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .details-table td { padding: 10px; border-bottom: 1px solid #ddd; }
          .details-table td:first-child { font-weight: bold; color: #555; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">CoworkSpaze</h1>
          </div>
          <div class="content">
            <h2>Hi ${name}!</h2>
            <p>Thank you for your interest in this workspace!</p>

            <div class="property-box">
              <div class="property-title">${spaceTitle}</div>
              <div class="property-location">${spaceLocation}</div>
            </div>

            <p>We have received your quote request with the following details:</p>

            <table class="details-table">
              <tr>
                <td>Workspace Type:</td>
                <td>${type}</td>
              </tr>
              <tr>
                <td>Seats Required:</td>
                <td>${seats}</td>
              </tr>
              <tr>
                <td>Contact Number:</td>
                <td>${phone}</td>
              </tr>
            </table>

            <p style="margin-top: 20px;">Our team is reviewing your requirements and will get back to you within <strong>24-48 hours</strong> with a customized quote.</p>

            <div class="footer">
              <p>Best Regards,<br><strong>The CoworkSpaze Team</strong></p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

module.exports = { quoteUserEmailHtml };
