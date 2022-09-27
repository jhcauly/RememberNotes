const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {

  const { titleText, textTitle } = req.body;

  if (req.body) {
    const newNotes = {
      titleText,
      textTitle,
      notes_id: uuid(),
    };

    readAndAppend(newNotes, './db/notes.json');
    res.json(`Notes added successfully 🚀`);
  } else {
    res.error('Error in adding notes');
  }
});

module.exports = notes;
