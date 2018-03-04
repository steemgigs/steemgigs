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
      profileImage: 'https://via.placeholder.com/100x100',
      website: '',
      balance: {
        amount: ''
      },
      rep: '',
      steemgigsWitness: ''
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
    SET_PROFILE (state, {about, coverImage, location, name, profilePic, rep, website, walletBal, steemgigsWitness, social}) {
      state.profile.about = about
      state.profile.coverImage = coverImage
      state.profile.location = location
      state.profile.name = name
      state.profile.profileImage = profilePic
      state.profile.rep = rep
      state.profile.website = website
      state.profile.balance = walletBal
      state.profile.steemgigsWitness = steemgigsWitness
      state.profile.social = social
    },
    SET_lastPage (state, url) {
      state.lastPage = url
    },
    SET_LASTPAGETRIED (state, url) {
      state.lastPageTried = url
    },
    CLEAR_USER (state) {
      state.accessToken = ''
      state.tokenExpires = ''
      state.username = ''
      state.lastPageTried = ''
      state.lastPage = ''
      state.profile = {
        about: '',
        coverImage: '',
        location: '',
        name: '',
        profileImage: 'https://via.placeholder.com/100x100',
        website: '',
        balance: {
          amount: ''
        },
        rep: '',
        steemgigsWitness: ''
      }
      state.posts = {
        steemgigs: [],
        gigrequests: [],
        untalented: [],
        featured: [],
        testimonials: []
      }
    },
    SET_STEEMGIGS (state, {fetched}) {
      state.posts.steemgigs = fetched
    },
    SET_GIGREQUESTS (state, data) {
      state.posts.gigrequests = data
    },
    SET_FEATURED (state, data) {
      state.posts.featured = data
    },
    SET_TESTIMONIALS (state, data) {
      state.posts.testimonials = data
    },
    SET_UNTALENTED (state, data) {
      state.posts.untalented = data
    }
  },
  plugins: [createPersist({
    // 使用 name 与 version 做 key 可能
    // 避免可能的新旧版本间的数据冲突 可能
    namespace: 'steemgig',
    expires: 3 * 24 * 60 * 60 * 1e3
  })]
})
