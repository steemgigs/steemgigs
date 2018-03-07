<template>
  <div class="center">
    <h1><br>You are logged in.</h1>
    <p class="flow-text">Redirecting...</p>
  </div>
</template>

<script>
// import sc2 from '@/services/sc2'
import Api from '@/services/api'
export default {
  mounted () {
    let {access_token: accessToken, expires_in: tokenExpires, username} = this.$route.query
    this.$store.commit('SET_USER', {accessToken, tokenExpires, username})
    Api.loggedIn(username, accessToken).then(response => {
      let responseData = response.data.profile
      console.log('FROM LOGGED IN', {responseData})
      let {social, name, profilePic, about, location, coverPic, rep, balance, steemgigsWitness} = responseData
      this.$store.commit('SET_PROFILE', {social, name, profilePic, about, location, coverPic, rep, balance, steemgigsWitness})
    })
    this.$router.push('/')
    // sc2.setAccessToken(accessToken)
    // sc2.me((err, result) => {
    //   if (!err) {
    //     console.log('/me: ', result)
    //     let {about, cover_image: coverImage, location, name, profile_image: profileImage, website} = JSON.parse(result.account.json_metadata).profile
    //     let walletBal = result.account.balance
    //     this.$store.commit('SET_PROFILE', {about, coverImage, location, name, profileImage, website, walletBal})
    //   } else {
    //     console.log('error:', JSON.stringify(err, null, 2))
    //   }
    // }, () => {
    //   console.log('done')
    // })
  }
}
</script>
