# TASKLY API

A RESTful API for managing tasks and notes. Built with TypeScript, Express, Prisma ORM, and MySQL.

## Technologies

- Node.js
- Express
- MySQL
- Prisma ORM
- Zod for validations
- TypeScript
- CORS
- Docker for running the database

## Pre-requisites

Before running this project, make sure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) for running the Database container

## Installation

1. Clone the repository:

```bash
git clone https://github.com/FelipeCervaMartini/ANMAR25_DSUP_TASKLY.git
cd ANMAR25_DSUP_TASKLY
```

2. Install the dependencies:

```bash
npm install
```

3. Configure the Environment Variables with a new .env file based on .env.example file

```
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
PORT=3000
```

4. Run the database with Docker:

```bash
docker-compose up -d
```

5. Execute the migrations with Prisma:

```bash
npx prisma migrate dev
```

6. Start the server:

```bash
npm start
```

This uses ts-node-dev to run src/config/server.ts with reload support.

## Project structure:

```
task-notes-api/
- src/
  - config/
    - server.ts
  - controllers/
    - TaskController.ts
    - NoteController.ts
  - middlewares/
    - errorMiddleware.ts
  - repositories/
    - NoteRepository.ts
    - TaskRepository.ts
  - routes/
    - task.routes.ts
    - note.routes.ts
  - services/
    - NoteService.ts
    - TaskService.ts
  - validators/
    - note.schema.ts
    - task.schema.ts
  - app.ts
```

### 🛠️ Error Handling

This API uses a global error handler as a fallback to catch any unhandled errors.
The global error handler ensures the API responds with a clear error message if something unexpected happens, it acts as a safety net for errors not explicitly handled in controllers.

### Extra features

- Task status system (`TODO`, `IN_PROGRESS`, `DONE`)
- Task priority system (`LOW`, `MEDIUM`, `HIGH`)
- Task categorization by custom labels
- Advanced filters and full-text search on tasks and notes
- Pagination available on all list endpoints
- Data validation

## Test the API:

- Use tools such as Postman or Insomnia for interaction with the endpoints of the API

## Endpoints

### Tasks

| Method | Route                     | Description                                         | Body/Query examples                                                         | Response                                                                                  |
| ------ | ------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| POST   | /api/tasks                | Create a new Task                                   | `{ title, description, status, priority, category }`                        | `{ id, title, description, status, priority, category, createdAt, updatedAt }`            |
| GET    | /api/tasks                | Show all tasks with pagination and optional filters | `?page=1&limit=10&title=text&status=status&priority=HIGH&category=trabalho` | `{ data of each task }`                                                                   |
| GET    | /api/tasks/:id            | Search for a specific task                          | -                                                                           | `{ id, title, description, status, priority, category, notes: [], createdAt, updatedAt }` |
| GET    | /api/tasks/status/:status | Get all tasks based on status                       | `?page=1&limit=10`                                                          | `{ data of each task }`                                                                   |
| PUT    | /api/tasks/:id            | Update task                                         | `{ title, description, status, priority, category }`                        | `{ id, title, description, status, priority, category, updatedAt }`                       |
| DELETE | /api/tasks/:id            | Delete task                                         | -                                                                           | `{ message: "Task deleted" }`                                                             |

---

### Notes

| Method | Route                    | Description                | Body/Query examples             | Response                                        |
| ------ | ------------------------ | -------------------------- | ------------------------------- | ----------------------------------------------- |
| POST   | /api/tasks/:taskId/notes | Create new note on a task  | `{ text }`                      | `{ id, content, taskId, createdAt, updatedAt }` |
| GET    | /api/tasks/:taskId/notes | Show all notes of a task   | `?page=1&limit=10&search=texto` | `{ data of each note }`                         |
| GET    | /api/notes/:id           | Search for a specific note | -                               | `{ id, content, taskId, createdAt, updatedAt }` |
| PUT    | /api/notes/:id           | Update note                | `{ content }`                   | `{ id, content, taskId, updatedAt }`            |
| DELETE | /api/notes/:id           | Delete note                | -                               | `{ message: "Note deleted" }`                   |

## Conventional Commits Patterns:

- this project follows the Conventional Commits Patterns

## Developers:

    - https://github.com/FelipeCervaMartini
