<template>
  <div id="app">
    <nav-bar />
    <router-view/>
    <notifications group="foo" position="top left" />
  </div>
</template>

<script>
import NavBar from '@/components/layout/nav'
export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
</style>
