<template>
  <page :pageClasses="['search__view', 'row']">
    <cat-nav />
    <el-main class="search-page">
      <el-row :gutter="15">
      <el-col :xs="0" :sm="8" :md="6" :lg="5" :xl="5">
        <SearchPanel @resultsFound='populateResults' :selectedOrder='selectedOrder' :currentPage='currentPage' />
      </el-col>
      <el-col :xs="24" :sm="16" :md="18" :lg="19" :xl="19">
      <!-- Loading Placeholder - Consistent with categories.vue -->
      <div v-if="isSearching">
        <div v-for="index in loadingPlaceholderCount" :key="index" class="col s12 m6 l3">
          <loading-placeholder />
        </div>
      </div>
      <!-- Search Results -->
      <div v-else-if="searchResults.length !== 0" class="search-results-container">
        <div class="search-header">
          <h3>Search Results for "{{this.searchTerm}}"</h3>
          <SortBar @adjustedSort='updateSort' :sortMethod='selectedOrder'/>
          <p class="suggestion-text">Still can't find your desired Gig? <router-link to="/steemgigs_request">Create a Custom Request</router-link> or a <router-link to="/create_microtask">Micro-Task</router-link></p>
        </div>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="3" v-for="(gig, index) in sortedResults" :key="index">
          <gig-card :gigData="gig" />
        </el-col>
        <el-pagination class="search-pagination" background layout="prev, pager, next" :current-page.sync="currentPage" :page-count="pageCount"></el-pagination>
      </div>
      <!-- No Results to Show -->
      <div v-else class="col s12 m12 l12 center-align row">
        <h3>No Results to Show</h3>
        <h5>We couldn't find anything for that, why not try another search or alternatively check out some other aspects of SteemGigs</h5>
        <router-link to="/steemgigs_request">
          <el-button type="secondary" class="margined-buttons">Create Custom Request</el-button>
        </router-link>
        <router-link to="/bropro">
          <el-button type="secondary" class="margined-buttons">Consult a BroPro</el-button>
        </router-link>
        <router-link to="/steemgigs">
          <el-button type="secondary" class="margined-buttons">Explore Gigs</el-button>
        </router-link>
        <router-link to="/create_gig">
          <el-button type="secondary" class="margined-buttons">Create a Gig</el-button>
        </router-link>
        <router-link to="/create_microtask">
          <el-button type="secondary" class="margined-buttons">Create a Micro-Task</el-button>
        </router-link>
        <router-link to="/surpassing-google">
          <el-button type="secondary" class="margined-buttons">Contribute Knowledge</el-button>
        </router-link>
      </div>
      </el-col>
      </el-row>
    </el-main>
  </page>
</template>

<script>

import GigCard from '@/components/snippets/gigCard'
import Page from '@/components/page'
import LoadingPlaceholder from '@/components/widgets/gigLoading'
import SearchPanel from '@/components/search/search-panel'
import SortBar from '@/components/search/sort-bar'
import CatNav from '@/components/layout/catNav'
import { mapGetters } from 'vuex'
import sort from '@/mixins/sort.js'

export default {
  name: 'search',
  mixins: [sort],
  data: function () {
    return {
      searchResults: [],
      loadingPlaceholderCount: 4,
      pageCount: 1,
      currentPage: 1,
      selectedOrder: 'newest'
    }
  },
  components: {
    GigCard,
    Page,
    LoadingPlaceholder,
    CatNav,
    SearchPanel,
    SortBar
  },
  methods: {
    populateResults: function (results) {
      this.searchResults = results.searchResults
      this.pageCount = results.pageCount
    },
    updateSort: function (sortData) {
      this.selectedOrder = sortData.sortMethod
    },
  },
  computed: {
    ...mapGetters([
      'searchTerm',
      'isSearching'
    ]),

  }
}
</script>

<style>
.suggestion-text{
  flex-basis: 100%;
  margin: 0;
  display: block !important;
}
.margined-buttons{
  margin: 6px 4px !important;
}
.search-page {
  padding: 30px 30px;
}

.search-pagination {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  padding: 10px;
}

.search-header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0px 10px 10px 10px;
  align-items: center;
}

</style>
