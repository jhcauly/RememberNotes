const express = require('express');
const path = require('path');
const notData = require('./db/db.json');
const uuid = require('./helpers/uuid');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');

const PORT = process.env.PORT || 3001;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/notes', (req, res) => res.json(notData));
app.post('/api/notes', (req, res) => {
/*   console.log(res) */
  // Log that a POST request was received
/*   console.info(`${req.method} request received to add a review`); */

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;
  // If all the required properties are present
  if (title && text) {

    // Variable for the object we will save
    const newNotes = {
      title,
      text,
      notes_id: uuid(),
    };

    const response = {
      status: 'success',
      body: newNotes,
    };

    readAndAppend(newNotes, './db/db.json');
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
});
app.delete("/api/notes/:id", (req, res) => {
  let chosenNoteToDelete = req.params.id;
  readFromFile(chosenNoteToDelete, './db/db.json');
});
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
