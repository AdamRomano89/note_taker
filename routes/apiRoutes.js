const express = require('express');
const path = require('path');
const fs = require('fs')
const uuid = require('uuid');
let notes = require('../db/db.json');
const validText = require('../utils/text-valid');

const router = express.Router();

/**
 * ROUTE: GET '/notes'
 * Getting All The Application Notes
 */
router.get('/notes', (req, res) => {
  res.json(notes)
})

/**
 * ROUTE: POST '/notes'
 * Posting notes
 */
router.post('/notes', (req, res) => {
  const newNote = {
    id: uuid.v4(),
    title: req.body.title,
    text: req.body.text
  }

  if(!validText(newNote.title) && !validText(newNote.text)) {
    return res.status(400).json("Title & Text can not be empty")
  }

  notes.push(newNote)
  fs.writeFileSync(path.resolve(__dirname, '../db/db.json'), JSON.stringify(notes))

  res.status(201).json(newNote)
})

/**
 * ROUTE: DELETE '/notes/id'
 * Delete a note with it's id!
 */
router.delete('/notes/:id', (req, res) => {
  const noteToDelete = notes.find(note => note.id=== req.params.id)
  if(!noteToDelete) {
    return res.status(404).json('Nothing to delete!')
  }
  notes = notes.filter(note => note.id !== req.params.id)
  fs.writeFileSync(path.resolve(__dirname, '../db/db.json'), JSON.stringify(notes))
  res.json("Succesffully Deleted The Note")
})


module.exports = router;