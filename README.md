# Shodh AI – Online Coding Contest Platform

Shodh AI is a full-stack online coding contest platform where users can register, join contests, solve problems in multiple languages, submit solutions, and view real-time leaderboards.


---

## Overview

Shodh AI allows developers to:

- Register and login as participants
- Join coding contests
- Solve programming problems in multiple languages
- Submit code for evaluation
- View real-time leaderboards and submission statuses

---

## Features

- Full-stack web application using React (frontend) and Spring Boot (backend)
- Multi-language code submissions with judge evaluation
- Real-time leaderboard updates
- Persistent user sessions using `localStorage`
- Dockerized environment for quick setup

---

## Prerequisites

- Node.js >= 18  
- Java 24 (for Spring Boot backend)  
- PostgreSQL  

---

## Setup Instructions

1. Clone the repository:

```bash
git clone <repo-url>
cd <repo-directory>
```

This will start:

- Spring Boot backend → [http://localhost:8080](http://localhost:8080)  
- React frontend → [http://localhost:5173](http://localhost:5173)  
- PostgreSQL database

---

## Frontend

```bash
cd frontend
npm install
npm start
```

---

## Backend

Must have : jdk-24 and IntelliJ IDE
run the main through IntelliJ

## online judge
hosted on : https://online-judge-egds.onrender.com
github repo : https://github.com/MO-deus/online-judge

---

## API Design

### Contests

#### Get all contests

```http
GET /api/contests
```

Returns a list of all contests:

```json
[
  { "id": "<uuid>", "name": "Contest 1", "description": "...", "startTime": "...", "endTime": "..." }
]
```

---

#### Get contest by ID

```http
GET /api/contests/{contestId}
```

Returns details of a specific contest by UUID.

---

#### Get contest leaderboard

```http
GET /api/contests/{contestId}/leaderboard
```

Returns the leaderboard:

```json
[
  { "userId": "<uuid>", "username": "John", "solvedCount": 5, "totalSubmissions": 7 }
]
```

---

### Problems

#### Get all problems in a contest

```http
GET /api/problems/contest/{contestId}
```

Returns all problems in a contest:

```json
[
  { "id": "<uuid>", "title": "...", "description": "...", "difficulty": "...", "testCases": [...], "boilerPlateCode": {...} }
]
```

---

#### Get a problem by ID

```http
GET /api/problems/{problemId}
```

Returns a single problem by UUID.

---

#### Submit a solution

```http
POST /api/problems/{problemId}/submit
```

Submits code for evaluation.

**Request body:**

```json
{
  "userId": "<uuid>",
  "contestId": "<uuid>",
  "language": "python",
  "code": "print('Hello')",
  "testCases": [{ "input": "...", "expectedOutput": "..." }]
}
```

**Response:**

Includes submission status and detailed judge results.

---

### Submissions

#### Get a submission by ID

```http
GET /api/submissions/{submissionId}
```

Returns the status of a specific submission.

---

## Design Choices & Justification

### Backend

- **Spring Boot with PostgreSQL**  
  Chosen for scalability, relational integrity, and easy mapping of contests, problems, users, and submissions.

- **DTOs (ProblemDTO, CodeSubmissionDTO, LeaderboardEntry)**  
  Decouple internal database models from API responses.  
  Includes parsing of JSON fields (test cases, boilerplate code).

- **Controllers**  
  Each resource has its own controller (`ContestController`, `ProblemController`, `SubmissionController`) for RESTful design.

---

### Frontend

- **React**  
  Provides reactive UI for contests, problems, code editor, and leaderboard.

- **State management**  
  Local component state with `useState` and `useEffect` suffices due to mostly page-level state.  
  `localStorage` used for participant session persistence.

---

### Docker Orchestration

- Single `docker-compose.yml` handles online judge.  

---

### Trade-offs

- PostgreSQL persists data using a volume; resets when volume is deleted.  

---

## Challenges

- Handling judge API responses with dynamic test cases and passing results back to frontend.  
- Mapping UUIDs to simple contest IDs for better UX without losing relational integrity.  

---

## Database Schema

- **users** – Stores users with unique `(username, email)`  
- **contests** – Stores contests with start and end times  
- **problems** – Stores contest problems with difficulty, `testCases`, and `boilerPlateCode`  
- **submissions** – Stores code submissions with status tracking and raw output  
- **contest_participants** – Tracks which users joined which contests  
