<template>
    <page :pageClasses="['user-search__view', 'row']">
       <cat-nav />
        <el-main>
          <el-row>
            <div v-if="users.length !== 0">
            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="3" v-for="(profile, index) in users" :key="index">
              <ProfileOverview mode="preview" :profile="profile" />
            </el-col>
            </div>
            <el-col v-else :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <h3>We couldn't find any users that match your query</h3>
              <h5>We couldn't find anything for that, why not try another search or alternatively check out some more gigs</h5>
              <router-link :to="searchLink">
              <el-button type="secondary" class="secondary">Search Posts</el-button>
              </router-link>
            </el-col>
          </el-row>
        </el-main>
    </page>
</template>

<script>
import Api from '@/services/api'
import CatNav from '@/components/layout/catNav'
import ProfileOverview from '@/components/profile/profile-overview'
import { mapGetters } from 'vuex'
export default {
  name: 'user-search',
  components: {
    CatNav,
    ProfileOverview
  },
  data () {
    return {
      users: [],
      currentPage: 1,
      pageNumber: 1,
      order: 'newest',
      limit: 8,
      pageCount: ''
    }
  },
  mounted () {
    this.searchUsers()
  },
  computed: {
    ...mapGetters([
      'searchTerm',
      'isSearching'
    ]),
    searchLink () {
      return '/search/posts/' + this.searchTerm
    }
  },
  methods: {
    async searchUsers () {
      try {
        let searchQuery = {
          'searchText': this.searchTerm,
          'pageNumber': this.currentPage,
          'order': this.order,
          'limit': this.limit
        }
        await Api.search_users(searchQuery).then(result => {
          this.users = result.data.searchResults
          this.pageCount = result.data.pageCount
        })
      } catch (err) {
        // Send error toast notification upon error
        this.$notify.error({
          title: 'Error',
          message: `Sorry, there seems to have been an error. Error Details - ${err}`
        })
      }
    }
  }
}
</script>

<style>

</style>
