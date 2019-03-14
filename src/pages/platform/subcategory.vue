<template>
  <page :pageClasses="['categories__view', 'row']">
    <cat-nav />
    <el-main>
      <!-- Posts -->
       <el-col  :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
       <el-row :gutter="15">
            <categoryPreview mode="pages" :category="adjustedCategory" :subcategory="adjustedSubcategory" post_type="steemgigs_post" :limit="8" :header="combinedHeader" :description="categoryDetails.description"></categoryPreview>
        </el-row>
        </el-col>
    </el-main>
  </page>
</template>

<script>
import Page from '@/components/page'
import CatNav from '@/components/layout/catNav'
import CategoryPreview from '@/components/snippets/category-preview'

export default {
  components: {
    Page,
    CategoryPreview,
    CatNav
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
    },
    combinedHeader () {
      return this.categoryDetails.name + ' - ' + this.categoryDetails.subcategory
    },
    adjustedCategory () {
      return this.categoryDetails.name
        .toLowerCase()
        .replace(/[^a-zA-Z\s]/g, '')
        .replace(/\s+/g, '-')
    },
    adjustedSubcategory () {
      return this.categoryDetails.subcategory
        .toLowerCase()
        .replace(/[^a-zA-Z\s]/g, '')
        .replace(/\s+/g, '-')
    }
  },
  watch: {
    detailsname () {
      this.fetchSubCatPosts()
    }
  }
}
</script>
