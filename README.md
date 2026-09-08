# Complaints Platform Management — Frontend

A responsive, RTL (Arabic) admin dashboard for managing a citizen complaints platform, built with **React 19** and **Material UI**. It provides role-based access (admin / employee) for tracking complaints through their full lifecycle, managing employees, departments, roles & permissions, and monitoring system activity — with a dashboard summarizing key metrics through interactive charts.

Paired with a Laravel REST API backend (JWT auth, role & permission management).

## Features

- **Authentication** — JWT-based login with access/refresh tokens, persisted session, protected & guest-only routes.
- **Role-based access control** — separate views/permissions for `admin` and `employee` roles via route guards.
- **Dashboard** — key stats, pie/employee charts (Recharts), quick actions, and PDF export.
- **Complaints management** — list, filter, view detail with a status timeline, update status, add notes.
- **Employees (Users)** — add/edit/delete/search employees, assign roles & departments.
- **Roles & Permissions** — create roles and assign granular permissions.
- **Departments** — full CRUD for organizational departments.
- **System log** — activity/audit log viewer with detail dialogs.

## Tech Stack

- **React 19** + **React Router 7**
- **MUI (Material UI) 7** + Emotion for styling
- **Recharts** for data visualization
- **Axios** for API communication
- Clean Architecture folder structure: `data` (API/repositories/models) → `logic` (entities/use cases) → `pres` (pages/components, presentation layer)

## Project Structure

```
src/
├── core/       # axios instance, error handling
├── data/       # datasources, models, repository implementations (API layer)
├── logic/      # entities, repository interfaces, use cases (business logic)
├── pres/       # pages, components, context, hooks (UI layer)
└── theme.js    # MUI theme
```

## Getting Started

```bash
npm install
npm start
```

Runs the app at [http://localhost:3000](http://localhost:3000).

> ⚠️ Requires the companion backend API running at `http://127.0.0.1:8000/api` (configurable in `src/core/config/axios.js`).

### Available Scripts

- `npm start` — run the app in development mode
- `npm run build` — build for production
- `npm test` — run tests
