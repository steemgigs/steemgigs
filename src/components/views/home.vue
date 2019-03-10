<template>
  <div class="home__view row">
    <cat-nav />

    <el-main>
          <carousel id="home_ad_slider" :navigationEnabled="false" :autoplay="true" :autoplayHoverPause="true" :perPage="1">
      <slide>
        <img src="/static/img/share.png" class="responsive-img" alt="">
      </slide>
      </carousel>
      <!-- Gigs -->
      <el-row :gutter="15">
      <categoryPreview post_type="steemgigs_post" header="SteemGigs" description="See what the SteemGigs community has to offer" />
      </el-row>
      <!-- Gigs Requests -->
      <el-row :gutter="15">
      <categoryPreview post_type="steemgigs_request" header="SteemGig Requests" description="Custom requests as provided by our community."></categoryPreview>
      </el-row>
       <!-- Testimonial -->
       <el-row :gutter="15">
         <categoryPreview post_type="steemgigs_testimonial" header="Testimonials" description="SteemGigs success-stories written by our users"></categoryPreview>
      </el-row>
      <!-- SurpassingGoogle -->
      <el-row :gutter="15">
      <categoryPreview post_type="steemgigs_surpassinggoogle" header="SurpassingGoogle" description="The Knowledge-Bank of SteemGigs"></categoryPreview>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import {Plane} from 'vue-loading-spinner'
import Api from '@/services/api'
import CatNav from '@/components/layout/catNav'
import CategoryPreview from '@/components/snippets/category-preview'

export default {
  components: {
    Plane,
    CatNav,
    Carousel,
    Slide,
    CategoryPreview
  },
  data () {
    return {
      editMode: false,
      testimonial: '',
      testimonialSubject: '',
      userTags: [],
      errorText: '',
      successText: '',
      isPosting: false
    }
  },
  methods: {
    getTags (entries) {
      this.userTags = entries
    },
    gettry () {
      console.log(Api.fetchSurpassingGoogle)
    }
  }
}
</script>

<style lang="scss">
$blue: #6361D0;
.steemgigs_ads {
  box-sizing: border-box;
  padding: 0;
  padding-left: 0.5em;
  .card {
    p {
      font-size: 16px;
      font-weight: 700;
    }
    &.searches {
      padding-bottom: 0px;
      .card-content {
        padding: 2em 1em 0.5em;
      }
      li {
        display: inline-flex;
        a {
          background: #ef462e;
          color: white;
          padding: 2px 5px;
          font-weight: 600;
          margin: 0px 1px 5px;
          cursor: pointer;
        }
      }
    }
    &.request {
      .card-content {
        padding: 20px 10px;
      }
    }
    .card-title {
      margin-top: -0.7em;
      font-size: 1.5em;
      text-decoration: underline;
    }
    button.btn {
      display: block;
      text-align: center;
      margin-top: 18px;
      text-transform: none;
      width: 100%;
      padding: 0;
      font-size: 0.9em;
      font-weight: 500;
    }
  }
}
#home_ad_slider {
    margin-bottom: 20px;
  img {
    height: 215px;
    background: #ccc;
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
  .caption {
    position: absolute;
    z-index: 1000;
    bottom: 1em;
    min-width: 60%;
    margin-left: 1em;
    color: white;
  }
  .VueCarousel-dot-container {
    display: inline-block !important;
    margin: 0 auto !important;
    position: absolute !important;
    left: 1em !important;
    bottom: 1em !important;
  }
}
section {
  .card {
    .card-content {
      padding: 1em;
      .sellerPic {
        border-radius: 50%;
        border: 1px solid $blue;
        width: 2.7em;
        height: 2.7em;
        margin-top: 0px;
        margin-left: 0em;
        display: inline-block;
      }
      .sellerName {
        color: black;
        margin-top: 0.5em;
        transition: all ease-in .3s;
        &:hover {
          text-decoration: underline;
        }
      }
      a {
        &.task {
          color: black;
        }
      }
      .price {
        margin-top: 0.5em;
        font-weight: 500;
      }
    }
    .card-action {
      padding: 1em;
      border-radius: 0 0 10px 10px !important;
      a:not(.btn):not(.btn-large):not(.btn-large):not(.btn-floating) {
        color: $blue;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }

  .header-row {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 15px !important;
}

.header-row:first-child {
  padding-top: 0;
}

.browser-default {
  min-width: 150px;
}
}

.feed-option {
  text-transform: capitalize;
}

.VueCarousel-wrapper {
  border-radius: 10px;
}
</style>
