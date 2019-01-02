<template>
  <page :pageClasses="['categories__view', 'row']">
    <cat-nav />
    <el-main>
    <div class="col s12 center-align row">
      <h3>Steem Gigs</h3>
      <h5>See what the SteemGigs community has to offer</h5>
      <div>
        <div v-if="gigs.length > 0" class="col s12 m6 l3 left-align" v-for="(gig, index) in gigs" :key="index">
          <gig-card type="gigRequest" :gigData="gig" />
        </div>
        <div v-if="gigs.length <= 0" class="center center-align">
          <p class="flow-text grey-text">Be the first to post a gig, click button below</p>
          <router-link to="/create_gig" tag="button" class="btn-large indigo btn-floating waves-effect waves-light"><i class="icon ion-android-add"></i></router-link>
        </div>
      </div>
    </div>
    </el-main>
  </page>
</template>

<script>
import Page from '@/components/page'
import CatNav from '@/components/layout/catNav'
import LoadingPlaceholder from '@/components/widgets/gigLoading'
import GigCard from '@/components/snippets/gigCard'

export default {
  components: {
    Page,
    CatNav,
    LoadingPlaceholder,
    GigCard
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    gigs () {
      return this.$store.state.posts.steemgigs || []
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 3rem;
}
</style>
