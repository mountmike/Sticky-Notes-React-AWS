const User = require("../models/users")

User.create("mike", "123")
    .then(res => console.log(res))
    .catch(err => console.log(err))