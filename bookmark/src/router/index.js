import Vue from 'vue'
import VueRouter from 'vue-router'

import About from '../components/About'
import ComingSoon from '../components/ComingSoon'
import Home from '../components/Home'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/about/', component: About },
  { path: '/books/', component: ComingSoon }
]

export default new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes
})
