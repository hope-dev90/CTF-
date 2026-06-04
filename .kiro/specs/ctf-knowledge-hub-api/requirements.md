# Requirements Document

## Introduction

CTF Knowledge Hub API is a personal cybersecurity knowledge base built on NestJS. It provides a structured REST API for storing and retrieving offensive security learning data across four independent modules: XSS payloads and bypass techniques, SQL injection notes and payloads, general cybersecurity learning notes, and PicoCTF challenge writeups and solutions.

The system replaces a messy project structure (duplicate nested folders like `learn/learn`, `xss/xss`, etc.) with a clean, flat modular architecture. All data is persisted in PostgreSQL via TypeORM. Each module exposes standard CRUD endpoints and uses DTO-based validation.

## Glossary

- **API**: The CTF Knowledge Hub RESTful backend application built with NestJS.
- **Entry**: A single record stored within a module (e.g., one XSS payload, one SQL note, one CTF writeup).
- **Module**: A self-contained NestJS feature module (XSS, SQL, Learn, PicoCTF), each with its own Controller, Service, DTOs, and Entity.
- **DTO**: Data Transfer Object — a class used to validate and type incoming request bodies.
- **Entity**: A TypeORM-decorated class that maps to a PostgreSQL table.
- **Payload**: A string value representing an attack vector (e.g., an XSS string or SQL injection snippet).
- **Technique**: A description of a method or approach used in an attack or bypass.
- **Writeup**: A structured solution or explanation for a CTF challenge.
- **Controller**: The NestJS class that handles HTTP routing for a module.
- **Service**: The NestJS class that contains business logic and interacts with the database for a module.
- **ValidationPipe**: A NestJS pipe that validates incoming request bodies against DTOs using `class-validator`.
- **Repository**: The TypeORM abstraction used by a Service to query and persist Entities.

---

## Requirements

### Requirement 1: Clean Modular Project Structure

**User Story:** As a developer, I want a clean and flat NestJS module structure, so that the codebase is maintainable and free of duplicate nested directories.

#### Acceptance Criteria

1. THE API SHALL organize source code under `src/` with one flat directory per module: `src/xss/`, `src/sql/`, `src/learn/`, and `src/picoctf/`.
2. THE API SHALL remove duplicate nested folder patterns (e.g., `learn/learn`, `xss/xss`, `sql/sql`, `picoCTF/ctf`) from the source tree.
3. WHEN a module is added, THE API SHALL place the Controller, Service, DTOs, Entity, and Module file directly inside the corresponding flat module directory.
4. THE API SHALL register all feature modules (XssModule, SqlModule, LearnModule, PicoctfModule) in `AppModule`.

---

### Requirement 2: PostgreSQL Database Connection

**User Story:** As a developer, I want the API to connect to a real PostgreSQL database, so that data persists reliably and is not lost between restarts.

#### Acceptance Criteria

1. THE API SHALL connect to a PostgreSQL database using TypeORM configured via `TypeOrmModule.forRoot()` in `AppModule`.
2. THE API SHALL read database connection credentials (host, port, username, password, database name) from environment variables.
3. IF the database connection fails at startup, THEN THE API SHALL log an error and terminate the process.
4. THE API SHALL use `synchronize: true` in the TypeORM configuration for development environments.

---

### Requirement 3: XSS Module CRUD

**User Story:** As a security practitioner, I want to store and retrieve XSS payloads and bypass techniques, so that I can quickly access them during CTF competitions and practice.

#### Acceptance Criteria

1. THE API SHALL expose a route prefix of `/xss` for all XSS-related endpoints.
2. WHEN a POST request is made to `/xss` with a valid body, THE API SHALL create a new XSS entry and return it with HTTP 201.
3. WHEN a GET request is made to `/xss`, THE API SHALL return an array of all XSS entries with HTTP 200.
4. WHEN a GET request is made to `/xss/:id` with a valid ID, THE API SHALL return the matching XSS entry with HTTP 200.
5. IF a GET request is made to `/xss/:id` with a non-existent ID, THEN THE API SHALL return HTTP 404 with a descriptive error message.
6. WHEN a PATCH request is made to `/xss/:id` with a valid body, THE API SHALL update the matching XSS entry and return it with HTTP 200.
7. WHEN a DELETE request is made to `/xss/:id`, THE API SHALL delete the matching XSS entry and return HTTP 200.
8. THE XSS Entity SHALL include at minimum: `id` (UUID), `title` (string), `payload` (text), `technique` (string, optional), `notes` (text, optional), `createdAt` (timestamp), `updatedAt` (timestamp).
9. WHEN a POST or PATCH request body is missing the required `title` field, THE API SHALL return HTTP 400 with a validation error message.
10. WHEN a POST or PATCH request body is missing the required `payload` field, THE API SHALL return HTTP 400 with a validation error message.

---

### Requirement 4: SQL Injection Module CRUD

**User Story:** As a security practitioner, I want to store and retrieve SQL injection payloads and notes, so that I can reference them quickly during practice sessions.

#### Acceptance Criteria

