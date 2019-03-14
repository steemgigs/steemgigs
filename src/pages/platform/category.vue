<template>
  <page :pageClasses="['categories__view', 'row']">
    <cat-nav />
    <el-main>
      <!-- Posts -->
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
      <div class="subcats py-2">
        <ul>
          <li v-for="(subcategory, index) in categoryDetails.subcategories" :key="index">
            <router-link :to="'/categories/' + slugify(categoryDetails.name) + '/' + slugify(subcategory.name)" class="">
              {{ capitalize(subcategory.name) }}
            </router-link>
          </li>
        </ul>
      </div>
      </el-col>
      <!-- Sub Categories -->
       <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
       <el-row :gutter="15">
            <categoryPreview mode="pages" :category="category" post_type="steemgigs_post" :limit="8" :header="categoryDetails.name" :description="categoryDetails.description"></categoryPreview>
        </el-row>
        </el-col>
    </el-main>
  </page>
</template>

<script>
import Page from '@/components/page'
import CatNav from '@/components/layout/catNav'
import Api from '@/services/api'
import CategoryPreview from '@/components/snippets/category-preview'

export default {
  components: {
    Page,
    CatNav,
    CategoryPreview
  },
  data () {
    return {
      loading: true,
      category: this.$route.params.category
    }
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
    },
    detailsname () {
      return this.categoryDetails.name
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 3rem;
}
.margin-top {
  margin-top: 10px;
}
.left-panel {
  text-align: center;
  font-size: 16px;
  fonth-weight: 700;
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
</style>
