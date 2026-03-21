/**
 * Escapes special regex characters from user input to prevent ReDoS attacks.
 */
function escapeRegExp(str) {
  if (!str) return '';
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = { escapeRegExp };
