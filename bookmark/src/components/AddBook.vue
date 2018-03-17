<template>
  <div>
    <form id="search-form" v-if="view === 'form'" @submit.prevent="search">
      <header class="page-header">
        Add a New Book
      </header>
      <div class="row">
        <div class="input-field col s12">
          <input id="title" type="text" autofocus v-model="title" />
          <label for="title">Book Title</label>
        </div>
        <div class="input-field col s12">
          <input id="author" type="text" v-model="author" />
          <label for="author">Author</label>
        </div>
        <div class="input-field col s12">
          <input id="isbn" type="number" v-model="isbn" />
          <label for="isbn">ISBN</label>
        </div>
      </div>
      <button class="waves-effect waves-light btn primary" type="submit">Search</button>
    </form>
    <div id="spinner" v-if="view === 'searching'">
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
        </div>
      </div>
    </div>
    <div id="results" v-if="view === 'results'">
      <button id="new-search" class="waves-effect waves-light btn primary" @click="newSearch">
        New Search
      </button>
      <ul id="books">
        <li v-if="!results">
          No books were found that match your search criteria
        </li>
        <li class="book" v-else v-for="book in results">
          <img v-if="book.volumeInfo.imageLinks" :src="book.volumeInfo.imageLinks.thumbnail" />
          <div class="book-info">
            <header class="page-header book-title">
              {{ book.volumeInfo.title }}
            </header>
            <div class="book-subtitle" v-if="book.volumeInfo.subtitle">
              {{ book.volumeInfo.subtitle }}
            </div>
            <div class="author" v-if="book.volumeInfo.authors">
              {{ book.volumeInfo.authors.join(', ') }}
            </div>
            <div class="action-btns">
              <a class="waves-effect waves-light btn grey modal-trigger" :href="'#' + book.id" v-if="book.volumeInfo.description">
                Description
              </a>
              <button class="waves-effect waves-light btn secondary" @click="addBook(book)">
                Add
              </button>
            </div>
          </div>
          <div :id="book.id" class="modal" v-if="book.volumeInfo.description">
            <div class="modal-content">
              <h4>Description</h4>
              <p>{{ book.volumeInfo.description }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'AddBook',
    data: function () {
      return {
        author: '',
        isbn: '',
        title: '',
        results: undefined,
        view: 'form'
      }
    },
    methods: {
      addBook: function (book) {
        const info = book.volumeInfo
        const isbn = parseInt(info.industryIdentifiers.filter(id => id.type === 'ISBN_13')[0].identifier)

        if (this.$store.state.books.findIndex(book => book.isbn === isbn) !== -1) {
          Materialize.toast('This book is already in your collection!', 2000)
          return
        }

        const bookToAdd = {
          title: info.title,
          author: info.authors && info.authors.join(', '),
          isbn: isbn,
          pages: info.pageCount,
          status: 'wantToRead',
          img: info.imageLinks.thumbnail,
          history: [],
          notes: []
        }
        this.$store.dispatch('addBook', {book: bookToAdd, router: this.$router})
      },
      search: function () {
        if (!this.title && !this.author && !this.isbn)
          Materialize.toast('Please provide either a title, author, or ISBN number', 5000)
        else {
          this.view = 'searching'
          let url = 'https://www.googleapis.com/books/v1/volumes?orderBy=relevance&printType=books&q='

          if (this.title)
            url += 'intitle:' + this.title
          if (this.author)
            url += 'inauthor:' + this.author
          if (this.isbn)
            url += 'isbn:' + this.isbn

          axios.get(url)
            .then(resp => {
              console.log(resp)
              this.results = resp.data.items &&
                resp.data.items.filter(book => {
                  const info = book.volumeInfo
                  const hasISBN = info.industryIdentifiers && info.industryIdentifiers.findIndex(id => id.type === 'ISBN_13') !== -1
                  return hasISBN && info.imageLinks
                })
              this.view = 'results'
            })
        }
      },
      newSearch: function () {
        this.author = ''
        this.isbn = ''
        this.title = ''
        this.view = 'form'
      }
    },
    updated: function () {
      $('.modal').modal()
    }
  }
</script>

<style scoped>
  .author {
    color: #9e9e9e;
    margin-bottom: 48px;
  }

  .book {
    border-bottom: 2px solid #8A53A6;;
    display: flex;
    margin-top: 48px;
    min-height: 160px;
    padding-bottom: 48px;
  }

  .book:first-child {
    margin-top: 0;
  }

  .book:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .book > img {
    max-height: 160px;
  }

  .book > *:not(.modal) {
    margin-right: 32px;
  }

  .book > *:last-child:not(.modal) {
    margin-right: 0;
  }

  .book-info {
    display: flex;
    flex-wrap: wrap;
  }

  .book-info > * {
    width: 100%;
  }

  .book-info > .author {
    margin-bottom: 8px;
  }

  .book-info > .book-subtitle {
    color: #9e9e9e;
  }

  .book-info > .action-btns {
    align-self: flex-end;
  }

  .book-info > .action-btns > * {
    margin-right: 48px;
  }

  .book-info > .action-btns > *:last-child {
    margin-right: 0;
  }

  .page-header.book-title {
    line-height: 40px;
    margin: 0;
  }

  #new-search {
    margin-bottom: 48px;
  }

  #spinner {
    display: flex;
    justify-content: center;
    margin: 100px 0;
  }

  @media only screen and (min-width: 928px) {
    #search-form > .row > .col {
      width: 50%;
    }
  }
</style>
