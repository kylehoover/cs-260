<template>
  <div>
    <div v-if="book">
      <div class="book-container">
        <div class="left-pane">
          <div class="book-img">
            <img :src="book.img" />
            <status-icon :status="book.status"></status-icon>
          </div>
          <label for="reading-status">Reading Status</label>
          <select id="reading-status" class="browser-default" v-model="book.status" @change="updateStatus">
            <option value="currentlyReading">Currently Reading</option>
            <option value="read">Read</option>
            <option value="wantToRead">Want to Read</option>
          </select>
          <div class="book-info">
            <p># of times read: {{ numTimesRead }}</p>
            <p>Pages: {{ commaNumber(book.pages) }}</p>
          </div>
          <button class="waves-effect waves-light btn pink" @click="removeBook">Remove</button>
        </div>
        <div class="book-history">
          <header class="page-header book-title">
            {{ book.title }}
          </header>
          <div class="author">
            {{ book.author }}
          </div>
          <div class="notes">
            <header class="subheader">
              <span>Notes</span>
              <button class="waves-effect waves-light btn right primary modal-trigger" data-target="new-note-modal">New Note</button>
            </header>
            <div class="note" v-for="note in book.notes">
              <p>
                {{ note.text }}
              </p>
              <div class="date right">
                {{ formatDate(note.date) }}
              </div>
            </div>
            <div id="new-note-modal" class="modal">
              <div class="modal-content">
                <div class="input-field">
                  <textarea id="note" class="materialize-textarea" v-model="newNote" autofocus></textarea>
                  <label for="note">Note</label>
                </div>
                <button class="waves-effect waves-light btn secondary" @click="addNote">Save</button>
              </div>
            </div>
          </div>
          <div class="history">
            <header class="subheader">
              History
            </header>
            <ul>
              <li v-for="event in book.history">
                <span>{{ formatDate(event.date) }} &mdash;</span>
                <span>{{ formatEventType(event.type) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      No book found at this resource
    </div>
  </div>
</template>

<script>
  import commaNumber from 'comma-number'
  import StatusIcon from './StatusIcon.vue'

  export default {
    name: 'Book',
    components: {
      StatusIcon
    },
    created: function () {
      $(document).ready(() => {
        $('.modal').modal()
      })
    },
    data: function () {
      return {
        newNote: '',
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
          'November', 'December']
      }
    },
    computed: {
      book: function () {
        const isbn = parseInt(this.$route.params.isbn)
        return this.$store.getters.bookByISBN(isbn)
      },
      numTimesRead: function () {
        return this.book.history.filter(event => event.type === 'finished').length
      }
    },
    methods: {
      commaNumber,
      formatDate: function (date) {
        date = new Date(date)
        return `${this.months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
      },
      formatEventType: function (type) {
        const types = {
          finished: 'Finished Reading',
          started: 'Started Reading'
        }

        return types[type]
      },
      addNote: function () {
        const book = this.book
        const date = new Date()
        const dateAsString = `${this.months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
        book.notes.push({ text: this.newNote, date: dateAsString })
        this.$store.dispatch('updateBook', book)
        $('#new-note-modal').modal('close')
        this.newNote = ''
      },
      removeBook: function () {
        this.$store.dispatch('removeBook', { isbn: this.book.isbn, router: this.$router })
      },
      updateStatus: function () {
        const book = this.book
        const date = new Date()
        const dateAsString = `${this.months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

        if (book.status === 'currentlyReading')
          book.history.push({ type: 'started', date: dateAsString })
        else if (book.status === 'read')
          book.history.push({ type: 'finished', date: dateAsString })

        this.$store.dispatch('updateBook', book)
      }
    }
  }

  $(document).ready(function() {
    $('select').material_select()
  })
</script>

<style scoped>
  .author {
    color: #9e9e9e;
    margin-bottom: 48px;
  }

  .book-container {
    display: flex;
    margin-bottom: 16px;
  }

  .book-container header.subheader {
    color: black;
    font-size: 24px;
  }

  .book-history {
    width: 100%;
  }

  .left-pane {
    margin-right: 32px;
    max-width: 144px;
  }

  .book-img {
    margin-bottom: 16px;
    max-width: inherit;
    position: relative;
  }

  .book-img > img {
    max-width: inherit;
  }

  .book-img > .status-icon {
    font-size: 2.5rem;
    position: absolute;
    right: 5%;
    top: 5%;
  }

  .history > ul {
    list-style-type: circle;
    margin-left: 16px;
  }

  .history > ul > li {
    list-style-type: inherit;
  }

  .notes {
    margin-bottom: 32px;
    max-width: 500px;
  }

  .notes > .note {
    margin-bottom: 64px;
  }

  .notes > .note > p {
    margin-bottom: 0;
  }

  .notes > .note > .date {
    color: #9e9e9e;
  }

  .notes > .subheader {
    display: flex;
    justify-content: space-between;
  }

  .page-header.book-title {
    line-height: 40px;
    margin: 0;
  }

  @media only screen and (min-width: 928px) {
    .left-pane {
      max-width: 232px;
    }
  }
</style>
