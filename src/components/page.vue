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
    Api.loggedIn(username, accessToken).then(response => {
      let responseData = response.data.profile
      console.log('FROM LOGGED IN', {responseData})
      let {social, name, profilePic, about, location, coverPic, rep, balance, steemgigsWitness} = responseData
      this.$store.commit('SET_PROFILE', {social, name, profilePic, about, location, coverPic, rep, balance, steemgigsWitness})
    })
  }
}
</script>
