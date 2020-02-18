import Vue from 'vue'
import VueRouter from 'vue-router'
import SimpleLayout from '../components/SimpleLayout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: SimpleLayout
  },
  {
    path: '/simple-layout',
    name: 'simple-layout',
    component: SimpleLayout
  }
]

const router = new VueRouter({
  routes
})

export default router
