<template>
    <div class="category-preview">
        <div class="category-header">
            <h3> {{ header }}</h3>
            <span class="header-desc"> {{ description }}</span>
        </div>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" v-for="(post, index) in posts" :key="index">
            <gig-card :gigData="post" v-if="post_type !== 'steemgigs_testimonial'" />
            <testimonial-card v-else :testimonial="post" />
        </el-col>
    </div>
</template>

<script>
import Api from '@/services/api'
import GigCard from '@/components/snippets/gigCard'
import TestimonialCard from '@/components/snippets/testimonialCard'

export default {
  name: 'category-preview',
  components: {
    GigCard,
    TestimonialCard
  },
  data () {
    return {
      selectedOrder: 'newest',
      posts: []
    }
  },
  props: {
    post_type: String,
    header: String,
    description: String
  },
  methods: {
    async loadPosts () {
      try {
        const searchQuery = {
          'type': this.post_type,
          'pageNumber': 1,
          'order': this.selectedOrder,
          'limit': 4
        }
        // Remove price for testimonial posts
        if (this.post_type !== 'steemgigs_testimonial') {
          Object.assign(searchQuery, {
            'maxPrice': '0',
            'minPrice': '0'
          })
        }
        await Api.search(searchQuery).then(result => {
          this.posts = result.data.results
        })
      } catch (err) {
        // Send error toast notification upon error
        this.$notify.error({
          title: 'Error',
          message: `Sorry, there seems to have been an error. Error Details - ${err}`
        })
      }
    }
  },
  mounted () {
    this.loadPosts()
  }
}
</script>

<style lang="css">
.category-header {
    display: block;
}
</style>
