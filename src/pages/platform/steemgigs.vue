<template>
  <page :pageClasses="['categories__view', 'row']">
    <cat-nav />
    <div class="col s12 center-align row">
      <h1 class="grey-text darken-1">
      <router-link to="/" class="btn-floating waves-effect waves-light mr-2 z-depth-0 lighten-1 indigo"><i class="ion-home"></i></router-link> Steem Gigs</h1>
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
