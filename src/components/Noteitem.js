import { useContext } from 'react';
import NoteContext from "../context/notes/NoteContext";

const Noteitem = (props) => {

    const { deleteNote } = useContext(NoteContext)
    const { title, description, _id, tag } = props.note

    return (

        <div className="card col-md-3 my-3 mx-3">
            <div className="card-body">
                <h5 className="card-title">{title} {tag && `(${tag})`}</h5>
                <p className="card-text">{description}</p>
                <i className="fas fa-trash-alt mx-2" onClick={() => deleteNote(_id)}></i>
                <i className="far fa-edit mx-2" onClick={() => props.updateNote(props.note)}></i>
            </div>
        </div>
    )
}

export default Noteitem
