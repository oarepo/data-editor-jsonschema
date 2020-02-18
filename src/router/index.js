import Vue from 'vue'
import VueRouter from 'vue-router'
import SimpleLayout from '../components/SimpleLayout'
import TestLayout from '../components/TestLayout'

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
  },
  {
    path: '/test-layout',
    name: 'test-layout',
    component: TestLayout
  }
]

const router = new VueRouter({
  routes
})

export default router
