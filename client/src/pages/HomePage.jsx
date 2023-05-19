import { useState, useEffect } from "react"
import Note from '../components/Note'
import { addNewNote } from '../utils/notes_api'
import "./HomePage.css"

export default function HomePage({ user }) {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState("")

    const deleteNote = id => {
        setNotes(notes.filter(note => note.id !== id))
    }

    const updateNote = newNote => {
        setNotes(notes.map(n => {
            if (n.id === newNote.id) {
                return { ...n, ...newNote }
            } else {
                return n
            }
        }))
    }

    const addNote = () => {
        addNewNote(newNote)
            .then(res => {
                setNotes([ ...notes, res ])
                setNewNote("")
            })
        
    }

    useEffect(() => {
        fetch("/api/notes")
            .then(res => res.json())
            .then(setNotes)
    }, [])

    const handleNewNoteChange = e => {
        setNewNote(e.target.value)
    }
    

    return (
        <main>
            <header>
                { user && <h2>logged in as {user.username}</h2> }
                
            </header>
            <section className="add-note-wrapper">
                    <textarea onChange={handleNewNoteChange} value={newNote}></textarea>
                    <button onClick={addNote}>add</button>
            </section>
            <section className="note-section">
                
                {notes.map(note => (
                <Note key={note.id} note={note} onDelete={deleteNote} onUpdate={updateNote} />
                ))}
            </section>
        </main>
    )
}