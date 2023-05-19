const Note = require("../models/notes")

let notes = ["note one", "we **love** css", "# note heading"]

notes.forEach(note => {
    Note.create({ content: note })
})
 