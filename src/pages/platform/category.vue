<template>
  <page :pageClasses="['categories__view', 'row']">
    <cat-nav />
    <div class="col s12 center">
      <h1>{{ categoryDetails.name }}</h1>
      <p class="flow-text">{{ categoryDetails.description }}</p>
    </div>
    <div class="col s12 center center-align">
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
p {
  font-size: 1.3em;
}
.subcatCard.card-panel {
  width: auto;
  display: inline-block;
  margin-left: 1em;
  padding: 0px 24px;
  cursor: pointer;
  transition: background ease-in-out .3s;
  &:hover {
    background: rgb(240, 248, 255);
  }
}
</style>
