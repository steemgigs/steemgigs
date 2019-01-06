import axios from '@/plugins/axios'

export default {
  search (term) {
    return axios.post('/search', { query: { searchText: term } })
  },
  checkTitleExistence (credentials) {
    return axios.post('/checktitle', credentials)
  },
  fetchUserData (username) {
    return axios.get(`/profile/${username}`)
  },
  fetchUserGigs (username) {
    return axios.get(`/usergigs/${username}`)
  },
  fetchSinglePost (username, permlink, viewer) {
    // return axios.post('/fetchSinglePost', {username, permlink})
    return axios.get(`/steemgig/${username}/${permlink}/${viewer}`)
  },
  fetchComments (username, permlink) {
    return axios.get(`/comments/${username}/${permlink}`)
  },
  fetchSingleComment (username, permlink) {
    return axios.get(`/comment/${username}/${permlink}`)
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
  fetchSurpassingGoogle () {
    return axios.get('/steemgigs/steemgigs_surpassinggoogle/')
  },
  fetchFeatured () {
    return axios.get('/featured')
  },
  fetchCatPosts (category) {
    return axios.get(`/steembycat/${category}`)
  },
  fetchSubCatPosts (subcategory) {
    return axios.get(`/steembysubcat/${subcategory}`)
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
  //  new routes
  loggedIn (username, token) {
    return axios.post('/loggedIn', {username}, {
      headers: {token}
    })
  },
  profile (username, token) {
    return axios.post('/profile', {username}, {
      headers: {token}
    })
  },
  post (credentials, token) {
    return axios.post('/post', credentials, {
      headers: {
        token: token
      }
    })
  },
  profileUpdate (credentials, token) {
    return axios.post('/editProfile', credentials, {
      headers: {
        token: token
      }
    })
  },
  sendFeedback (credentials) {
    return axios.post('/feedback', credentials)
  },
  comment (credentials, token) {
    return axios.post('/comment', credentials, {
      headers: {
        token: token
      }
    })
  }
}
