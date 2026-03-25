const { escapeHtml } = require('../utils/escapeHtml');

function quoteAdminEmailHtml(quoteData) {
  const name = escapeHtml(quoteData.name);
  const email = escapeHtml(quoteData.email);
  const phone = escapeHtml(quoteData.phone);
  const type = escapeHtml(quoteData.type || 'Not specified');
  const seats = escapeHtml(quoteData.seats || 'Not specified');
  const spaceTitle = escapeHtml(quoteData.spaceTitle);
  const spaceLocation = escapeHtml(quoteData.spaceLocation);

  return `
    <h2>New Quote Request Received</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Interested In:</strong> ${type}</p>
    <p><strong>Seats Required:</strong> ${seats}</p>
    <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
    <h3>Space Details</h3>
    <p><strong>Property:</strong> ${spaceTitle}</p>
    <p><strong>Location:</strong> ${spaceLocation}</p>
    <p><strong>Submitted at:</strong> ${new Date().toUTCString()}</p>
  `;
}

module.exports = { quoteAdminEmailHtml };
