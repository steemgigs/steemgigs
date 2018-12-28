<template>
  <page :pageClasses="['search__view', 'row']">
    <el-main>
      <div class="col s12 m6 l3" v-for="(gig, index) in searchResults" :key="index">
        <gig-card :gigData="gig" />
      </div>
    </el-main>
  </page>
</template>

<script>
import Api from '@/services/api'
import GigCard from '@/components/snippets/gigCard'
import Page from '@/components/page'
import { mapGetters } from 'vuex'

export default {
  name: 'search',
  data: function () {
    return {
      isSearching: '',
      searchResults: null
    }
  },
  components: {
    GigCard,
    Page
  },
  mounted () {
    // Set the search term from query to allow a user to navigate directly to the search page
    this.$store.commit('setSearchTerm', this.$route.params.query)
    // Search onload
    this.search()
  },
  computed: {
    ...mapGetters([
      'searchTerm'
    ])
  },
  methods: {
    async search () {
      this.isSearching = true
      try {
        await Api.search(this.searchTerm).then(result => {
          this.searchResults = result.data
          this.isSearching = false
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
  watch: {
    // When the store is updated, the search should take place. This is watched to allow multiple searchs when not changing route
    searchTerm: function () {
      this.search()
    }
  }
}
</script>

<style>

</style>
