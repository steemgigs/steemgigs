import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: '',
    tokenExpires: '',
    username: '',
    lastPageTried: '',
    lastPage: '',
    profile: {
      about: '',
      coverImage: '',
      location: '',
      name: '',
      profileImage: 'http://via.placeholder.com/100x100',
      website: '',
      balance: ''
    },
    posts: {
      steemgigs: [],
      gigrequests: [],
      untalented: [],
      featured: [],
      testimonials: []
    }
  },
  mutations: {
    SET_USER (state, {accessToken, tokenExpires, username}) {
      state.accessToken = accessToken
      state.tokenExpires = tokenExpires
      state.username = username
    },
    SET_PROFILE (state, {about, coverImage, location, name, profileImage, website, walletBal}) {
      state.profile.about = about
      state.profile.coverImage = coverImage
      state.profile.location = location
      state.profile.name = name
      state.profile.profileImage = profileImage
      state.profile.website = website
      state.profile.balance = walletBal
    },
    SET_lastPage (state, url) {
      state.lastPage = url
    },
    SET_LASTPAGETRIED (state, url) {
      state.lastPageTried = url
    },
    CLEAR_USER (state) {
      state.accessToken = ''
      state.username = ''
      state.tokenExpires = ''
      let prevImage = state.profile.profileImage
      state.profile = {}
      state.profile.profileImage = prevImage
    },
    SET_STEEMGIGS (state, {fetched}) {
      state.posts.steemgigs = fetched
    },
    SET_GIGREQUESTS (state, data) {
      state.posts.gigrequests = data
    }
  },
  plugins: [createPersist({
    // 使用 name 与 version 做 key 可能
    // 避免可能的新旧版本间的数据冲突 可能
    namespace: 'steemgig',
    expires: 3 * 24 * 60 * 60 * 1e3
  })]
})
