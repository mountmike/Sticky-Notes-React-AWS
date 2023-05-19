import { useState } from "react"
import "./Note.css"
import { updateNote, deleteNote } from '../utils/notes_api'

export default function Note({ note, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false)
    const [content, setContent] = useState(note.content)

    const handleToggleEdit = (e) => {
        setIsEditing(!isEditing)
    }

    const handleSave = (e) => {
        return updateNote(note.id, content)
            .then(newNote => {
                setIsEditing(false)
                onUpdate(newNote)
                // setHtml(newNote.content_html)
            })
    }

    const handleDelete = (e) => {
        deleteNote(note.id)
            .then(res => onDelete(note.id))
    }

    return (
        <div className="note-wrapper" key={note.id}>
            <span onClick={handleDelete} className="delete-btn"></span>
            <article className="note">
            {isEditing ? 
            <textarea onChange={e => setContent(e.target.value)}>
                {content}
            </textarea> 
            : 
            <div 
                dangerouslySetInnerHTML={{__html: note.content_html }}
                className="content">
            </div>
            }
            </article>
            <footer>
                <button onClick={handleToggleEdit}>{isEditing ? "cancel" : "edit"}</button>
                {isEditing ? <button onClick={handleSave}>save</button> : null}
            </footer>
        </div>
    )
}