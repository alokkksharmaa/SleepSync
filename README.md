SleepSync

SleepSync is a production-style full-stack MERN application designed to demonstrate end-to-end ownership of backend APIs, data modeling, and frontend data visualization.

The project focuses on clean architecture, RESTful design, and real-world state handling rather than superficial UI features.

Why This Project Matters

Designed and implemented REST APIs with proper separation of concerns

Modeled structured data using MongoDB + Mongoose

Built a frontend that consumes APIs, handles async state, and visualizes data

Implemented business logic (sleep quality classification) on the backend

Demonstrates understanding of client–server interaction and data flow

Key Capabilities

CRUD operations with validation and predictable API responses

Backend-driven business logic (sleep quality calculation)

Interactive dashboard with trend analysis

Centralized API communication using Axios

Responsive UI with dark/light mode support

Tech Stack

Frontend: React (Vite), Tailwind CSS, Recharts, Axios

Backend: Node.js, Express.js

Database: MongoDB, Mongoose. 

API Design

Base URL: /api/sleep

GET / – Fetch all records with computed insights

POST / – Persist validated sleep data

PUT /:id – Update existing records

DELETE /:id – Remove records safely

Follows REST conventions with consistent response structure.

Business Logic

Sleep quality is computed server-side:

7–9 hours → Excellent

6–7 hours → Good

5–6 hours → Fair

<5 hours → Poor

This keeps logic centralized and prevents frontend duplication.

Engineering Focus

Clear backend/frontend separation

Scalable folder structure

Predictable data flow

Easy extensibility for auth, analytics, or multi-user support.
