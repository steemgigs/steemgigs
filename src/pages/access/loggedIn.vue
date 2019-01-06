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
    let {access_token: accessToken, expires_in: tokenExpires, username} = this.$route.query
    this.$store.commit('SET_USER', {accessToken, tokenExpires, username})
    Api.loggedIn(username, accessToken).then(response => {
      let responseData = response.data.profile
      let {social, name, profilePic, about, location, coverPic, rep, balance, steemgigsWitness} = responseData
      this.$store.commit('SET_PROFILE', {social, name, profilePic, about, location, coverPic, rep, balance, steemgigsWitness})
    })
    this.$router.push('/')
  }
}
</script>
