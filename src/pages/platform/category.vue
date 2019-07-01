<template>
  <page :pageClasses="['categories__view', 'row']">
    <cat-nav />
    <el-main>
      <!-- Sub Categories -->
      <el-col class="subcategories" :xs="1" :sm="1" :md="1" :lg="6" :xl="6">
      <div class="subcats py-2">
        <ul class="sub-cats">
          <li v-for="(subcategory, index) in categoryDetails.subcategories" :key="index">
            <router-link :to="'/categories/' + slugify(categoryDetails.name) + '/' + slugify(subcategory.name)" class="">
              {{ capitalize(subcategory.name) }}
            </router-link>
          </li>
        </ul>
      </div>
      </el-col>
      <!-- Posts -->
       <el-col  :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
       <el-row :gutter="15">
            <categoryPreview mode="pages" :category="category" :post_type="categoryDetails.type" :limit="8" :header="categoryDetails.name" :description="categoryDetails.description"></categoryPreview>
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
    CatNav,
    CategoryPreview
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    categoryDetails () {
      let pageCategory = this.$route.params.category
      let details = {}
      this.categories.forEach((category, index) => {
        if (this.slugify(category.name) === pageCategory) {
          switch (category.name) {
            case 'SurpassingGoogle':
            details.type = "steemgigs_surpassinggoogle"
            break
            default:
            details.type = "steemgigs_post"
          }
          details.name = this.capitalize(category.name)
          details.description = category.description
          details.subcategories = category.subcategories
        }
      })
      return details
    },
    detailsname () {
      return this.categoryDetails.name
    },
    category () {
      return this.$route.params.category
    }
  }
}
</script>

<style lang="scss" scoped>
.left-panel {
  text-align: center;
  font-size: 16px;
  font-weight: 700;
}
.sub-cats{
  width: 94%;
}
.subcats {
  &>ul {
    &>li {
      a {
        color: black;
        font-size: 14px;
        display: block;
        padding: 7px 25px;
        transition: all .3s ease;
        &:hover {
          background-color: #6361D0;
          color: white;
          padding: 7px 35px;
          border-radius: 5px;
          font-weight: bold;
        }
      }
    }
  }
}
// Temp fix to not hiding via element media queries
      @media only screen and (max-width: 1200px) {
          .subcats {
            display: none;
          }
      }
</style>
