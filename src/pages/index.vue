<template>
  <page :pageClasses="['App__index']">
    <home-page v-if="$store.state.accessToken" />
    <landing-page v-else />
  </page>
</template>

<script>
import Page from '@/components/page'
import HomePage from '@/components/views/home'
import LandingPage from '@/components/views/landing'
import Api from '@/services/api'
export default {
  components: {
    Page,
    HomePage,
    LandingPage
  },
  beforeCreate () {
    // steem.api.setOptions({
    //   url: 'wss://steemd.privex.io'
    // })
    Api.fetchPosts().then(response => {
      let fetched = response.data
      console.log('fetched', fetched)
      this.$store.commit('SET_STEEMGIGS', {fetched})
    }).catch(err => {
      console.log('error:', err)
    })
  }
}
</script>
