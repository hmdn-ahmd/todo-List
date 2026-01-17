import { mockTasks } from '../data/mockTasks.js';

/**
 * Load tasks from localStorage, fallback to mockTasks if nothing exists or parsing fails
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
  
  // Fallback to mockTasks
  return mockTasks;
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
