<template>
    <div class="category-preview">
        <div class="category-header">
          <div>
            <h3> {{ header }}</h3>
            <span class="header-desc"> {{ description }}</span>
            </div>
             <SortBar class="sort-bar" @adjustedSort='updateSort' :optionsType="optionsType" :sortMethod='selectedOrder'/>
        </div>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" v-for="(post, index) in sortedResults" :key="index">
            <gig-card :gigData="post" v-if="post_type !== 'steemgigs_testimonial'" />
            <testimonial-card v-else :testimonial="post" />
        </el-col>
    </div>
</template>

<script>
import Api from '@/services/api'
import GigCard from '@/components/snippets/gigCard'
import TestimonialCard from '@/components/snippets/testimonialCard'
import SortBar from '@/components/search/sort-bar'
import sort from '@/mixins/sort.js'

export default {
  name: 'category-preview',
  mixins: [sort],
  components: {
    GigCard,
    TestimonialCard,
    SortBar
  },
  data () {
    return {
      selectedOrder: 'newest',
      searchResults: []
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
        await Api.search(searchQuery).then(result => {
          this.searchResults = result.data.results
        })
      } catch (err) {
        // Send error toast notification upon error
        this.$notify.error({
          title: 'Error',
          message: `Sorry, there seems to have been an error. Error Details - ${err}`
        })
      }
    },
    updateSort: function (sortData) {
      this.selectedOrder = sortData.sortMethod
    }
  },
  mounted () {
    this.loadPosts()
  },
  computed: {
    optionsType: function () {
      switch (this.post_type) {
        case 'steemgigs_post':
          return 'all'
        default:
          return 'basic'
      }
    }
  },
  watch: {
    selectedOrder: function () {
      this.loadPosts()
    }
  }
}
</script>

<style lang="css">
.category-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 7px
}
</style>
