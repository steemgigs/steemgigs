import Vue from 'vue'
import Router from 'vue-router'

import VueAnalytics from 'vue-analytics'

import Routes from '@/pages/router.js'

Vue.use(Router)

const router = new Router({mode: 'history', routes: Routes})

Vue.use(VueAnalytics, {
  id: 'UA-114994616-1',
  router
})

// Store last page prior to login in local storage for redirect following login
router.afterEach((to, from) => {
  if (to.path !== '/complete') {
    window.localStorage.setItem('last-known-route', to.path)
  }
})

export default router
