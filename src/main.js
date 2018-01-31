// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import mixins from '@/plugins/mixins'
import Notifications from 'vue-notification'
import Vuex from 'vuex'

require('./assets/steemgigs.scss')

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.mixin(mixins)
Vue.use(Notifications)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
