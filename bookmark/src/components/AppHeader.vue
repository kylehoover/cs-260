<template>
  <header>
    <ul id="menu-dropdown" class="dropdown-content">
      <li><router-link to="/home/">Home</router-link></li>
      <li><router-link to="/about/">About</router-link></li>
      <li class="small-only"><router-link to="/books/add/">Add Book</router-link></li>
      <li class="small-only"><router-link to="/" @click="logout">Log Out</router-link></li>
    </ul>
    <ul id="logout-dropdown" class="dropdown-content">
      <li><a @click="logout">Log Out</a></li>
    </ul>
    <nav>
      <div id="logo">
        <router-link to="/home/" id="nav-title">Bookmark</router-link>
        <i class="material-icons">bookmark</i>
      </div>
      <ul v-show="showNavItems">
        <router-link to="/home/" tag="li"><a class="nav-item">Home</a></router-link>
        <router-link to="/about/" tag="li"><a class="nav-item">About</a></router-link>
      </ul>
      <ul id="nav-right" v-show="showNavItems">
        <li>
          <router-link to="/books/add/" id="add-book" class="waves-effect waves-light btn secondary">
            Add Book
          </router-link>
        </li>
        <li id="menu-dropdown-btn">
          <a class="dropdown-button nav-item" data-activates="menu-dropdown">
            <i class="material-icons">menu</i>
          </a>
        </li>
        <li>
          <a class="dropdown-button nav-item" data-activates="logout-dropdown">
            {{ firstName }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'AppHeader',
    props: {
      showNavItems: {
        type: Boolean,
        default: true
      }
    },
    created: function () {
      $('.dropdown-button').dropdown()
    },
    computed: {
      firstName: function () {
        return this.$store.state.user.firstName
      }
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout', this.$router)
      }
    }
  }
</script>

<style scoped>
  nav {
    align-items: center;
    background-color: #8A53A6;
    display: flex;
    height: 88px;
    line-height: 88px;
    padding: 24px;
  }

  nav > #logo {
    align-items: center;
    display: flex;
    margin-right: 32px;
  }

  nav > #logo > #nav-title {
    font-size: 40px;
    font-weight: 500;
  }

  nav > #logo > i {
    font-size: 32px;
    margin-top: 8px;
  }

  nav > ul > li {
    display: none;
  }

  nav > ul#nav-right {
    margin-left: auto;
  }

  nav > ul > li#menu-dropdown-btn {
    display: list-item;
  }

  nav > ul > li#menu-dropdown-btn > a > i {
    font-size: 2rem;
  }

  nav .nav-item {
    font-size: 16px;
    font-weight: 300;
  }

  .user {
    color: white;
  }

  @media only screen and (min-width: 600px) {
    nav ul#menu-dropdown > li.small-only {
      display: none;
    }

    nav > ul#nav-right {
      align-items: center;
      display: flex;
    }

    nav > ul#nav-right > li {
      display: list-item;
    }

    nav > ul#nav-right > li {
      margin-right: 32px;
    }

    nav > ul#nav-right > li:last-child {
      margin-right: 0;
    }

    nav > ul#nav-right #add-book {
      margin: 0;
    }
  }

  @media only screen and (min-width: 928px) {
    nav > ul#nav-right > li:first-child {
      /*margin-right: 0;*/
    }

    nav > ul > li {
      display: list-item;
    }

    nav > ul > li#menu-dropdown-btn {
      display: none;
    }
  }
</style>
