<template>
  <page :pageClasses="['categories__view', 'row']">
    <cat-nav />
    <div class="col s12 m8 l9 right center-align row">
      <h1>{{ categoryDetails.name }}</h1>
      <p class="flow-text">{{ categoryDetails.description }}</p>
      <div v-if="loading">
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
      <div v-if="!loading">
        <div v-if="catgigs.length > 0" class="col s12 m6 l4 mt-3 left-align" v-for="(gig, index) in catgigs" :key="index">
          <gig-card :gigData="gig" />
        </div>
        <div v-if="catgigs.length <= 0">
          <p class="flow-text grey-text">There are no posts yet in this category. Be the first to post in the <span class="grey-text text-darken-2">{{categoryDetails.name}}</span> category</p>
          <router-link to="/create_gig" tag="button" class="btn-large indigo btn-floating waves-effect waves-light"><i class="icon ion-android-add"></i></router-link>
        </div>
      </div>
    </div>
    <div class="col s12 m4 l3 hide-on-med-and-down">
      <div class="subcats py-2">
        <ul>
          <li v-for="(subcategory, index) in categoryDetails.subcategories" :key="index">
            <router-link :to="'/categories/' + slugify(categoryDetails.name) + '/' + slugify(subcategory.name)" class="">
              {{ capitalize(subcategory.name) }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
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
    fetchCatPosts () {
      this.loading = true
      Api.fetchCatPosts(this.$route.params.category).then(result => {
        this.catgigs = result.data
        this.loading = false
        console.log('fetchedCatPosts::', result.data)
      }).catch(err => {
        console.log('error fetching catPosts::', err)
      })
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
  },
  watch: {
    detailsname () {
      this.fetchCatPosts()
    }
  },
  mounted () {
    this.fetchCatPosts()
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 3rem;
}
.subcats {
  box-shadow: 0 3px 13px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  background-color: white;
  &>ul {
    &>li {
      a {
        color: gray;
        font-size: 1.15rem;
        display: block;
        padding: 7px 25px;
        transition: all .3s ease;
        &:hover {
          background-color: #4b5ab9;
          color: white;
          box-shadow: 0 6px 13px rgba(0, 0, 0, 0.2);
          padding: 7px 35px;
        }
      }
    }
  }
  // p {
  //   font-size: 1.3em;
  //   line-height: 125%;
  //   text-align: left;
  //   margin: 0.5em 0;
  // }
  // .subcatCard.card-panel {
  //   width: 100%;
  //   display: inline-block;
  //   margin: 1px;
  //   padding: 0px 24px;
  //   cursor: pointer;
  //   color:#434343;
  //   transition: background ease-in-out .3s;
  //   &:hover {
  //     background: rgb(152, 142, 160);
  //     color: white
  //   }
  // }
}
</style>
