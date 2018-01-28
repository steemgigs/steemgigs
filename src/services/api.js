import axios from '@/plugins/axios'

export default {
  fetchUserData (username) {
    return axios.post(`/fetchUserData/`, {username})
  }
}
