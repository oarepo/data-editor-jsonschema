import Vue from 'vue'
import VueRouter from 'vue-router'
import SimpleLayout from '../components/SimpleLayout'
import ComplexLayout from '../components/ComplexLayout'
import ComplexArrayLayout from '../components/ComplexArrayLayout'

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
  },
  {
    path: '/complex-array-layout',
    name: 'complex-array-layout',
    component: ComplexArrayLayout
  }
]

const router = new VueRouter({
  routes
})

export default router
