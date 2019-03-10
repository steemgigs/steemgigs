<template>
    <div class="category-preview" >
        <div class="category-header">
          <div>
            <h3> {{ header }}</h3>
            <span class="header-desc"> {{ description }}</span>
            </div>
             <SortBar class="sort-bar" @adjustedSort='updateSort' :optionsType="optionsType" :sortMethod='selectedOrder'/>
        </div>
        <!-- If there are posts available to be shown, show posts -->
        <div class="post-preview-wrapper" v-loading="isLoading" v-if="searchResults.length !== 0">
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6" v-for="(post, index) in sortedResults" :key="index">
            <gig-card :gigData="post" v-if="post_type !== 'steemgigs_testimonial'" />
            <testimonial-card v-else :testimonial="post" />
        </el-col>
        <el-row class="preview-footer">
           <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <router-link :to="linkDetails.moreLinkDetails.routerLink"><el-button class="secondary" type="secondary"> Explore {{ linkDetails.moreLinkDetails.buttonText }}</el-button></router-link>
        </el-col>
        </el-row>
        </div>
        <!-- Else show a placeholder card -->
        <el-row class="preview-footer" v-else>
           <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
             <p>Were weren't able to find any results in this category, why not use the button below to create your own</p>
              <router-link :to="linkDetails.editorLink.routerLink"><el-button class="secondary" type="secondary"> Create {{ linkDetails.editorLink.buttonText }}</el-button></router-link>
        </el-col>
        </el-row>
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
      searchResults: [],
      isLoading: false
    }
  },
  props: {
    post_type: String,
    header: String,
    description: String,
    limit: Number
  },
  methods: {
    async loadPosts () {
      this.isLoading = true
      try {
        const searchQuery = {
          'type': this.post_type,
          'pageNumber': 1,
          'order': this.selectedOrder,
          'limit': this.limit
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
      this.isLoading = false
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
    },
    linkDetails: function () {
      let linkDetails = {
        moreLinkDetails: {
          buttonText: '',
          routerLink: ''
        },
        editorLink: {
          buttonText: '',
          routerLink: ''
        }
      }

      // Set both the link for exploring more posts within a particular category as well as buttons a links in no result scenario

      switch (this.post_type) {
        case 'steemgigs_post':
          linkDetails.moreLinkDetails.buttonText = 'Gigs'
          linkDetails.moreLinkDetails.routerLink = 'steemgigs'
          linkDetails.editorLink.buttonText = 'Gig'
          linkDetails.editorLink.routerLink = 'create_gig'
          break
        case 'steemgigs_testimonial':
          linkDetails.moreLinkDetails.buttonText = 'Testimonials'
          linkDetails.moreLinkDetails.routerLink = 'testimonials'
          linkDetails.editorLink.buttonText = 'Testimonial'
          linkDetails.editorLink.routerLink = 'create_testimonial'
          break
        case 'steemgigs_surpassinggoogle':
          linkDetails.moreLinkDetails.buttonText = 'SurpassingGoogle'
          linkDetails.moreLinkDetails.routerLink = 'categories/surpassinggoogle'
          linkDetails.editorLink.buttonText = 'SurpassingGoogle'
          linkDetails.editorLink.routerLink = 'surpassing-google'
          break
        case 'steemgigs_request':
          linkDetails.moreLinkDetails.buttonText = 'SteemGigs Requests'
          linkDetails.moreLinkDetails.routerLink = 'requested_gigs'
          linkDetails.editorLink.buttonText = 'Request'
          linkDetails.editorLink.routerLink = 'steemgigs_request'
          break
      }
      return linkDetails
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

.post-preview-wrapper {
  min-height: 335px;
}

.preview-footer {
  display: block;
  text-align: center;
}
</style>
