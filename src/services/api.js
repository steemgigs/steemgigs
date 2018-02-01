import axios from '@/plugins/axios'

export default {
  fetchUserData (username) {
    return axios.post(`/fetchUserData/`, {username})
  },
  imageUpload (formdata) {
    // return axios.post('/imageUpload', formdata)
    return axios.post('/multiple_uploads', formdata)
  }
}
