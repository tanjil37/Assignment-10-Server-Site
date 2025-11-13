# The Book Haven Backend

## Overview
The **The Book Haven Backend** powers the digital library's core functionality, handling secure API routes for book management, user authentication integration, and real-time data operations with MongoDB. Developed with Node.js and Express.js, this server ensures robust CRUD operations, protected endpoints, and seamless data flow to the React frontend. It's designed for scalability, with error handling, loading optimizations, and support for features like real-time comment updates.

### API Documentation
Base URL: `https://thebookhaven-backend.vercel.app/api` <!-- Replace with your actual deployed URL -->

- **POST /books**: Add a new book (authenticated, with ImgBB image upload).
- **GET /books**: Fetch all books (supports sorting by rating query param: `?sort=rating-desc`).
- **GET /books/user/:email**: Fetch user's books for "My Books" page.
- **PUT /books/:id**: Update a book (authenticated, only owner's).
- **DELETE /books/:id**: Delete a book (authenticated, only owner's).
- **GET /books/:id**: Fetch single book details (includes comments).
- **POST /books/:id/comments**: Add user comment to book (authenticated, real-time via MongoDB).

All routes use JSON format and return status codes (200 OK, 401 Unauthorized, etc.). Use Axios or Postman for testing.

## Key Features
- **Secure CRUD Operations**: Full support for creating, reading, updating, and deleting books, with userEmail ownership checks to prevent unauthorized edits.
- **MongoDB Integration**: Efficient queries using Mongoose schemas for books (title, author, genre, rating, summary, coverImage, userEmail) and comments (userName, photoURL, text).
- **Authentication Middleware**: Integrates with Firebase tokens for protected routes like /add-book, /myBooks, /update-book/:id.
- **Advanced Queries**: Sorting by rating on All Books (using MongoDB $sort), and aggregation for top-rated books on homepage.
- **Error Handling & Optimization**: Custom loading responses, validation (e.g., rating 1-5), and no-cors policies for frontend compatibility.
- **Real-Time Support**: Comments update dynamically without full page reloads, leveraging efficient finds and pushes.

## Tech Stack
- **Runtime**: Node.js (v18+), Express.js
- **Database**: MongoDB Atlas with Mongoose ODM
- **Auth**: Firebase Admin SDK for token verification
- **Image Handling**: Multer for uploads, ImgBB API integration
- **Other**: dotenv for env vars, cors, helmet for security
- **Deployment**: Vercel for serverless hosting

## Getting Started
### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Firebase project (for auth)

### Installation
1. Clone the repository: `git clone https://github.com/yourusername/the-book-haven-server.git`
2. Navigate to the project: `cd the-book-haven-server`
3. Install dependencies: `npm install`
4. Set up environment variables in `.env`: