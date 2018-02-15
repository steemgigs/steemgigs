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
  fetchSubCatPosts (category, subcategory) {
    return axios.post('/fetchSubCatPosts', {category, subcategory})
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
  fetchSingleComment (credentials) {
    return axios.post('/fetchSingleComment', credentials)
  },
  fetchCommentInfo (username) {
    return axios.post('/fetchUserInfo', {username})
  }
}
