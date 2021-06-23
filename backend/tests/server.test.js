const mongoose = require("mongoose")
const createServer = require("./app")
const Flashcard = require("../models/flashcard")
const supertest = require("supertest")

const uri = process.env.ATLAS_URI || "mongodb://127.0.0.1:27017/flashcards"

beforeEach((done) => {
  mongoose.connect(uri, { useNewUrlParser: true }, () => done())
})

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  })
})

const app = createServer()

test("GET /api/categories", async () => {
  const category = await Category.create({
    name: "Math"
  })

  await supertest(app)
    .get("/api/categories")
    .expect(200)
    .then((response) => {
      expect(Array.isArray(response.body)).toBeTruthy()
      expect(response.body.length).toEqual(1)

      // Check the response data
      expect(response.body[0]._id).toBe(category.id)
      expect(response.body[0].name).toBe(category.name)
    })
})