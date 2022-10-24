import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ScrollTrigger',
    component: () => import('../views/ScrollTrigger.vue')
  },
  {
    path: '/obServer',
    name: 'ObServer',
    component: () => import('../views/ObServer.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
