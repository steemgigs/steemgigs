<template>
  <div class="App__index">
    <home-page v-if="!auth" />
    <!-- <landing-page v-else /> -->
  </div>
</template>

<script>
import HomePage from '@/components/views/home'
// import LandingPage from '@/components/views/landing'
export default {
  components: {
    HomePage
    // LandingPage
  },
  data () {
    return {
      auth: false
    }
  }
}
</script>