1. THE API SHALL expose a route prefix of `/sql` for all SQL injection-related endpoints.
2. WHEN a POST request is made to `/sql` with a valid body, THE API SHALL create a new SQL entry and return it with HTTP 201.
3. WHEN a GET request is made to `/sql`, THE API SHALL return an array of all SQL entries with HTTP 200.
4. WHEN a GET request is made to `/sql/:id` with a valid ID, THE API SHALL return the matching SQL entry with HTTP 200.
5. IF a GET request is made to `/sql/:id` with a non-existent ID, THEN THE API SHALL return HTTP 404 with a descriptive error message.
6. WHEN a PATCH request is made to `/sql/:id` with a valid body, THE API SHALL update the matching SQL entry and return it with HTTP 200.
7. WHEN a DELETE request is made to `/sql/:id`, THE API SHALL delete the matching SQL entry and return HTTP 200.
8. THE SQL Entity SHALL include at minimum: `id` (UUID), `title` (string), `payload` (text), `dbType` (string, optional — e.g., MySQL, PostgreSQL, SQLite), `notes` (text, optional), `createdAt` (timestamp), `updatedAt` (timestamp).
9. WHEN a POST or PATCH request body is missing the required `title` field, THE API SHALL return HTTP 400 with a validation error message.
10. WHEN a POST or PATCH request body is missing the required `payload` field, THE API SHALL return HTTP 400 with a validation error message.

---

### Requirement 5: Learn Module CRUD

**User Story:** As a security learner, I want to store and retrieve general cybersecurity learning notes and references, so that I can build a personal knowledge base to study from.

#### Acceptance Criteria

1. THE API SHALL expose a route prefix of `/learn` for all learning notes-related endpoints.
2. WHEN a POST request is made to `/learn` with a valid body, THE API SHALL create a new Learn entry and return it with HTTP 201.
3. WHEN a GET request is made to `/learn`, THE API SHALL return an array of all Learn entries with HTTP 200.
4. WHEN a GET request is made to `/learn/:id` with a valid ID, THE API SHALL return the matching Learn entry with HTTP 200.
5. IF a GET request is made to `/learn/:id` with a non-existent ID, THEN THE API SHALL return HTTP 404 with a descriptive error message.
6. WHEN a PATCH request is made to `/learn/:id` with a valid body, THE API SHALL update the matching Learn entry and return it with HTTP 200.
7. WHEN a DELETE request is made to `/learn/:id`, THE API SHALL delete the matching Learn entry and return HTTP 200.
8. THE Learn Entity SHALL include at minimum: `id` (UUID), `title` (string), `content` (text), `category` (string, optional — e.g., "Web", "Crypto", "Forensics"), `tags` (array of strings, optional), `createdAt` (timestamp), `updatedAt` (timestamp).
9. WHEN a POST or PATCH request body is missing the required `title` field, THE API SHALL return HTTP 400 with a validation error message.
10. WHEN a POST or PATCH request body is missing the required `content` field, THE API SHALL return HTTP 400 with a validation error message.

---

### Requirement 6: PicoCTF Module CRUD

**User Story:** As a CTF competitor, I want to store and retrieve PicoCTF challenge writeups and solutions, so that I can review solved challenges and reference solutions for similar problems.

#### Acceptance Criteria

1. THE API SHALL expose a route prefix of `/picoctf` for all PicoCTF writeup-related endpoints.
2. WHEN a POST request is made to `/picoctf` with a valid body, THE API SHALL create a new PicoCTF entry and return it with HTTP 201.
3. WHEN a GET request is made to `/picoctf`, THE API SHALL return an array of all PicoCTF entries with HTTP 200.
4. WHEN a GET request is made to `/picoctf/:id` with a valid ID, THE API SHALL return the matching PicoCTF entry with HTTP 200.
5. IF a GET request is made to `/picoctf/:id` with a non-existent ID, THEN THE API SHALL return HTTP 404 with a descriptive error message.
6. WHEN a PATCH request is made to `/picoctf/:id` with a valid body, THE API SHALL update the matching PicoCTF entry and return it with HTTP 200.
7. WHEN a DELETE request is made to `/picoctf/:id`, THE API SHALL delete the matching PicoCTF entry and return HTTP 200.
8. THE PicoCTF Entity SHALL include at minimum: `id` (UUID), `challengeName` (string), `category` (string, optional — e.g., "Web", "Crypto", "Binary"), `difficulty` (string, optional), `writeup` (text), `flag` (string, optional), `createdAt` (timestamp), `updatedAt` (timestamp).
9. WHEN a POST or PATCH request body is missing the required `challengeName` field, THE API SHALL return HTTP 400 with a validation error message.
10. WHEN a POST or PATCH request body is missing the required `writeup` field, THE API SHALL return HTTP 400 with a validation error message.

---

### Requirement 7: Global Validation and Error Handling

**User Story:** As a developer, I want consistent validation and error responses across all modules, so that the API is predictable and easy to integrate with.

#### Acceptance Criteria

1. THE API SHALL enable a global `ValidationPipe` in `main.ts` with `whitelist: true` and `forbidNonWhitelisted: true`.
2. WHEN a request body contains unknown properties not defined in the DTO, THE API SHALL strip them and not pass them to the service.
3. IF a request body fails DTO validation, THEN THE API SHALL return HTTP 400 with an array of descriptive error messages.
4. THE API SHALL enable CORS globally in `main.ts` to allow cross-origin requests.
5. WHEN an unhandled server error occurs, THE API SHALL return HTTP 500 without leaking internal stack traces in the response body.
