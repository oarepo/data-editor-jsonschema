import Vue from 'vue'
import VueRouter from 'vue-router'
import SimpleLayout from '../components/SimpleLayout'
import ComplexLayout from '../components/ComplexLayout'

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
    path: '/complex-layout',
    name: 'complex-layout',
    component: ComplexLayout
  }
]

const router = new VueRouter({
  routes
})

export default router
