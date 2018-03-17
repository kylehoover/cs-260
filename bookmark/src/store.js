import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: [],
    goal: 12
  },
  getters: {
    bookByISBN: (state) => (isbn) => {
      for (let book of state.books) {
        if (book.isbn === isbn)
          return book
      }

      return undefined
    },
    pagesReadTotal: (state) => {
      return state.books
        .map(book => {
          return book.history.filter(event => event.type === 'finished').reduce((acc) => (acc + book.pages), 0)
        })
        .reduce((acc, pages) => (acc + pages), 0)
    },
    pagesReadByYear: (state) => (year) => {
      return state.books
        .filter(book => {
          for (let event of book.history) {
            const date = new Date(event.date)
            if (event.type === 'finished' && date.getFullYear() === year)
              return true
          }
          return false
        })
        .reduce((acc, book) => (acc + book.pages), 0)
    }
  },
  mutations: {
    setBooks (state, books) {
      state.books = books
    }
  },
  actions: {
    addBook (context, { book, router }) {
      axios.post('/api/books', book)
        .then(resp => {
          context.state.books.push(resp.data)
          router.push(`/books/${book.isbn}/`)
        })
        .catch(err => {
          console.log('Failed to add book', err)
        })
    },
    fetchBooks (context) {
      axios.get('/api/books')
        .then(resp => {
          context.commit('setBooks', resp.data)
        })
        .catch(err => {
          console.log('Failed to fetch books', err)
        })
    },
    removeBook (context, { isbn, router }) {
      axios.delete(`/api/books/${isbn}`)
        .then(resp => {
          context.dispatch('fetchBooks')
          router.push('/')
        })
        .catch(err => {
          console.log('Failed to delete book', err)
        })
    },
    updateBook (context, book) {
      axios.put(`/api/books/${book.isbn}`, book)
        .then(resp => {
          context.dispatch('fetchBooks')
        })
        .catch(err => {
          console.log('Failed to update book', err)
        })
    }
  }
})
