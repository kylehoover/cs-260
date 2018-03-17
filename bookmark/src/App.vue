<template>
  <div id="app">
    <app-header></app-header>
    <main>
      <router-view></router-view>
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
    created: function () {
      this.$store.dispatch('fetchBooks')
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
