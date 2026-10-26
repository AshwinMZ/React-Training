# Book Store Management System

React + React Bootstrap frontend, JSON Server backend, Axios for API calls.

## Folder structure
- `backend/`  - JSON Server (`db.json`)
- `frontend/` - React app (Vite)

## Run the backend (terminal 1)
```
cd backend
npm install
npm start
```
API runs at http://localhost:3001/books

## Run the frontend (terminal 2)
```
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

## Features
View, add, edit (PUT), toggle availability (PATCH), delete (DELETE), search, form validation, success/error alerts. Data persists in `db.json`.
