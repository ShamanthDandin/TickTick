import { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {

    const { addNote } = useContext(NoteContext)
    const [note, setnote] = useState({ title: "", description: "", tag: "" })

    const handleOnClick = (event) => {
        event.preventDefault()
        addNote(note.title, note.description, note.tag)
        props.showAlert('Note has been successfully added. View it below', 'success')
        setnote({ title: "", description: "", tag: "" })
    }

    const handleOnChange = (event) => {
        setnote({
            ...note,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div>
            <div className="container my-5">
                <h1>Add a Note</h1>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label customLabel">Title</label>
                        <input value={note.title} minLength={3} required={true} type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={handleOnChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label customLabel">Description</label>
                        <input value={note.description} type="text" minLength={5} required={true} className="form-control" id="description" name="description" onChange={handleOnChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label customLabel">Tag</label>
                        <input value={note.tag} type="text" className="form-control" id="tag" name="tag" onChange={handleOnChange} />
                    </div>

                    <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleOnClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
