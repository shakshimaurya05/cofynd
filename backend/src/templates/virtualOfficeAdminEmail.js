const { escapeHtml } = require('../utils/escapeHtml');

function virtualOfficeAdminEmailHtml(leadData) {
  const name = escapeHtml(leadData.name);
  const email = escapeHtml(leadData.email);
  const phone = escapeHtml(leadData.phone);
  const city = escapeHtml(leadData.city);
  const source = escapeHtml(leadData.source || 'virtual-office');

  return `
    <h2>New Virtual Office Lead</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>City:</strong> ${city}</p>
    <p><strong>Source:</strong> ${source}</p>
    <p><strong>Submitted at:</strong> ${new Date().toUTCString()}</p>
  `;
}

module.exports = { virtualOfficeAdminEmailHtml };
