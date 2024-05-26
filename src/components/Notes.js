import { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useHistory } from 'react-router';

const Notes = (props) => {

    const { notes, getNotes, editNote } = useContext(NoteContext)
    const history = useHistory()

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            getNotes()
        }

        else {
            history.push('/login')
        }
        // eslint-disable-next-line
    }, [])

    const refOpenModal = useRef(null)
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "General" })

    const updateNote = (currentNote) => {
        refOpenModal.current.click()
        setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleOnChange = (event) => {
        setnote({
            ...note,
            [event.target.name]: event.target.value
        })
    }

    const handleOnSave = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        props.showAlert('Note has been successfully updated', 'success')
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />

            <button style={{ display: 'none' }} type="button" ref={refOpenModal} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input value={note.etitle} type="text" minLength={3} required={true} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={handleOnChange} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input value={note.edescription} type="text" minLength={5} required={true} className="form-control" id="edescription" name="edescription" onChange={handleOnChange} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input value={note.etag} type="text" className="form-control" id="etag" name="etag" onChange={handleOnChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5} onClick={handleOnSave} type="button" className="btn btn-primary" data-bs-dismiss="modal">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <h1 className="my-3">Your Notes</h1>
                <div className="container">
                    {notes.length ? notes.map(note => {
                        return <Noteitem updateNote={updateNote} note={note} key={note._id} />

                    }) : <p className='customName'>There are no notes to display, create one to get started.</p>}
                </div>
            </div>
        </>
    )
}

export default Notes
