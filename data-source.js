require('dotenv').config()

module.exports = {
  "username": process.env.DB_USER,
  "password": process.env.DB_USER_PASSWORD,
  "database": process.env.DB_NAME,
  "host": process.env.HOST,
  "dialect": process.env.DIALECT,
  "port": parseInt(process.env.DB_PORT),
  // "logging": true // this will log all the queries in the console
}