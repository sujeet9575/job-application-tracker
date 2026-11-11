# Job Application Tracker

A full-stack MERN application that helps users manage and track their job applications.

## Features

- User Registrationgit status and Login
- JWT Authentication
- Protected Routes
- Add New Job Applications
- Edit and Delete Applications
- Search Jobs by Company or Position
- Filter Jobs by Application Status
- Sort Jobs by Date and Company
- Pagination
- Dashboard Statistics
- Responsive UI
- Loading Spinner and Empty State

## Tech Stack

**Frontend**
- React.js
- React Router
- Axios
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

## Application Status

- Applied
- Interview
- Selected
- Rejected

## Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Backend setup

```bash
cd job-application-tracker
npm install
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

### 4. Environment Variables

Create a `.env` file in the backend root directory and configure:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Never upload your real `.env` file or secrets to GitHub.

## Author

MERN Stack Developer | Node.js Backend Developer