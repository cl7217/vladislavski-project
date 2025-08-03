# Vladislavski File Upload API

## Project Description
A Node.js backend API that allows uploading files along with item details, saves them to a MongoDB database, and prevents duplicate items based on `itemId`.

---

## Technologies
- Node.js
- Express
- MongoDB (Native Driver)
- Multer (for file uploads)
- Jest + Supertest (for automated testing)

---

## Prerequisites
- Node.js installed
- MongoDB running at `mongodb://localhost:27017`

---

## Installation & Running

```bash
git clone <repository-url>
cd vladislavski-project
npm install
npm run dev    # Start the server with nodemon
