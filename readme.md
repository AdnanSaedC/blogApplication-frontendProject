# 08 - Blog Application (Frontend)

A full-featured **Blog Application** built with React. It allows users to sign up, log in, create/edit/delete blog posts with a rich text editor, and view all published posts.

## Features

- User authentication (sign up, log in, log out) via Appwrite
- Create, edit, and delete blog posts
- Rich text editor powered by TinyMCE
- HTML content rendering with html-react-parser
- Global state management with Redux Toolkit
- Form handling and validation with React Hook Form
- Protected routes for authenticated users
- Responsive layout

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React (Vite) |
| Backend-as-a-Service | Appwrite |
| State Management | Redux Toolkit |
| Rich Text Editor | TinyMCE |
| Form Management | React Hook Form |
| HTML Parser | html-react-parser |
| Routing | React Router DOM |
| Styling | Tailwind CSS |

## Getting Started

### Prerequisites

- Node.js >= 18
- An [Appwrite](https://appwrite.io) project with Auth and Database configured
- A [TinyMCE](https://www.tiny.cloud) API key

### Installation

```bash
# Clone the repository
git clone https://github.com/AdnanSaedC/blogApplication-frontendProject.git
cd blogApplication-frontendProject/blog

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file inside the `blog/` directory:

```env
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
VITE_TINYMCE_API_KEY=your_tinymce_api_key
```

### Run the App

```bash
npm run dev
```

## Project Structure

```
blog/
├── src/
│   ├── appwrite/       # Appwrite service configs (auth, database, storage)
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page-level components (Home, Login, Post, etc.)
│   ├── store/          # Redux store and slices
│   ├── App.jsx         # Root component with routes
│   └── main.jsx        # Entry point
├── public/
├── index.html
└── vite.config.js
```
