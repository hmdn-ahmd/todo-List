/**
 * Load tasks from localStorage, fallback to empty array if nothing exists or parsing fails
 * @returns {Array} Array of task objects
 */
export function loadTasks() {
  try {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      const tasks = JSON.parse(stored);
      if (Array.isArray(tasks)) {
        return tasks;
      }
    }
  } catch (error) {
    // Fail silently
  }
  
  // Fallback to empty array
  return [];
}

/**
 * Save tasks to localStorage
 * @param {Array} tasks - Array of task objects to save
 */
export function saveTasks(tasks) {
  try {
    const serialized = JSON.stringify(tasks);
    localStorage.setItem('tasks', serialized);
  } catch (error) {
    // Fail silently
  }
}

/**
 * Load sort order from localStorage, fallback to 'newest'
 * @returns {string} Sort order: 'newest' or 'oldest'
 */
export function loadSortOrder() {
  try {
    const stored = localStorage.getItem('sortOrder');
    if (stored === 'newest' || stored === 'oldest') {
      return stored;
    }
  } catch (error) {
    // Fail silently
  }
  
  // Fallback to newest
  return 'newest';
}

/**
 * Save sort order to localStorage
 * @param {string} sortOrder - Sort order: 'newest' or 'oldest'
 */
export function saveSortOrder(sortOrder) {
  try {
    localStorage.setItem('sortOrder', sortOrder);
  } catch (error) {
    // Fail silently
  }
}
