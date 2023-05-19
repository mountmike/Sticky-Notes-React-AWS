require("dotenv").config()

module.exports = {
  port: process.env.PORT,
  db: {
    host: process.env.POSTGRESQL_DB_HOST,
    user: process.env.POSTGRESQL_DB_USER,
    password: process.env.POSTGRESQL_DB_PASSWORD,
    db: process.env.POSTGRESQL_DB,
    dialect: "postgres",
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 3000,
  },
}
