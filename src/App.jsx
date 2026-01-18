import { useState, useEffect } from "react";
import { loadTasks, saveTasks } from "./utils/storage.js";
import Header from "./components/Header.jsx";
import TaskInput from "./components/TaskInput.jsx";
import FilterTabs from "./components/FilterTabs.jsx";
import TaskList from "./components/TaskList.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [tasks, setTasks] = useState(() => loadTasks());
  const [filter, setFilter] = useState('all');

  // Sync tasks to localStorage whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Add task (newest first, crypto.randomUUID ID)
  const handleAddTask = (title) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: trimmed,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  // Toggle complete
  const handleToggleComplete = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const handleDeleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  // Clear completed tasks
  const handleClearCompleted = () => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  };

  // Edit task title
  const handleEditTask = (id, newTitle) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
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
  const completedCount = tasks.filter(t => t.completed).length;

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
            onEdit={handleEditTask}
          />
          <Footer
            completedCount={completedCount}
            onClearCompleted={handleClearCompleted}
          />
        </div>
      </div>
    </div>
  );
}
