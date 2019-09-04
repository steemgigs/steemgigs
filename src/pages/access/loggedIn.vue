<template>
  <div class="center">
    <h3><br>You are logged in.</h3>
    <h5>Redirecting...</h5>
  </div>
</template>

<script>
import Api from '@/services/api'
export default {
  mounted () {
    // Token expiration is sette for one day (86400 seconds = 1 day).
    const tokenExpires = 86400;
    let { code: accessToken, username } = this.$route.query
    this.$store.commit('SET_USER', {accessToken, tokenExpires, username})
    Api.loggedIn(username, accessToken).then(response => {
      let responseData = response.data.profile
      let {social, name, profilePic, about, location, coverPic, rep, balance, steemgigsWitness} = responseData
      this.$store.commit('SET_PROFILE', {social, name, profilePic, about, location, coverPic, rep, balance, steemgigsWitness})
    })
    // Check if last know route is available to be pushed to, push to route if true else go to default page
    if (window.localStorage.getItem('last-known-route')) {
      this.$router.push(window.localStorage.getItem('last-known-route'))
    } else {
      this.$router.push('/')
    }
  }
}
</script>
