const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const books = require('./books')

const app = express()

app.use(express.static('dist'))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.get('/api/books', (req, res) => {
  res.json(books)
})

app.post('/api/books', (req, res) => {
  const book = req.body
  books.push(book)
  res.status(201).json(book)
})

app.put('/api/books/:isbn', (req, res) => {
  const isbn = parseInt(req.params.isbn)
  const index = books.findIndex(book => book.isbn === isbn)

  if (index  === -1)
    res.sendStatus(404)

  books.splice(index, 1, req.body)
  res.json(books[index])
})

app.delete('/api/books/:isbn', (req, res) => {
  const isbn = parseInt(req.params.isbn)
  const index = books.findIndex(book => book.isbn === isbn)

  if (index  === -1)
    res.sendStatus(404)

  books.splice(index, 1)
  res.sendStatus(204)
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(3000, () => console.log('Server listening on port 3000'))
