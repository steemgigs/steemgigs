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
    searchTerm: '',
    profile: {
      about: '',
      coverImage: '',
      location: '',
      name: '',
      profileImage: 'https://via.placeholder.com/100x100',
      rep: '',
      steemgigsWitness: ''
    },
    posts: {
      steemgigs: [],
      gigrequests: [],
      untalented: [],
      featured: [],
      surpassinggoogle: [],
      testimonials: []
    },
    newPosts: {
      steemgig: {
        title: '',
        category: '',
        subcategory: '',
        description: '',
        requirements: '',
        pricing: '',
        hours: 0,
        days: 0,
        currency: 'STEEM',
        portfolio: [{url: '', key: 183}],
        reward: '100% STEEM POWER',
        price: 0,
        liked: false,
        upvoteRange: 100
      },
      gigrequest: {
        title: '',
        category: '',
        subcategory: '',
        description: '',
        hours: 0,
        days: 0,
        currency: 'STEEM',
        images: [],
        reward: '100% STEEM POWER',
        price: 0,
        liked: false,
        upvoteRange: 100
      },
      surpassinggoogle: {
        title: '',
        category: '',
        subcategory: '',
        description: '',
        hours: 0,
        days: 0,
        currency: 'STEEM',
        images: [],
        reward: '100% STEEM POWER',
        price: 0,
        liked: false,
        upvoteRange: 100
      },
      untalented: {
        title: '',
        description: '',
        images: [],
        liked: false,
        upvoteRange: 100
      },
      testimonial: {
        title: '',
        description: '',
        images: [],
        upvoteRange: 100,
        liked: false
      }
    }
  },
  mutations: {
    SET_USER (state, {accessToken, tokenExpires, username}) {
      state.accessToken = accessToken
      state.tokenExpires = tokenExpires
      state.username = username
    },
    SET_PROFILE (state, {social, name, profilePic, about, location, coverPic, rep, balance, steemgigsWitness}) {
      state.profile.about = about
      state.profile.coverImage = coverPic
      state.profile.location = location
      state.profile.name = name
      state.profile.profileImage = profilePic
      state.profile.rep = rep
      state.profile.social = social
      state.profile.balance = balance
      state.profile.steemgigsWitness = steemgigsWitness
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
        rep: '',
        steemgigsWitness: ''
      }
      state.posts = {
        steemgigs: [],
        gigrequests: [],
        untalented: [],
        featured: [],
        surpassinggoogle: [],
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
    },
    SET_SURPASSINGGOOGLE (state, data) {
      state.posts.surpassinggoogle = data
    },
    SET_NEW_STEEMGIG (state, steemgig) {
      state.newPosts.steemgig = steemgig
    },
    SET_NEW_GIGREQUEST (state, gigrequest) {
      state.newPosts.gigrequest = gigrequest
    },
    SET_NEW_UNTALENTED (state, untalented) {
      state.newPosts.untalented = untalented
    },
    SET_NEW_TESTIMONIAL (state, testimonial) {
      state.newPosts.testimonial = testimonial
    },
    SET_NEW_SURPASSINGGOOGLE (state, surpassinggoogle) {
      state.newPosts.surpassinggoogle = surpassinggoogle
    },
    RESET_NEW_STEEMGIG (state) {
      state.newPosts.steemgig = {
        title: '',
        category: '',
        subcategory: '',
        description: '',
        requirements: '',
        pricing: '',
        hours: 0,
        days: 0,
        currency: 'STEEM',
        portfolio: [{url: '', key: 183}],
        reward: '100% STEEM POWER',
        price: 0,
        liked: false,
        upvoteRange: 100
      }
    },
    RESET_NEW_GIGREQUEST (state, gigrequest) {
      state.newPosts.gigrequest = {
        title: '',
        category: '',
        subcategory: '',
        description: '',
        hours: 0,
        days: 0,
        currency: 'STEEM',
        images: [],
        reward: '100% STEEM POWER',
        price: 0,
        liked: false,
        upvoteRange: 100
      }
    },
    RESET_NEW_SURPASSINGGOOGLE (state, surpassinggoogle) {
      state.newPosts.gigrequest = {
        title: '',
        category: '',
        subcategory: '',
        description: '',
        hours: 0,
        days: 0,
        currency: 'STEEM',
        images: [],
        reward: '100% STEEM POWER',
        price: 0,
        liked: false,
        upvoteRange: 100
      }
    },
    RESET_NEW_UNTALENTED (state) {
      state.newPosts.untalented = {
        title: '',
        description: '',
        images: [],
        liked: false,
        upvoteRange: 100
      }
    },
    RESET_NEW_TESTIMONIAL (state) {
      state.newPosts.testimonial = {
        title: '',
        description: '',
        images: [],
        upvoteRange: 100,
        liked: false
      }
    },
    setSearchTerm (state, term) {
      state.searchTerm = term
    }
  },
  getters: {
    searchTerm: state => {
      return state.searchTerm
    }
  },
  plugins: [createPersist({
    // 使用 name 与 version 做 key 可能
    // 避免可能的新旧版本间的数据冲突 可能
    namespace: 'steemgig',
    expires: 3 * 24 * 60 * 60 * 1e3
  })]
})
