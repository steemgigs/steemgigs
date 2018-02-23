<template>
  <page :pageClasses="['categories__view', 'row']">
    <cat-nav />
    <div class="col s12 center-align row">
      <h1 class="grey-text darken-1">
      <router-link to="/" class="btn-floating waves-effect waves-light mr-2 z-depth-0 lighten-1 indigo"><i class="ion-home"></i></router-link> Testimonials</h1>
      <div>
        <div v-if="testimonials.length > 0" class="col s12 m6 l3 left-align" v-for="(testimonial, index) in testimonials" :key="index">
          <testimonial-card :testimonial="testimonial" />
        </div>
        <div v-if="testimonials.length <= 0" class="center center-align">
          <p class="flow-text grey-text">Be the first to tell how much you love steemgigs</p>
          <router-link to="/create_testimonial" tag="button" class="btn indigo">Post a testimonial</router-link>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import Page from '@/components/page'
import CatNav from '@/components/layout/catNav'
import LoadingPlaceholder from '@/components/widgets/gigLoading'
import TestimonialCard from '@/components/snippets/testimonialCard'

export default {
  components: {
    Page,
    CatNav,
    LoadingPlaceholder,
    TestimonialCard
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    testimonials () {
      return this.$store.state.posts.testimonials || []
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 3rem;
}
</style>
