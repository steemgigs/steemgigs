import axios from '@/plugins/axios'

export default {
  search (term) {
    return axios.post('/', { query: { searchText: term } })
  },
  fetchUserData (username) {
    return axios.get(`/profile/${username}`)
  },
  fetchUserGigs (username) {
    return axios.post('/fetchUserGigs', {username})
  },
  fetchSinglePost (username, permlink) {
    // return axios.post('/fetchSinglePost', {username, permlink})
    return axios.get(`/steemgig/${username}/${permlink}`)
  },
  imageUpload (formdata) {
    return axios.post('/imgUpload', formdata)
  },
  fetchPosts () {
    return axios.get('/steemgigs/steemgigs_post/')
  },
  fetchGigRequests () {
    return axios.get('/steemgigs/steemgigs_request/')
  },
  fetchTestimonials () {
    return axios.get('/steemgigs/steemgigs_testimonial/')
  },
  fetchUntalented () {
    return axios.get('/steemgigs/steemgigs_untalented/')
  },
  fetchFeatured () {
    return axios.get('/featured')
  },
  fetchCatPosts (category) {
    return axios.post('/fetchCatPosts', {category})
  },
  fetchSubCatPosts (category, subcategory) {
    return axios.post('/fetchSubCatPosts', {category, subcategory})
  },
  morePosts () {
    return axios.get('/moreposts')
  },
  moreFeatured () {
    return axios.get('/morefeatured')
  },
  moreTestimonials () {
    return axios.get('/moretestimonials')
  },
  fetchComments (credentials) {
    return axios.post('/comments', credentials)
  },
  fetchSingleComment (credentials) {
    return axios.post('/fetchSingleComment', credentials)
  },
  fetchCommentInfo (username) {
    return axios.post('/fetchUserInfo', {username})
  },
  //  new routes
  post (credentials, token) {
    return axios.post('/post', credentials, {
      headers: {
        token: token
      }
    })
  }
}
