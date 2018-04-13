import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: [],
    goal: 12,
    loginError: false,
    registerError: false,
    user: {}
  },
  getters: {
    bookById: (state) => (id) => {
      for (let book of state.books) {
        if (book.id === id)
          return book
      }

      return undefined
    },
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
    },
    setLoginError (state, error) {
      state.loginError = error
    },
    setRegisterError (state, error) {
      state.registerError = error
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    addBook (context, { book, router }) {
      let id
      axios.post(`/api/users/${context.state.user.id}/books`, book)
        .then(resp => {
          id = resp.data.bookId
          return context.dispatch('fetchBooks')
        })
        .then(resp => {
          router.push(`/books/${id}/`)
        })
        .catch(err => {
          console.log('Failed to add book', err)
        })
    },
    fetchBooks (context) {
      axios.get(`/api/users/${context.state.user.id}/books`)
        .then(resp => {
          console.log(resp)
          context.commit('setBooks', resp.data.books)
        })
        .catch(err => {
          console.log('Failed to fetch books', err)
        })
    },
    init (context, router) {
      axios.get('/api/users/me')
        .then(resp => {
          context.commit('setLoginError', false)
          context.commit('setRegisterError', false)
          context.commit('setUser', resp.data.user)
          context.dispatch('fetchBooks')
        })
        .catch(err => {
          router.push('/')
        })
    },
    login (context, { data, router }) {
      axios.post('/api/login', data)
        .then(resp => {
          context.commit('setLoginError', false)
          context.commit('setRegisterError', false)
          context.commit('setUser', resp.data.user)
          context.dispatch('fetchBooks')
          router.push('/home/')
        })
        .catch(err => {
          context.commit('setLoginError', true)
        })
    },
    logout (context, router) {
      axios.post('/api/logout')
        .then(resp => {
          context.commit('setBooks', [])
          context.commit('setUser', {})
          router.push('/')
        })
    },
    register(context, { data, router }) {
      axios.post('/api/register', data)
        .then(resp => {
          context.commit('setLoginError', false)
          context.commit('setRegisterError', false)
          context.commit('setUser', resp.data.user)
          context.dispatch('fetchBooks')
          router.push('/about/')
        })
        .catch(err => {
          context.commit('setRegisterError', true)
        })
    },
    removeBook (context, { bookId, router }) {
      axios.delete(`/api/users/${context.state.user.id}/books/${bookId}`)
        .then(resp => {
          context.dispatch('fetchBooks')
          router.push('/home/')
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
    },
    updateStatus (context, { bookId, status, history }) {
      axios.put(`/api/users/${context.state.user.id}/books/${bookId}/status`, { status, history })
        .catch(err => {
          console.log('Failed to update status', err)
        })
    }
  }
})
