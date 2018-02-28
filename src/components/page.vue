<template>
  <div @click="closeSearch" :class="pageClassList">
    <slot>Empty Page</slot>
  </div>
</template>

<script>
import Api from '@/services/api'

export default {
  props: {
    pageClasses: {
      type: Array,
      required: true
    }
  },
  computed: {
    pageClassList () {
      return this.pageClasses.join(' ')
    }
  },
  methods: {
    closeSearch () {
      this.$eventBus.$emit('close-search')
    }
  },
  mounted () {
    let {accessToken, username} = this.$store.state
    Api.profile(username, accessToken).then(response => {
      let responseData = response.data
      console.log('from page', responseData)
      let {about, coverImage, location, name, profilePic, rep, balance: walletBal, steemgigsWitness} = responseData
      this.$store.commit('SET_PROFILE', {about, coverImage, location, name, profilePic, walletBal, rep, steemgigsWitness})
      this.$eventBus.$emit('profile-fetched', responseData)
    })
  }
}
</script>
