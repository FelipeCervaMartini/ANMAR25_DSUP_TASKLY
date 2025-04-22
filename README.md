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

- [Node.js] (https://nodejs.org/)
- [Docker] (https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) for running the Database container

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
