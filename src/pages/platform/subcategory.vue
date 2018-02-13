<template>
  <page :pageClasses="['categories__view', 'row']">
    <cat-nav />
    <div class="col s12 m8 l9 right center-align row">
      <h1>{{ categoryDetails.name }}</h1>
      <p class="flow-text">{{ categoryDetails.description }}</p>
      <div v-if="this.loading">
        <div class="col s12 m6 l4">
          <loading-placeholder />
        </div>
        <div class="col s12 m6 l4">
          <loading-placeholder />
        </div>
        <div class="col s12 m6 l4">
          <loading-placeholder />
        </div>
      </div>
    </div>
    <div class="col s12 m4 l3 center center-align subcats">
      <div v-for="(subcategory, index) in categoryDetails.subcategories" :key="index" class="card-panel subcatCard waves-effect">
        <p class="">{{ capitalize(subcategory) }}</p>
      </div>
    </div>
  </page>
</template>

<script>
import Page from '@/components/page'
import CatNav from '@/components/layout/catNav'
import LoadingPlaceholder from '@/components/widgets/gigLoading'
import Api from '@/services/api'

export default {
  components: {
    Page,
    CatNav,
    LoadingPlaceholder
  },
  data () {
    return {
      loading: true
    }
  },
  beforeMount () {
    Api.fetchCatPosts(this.$route.params.category).then(result => {
      console.log('fetchedCatPosts::', result.data)
    }).catch(err => {
      console.log('error fetching catPosts::', err)
    })
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
