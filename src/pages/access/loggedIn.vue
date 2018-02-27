<template>
  <div class="center">
    <h1><br>You are logged in.</h1>
    <p class="flow-text">Redirecting...</p>
  </div>
</template>

<script>
import sc2 from '@/services/sc2'
import Api from '@/services/api'
export default {
  mounted () {
    let {access_token: accessToken, expires_in: tokenExpires, username} = this.$route.query
    this.$store.commit('SET_USER', {accessToken, tokenExpires, username})
    Api.loggedIn(username, accessToken).then(response => {
      let responseData = response.data
      let {about, coverImage, location, name, profileImage, website, rep, balance: walletBal} = responseData.profile
      this.$store.commit('SET_PROFILE', {about, coverImage, location, name, profileImage, walletBal})
    })
    sc2.setAccessToken(accessToken)
    sc2.me((err, result) => {
      if (!err) {
        console.log('/me: ', result)
        let {about, cover_image: coverImage, location, name, profile_image: profileImage, website} = JSON.parse(result.account.json_metadata).profile
        let walletBal = result.account.balance
        this.$store.commit('SET_PROFILE', {about, coverImage, location, name, profileImage, website, walletBal})
      } else {
        console.log('error:', JSON.stringify(err, null, 2))
      }
    }, () => {
      console.log('done')
    })
    // this.$router.push('/')
  }
}
</script>
