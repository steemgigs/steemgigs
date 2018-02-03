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
    Api.fetchPosts().then(response => {
      this.steemgigs = response.data
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
