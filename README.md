# 📝 PERN Notes Application

A Notes Application built with the PERN stack. This project allows users to register, authenticate, and manage their personal notes.

## 🚀 Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Zod
- JWT
- bcryptjs
- Cookie Parser
- CORS

### Database

- PostgreSQL
- Supabase

---

## ✨ Features

- User Registration
- User Login
- User Logout
- JWT Authentication
- Protected Routes
- Password Hashing
- Create Notes
- Get All Notes
- Get Single Note
- Update Notes
- Delete Notes
- Note Status Management
- Note Priority Management
- Input Validation using Zod

---

## 📂 Project Structure

```text
pern-notes/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── generated/
│   └── prisma/
│
├── src/
│   ├── controllers/
│   │   ├── user.controller.ts
│   │   └── note.controller.ts
│   │
│   ├── routes/
│   │   ├── user.routes.ts
│   │   └── note.routes.ts
│   │
│   ├── middleware/
│   │   └── auth.middleware.ts
│   │
│   ├── config/
│   │   └── db.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── .gitignore
├── package.json
├── prisma.config.ts
└── tsconfig.json

🗄️ Database Models

User
├── id
├── name
├── email
├── password
└── notes

Note

Note
├── id
├── title
├── description
├── status
├── priority
├── date
└── authorId

📌 Note Status
pending
in_progress
completed

⚡ Note Priority
low
medium
high

🔐 Environment Variables

Create a .env file in the root directory:

DATABASE_URL="your_postgresql_database_url"

JWT_SECRET="your_jwt_secret"

PORT=5000

⚙️ Installation

1. Clone the repository
git clone <your-repository-url>

2. Navigate to the project directory
cd pern-notes

3. Install dependencies
npm install

4. Create environment variables

Create a .env file:

DATABASE_URL="your_postgresql_database_url"
JWT_SECRET="your_jwt_secret"
PORT=5000

5. Run Prisma migrations
npx prisma migrate dev

6. Generate Prisma Client
npx prisma generate

7. Start the development server
npm run dev

The server will run on:
http://localhost:5000

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/register` | Register a new user |
| POST | `/api/user/login` | Login user |
| POST | `/api/user/logout` | Logout user |

---

### 📝 Notes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/note` | Create a new note |
| GET | `/api/note` | Get all notes |
| GET | `/api/note/:id` | Get a single note |
| PATCH | `/api/note/:id` | Update a note |
| DELETE | `/api/note/:id` | Delete a note |

🛠️ Available Scripts

Development
npm run dev

Runs the server using:
tsx watch src/server.ts

Build
npm run build
Compiles TypeScript into JavaScript.

Production
npm start
Runs the compiled application.

👨‍💻 Author
Yuvraj Prasad