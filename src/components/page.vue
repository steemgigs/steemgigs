<template>
  <div :class="pageClassList">
    <slot>Empty Page</slot>
  </div>
</template>

<script>
import sc2 from '@/services/sc2'
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
  mounted () {
    sc2.setAccessToken(this.$store.state.accessToken)
    sc2.me((err, result) => {
      if (!err) {
        let {about, cover_image: coverImage, location, name, profile_image: profileImage, website} = JSON.parse(result.account.json_metadata).profile
        let walletBal = result.account.balance
        this.$store.commit('SET_PROFILE', {about, coverImage, location, name, profileImage, website, walletBal})
      } else {
        console.log('error:', JSON.stringify(err, null, 2))
      }
    }, () => {
      console.log('done')
    })
  }
}
</script>
