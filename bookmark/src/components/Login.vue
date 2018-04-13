<template>
  <div>
    <div>
      <form @submit.prevent="submit">
        <header class="page-header">
          Welcome to Bookmark
        </header>
        <div class="error red-text" v-if="loginError">
          Login attempt failed
        </div>
        <div class="error red-text" v-if="registerError">
          Failed to register new account
        </div>
        <div class="row" v-if="showRegister">
          <div class="input-field col s6">
            <input id="fn" type="text" maxlength="50" v-model="firstName" required />
            <label for="fn">First Name</label>
          </div>
          <div class="input-field col s6">
            <input id="ln" type="text" maxlength="50" v-model="lastName" />
            <label for="ln">Last Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input id="email" type="email" v-model="email" autofocus required />
            <label for="email">Email</label>
          </div>
          <div class="input-field col s6">
            <input id="password" type="password" v-model="password" required />
            <label for="password">Password</label>
          </div>
        </div>
        <div class="row">
          <button class="waves-effect waves-light btn secondary" type="submit">
            {{ showRegister ? 'Register' : 'Log In' }}
          </button>
        </div>
      </form>
      <div id="no-account">
        {{ showRegister ? 'Already' : 'Don\'t' }} have an account?
        <a href="" class="primary-text" @click.prevent="toggleRegisterForm">
          {{ showRegister ? 'Login' : 'Register' }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data: function () {
      return {
        email: '',
        firstName: '',
        lastName: undefined,
        password: '',
        showRegister: false
      }
    },
    computed: {
      loginError: function () {
        return this.$store.state.loginError
      },
      registerError: function () {
        return this.$store.state.registerError
      }
    },
    methods: {
      submit: function () {
        if (this.showRegister)
          this.$store.dispatch('register', {
            data: {
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              password: this.password
            },
            router: this.$router
          })
        else
          this.$store.dispatch('login', {
            data: {
              email: this.email,
              password: this.password
            },
            router: this.$router
          })
      },
      toggleRegisterForm: function () {
        this.showRegister = !this.showRegister
        this.$store.commit('setLoginError', false)
        this.$store.commit('setRegisterError', false)
      }
    }
  }
</script>

<style scoped>
  .error {
    margin-bottom: 16px;
  }

  #no-account {
    margin-top: 48px;
  }
</style>
