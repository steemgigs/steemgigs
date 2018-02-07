<template>
  <page :pageClasses="['categories__view', 'row']">
    <cat-nav />
    <div class="col s12 m8 l9 right center-align row">
      <h1>{{ categoryDetails.name }}</h1>
      <p class="flow-text">{{ categoryDetails.description }}</p>
      <div class="col s12"></div>
      <div class="col s12 m6 l4"></div>
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
export default {
  components: {
    Page,
    CatNav
  },
  computed: {
    categoryDetails () {
      let pageCategory = this.$route.params.category
      let details = {}
      this.categories.forEach((category, index) => {
        if (this.slugify(category.name) === pageCategory) {
          details.name = this.capitalize(category.name)
          details.description = category.description
          details.subcategories = category.subcategories
        }
      })
      return details
    }
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
