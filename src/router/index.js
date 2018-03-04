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
/*
router.beforeEach((to, from, next) => {})
*/

export default router
