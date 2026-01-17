# Todo List

A minimal, fast, and clean Todo application built to focus on fundamentals:
clear state management, local persistence, and a polished UI without unnecessary complexity.

This project is intentionally scoped as a **frontend-first MVP**.

---

## Features

- Create, complete, and delete tasks
- Filter tasks by:
  - All
  - Pending
  - Completed
- Persistent storage using browser `localStorage`
- Lightweight and fast

---

## Tech Stack

- React
- Vite
- Tailwind CSS
- Local Storage (no backend)

---

## Data Persistence

Tasks are stored in the browser using `localStorage`.

This means:
- Tasks persist across page reloads
- Tasks are scoped per browser and per device
- There is no account system or cloud sync

Mock / seed data is used **only for development reference** and is not intended for production use.

---

## Task Model

The app uses a deliberately minimal task structure:

```ts
Task {
  id: string
  title: string
  completed: boolean
  createdAt: number
}
```
---

## Running Locally

```ts
npm install
npm run dev
```

### The app will be available at:

```ts
http://localhost:5173
```


### What This App Does NOT Include (By Design)

- User authentication

- Backend or database

- Due dates or reminders

These omissions are intentional to keep the project focused, readable, and easy to extend.



### Future Improvements (Optional)

Inline task editing

Sorting options (newest first / oldest first)

Due dates

Light / dark theme toggle

Accessibility refinements
