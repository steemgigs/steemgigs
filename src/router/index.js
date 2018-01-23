import Vue from 'vue'
import Router from 'vue-router'

import Routes from '@/pages/router.js'

Vue.use(Router)

const router = new Router({mode: 'history', routes: Routes})

/*
router.beforeEach((to, from, next) => {})
*/

export default router
