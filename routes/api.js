import express from 'express';
import fs from 'fs/promises';  // Use promises version of the 'fs' module
import path from 'path';
import { v4 as uuidv4 } from 'uuid';  // To assign unique IDs to your notes

const router = express.Router();

// Path to the db.json file where notes are saved
const dbPath = path.join(__dirname, '../db/db.json');

// GET /api/notes
router.get('/notes', async (req, res) => {
    try {
        const notes = await fs.readFile(dbPath, 'utf8');
        res.json(JSON.parse(notes));
    } catch (err) {
        res.status(500).json({ error: "Failed to read notes." });
    }
});

// POST /api/notes
router.post('/notes', async (req, res) => {
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    };

    try {
        const notes = JSON.parse(await fs.readFile(dbPath, 'utf8'));
        notes.push(newNote);
        await fs.writeFile(dbPath, JSON.stringify(notes, null, 2));
        res.json(newNote);
    } catch (err) {
        res.status(500).json({ error: "Failed to save the note." });
    }
});

// DELETE /api/notes/:id
router.delete('/notes/:id', async (req, res) => {
    const noteId = req.params.id;

    try {
        let notes = JSON.parse(await fs.readFile(dbPath, 'utf8'));
        notes = notes.filter(note => note.id !== noteId);
        await fs.writeFile(dbPath, JSON.stringify(notes, null, 2));
        res.json({ message: "Note deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete the note." });
    }
});

export default router;
