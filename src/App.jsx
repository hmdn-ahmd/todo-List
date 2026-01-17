import { useState, useEffect } from "react";
import { loadTasks, saveTasks } from "./utils/storage.js";
import Header from "./components/Header.jsx";
import TaskInput from "./components/TaskInput.jsx";
import FilterTabs from "./components/FilterTabs.jsx";
import TaskList from "./components/TaskList.jsx";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load tasks on initialization
  useEffect(() => {
    const loadedTasks = loadTasks();
    setTasks(loadedTasks);
  }, []);

  // Helper to update tasks and save to localStorage
  const updateTasks = (updater) => {
    setTasks(prevTasks => {
      const updated = updater(prevTasks);
      saveTasks(updated);
      return updated;
    });
  };

  // Add task (newest first, Date.now ID)
  const handleAddTask = (title) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTask = {
      id: Date.now(),
      title: trimmed,
      completed: false,
      createdAt: new Date().toISOString()
    };

    updateTasks(prevTasks => [newTask, ...prevTasks]);
  };

  // Toggle complete
  const handleToggleComplete = (id) => {
    updateTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const handleDeleteTask = (id) => {
    updateTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  // Change filter
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Derive filteredTasks based on filter
  const filteredTasks = filter === 'pending'
    ? tasks.filter(task => !task.completed)
    : filter === 'completed'
    ? tasks.filter(task => task.completed)
    : tasks;

  const pendingCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-neutral-900 rounded-2xl p-6 shadow-xl">
        <div className="space-y-6">
          <Header pendingCount={pendingCount} />
          <TaskInput onAdd={handleAddTask} />
          <FilterTabs value={filter} onChange={handleFilterChange} />
          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggleComplete}
            onDelete={handleDeleteTask}
          />
        </div>
      </div>
    </div>
  );
}
