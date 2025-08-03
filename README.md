# Project: Vladislavski File Uploader

## Features
- File upload via REST API
- MongoDB integration
- Prevents duplicate items by itemId

## Tech Stack
- Node.js
- Express
- MongoDB (Mongoose)
- Multer

## Usage
POST /upload  
form-data:
- itemId: string
- name: string
- description: string
- file: file
