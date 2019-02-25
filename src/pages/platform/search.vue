<template>
  <page :pageClasses="['search__view', 'row']">
    <cat-nav />
    <el-main class="search-page">
      <el-row :gutter="15">
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
        <SearchPanel @resultsFound='populateResults' :selectedOrder='selectedOrder' :currentPage='currentPage' />
      </el-col>
      <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
      <!-- Loading Placeholder - Consistent with categories.vue -->
      <div v-if="isSearching">
        <div v-for="index in loadingPlaceholderCount" :key="index" class="col s12 m6 l3">
          <loading-placeholder />
        </div>
      </div>
      <!-- Search Results -->
      <div v-else-if="searchResults.length !== 0" class="search-results-container">
        <div class="search-header">
          <h3>Your Results</h3>
          <SortBar @adjustedSort='updateSort' :sortMethod='selectedOrder'/>
        </div>
        <div class="col s12 m6 l4" v-for="(gig, index) in searchResults" :key="index">
          <gig-card :gigData="gig" />
        </div>
        <el-pagination class="search-pagination" background layout="prev, pager, next" :current-page.sync="currentPage" :page-count="pageCount"></el-pagination>
      </div>
      <!-- No Results to Show -->
      <div v-else class="col s12 m12 l12 center-align row">
        <h3>No Results to Show</h3>
        <h5>We couldn't find anything for that, why not try another search or alternatively check out some more gigs</h5>
        <router-link to="/steemgigs">
          <el-button type="secondary" class="secondary">Explore Gigs</el-button>
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

export default {
  name: 'search',
  data: function () {
    return {
      isSearching: '',
      searchResults: {},
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
    }
  }
}
</script>

<style>

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
  justify-content: space-between;
  padding: 0px 10px 10px 10px;
  align-items: center;
}

</style>
