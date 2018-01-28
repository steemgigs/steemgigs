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
import sc2 from '@/services/sc2'
import CatNav from '@/components/layout/catNav'
export default {
  components: {
    CatNav
  },
  mounted () {
    console.log(this.$route.params.username)
  }
}
</script>
