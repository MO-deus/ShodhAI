# Shodh AI – Online Coding Contest Platform

Shodh AI is a full-stack online coding contest platform where users can register, join contests, solve problems in multiple languages, submit solutions, and view real-time leaderboards.

---

## Table of Contents
- [Shodh AI – Online Coding Contest Platform](#shodh-ai--online-coding-contest-platform)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Setup Instructions](#setup-instructions)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
- [Shodh AI – Online Coding Contest Platform](#shodh-ai--online-coding-contest-platform-1)
  - [Table of Contents](#table-of-contents-1)
  - [Overview](#overview-1)
  - [Features](#features)
  - [Prerequisites](#prerequisites-1)
  - [Setup Instructions](#setup-instructions-1)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Database](#database)
  - [API Design](#api-design)
    - [Contests](#contests)
      - [Get all contests](#get-all-contests)
      - [Get contest by ID](#get-contest-by-id)
      - [Get contest leaderboard](#get-contest-leaderboard)
    - [Problems](#problems)
      - [Get all problems in a contest](#get-all-problems-in-a-contest)
      - [Get a problem by ID](#get-a-problem-by-id)
      - [Submit a solution](#submit-a-solution)
    - [Submissions](#submissions)
      - [Get a submission by ID](#get-a-submission-by-id)
  - [Design Choices \& Justification](#design-choices--justification)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
    - [Docker Orchestration](#docker-orchestration)
    - [Trade-offs](#trade-offs)
  - [Challenges](#challenges)
  - [Database Schema](#database-schema)

---

## Overview

Shodh AI allows users to:
- Register and join contests
- Solve coding problems in multiple programming languages
- Submit solutions for evaluation
- View real-time contest leaderboards

---

## Setup Instructions

### Prerequisites
- Docker & Docker Compose installed
- Node.js >= 18
- Java 17+ (for Spring Boot backend)
- PostgreSQL (if running outside Docker)

### Steps
```bash
git clone <repo-url>
cd <repo-directory>

### frontend
cd frontend
npm install
npm start

### backend
```

# Shodh AI – Online Coding Contest Platform

Shodh AI is a full-stack online coding contest platform where users can register, join contests, solve problems in multiple languages, submit solutions, and view real-time leaderboards.

---

## Table of Contents

- [Shodh AI – Online Coding Contest Platform](#shodh-ai--online-coding-contest-platform)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Setup Instructions](#setup-instructions)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
- [Shodh AI – Online Coding Contest Platform](#shodh-ai--online-coding-contest-platform-1)
  - [Table of Contents](#table-of-contents-1)
  - [Overview](#overview-1)
  - [Features](#features)
  - [Prerequisites](#prerequisites-1)
  - [Setup Instructions](#setup-instructions-1)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Database](#database)
  - [API Design](#api-design)
    - [Contests](#contests)
      - [Get all contests](#get-all-contests)
      - [Get contest by ID](#get-contest-by-id)
      - [Get contest leaderboard](#get-contest-leaderboard)
    - [Problems](#problems)
      - [Get all problems in a contest](#get-all-problems-in-a-contest)
      - [Get a problem by ID](#get-a-problem-by-id)
      - [Submit a solution](#submit-a-solution)
    - [Submissions](#submissions)
      - [Get a submission by ID](#get-a-submission-by-id)
  - [Design Choices \& Justification](#design-choices--justification)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
    - [Docker Orchestration](#docker-orchestration)
    - [Trade-offs](#trade-offs)
  - [Challenges](#challenges)
  - [Database Schema](#database-schema)

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

- Docker & Docker Compose installed  
- Node.js >= 18  
- Java 17+ (for Spring Boot backend)  
- PostgreSQL (if running outside Docker)  

---

## Setup Instructions

1. Clone the repository:

```bash
git clone <repo-url>
cd <repo-directory>
```

2. Run with Docker Compose:

```bash
docker-compose up --build
```

This will start:

- Spring Boot backend → [http://localhost:8080](http://localhost:8080)  
- React frontend → [http://localhost:3000](http://localhost:3000)  
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

If running without Docker:

```bash
./mvnw spring-boot:run
```

---

## Database

- When using Docker, the database schema will be automatically created using `schema.sql`.  
- If running PostgreSQL manually, execute the SQL scripts provided.  

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

- Single `docker-compose.yml` handles backend, frontend, and database.  

---

### Trade-offs

- PostgreSQL persists data using a volume; resets when volume is deleted.  
- Using docker-compose simplifies local setup but may require manual port mapping on conflicting ports.  

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
