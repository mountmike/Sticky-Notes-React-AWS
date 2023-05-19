const db = require("../db")
const MarkdownIt = require('markdown-it')
const md = new MarkdownIt()
const AppError = require("../lib/app_error")

const backgroundColours = ["#f6c2d9", "#fff69b", "#bcdfc9", "#a1c8e9", "#e4dae2"]

class Note {

    static findAll() {
        return db.query("select * from notes order by id asc;").then(res => res.rows)
    }

    static findById(id) {
        let sql = "select * from notes where id = $1;"
        return db.query(sql, [id])
        .then(res => {
            if (res.rows.length === 0) {
                throw new AppError(404, "record not found")
            }
            return res.rows[0]
        })
    }
    static create(newNote) {
        let sql = `insert into notes (content, content_html, background_colour) values ($1, $2, $3) returning *;`
        return db.query(sql, [newNote.content, md.render(newNote.content), backgroundColours[Math.floor(Math.random()*5)]])
        .then(res => res.rows[0])
        .catch((error) => {
            console.log(error);
        })
    }

    static update(id, newNote) {
        let sql = `update notes set content = $2, content_html = $3 where id = $1 returning *;`
        return db.query(sql, [id, newNote.content, md.render(newNote.content)])
            .then(res => res.rows[0])
    }

    static destroy(id) {
        let sql = `delete from notes where id = $1;`
        return db.query(sql, [id])
    }
}

  module.exports = Note