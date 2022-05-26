const fs = require('fs');
const path = require('path');

//get specific note for api get route
function findById(id, notes) {
    const result = notes.filter(notes => notes.id === id)[0];
    return result;
}

// add note to db for api post route
function createNewNote(body, notes) {
    const newNote = body;

    notes.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );

    return newNote;
}

// check if note has required information before posting
function validateNote(note) {
    if(!note.title || typeof note.title !== "string") {
        return false;
    }
    if (!note.text || typeof note.text !== "string") {
        return false;
    }
    return true;
}

// delete note and update db
function deleteNote(id, notes) {
    const deletedNote = notes.findIndex(notes => notes.id === id);

    notes.splice(deletedNote, 1);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );

    return deletedNote;
}

module.exports = { findById, createNewNote, validateNote, deleteNote };