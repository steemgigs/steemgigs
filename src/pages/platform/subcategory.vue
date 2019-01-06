<template>
  <page :pageClasses="['categories__view', 'row']">
    <cat-nav />
    <el-main>
    <div class="col s12 center-align row">
      <h3 class="grey-text darken-1">
            <router-link class="grey-text text-lighten-1" :to="'/categories/' + slugify(categoryDetails.name)">{{ capitalize(categoryDetails.name) }}</router-link> > <span class="grey-text text-darken-2">{{categoryDetails.subcategory}}</span></h3>
      <h5>{{ categoryDetails.description }}</h5>
      <div v-if="loading">
        <div class="col s12 m6 l3">
          <loading-placeholder />
        </div>
        <div class="col s12 m6 l3">
          <loading-placeholder />
        </div>
        <div class="col s12 m6 l3">
          <loading-placeholder />
        </div>
        <div class="col s12 m6 l3">
          <loading-placeholder />
        </div>
      </div>
      <div v-if="!loading">
        <div v-if="catgigs.length > 0" class="col s12 m6 l3 left-align" v-for="(gig, index) in catgigs" :key="index">
          <gig-card :gigData="gig" />
        </div>
        <div v-if="catgigs.length <= 0">
          <h5>There are no posts yet in this category. Be the first to post in the <span class="grey-text text-darken-2">{{categoryDetails.name}}</span> category</h5>
          <router-link :to="this.$route.params.category == 'surpassinggoogle' ? '/surpassing-google' : '/create_gig'"><el-button class="secondary" type="secondary">Create</el-button></router-link>        </div>
      </div>
    </div>
    </el-main>
  </page>
</template>

<script>
import Page from '@/components/page'
import CatNav from '@/components/layout/catNav'
import LoadingPlaceholder from '@/components/widgets/gigLoading'
import GigCard from '@/components/snippets/gigCard'
import Api from '@/services/api'

export default {
  components: {
    Page,
    CatNav,
    LoadingPlaceholder,
    GigCard
  },
  data () {
    return {
      loading: true,
      catgigs: []
    }
  },
  methods: {
    fetchSubCatPosts () {
      this.loading = true
      Api.fetchSubCatPosts(this.$route.params.subcategory).then(result => {
        this.catgigs = result.data
        this.loading = false
        console.log('fetchedSubCatPosts::', result.data)
      }).catch(err => {
        console.log('error fetching subCatPosts::', err)
      })
    }
  },
  computed: {
    categoryDetails () {
      let pageCategory = this.$route.params.category
      let pageSubCategory = this.$route.params.subcategory
      let details = {}
      this.categories.forEach((category, index) => {
        if (this.slugify(category.name) === pageCategory) {
          category.subcategories.forEach((subcategory) => {
            if (this.slugify(subcategory.name) === pageSubCategory) {
              details.subcategory = this.capitalize(subcategory.name)
              details.description = subcategory.description
              console.log('found it ', pageSubCategory)
            }
          })
          details.name = this.capitalize(category.name)
        }
      })
      return details
    },
    detailsname () {
      return this.categoryDetails.subcategory
    }
  },
  watch: {
    detailsname () {
      this.fetchSubCatPosts()
    }
  },
  mounted () {
    this.fetchSubCatPosts()
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 3rem;
}
.subcats {
  padding-top: 2em;
  p {
    font-size: 1.3em;
    line-height: 125%;
    text-align: left;
    margin: 0.5em 0;
  }
  .subcatCard.card-panel {
    width: 100%;
    display: inline-block;
    margin: 1px;
    padding: 0px 24px;
    cursor: pointer;
    transition: background ease-in-out .3s;
    &:hover {
      background: rgb(240, 248, 255);
    }
  }
}
</style>
