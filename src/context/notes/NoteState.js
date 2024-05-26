import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000"
    const [notes, setNotes] = useState([])
    const [username, setusername] = useState("")

    // Get notes
    const getNotes = async () => {

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('authToken')
            }
        })

        const json = await response.json()
        if (json.length) {
            setNotes(json)
        }
    }

    // Add a note
    const addNote = async (title, description, tag) => {

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            },
            body: JSON.stringify({ title, description, tag })
        })

        const json = await response.json()
        setNotes(notes.concat(json))
    }

    // Delete a note
    const deleteNote = async (id) => {

        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': localStorage.getItem('authToken')
            }
        })

        const newNotes = notes.filter(note => note._id !== id)
        setNotes(newNotes)
        props.showAlert('Note has been deleted', 'success')
    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('authToken')
            },
            body: JSON.stringify({ title, description, tag })
        })

        const dbUpdatedNote = await response.json()

        let newNotes = JSON.parse(JSON.stringify(notes))
        newNotes = newNotes.filter(note => note._id !== id)
        newNotes = newNotes.concat(dbUpdatedNote)

        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, username, setusername, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;