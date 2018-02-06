import axios from '@/plugins/axios'

export default {
  fetchUserData (username) {
    return axios.post(`/fetchUserData/`, {username})
  },
  fetchUserGigs (username) {
    return axios.post('/fetchUserGigs', {username})
  },
  imageUpload (formdata) {
    return axios.post('/imgUpload', formdata)
    // return axios.post('/multiple_uploads', formdata)
  },
  fetchPosts () {
    return axios.get('/posts')
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
  }
}
