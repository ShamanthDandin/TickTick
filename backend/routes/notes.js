const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

const router = express.Router()

// ROUTE 1: Get all notes of the logged in user: Method -> GET on "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    const notes = await Note.find({ user: req.user.id })
    return res.json(notes)
})

// ROUTE 2: Add a new note of the logged in user: Method -> POST on "/api/notes/addnote". Login required
router.post(
    '/addnote',
    fetchuser,
    body('title', 'Enter a valid title with at least 3 characters').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
    async (req, res) => {

        // Check if there are any validation errors and act accordingly with a 400 bad request
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { title, description, tag } = req.body
        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id
        })

        try {

            const createdNote = await note.save()
            return res.json(createdNote)

        } catch (error) {

            console.error(error)
            return res.status(500).send("Internal Server Error")
        }
    }
)

// ROUTE 3: Update a note of the logged in user: Method -> PATCH on "/api/notes/updatenote/:id". Login required
router.put(
    '/updatenote/:id',
    fetchuser,
    body('title', 'Enter a valid title with at least 3 characters').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
    async (req, res) => {

        // Check if there are any validation errors and act accordingly with a 400 bad request
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { title, description, tag } = req.body
        const newNote = {}

        if (title) {
            newNote.title = title
        }

        if (description) {
            newNote.description = description
        }

        if (tag) {
            newNote.tag = tag
        }

        try {

            const note = await Note.findById(req.params.id)
            if (!note) {
                return res.status(404).send("Note not found")
            }

            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Unauthorised")
            }

            const savedNote = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            return res.json(savedNote)

        } catch (error) {

            console.error(error)
            return res.status(500).send("Internal Server Error")
        }
    }
)

// ROUTE 4: Delete an existing note of the logged in user: Method -> DELETE on "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {

        const note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Note not found")
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorised")
        }

        await Note.findByIdAndDelete(req.params.id)
        return res.sendStatus(204)

    } catch (error) {

        console.error(error)
        return res.status(500).send("Internal Server Error")
    }
})

module.exports = router;