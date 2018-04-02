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
      this.$store.commit('SET_STEEMGIGS', {fetched})
      this.$eventBus.$emit('posts-fetched', fetched)
    }).catch(err => {
      console.log('error:', err)
      this.$eventBus.$emit('posts-fetched', err)
    })
    Api.fetchGigRequests().then(response => {
      let fetched = response.data
      this.$store.commit('SET_GIGREQUESTS', fetched)
      this.$eventBus.$emit('gigrequests-fetched', fetched)
    }).catch(err => {
      this.$eventBus.$emit('gigrequests-fetched', err)
      console.log('error:', err)
    })
    Api.fetchFeatured().then(response => {
      let fetched = response.data
      this.$store.commit('SET_FEATURED', fetched)
      this.$eventBus.$emit('featured-fetched', fetched)
    }).catch(err => {
      this.$eventBus.$emit('featured-fetched', err)
      console.log('error:', err)
    })
    Api.fetchSurpassingGoogle().then(response => {
      let fetched = response.data
      this.$store.commit('SET_SURPASSINGGOOGLE', fetched)
      this.$eventBus.$emit('surpassinggoogle-fetched', fetched)
    }).catch(err => {
      this.$eventBus.$emit('featured-fetched', err)
      console.log('error:', err)
    })
    Api.fetchTestimonials().then(response => {
      let fetched = response.data
      this.$store.commit('SET_TESTIMONIALS', fetched)
      this.$eventBus.$emit('testimonials-fetched', fetched)
    }).catch(err => {
      this.$eventBus.$emit('testimonials-fetched', err)
      console.log('error:', err)
    })
    Api.fetchUntalented().then(response => {
      let fetched = response.data
      this.$store.commit('SET_UNTALENTED', fetched)
      this.$eventBus.$emit('untalented-fetched', fetched)
    }).catch(err => {
      this.$eventBus.$emit('untalented-fetched', err)
      console.log('error:', err)
    })
  }
}
</script>
