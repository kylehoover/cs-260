<template>
  <div id="app">
    <app-header></app-header>
    <main>
      <router-view :books="books"></router-view>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from './components/AppHeader'
  import AppFooter from './components/AppFooter.vue'

  export default {
    name: 'App',
    components: {
      AppHeader,
      AppFooter
    },
    data: function () {
      return {
        books: [
          {
            title: 'Rainbows End',
            author: 'Vernor Vinge',
            isbn: 9780812536362,
            pages: 381,
            status: 'currentlyReading',
            img: '/static/imgs/re.jpg',
            history: [
              { type: 'started', date: new Date('Jan 16, 2018') }
            ],
            notes: []
          },
          {
            title: 'On the Nature of the Universe',
            author: 'Lucretius',
            isbn: 9780199555147,
            pages: 275,
            status: 'currentlyReading',
            img: '/static/imgs/nature-of-universe.jpg',
            history: [
              { type: 'started', date: new Date('Feb 21, 2018') }
            ],
            notes: []
          },
          {
            title: 'Oathbringer',
            author: 'Brandon Sanderson',
            isbn: 9780765326379,
            pages: 1243,
            status: 'currentlyReading',
            img: '/static/imgs/oathbringer.jpg',
            history: [
              { type: 'started', date: new Date('Feb 27, 2018') }
            ],
            notes: []
          },
          {
            title: 'Edgedancer',
            author: 'Brandon Sanderson',
            isbn: 9781250166548,
            pages: 272,
            status: 'read',
            img: '/static/imgs/edgedancer.jpg',
            history: [
              { type: 'started', date: new Date('Feb 23, 2018') },
              { type: 'finished', date: new Date('Feb 26, 2018') }
            ],
            notes: []
          },
          {
            title: 'Words of Radiance',
            author: 'Brandon Sanderson',
            isbn: 9780765365286,
            pages: 1080,
            status: 'read',
            img: '/static/imgs/wor.jpg',
            history: [
              { type: 'started', date: new Date('Jan 7, 2018') },
              { type: 'finished', date: new Date('Feb 20, 2018') }
            ],
            notes: [
              {
                text: 'Considering how long the books in this series are, you would think there would be parts you would' +
                'have to trudge through until the pace picked up again. And yet, that has been nothing like my experience' +
                'with this book. Every single page seems to be crammed full of importance. I often feel that I\'m missing' +
                'little bits of information that Sanderson is laying out. The complexity of it all melts my mind a little,' +
                'but also gets me really excited.',
                date: new Date('Feb 1, 2018')
              }
            ]
          },
          {
            title: 'Aeneid',
            author: 'Virgil',
            isbn: 9780872207318,
            pages: 340,
            status: 'read',
            img: '/static/imgs/aeneid.jpg',
            history: [
              { type: 'started', date: new Date('Feb 2, 2018') },
              { type: 'finished', date: new Date('Feb 18, 2018') }
            ],
            notes: []
          },
          {
            title: 'Iliad',
            author: 'Homer',
            isbn: 9780872203525,
            pages: 574,
            status: 'read',
            img: '/static/imgs/iliad.jpg',
            history: [
              { type: 'started', date: new Date('Jan 8, 2018') },
              { type: 'finished', date: new Date('Jan 29, 2018') }
            ],
            notes: []
          },
          {
            title: 'Harry Potter and the Deathly Hallows',
            author: 'J.K. Rowling',
            isbn: 9780545010221,
            pages: 759,
            status: 'read',
            img: '/static/imgs/hp7.jpg',
            history: [
              { type: 'started', date: new Date('Dec 20, 2017') },
              { type: 'finished', date: new Date('Jan 3, 2018') }
            ],
            notes: []
          },
          {
            title: 'The Way of Kings',
            author: 'Brandon Sanderson',
            isbn: 9780765365279,
            pages: 1258,
            status: 'read',
            img: '',
            history: [
              { type: 'started', date: new Date('Nov 13, 2014') },
              { type: 'finished', date: new Date('Dec 20, 2014') }
            ],
            notes: []
          }
        ]
      }
    }
  }
</script>

<style>
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1 0 auto;
    font-weight: 300;
    margin: auto;
    padding: 48px 0;
    width: 304px;
  }

  main header {
    color: #9e9e9e;
  }

  main header.page-header {
    font-size: 40px;
    font-weight: 500;
    margin-bottom: 48px;
  }

  @media only screen and (min-width: 600px) {
    main {
      width: 504px;
    }
  }

  @media only screen and (min-width: 928px) {
    main {
      width: 832px;
    }
  }
</style>
