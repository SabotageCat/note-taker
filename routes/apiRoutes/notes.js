const router = require('express').Router();
const { findById, createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/db.json');
const uniqid = require('uniqid');

// get all notes
router.get('/notes', (req, res) => {
    res.json(notes);
});

// get specific note
router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);

    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// post note
router.post('/notes', (req, res) => {
    req.body.id = uniqid();
    console.log(req.body);

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted!');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

module.exports = router;