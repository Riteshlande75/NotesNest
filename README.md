# NoteNest 🗒️

[![Node.js](https://img.shields.io/badge/Node.js-v18-green)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.18-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green.svg)](https://mongodb.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

NoteNest is a modern, full-stack note-taking web application built with Node.js, Express.js, MongoDB, and vanilla JavaScript. Create, edit, search, and organize your notes with tags in a clean, responsive interface.

## ✨ Features

- 📝 **Full CRUD Operations**: Create, read, update, and delete notes
- 🔍 **Smart Search**: Search notes by title, content, or tags
- 🏷️ **Tag Support**: Add and filter notes by comma-separated tags
- 👁️ **Live Preview**: Real-time note preview and editing
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🌱 **Demo Data**: Quick seed script for sample notes
- 🚀 **Production Ready**: Error handling, validation, and optimized code

## 🛠️ Tech Stack

| Frontend | Backend | Database | Tools |
|----------|---------|----------|-------|
| HTML5 | Node.js | MongoDB | Nodemon |
| CSS3 | Express.js | Mongoose | dotenv |
| Vanilla JS | CORS | | |

## 🚀 Quick Start

1. **Clone & Install**
```bash
git clone <repo> notenest
cd notenest
npm install
```

2. **Setup Environment**
Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/notenest
PORT=3000
```

3. **Seed Demo Data** (optional)
```bash
npm run seed
```

4. **Run the App**
```bash
npm run dev    # Development with hot reload
# or
npm start      # Production
```

Open [http://localhost:3000](http://localhost:3000)

## 📋 npm Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Run in production (`node server.js`) |
| `npm run dev` | Run in development (`nodemon server.js`) |
| `npm run seed` | Seed database with demo notes |

## 🗄️ API Documentation

All endpoints: `/api/notes`

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `GET` | `/` | List all notes | `?q=term` (search) |
| `GET` | `/:id` | Get single note | - |
| `POST` | `/` | Create note | `{title, content?, tags?}` |
| `PUT` | `/:id` | Update note | `{title, content?, tags?}` |
| `DELETE` | `/:id` | Delete note | - |

**Note Model:**
```javascript
{
  title: String (required, max 200 chars),
  content: String,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## 📁 Project Structure

```
NotesNest/
├── server.js           # Express server
├── models/Note.js      # Mongoose schema
├── routes/notes.js     # API routes
├── public/             # Frontend SPA
│   ├── index.html
│   ├── css/style.css
│   └── js/app.js
├── seed/seedNotes.js   # Demo data
├── package.json
└── README.md
```

## 🎨 UI Screenshots

*(Add screenshots of the app interface here)*

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is [MIT](LICENSE) licensed.

---

**Built with ❤️ for developers who love clean code**

