import axios from '@/plugins/axios'

export default {
  search (searchQuery) {
    return axios.post('search/search_posts', { query: searchQuery })
  },
  fetchUserData (username) {
    return axios.get(`profile/profile/${username}`)
  },
  fetchUserGigs (username) {
    return axios.get(`posts/usergigs/${username}`)
  },
  fetchSinglePost (username, permlink, viewer) {
    // return axios.post('/fetchSinglePost', {username, permlink})
    return axios.get(`posts/steemgig/${username}/${permlink}/${viewer}`)
  },
  fetchComments (username, permlink) {
    return axios.get(`posts/comments/${username}/${permlink}`)
  },
  fetchSingleComment (username, permlink) {
    return axios.get(`posts/comment/${username}/${permlink}`)
  },
  imageUpload (formdata) {
    return axios.post('images/imgUpload', formdata)
  },
  fetchPosts () {
    return axios.get('posts/steemgigs/steemgigs_post/')
  },
  fetchGigRequests () {
    return axios.get('posts/steemgigs/steemgigs_request/')
  },
  fetchTestimonials () {
    return axios.get('/posts/steemgigs/steemgigs_testimonial/')
  },
  fetchUntalented () {
    return axios.get('posts/steemgigs/steemgigs_untalented/')
  },
  fetchSurpassingGoogle () {
    return axios.get('posts/steemgigs/steemgigs_surpassinggoogle/')
  },
  fetchFeatured () {
    return axios.get('posts/featured')
  },
  fetchCatPosts (category) {
    return axios.get(`posts/steembycat/${category}`)
  },
  fetchSubCatPosts (subcategory) {
    return axios.get(`posts/steembysubcat/${subcategory}`)
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
    return axios.post('profile/loggedIn', {username}, {
      headers: {token}
    })
  },
  profile (username, token) {
    return axios.post('profile/profile', {username}, {
      headers: {token}
    })
  },
  post (credentials, token) {
    return axios.post('posts/post', credentials, {
      headers: {
        token: token
      }
    })
  },
  profileUpdate (credentials, token) {
    return axios.post('profile/editProfile', credentials, {
      headers: {
        token: token
      }
    })
  },
  sendFeedback (credentials) {
    return axios.post('feedback/feedback', credentials)
  },
  comment (credentials, token) {
    return axios.post('posts/comment', credentials, {
      headers: {
        token: token
      }
    })
  }
}
