const db = require("../db")
const bcrypt = require("bcrypt")

class User {
    static create(username, password) {
        const sql = `
        INSERT INTO users (username, password_digest) 
        values ($1, $2) returning *`

        return bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(password, salt))
            .then(hash => db.query(sql, [username, hash]))
            .then(res => res.rows[0])
    }
}

module.exports = User