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
    - [frontend](#frontend)
    - [backend](#backend)
- [API Design](#api-design)
  - [Contests](#contests)
    - [Get all contests](#get-all-contests)
- [GET /api/contests](#get-apicontests)
- [GET /api/contests/{contestId}](#get-apicontestscontestid)
- [GET /api/contests/{contestId}/leaderboard](#get-apicontestscontestidleaderboard)
- [GET /api/problems/contest/{contestId}](#get-apiproblemscontestcontestid)
- [GET /api/problems/{problemId}](#get-apiproblemsproblemid)
- [POST /api/problems/{problemId}/submit](#post-apiproblemsproblemidsubmit)
- [GET /api/submissions/{submissionId}](#get-apisubmissionssubmissionid)
  - [Design Choices \& Justification](#design-choices--justification)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)

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


# API Design

## Contests

### Get all contests
```http
GET /api/contests

API Design
Contests

# GET /api/contests

Returns a list of all contests.

```json
[
  { "id": "<uuid>", "name": "Contest 1", "description": "...", "startTime": "...", "endTime": "..." }
]



# GET /api/contests/{contestId}

Returns details of a specific contest by UUID

# GET /api/contests/{contestId}/leaderboard

Returns the leaderboard:


```json
[
  { "userId": "<uuid>", "username": "John", "solvedCount": 5, "totalSubmissions": 7 }
]```

Problems

# GET /api/problems/contest/{contestId}

Returns all problems in a contest


```json
[
  { "id": "<uuid>", "title": "...", "description": "...", "difficulty": "...", "testCases": [...], "boilerPlateCode": {...} }
]


# GET /api/problems/{problemId}

Returns a single problem by UUID

# POST /api/problems/{problemId}/submit

Submits code for evaluation

```json
{
  "userId": "<uuid>",
  "contestId": "<uuid>",
  "language": "python",
  "code": "print('Hello')",
  "testCases": [{ "input": "...", "expectedOutput": "..." }]
}


Response includes submission status and detailed judge results.

Submissions

# GET /api/submissions/{submissionId}

Returns status of a specific submission

## Design Choices & Justification
### Backend

Spring Boot with PostgreSQL

Chosen for scalability, relational integrity, and easy mapping of contests, problems, users, and submissions.

DTOs (ProblemDTO, CodeSubmissionDTO, LeaderboardEntry)

Decouples internal database models from API responses.

Includes parsing of JSON fields (test cases, boilerplate code).

Controllers

Each resource has its own controller (ContestController, ProblemController, SubmissionController) for RESTful design.

### Frontend

React

Provides reactive UI for contests, problems, code editor, and leaderboard.

State management

Local component state with useState and useEffect suffices due to mostly page-level state.

localStorage used for participant session persistence.

Docker Orchestration

Single docker-compose.yml handles backend, frontend, and database.

Trade-offs

PostgreSQL persists data using a volume; resets when volume is deleted.

Using docker-compose simplifies local setup but may require manual port mapping on conflicting ports.

Challenges

Handling judge API responses with dynamic test cases and passing results back to frontend.

Mapping UUIDs to simple contest IDs for better UX without losing relational integrity.

Database Schema

users – Stores users with unique (username, email)

contests – Stores contests with start and end times

problems – Stores contest problems with difficulty, testCases, and boilerPlateCode

submissions – Stores code submissions with status tracking and raw output

contest_participants – Tracks which users joined which contests