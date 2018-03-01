<template>
  <header>
    <ul id="menu-dropdown" class="dropdown-content">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/books/">Books</router-link></li>
      <li><router-link to="/progress/">Progress</router-link></li>
      <li><router-link to="/stats/">Stats</router-link></li>
      <li><router-link to="/about/">About</router-link></li>
      <li id="dropdown-add-book"><router-link to="/books/add/">Add Book</router-link></li>
    </ul>
    <nav>
      <div id="logo">
        <a href="/" id="nav-title">Bookmark</a>
        <i class="material-icons">bookmark</i>
      </div>
      <ul>
        <router-link to="/" tag="li"><a class="nav-item">Home</a></router-link>
        <router-link to="/books/" tag="li"><a class="nav-item">Books</a></router-link>
        <router-link to="/progress/" tag="li"><a class="nav-item">Progress</a></router-link>
        <router-link to="/stats/" tag="li"><a class="nav-item">Stats</a></router-link>
        <router-link to="/about/" tag="li"><a class="nav-item">About</a></router-link>
      </ul>
      <ul id="nav-right">
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
      </ul>
    </nav>
  </header>
</template>

<script>
  $('.dropdown-button').dropdown()

  export default {
    name: 'AppHeader'
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

  @media only screen and (min-width: 600px) {
    nav ul#menu-dropdown > li#dropdown-add-book {
      display: none;
    }

    nav > ul#nav-right {
      align-items: center;
      display: flex;
    }

    nav > ul#nav-right > li {
      display: list-item;
    }

    nav > ul#nav-right > li:first-child {
      margin-right: 32px;
    }

    nav > ul#nav-right #add-book {
      margin: 0;
    }
  }

  @media only screen and (min-width: 928px) {
    nav > ul#nav-right > li:first-child {
      margin-right: 0;
    }

    nav > ul > li {
      display: list-item;
    }

    nav > ul > li#menu-dropdown-btn {
      display: none;
    }
  }
</style>
