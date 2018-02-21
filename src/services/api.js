import axios from '@/plugins/axios'

export default {
  fetchUserData (username) {
    // return axios.post(`/fetchUserData/`, {username})
    return axios.get(`/profile/${username}`)
  },
  fetchUserGigs (username) {
    return axios.get(`/usergigs/${username}`)
  },
  fetchSinglePost (username, permlink) {
    // return axios.post('/fetchSinglePost', {username, permlink})
    return axios.get(`/steemgig/${username}/${permlink}`)
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
  post (credentials, token) {
    return axios.post('/post', credentials, {
      headers: {
        token: token
      }
    })
  },
  comment (credentials, token) {
    return axios.post('/comment', credentials, {
      headers: {
        token: token
      }
    })
  },
  fetchCommentInfo (username) {
    return axios.get(`/userImage/${username}`)
  }
}
