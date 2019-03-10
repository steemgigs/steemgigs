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
export default {
  components: {
    Page,
    HomePage,
    LandingPage
  }
}
</script>
