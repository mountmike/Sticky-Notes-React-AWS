const express = require("express")
const app = express()
const cors = require('cors')
const path = require("path");
const config = require("./config")
const validate = require("./middlewares/validate_urls")
const errorHandler = require("./middlewares/error_handler")

const Note = require("./models/notes.js")
const AppError = require("./lib/app_error")


app.use(express.static("public"))
app.use(express.json())

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/notes", (req, res) => {
  Note.findAll().then(notes => res.json(notes))
})

app.get("/api/notes/:id", validate.id, (req, res, next) => {
  const { id } = req.params
  Note.findById(id)
  .then(notes => res.json(notes))
  .catch(next)
})

app.post("/api/notes", validate.newNote, (req, res, next) => {
  Note.create({ content: req.body.content }).then(note => {
    res.json(note)
  }).catch(next)
})

app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params
  Note.destroy(id).then(() => res.json( { message: `note with id ${id} has been removed`}))
})
app.put("/api/notes/:id", (req, res, next) => {
  const { id } = req.params
  Note.update(id, req.body)
    .then(note => res.json(note))
    .catch(next)
})

app.use(errorHandler)

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`)
})
