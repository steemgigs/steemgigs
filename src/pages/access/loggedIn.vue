<template>
  <div class="center">
    <h1><br>You are logged in.</h1>
    <p>Redirecting...</p>
  </div>
</template>

<script>
import sc2 from '@/services/sc2'
export default {
  mounted () {
    let {access_token: accessToken, expires_in: tokenExpires, username} = this.$route.query
    this.$store.commit('SET_USER', {accessToken, tokenExpires, username})
    sc2.setAccessToken(accessToken)
    sc2.me((err, result) => {
      if (!err) {
        console.log('/me: ', result)
        let {about, cover_image: coverImage, location, name, profile_image: profileImage, website} = JSON.parse(result.account.json_metadata).profile
        console.log(about, coverImage, location, name, profileImage, website)
        this.$store.commit('SET_PROFILE', {about, coverImage, location, name, profileImage, website})
      } else {
        console.log('error:', JSON.stringify(err, null, 2))
      }
    })
    console.log('redirecting...')
    this.$router.push('/')
    // sc2.me(function (err, result) {
    //   console.log('/me', err, result)
    //   if (!err) {
    //     this.user = result.account
    //     this.metadata = JSON.stringify(result.user_metadata, null, 2)
    //   }
    // })
  }
}
</script>
