const bcrypt = require('bcrypt')
const db = require('../db')

db.on("error", console.error.bind(console, "MongoDB connection error:"))
const SALT_ROUNDS = 11

