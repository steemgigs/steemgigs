<template>
  <page :pageClasses="['App__index']">
    <home-page :steemgigs="steemgigs" v-if="$store.state.accessToken" />
    <landing-page :steemgigs="steemgigs" v-else />
  </page>
</template>

<script>
import Page from '@/components/page'
import HomePage from '@/components/views/home'
import LandingPage from '@/components/views/landing'
import Api from '@/services/api'
import steem from 'steem'
export default {
  components: {
    Page,
    HomePage,
    LandingPage
  },
  data () {
    return {
      steemgigs: []
    }
  },
  beforeCreate () {
    steem.api.setOptions({
      url: 'wss://steemd.privex.io'
    })
    steem.api.getState('/trending/steemgigs', (err, result) => {
      console.log('steem:::', err, result)
    })
    Api.fetchPosts().then(response => {
      console.log(response.data)
      this.steemgigs = response.data
      console.log('fetched', this.steemgigs)
    }).catch(err => {
      console.log('error:', err)
    })
  }
}
</script>
