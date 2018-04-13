import Vue from 'vue'
import VueRouter from 'vue-router'

import About from '../components/About'
import AddBook from '../components/AddBook'
import Book from '../components/Book'
import ComingSoon from '../components/ComingSoon'
import Home from '../components/Home'
import Login from '../components/Login'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Login },
  { path: '/about/', component: About },
  { path: '/books/', component: ComingSoon },
  { path: '/books/add/', component: AddBook },
  { path: '/books/:isbn(\\d+)/', component: Book},
  { path: '/home/', component: Home },
  { path: '/progress/', component: ComingSoon },
  { path: '/stats/', component: ComingSoon }
]

export default new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes
})
