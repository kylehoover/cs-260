<template>
  <div id="home-container">
    <div class="books-grid">
      <router-link
        v-for="book in currentBooks"
        :to="'/books/' + book.isbn + '/'"
        class="book hoverable"
        :key="book.isbn"
      >
        <img :src="book.img" />
        <status-icon :status="book.status"></status-icon>
      </router-link>
    </div>
    <div class="stats">
      <header>
        At a Glance
      </header>
      <section>
        <header class="subheader">
          Progress
        </header>
        <div class="progress">
          <div class="determinate secondary" :style="'width: ' + progressPercentage + '%'"></div>
        </div>
        <div class="label">
          {{ booksRead }} / {{ goal }}
        </div>
      </section>
      <section>
        <div class="pages-read">
          <div class="number">
            {{ commaNumber(pagesReadThisYear) }}
          </div>
          <div class="label">
            Pages Read in {{ currentYear }}
          </div>
        </div>
        <div class="pages-read">
          <div class="number">
            {{ commaNumber(totalPagesRead) }}
          </div>
          <div class="label">
            Total Pages Read
          </div>
        </div>
      </section>
      <section>
        <header class="subheader">
          Icons
        </header>
        <div class="icon-info">
          <status-icon status="currentlyReading"></status-icon>
          <span class="label">Currently Reading</span>
        </div>
        <div class="icon-info">
          <status-icon status="read"></status-icon>
          <span class="label">Read</span>
        </div>
        <div class="icon-info">
          <status-icon status="wantToRead"></status-icon>
          <span class="label">Want to Read</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import commaNumber from 'comma-number'
  import StatusIcon from './StatusIcon'

  export default {
    name: 'Home',
    components: {
      StatusIcon
    },
    data: function () {
      return {
        currentYear: new Date().getFullYear()
      }
    },
    computed: {
      goal: function () {
        return this.$store.state.goal
      },
      currentBooks: function () {
        const currentYear = new Date().getFullYear()

        return this.$store.state.books.filter(book => {
          if (book.status === 'currentlyReading' || book.status === 'wantToRead')
            return true

          if (book.status === 'read') {
            for (let event of book.history) {
              const date = new Date(event.date)
              if (event.type === 'finished' && date.getFullYear() === currentYear)
                return true
            }
          }

          return false
        })
      },
      booksRead: function () {
        return this.currentBooks.reduce((acc, book) => (book.status === 'read' ? acc + 1 : acc), 0)
      },
      progressPercentage: function () {
        return (this.booksRead / this.goal) * 100
      },
      totalPagesRead: function () {
        return this.$store.getters.pagesReadTotal
      },
      pagesReadThisYear: function () {
        return this.$store.getters.pagesReadByYear(this.currentYear)
      }
    },
    methods: {
      commaNumber
    }
  }
</script>

<style scoped>
  .books-grid {
    display: grid;
    grid-gap: 32px;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 32px;
  }

  .books-grid > .book {
    max-height: 184px;
    overflow: hidden;
    position: relative;
  }

  .books-grid > .book > img {
    height: auto;
    max-width: 100%;
  }

  .books-grid > .book > .status-icon {
    top: 5%;
    position: absolute;
    right: 5%;
  }

  .stats > section {
    margin-bottom: 32px;
  }

  .stats > section:last-child {
    margin-bottom: 0;
  }

  .stats header {
    border-bottom: 1px solid black;
    color: black;
    font-size: 28px;
    margin-bottom: 32px;
  }

  .stats header.subheader {
    border-bottom: none;
    font-size: 20px;
    margin-bottom: 16px;
  }

  .stats .progress {
    background-color: #e0f2f1;
    height: 16px;
    margin: 0;
  }

  .stats .pages-read {
    margin-bottom: 16px;
  }

  .stats .pages-read > .number {
    font-size: 18px;
    font-weight: 500;
  }

  .stats .icon-info {
    align-items: center;
    display: flex;
    margin-bottom: 16px;
  }

  .stats .icon-info > i.status-icon {
    margin-right: 16px;
  }

  .label {
    color: #9e9e9e;
  }

  @media only screen and (min-width: 600px) {
    #home-container {
      display: flex;
    }

    .books-grid {
      padding-right: 32px;
      width: 320px;
    }

    .stats {
      width: 176px;
    }
  }

  @media only screen and (min-width: 928px) {
    #home-container {
      display: flex;
    }

    .books-grid {
      grid-template-columns: repeat(4, 1fr);
      padding-right: 32px;
      width: 640px;
    }

    .stats {
      width: 192px;
    }
  }
</style>
