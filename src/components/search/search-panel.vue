<template>
    <div class="search-panel">
        <h3>Filter your results</h3>
        <h5>Use the options below to filter your results.</h5>
        <el-form :model="searchOptions" ref="searchOptions" label-position="top">
          <!--  Currency -->
          <el-form-item label="Currency">
              <el-select v-model="searchOptions.currency" placeholder="Select Currency">
                  <el-option label="Any" value="Any"></el-option>
                  <el-option label="STEEM" value="STEEM"></el-option>
                  <el-option label="SBD" value="SBD"></el-option>
              </el-select>
          </el-form-item>
          <!--  Price -->
          <el-form-item class="price-item" label="Price">
            <el-input v-model="searchOptions.minPrice" :disabled='freeGigsOnly'>
                <template slot="prepend">$</template>
            </el-input>
            <span class='price-join'>to</span>
            <el-input v-model="searchOptions.maxPrice" :disabled='freeGigsOnly'>
                <template slot="prepend">$</template>
            </el-input>
          </el-form-item>
          <el-form-item>
          <el-checkbox v-model="freeGigsOnly">Show only FREE gigs</el-checkbox>
          </el-form-item>
            <el-form-item>
                <el-button type="primary" class="primary" @click="search">Search</el-button>
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
        category: 'graphics-design',
        subcategory: 'logo-design',
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
      this.isSearching = true
      try {
        let searchQuery = {
          'type': this.searchOptions.type,
          'currency': this.searchOptions.currency,
          'minPrice': this.searchOptions.minPrice || '0',
          'maxPrice': this.searchOptions.maxPrice || '0',
          'pageNumber': this.currentPage,
          'order': this.selectedOrder,
          'limit': this.searchOptions.limit
        }
        await Api.search(searchQuery).then(result => {
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
    ])
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

    .price-item .el-form-item__content {
        display: flex;
    }

    .price-join {
        padding: 0 10px;
    }
</style>
