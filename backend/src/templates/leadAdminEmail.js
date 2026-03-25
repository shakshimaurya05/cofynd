const { escapeHtml } = require('../utils/escapeHtml');

function leadAdminEmailHtml(leadData) {
  const name = escapeHtml(leadData.name);
  const email = escapeHtml(leadData.email);
  const phone = escapeHtml(leadData.phone);
  const city = escapeHtml(leadData.city);

  return `
    <h2>New Lead Submitted</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Space Type:</strong> ${escapeHtml(leadData.spaceType || 'Not specified')}</p>
    <p><strong>City:</strong> ${city}</p>
    <p><strong>Submitted at:</strong> ${new Date().toUTCString()}</p>
  `;
}

module.exports = { leadAdminEmailHtml };
