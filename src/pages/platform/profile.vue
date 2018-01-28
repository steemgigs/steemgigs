<template>
  <div class="profile__view row">
    <cat-nav />
    <div class="col s12 m4 l3">
      <div class="card-panel">
        <img src="" alt="" class="profile">
        <span class="username">jalasem</span>
        <span class="expertise">Experienced Web Developer</span>
      </div>
    </div>
  </div>
</template>

<script>
import CatNav from '@/components/layout/catNav'
export default {
  components: {
    CatNav
  },
  data () {
    return {
      profileUsername: ''
    }
  },
  mounted () {
    this.profileUsername = this.$route.params.username
    // get profile details
  },
  methods: {
    async fetchUserInfo (username) {
      // try {
      //   let response = await Api.fetchUserInfo(username)
      //   console.log(response)
      // } catch (err) {
      //   console.log('error retrieving user info: \n error:', this.stringify(err))
      // }
    }
  }
}
</script>
