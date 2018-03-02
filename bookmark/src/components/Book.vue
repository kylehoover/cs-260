<template>
  <div class="book-container">
    <div class="left-pane">
      <div class="book-img">
        <img :src="book.img" />
        <status-icon :status="book.status"></status-icon>
      </div>
      <label for="reading-status">Reading Status</label>
      <select id="reading-status" class="browser-default" v-model="book.status">
        <option value="currentlyReading">Currently Reading</option>
        <option value="read">Read</option>
        <option value="wantToRead">Want to Read</option>
      </select>
      <div class="book-info">
        <p># of times read: 0</p>
        <p>Pages: {{ commaNumber(book.pages) }}</p>
      </div>
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
          Notes
          <button class="waves-effect waves-light btn right primary">New Note</button>
        </header>
        <div class="note" v-for="note in book.notes">
          <p>
            {{ note.text }}
          </p>
          <div class="date right">
            {{ formatDate(note.date) }}
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
</template>

<script>
  import commaNumber from 'comma-number'
  import StatusIcon from './StatusIcon.vue'

  export default {
    name: 'Book',
    components: {
      StatusIcon
    },
    props: {
      books: { type: Array, required: true }
    },
    data: function () {
      return {
      }
    },
    computed: {
      book: function () {
        const isbn = parseInt(this.$route.params.isbn)

        for (let book of this.books) {
          if (book.isbn === isbn)
            return book
        }

        return undefined
      }
    },
    methods: {
      commaNumber,
      formatDate: function (date) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
                        'November', 'December']

        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
      },
      formatEventType: function (type) {
        const types = {
          finished: 'Finished Reading',
          started: 'Started Reading'
        }

        return types[type]
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
