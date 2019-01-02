<template>
  <page :pageClasses="['categories__view', 'row']">
    <cat-nav />
    <el-main>
    <div class="col s12 center-align row">
      <h3 class="page-bottom">Requested Gigs</h3>
      <h5>Gig requests provided by our community</h5>
      <div>
        <div v-if="gigs.length > 0" class="col s12 m6 l3 left-align" v-for="(gig, index) in gigs" :key="index">
          <gig-card type="gigRequest" :gigData="gig" />
        </div>
        <div v-if="gigs.length <= 0" class="center center-align">
          <h5>Can&rsquo;t find what you&rsquo;re looking Seeking?<br>You can post Custom request and we&rsquo;ll lovingly look for reputable great minds to handle it</h5>
          <router-link to="/steemgigs_request" tag="button" class="btn btn-large indigo">Post custom request</router-link>
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
      return this.$store.state.posts.gigrequests || []
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 3rem;
}
</style>
