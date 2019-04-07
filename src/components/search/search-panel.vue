<template>
    <div class="search-panel">
        <h3 class="header">Refine Results</h3>
        <h5>Use the options below to filter your results.</h5>
        <el-form :model="searchOptions" ref="searchOptions" label-position="top">
          <!--  Currency -->
          <el-form-item label="Currency">
              <el-select v-model="searchOptions.currency" placeholder="Select Currency">
                  <el-option label="Any" value="Any"></el-option>
                  <el-option label="STEEM" value="STEEM"></el-option>
                  <el-option label="SBD" value="SBD"></el-option>
                  <el-option label="TEARDROPS" value="TEARDROPS"></el-option>
              </el-select>
          </el-form-item>
          <!--  Category -->
          <el-form-item label="Category">
              <el-select v-model="searchOptions.category" placeholder="Select Category">
                  <el-option label="Any" value="Any"></el-option>
                  <el-option v-for="(category, index) in categories" :key="index" :label="capitalize(category.name)" :value="category.name"></el-option>
              </el-select>
          </el-form-item>
          <!--  Subcategory -->
          <el-form-item v-if="selectedCategory.name" label="Sub Category">
              <el-select v-model="searchOptions.subcategory" placeholder="Select Sub Category">
                  <el-option label="Any" value="Any"></el-option>
                  <el-option v-for="(subcategory, subIndex) in selectedCategory.subcategories" :key="subIndex" :label="capitalize(subcategory.name)" :value="subcategory.name"></el-option>
              </el-select>
          </el-form-item>
          <!--  Price -->
          <el-form-item class="price-item" label="Price">
            <el-input placeholder="Minimum Price" v-model="searchOptions.minPrice" :disabled='freeGigsOnly'>
                <template slot="prepend">$</template>
            </el-input>
            <span class='price-join'>to</span>
            <el-input placeholder="Maxiumum Price" v-model="searchOptions.maxPrice" :disabled='freeGigsOnly'>
                <template slot="prepend">$</template>
            </el-input>
          </el-form-item>
          <el-form-item>
          <el-checkbox v-model="freeGigsOnly">Show only FREE gigs</el-checkbox>
          </el-form-item>
            <el-form-item>
                <el-button type="primary"  @click="search">Search</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Api from '@/services/api'
import { mapGetters } from 'vuex'

export default {
  props: {
    currentPage: Number,
    selectedOrder: String
  },
  data () {
    return {
      searchOptions: {
        type: 'steemgigs_post',
        category: 'Any',
        subcategory: '',
        currency: 'Any',
        minPrice: '',
        maxPrice: '',
        limit: 8
      },
      freeGigsOnly: false,
      pageCount: 0
    }
  },
  mounted () {
    this.search()
  },
  methods: {
    async search () {
      this.$store.commit('setSearchStatus', true)
      try {
        let searchQuery = {
          'searchText': this.searchTerm,
          'type': this.searchOptions.type,
          'category': this.adjustedCategory,
          'subcategory': this.adjustedSubCategory,
          'currency': this.searchOptions.currency,
          'minPrice': this.searchOptions.minPrice || '0',
          'maxPrice': this.searchOptions.maxPrice || '0',
          'pageNumber': this.currentPage,
          'order': this.selectedOrder,
          'limit': this.searchOptions.limit
        }
        await Api.search(searchQuery).then(result => {
          this.$store.commit('setSearchStatus', false)
          this.$emit('resultsFound', {
            searchResults: result.data.results,
            pageCount: result.data.pages
          })
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
  computed: {
    ...mapGetters([
      'searchTerm'
    ]),
    selectedCategory () {
      if (this.searchOptions.category && this.searchOptions.category.toLowerCase() !== 'any') {
        return this.categories.find(categories => categories.name === this.searchOptions.category)
      } else {
        return {}
      }
    },
    adjustedCategory () {
    // Categories stored by default don't match the DB, therefore must remove special chars and replace whiespace with a single -
      const adjustedCategory = this.searchOptions.category
        .toLowerCase()
        .replace(/[^a-zA-Z\s]/g, '')
        .replace(/\s+/g, '-')
      return adjustedCategory
    },
    adjustedSubCategory () {
    // Subcategories stored by default don't match the DB, therefore must remove special chars and replace whiespace with a single -
      const adjustedSubCategory = this.searchOptions.subcategory
        .toLowerCase()
        .replace(/[^a-zA-Z\s]/g, '')
        .replace(/\s+/g, '-')
      return adjustedSubCategory
    }
  },
  watch: {
    // When the store is updated, the search should take place. This is watched to allow multiple searchs when not changing route
    searchTerm: function () {
      this.search()
    },
    currentPage: function () {
      this.search()
    },
    selectedOrder: function () {
      this.search()
    },
    freeGigsOnly: function () {
      if (this.freeGigsOnly === true) {
        this.searchOptions.minPrice = ''
        this.searchOptions.maxPrice = ''
      }
    },
    adjustedCategory: function () {
      this.searchOptions.subcategory = ''
    }
  }
}
</script>

<style>
    .search-panel {
        background: white;
        padding: 20px;
        -webkit-box-shadow: 0 3px 13px rgba(0, 0, 0, 0.05);
        box-shadow: 0 3px 13px rgba(0, 0, 0, 0.05);
        border-radius: 10px;
    }

    .search-panel label {
        padding: 0 !important;
        line-height: 30px !important;
    }

    .search-panel .header {
        font-size: 16px;
    }

    .el-pager .active {
        background: #6361D0 !important;
    }
    @media screen and (max-width: 1000px) {
        .price-item .el-form-item__content {
        flex-wrap: wrap;
    }
    }
</style>
