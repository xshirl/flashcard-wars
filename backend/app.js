const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const db = require("./db")
const routes = require("./routes")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))

var corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"],
}
app.use(cors(corsOption))
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

app.use("/api", routes)

mongoose.set("useFindAndModify", false)

db.on("error", console.error.bind(console, "MongoDB connection error"))

app.get("/", (req, res) => {
  res.send("Hello world")
})

function createServer() {
  const app = express()
  app.use(express.json())
  app.use("/api", routes)
  return app
}

module.exports = createServer
