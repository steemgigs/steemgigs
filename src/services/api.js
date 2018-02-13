import axios from '@/plugins/axios'

export default {
  fetchUserData (username) {
    return axios.post(`/fetchUserData/`, {username})
  },
  fetchUserGigs (username) {
    return axios.post('/fetchUserGigs', {username})
  },
  fetchSinglePost (username, permlink) {
    return axios.post('/fetchSinglePost', {username, permlink})
  },
  imageUpload (formdata) {
    return axios.post('/imgUpload', formdata)
  },
  fetchPosts () {
    return axios.get('/posts')
  },
  fetchCatPosts (category) {
    return axios.post('/fetchCatPosts', {category})
  },
  fetchGigRequests () {
    return axios.get('/gigrequests')
  },
  fetchFeatured () {
    return axios.get('/featured')
  },
  fetchTestimonials () {
    return axios.get('/testimonials')
  },
  fetchUntalented () {
    return axios.get('/untalented')
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
  fetchCommentImg (username) {
    return axios.post('/fetchUserPic', username)
  }
}
