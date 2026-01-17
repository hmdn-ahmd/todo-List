/**
 * Format an ISO date string to relative time (e.g., "just now", "5m ago", "2h ago", "3d ago")
 * @param {string} isoString - ISO 8601 date string
 * @returns {string} Relative time string
 */
export function formatRelativeTime(isoString) {
  const now = new Date();
  const date = new Date(isoString);
  const diffInSeconds = Math.floor((now - date) / 1000);

  // Handle future dates (shouldn't happen, but just in case)
  if (diffInSeconds < 0) {
    return 'just now';
  }

  // Less than a minute
  if (diffInSeconds < 60) {
    return 'just now';
  }

  // Less than an hour
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  // Less than a day
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  // Days
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}
