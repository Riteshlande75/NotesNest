require('dotenv').config();
const mongoose = require('mongoose');
const Note = require('../models/Note');

const notes = [
  { title: 'Welcome to NoteNest', content: 'This is your first note. Edit or delete it!', tags: ['welcome','intro'] },
  { title: 'Groceries', content: '- Milk\n- Eggs\n- Bread\n- Coffee', tags: ['shopping'] },
  { title: 'Ideas', content: 'App idea: note clustering by tag; add search and markdown.', tags: ['ideas','product'] }
];

async function seed() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('No MONGODB_URI in .env');
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to DB, seeding...');
    await Note.insertMany(notes);
    console.log('Seed complete.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
