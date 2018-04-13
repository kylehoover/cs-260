const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const changeCase = require('change-case-object')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const express = require('express')
const path = require('path')

const books = require('./books')
const env = process.env.NODE_ENV || 'development'
const jwtSecret = process.env.JWT_SECRET
const saltRounds = 10

// knex
const config = require('./knexfile')
const knex = require('knex')(config[env])

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static('dist'))

const verifyToken = (req, res, next) => {
  const { token } = req.cookies

  if (!token)
    return res.status(401).send()

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err)
      return res.status(500).send()

    req.userId = decoded.userId
    next()
  })
}

app.post('/api/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    res.status(400).send()

  knex('users')
    .where('email', email)
    .first()
    .then(user => {
      if (user === undefined)
        throw new Error('invalid_credentials')

      return [user, bcrypt.compare(password, user.hash)]
    })
    .spread((user, passwordIsCorrect) => {
      if (passwordIsCorrect) {
        delete user.hash
        const token = jwt.sign({ userId: user.id }, jwtSecret)
        res
          .status(200)
          .cookie('token', token, { httpOnly: true })
          .json({ user: changeCase.camelCase(user) })
      }
      else
        throw new Error('invalid_credentials')
    })
    .catch(err => {
      if (err.message === 'invalid_credentials')
        res.status(400)
      else
        res.status(500)

      res.send()
    })
})

app.post('/api/logout', (req, res) => {
  res.clearCookie('token')
  res.status(200).send()
})

app.post('/api/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body

  if (!firstName || !email || !password)
    res.status(400).send()

  knex('users')
    .where('email', email)
    .first()
    .then(user => {
      if (user !== undefined)
        throw new Error('duplicate_email')

      return bcrypt.hash(password, saltRounds)
    })
    .then(hash => {
      return knex('users').insert({ first_name: firstName, last_name: lastName, email, hash})
    })
    .then(ids => {
      return knex('users').where('id', ids[0]).first('id', 'first_name', 'last_name')
    })
    .then(user => {
      const token = jwt.sign({ userId: user.id }, jwtSecret)
      res
        .status(201)
        .cookie('token', token, { httpOnly: true })
        .json({ user: changeCase.camelCase(user) })
    })
    .catch(err => {
      console.log(err)

      if (err.message === 'duplicate_email')
        res.status(409)
      else
        res.status(500)

      res.send()
    })
})

app.get('/api/users/:id/books', verifyToken, (req, res) => {
  const { userId } = req
  const id = parseInt(req.params.id)

  console.log(userId, id)

  if (userId !== id)
    return res.status(401).send()

  knex('users')
    .join('users_books', 'users.id', 'users_books.user_id')
    .join('books', 'books.id', 'users_books.book_id')
    .where('users.id', id)
    .select('title', 'author', 'isbn', 'pages', 'img', 'status', 'users_books.id as users_books_id')
    .then(books => {
      return [
        books,
        knex('history')
          .join('users_books', 'users_books.id', 'history.users_books_id')
          .whereIn('users_books.id', books.map(book => book.users_books_id))
          .select('type', 'date', 'users_books.id as users_books_id')
          .orderBy('date')
      ]
    })
    .spread((books, histories) => {
      histories = histories.reduce((acc, history) => {
        acc[history.users_books_id] = acc[history.users_books_id] || []
        acc[history.users_books_id].push(history)
        return acc
      }, {})
      books = books.map(book => {
        book.history = histories[book.users_books_id] || []
        return book
      })
      res.status(200).json({ books })
    })
})

app.get('/api/books', (req, res) => {
  res.json({ books })
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

app.get('/api/users/me', verifyToken, (req, res) => {
  const { userId } = req

  knex('users')
    .where('id', userId)
    .first('id', 'first_name', 'last_name')
    .then(user => {
      res.status(200).json({ user: changeCase.camelCase(user) })
    })
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(3000, () => console.log('Server listening on port 3000'))
