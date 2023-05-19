const AppError = require("../lib/app_error")

const validations = {
    id: function(req, res, next) {
        const { id } = req.params
        if (/[^\d]/.test(id)) {
          throw new AppError(400, "id needs to be an integer")
        }
        next()
      },
    newNote: function(req, res, next) {
        const { content } = req.body
        if (content.trim() === "") {
          throw new AppError(400, "content cannot be empty")
        }
        next()
    }
}

 module.exports = validations