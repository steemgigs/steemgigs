<template>
<div></div>
</template>
<script>
export default {
  name: 'landing-page',
  data () {
    return {
      searchString: ''
    }
  },
  methods: {
    search () {
      this.$router.push(`search/${this.searchString}`)
    }
  }
}
</script>
<style lang="scss">
</style>
