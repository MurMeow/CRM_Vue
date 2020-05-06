import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        layout: 'main'
      },
      component: () => import('../views/Home')
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        layout: 'empty'
      },
      component: () => import('../views/Login')
    },
    {
      path: '/register',
      name: 'Register',
      meta: {
        layout: 'empty'
      },
      component: () => import('../views/Register')
    },
    {
      path: '/categories',
      name: 'Categories',
      meta: {
        layout: 'main'
      },
      component: () => import('../views/Categories')
    },
    {
      path: '/record',
      name: 'Record',
      meta: {
        layout: 'main'
      },
      component: () => import('../views/Record')
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: {
        layout: 'main'
      },
      component: () => import('../views/Profile')
    },
    {
      path: '/planning',
      name: 'Planning',
      meta: {
        layout: 'main'
      },
      component: () => import('../views/Planning')
    },
    {
      path: '/history',
      name: 'History',
      meta: {
        layout: 'main'
      },
      component: () => import('../views/History')
    },
    {
      path: '/detailRecord',
      name: 'DetailRecord',
      meta: {
        layout: 'main'
      },
      component: () => import('../views/DetailRecord')
    }
  ]
})
