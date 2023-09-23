import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(__dirname, './../db/db.json');

const addNoteMiddleware = async (req, res, next) => {
    const newNote = req.body;

    try {
        const currentNotes = JSON.parse(await fs.readFile(dbPath, 'utf8'));

        if (!newNote.title || !newNote.text) {
            return res.status(400).json({ error: "Both title and text fields are required." });
        }

        newNote.id = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        currentNotes.push(newNote);

        await fs.writeFile(dbPath, JSON.stringify(currentNotes, null, 2));
        
        next();
    } catch (err) {
        res.status(500).json({ error: "Failed to save the note." });
    }
};

export default addNoteMiddleware;
