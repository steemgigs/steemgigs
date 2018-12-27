<template>
  <div class="home__view row">
    <cat-nav />
          <carousel id="home_ad_slider" :navigationEnabled="false" :autoplay="true" :autoplayHoverPause="true" :perPage="1">
        <slide>
          <img src="/static/img/share.png" class="responsive-img" alt="">
        </slide>
      </carousel>
    <el-main>
    <div class="col s12 m12 l12">
      <section id="steemgigs" class="row">
        <div class="col s12 header-row">
          <h3 class="left">Gigs</h3>
          <span class="right">
            <select class="browser-default">
              <option value="" disabled selected>Sort By</option>
              <option value="tranding">Trending</option>
              <option value="new">New</option>
              <option value="active">Active</option>
              <option value="hot">Hot</option>
              <option value="promoted">Promoted</option>
            </select>
          </span>
        </div>
        <div v-if="steemgigs.length < 1" class="col s12 center-align center">
          <plane v-if="!postsFetched" size="100" />
          <div v-if="postsFetched">
            <h5>Be the first to post a gig, click button below</h5>
            <router-link to="/create_gig" tag="button" class="btn-large indigo btn-floating waves-effect waves-light"><i class="icon ion-android-add"></i></router-link>
          </div>
          <br><br>
          <br><br>
        </div>
        <div class="col s12 m6 l3"  v-for="(gig, index) in steemgigs.slice(0,8)" :key="index">
          <gig-card :gigData="gig" />
        </div>
        <div v-if="testimonials.length > 0" class="col s12 center-align py-3">
          <el-button class="secondary" type="secondary"><router-link to="/steemgigs">View More</router-link></el-button>
        </div>
      </section>
      <!-- <section id="untalented" class="row">
        <div class="col s12">
          <h5 class="left">#Untalented-Steemgigs</h5>
          <span class="right">
            <select class="browser-default">
              <option value="" disabled selected>Sort By</option>
              <option value="tranding">Trending</option>
              <option value="new">New</option>
              <option value="active">Active</option>
              <option value="hot">Hot</option>
              <option value="promoted">Promoted</option>
            </select>
          </span>
        </div>
        <div v-if="untalented.length < 1" class="col s12 center-align center">
          <plane v-if="!untalentedFetched" size="100" />
          <div v-if="untalentedFetched">
            <p class="flow-text grey-text">Post a fantastic STEEMGIG, it stands a chance of being featured here</p>
            <router-link to="/create_gig" tag="button" class="btn-large indigo btn-floating waves-effect waves-light"><i class="icon ion-android-add"></i></router-link>
          </div>
          <br><br>
          <br><br>
        </div>
      </section> -->
      <section id="featured" class="row">
        <div class="col s12 header-row">
          <h3 class="left">Featured</h3>
          <span class="right">
            <select class="browser-default">
              <option value="" disabled selected>Sort By</option>
              <option value="tranding">Trending</option>
              <option value="new">New</option>
              <option value="active">Active</option>
              <option value="hot">Hot</option>
              <option value="promoted">Promoted</option>
            </select>
          </span>
        </div>
        <div v-if="featured.length < 1" class="col s12 center-align center">
          <plane v-if="!featuredFetched" size="100" />
          <div v-if="featuredFetched">
            <h5>Post a fantastic STEEMGIG, it stands a chance of being featured here</h5>
            <el-button class="secondary" type="secondary"> <router-link to="/create_gig">Create Gig</router-link></el-button>
          </div>
        </div>
        <div class="col s12 m6 l3" v-for="(gig, index) in featured.slice(0,8)" :key="index">
          <!-- <gig-card :gigData="gig" /> -->
        </div>
        <div class="col s12 center-align py-3">
           <el-button class="secondary" type="secondary" @click="moreFeatured" v-if="featured.length > 0">View More
            <i v-if="fetchingFeatured" class="fa fa-spinner fa-pulse"></i>
          </el-button>
        </div>
      </section>
      <section id="gigrequests" class="row">
        <div class="col s12 header-row">
          <h3 class="left">Gig Requests</h3>
          <span class="right">
            <select class="browser-default">
              <option value="" disabled selected>Sort By</option>
              <option value="tranding">Trending</option>
              <option value="new">New</option>
              <option value="active">Active</option>
              <option value="hot">Hot</option>
              <option value="promoted">Promoted</option>
            </select>
          </span>
        </div>
        <div v-if="gigrequests.length < 1" class="col s12 center-align center">
          <plane v-if="!gigrequestsFetched" size="100" />
          <div v-if="gigrequestsFetched" class="center center-align">
            <h5>Can&rsquo;t find what you&rsquo;re Seeking?<br>You can post Custom requests and we&rsquo;ll lovingly look for reputable great minds to handle it</h5>
             <el-button class="secondary" type="secondary"><router-link to="/steemgigs_request">Post custom request</router-link></el-button>
          </div>
          <br><br>
          <br><br>
        </div>
        <div class="col s12 m6 l3" v-for="(gig, index) in gigrequests.slice(0,8)" :key="index">
          <gig-card type="gigRequest" :gigData="gig" />
        </div>
        <div v-if="gigrequests.length > 0" class="col s12 center-align py-3">
           <el-button class="secondary" type="secondary"><router-link to="/requested_gigs">View More</router-link></el-button>
        </div>
      </section>
      <section id="testimonials" class="row">
        <div class="col s12 header-row">
          <h3 class="left">Testimonials</h3>
          <span class="right">
            <select class="browser-default">
              <option value="" disabled selected>Sort By</option>
              <option value="tranding">Trending</option>
              <option value="new">New</option>
              <option value="active">Active</option>
              <option value="hot">Hot</option>
              <option value="promoted">Promoted</option>
            </select>
          </span>
        </div>
        <div v-if="testimonials.length < 1" class="col s12 center-align center">
          <plane v-if="!testimonialsFetched" size="100" />
          <div v-if="testimonialsFetched" class="center center-align">
            <h5>Be the first to tell how much you love SteemGigs</h5>
            <router-link to="/create_testimonial" tag="button" class="btn indigo">Post a testimonial</router-link>
          </div>
          <br><br>
          <br><br>
        </div>
        <div class="col s12 m6 l3" v-for="(testimonial, index) in testimonials.slice(0,8)" :key="index">
          <testimonial-card :testimonial="testimonial" />
        </div>
        <div v-if="testimonials.length > 0" class="col s12 center-align py-3">
           <el-button class="secondary" type="secondary"><router-link to="/testimonials">View More</router-link></el-button>
        </div>
      </section>
       <!--Surpassing Google Segment-->
          <section id="surpassinggooglerequest" class="row">
        <div class="col s12">
          <h3 class="left">SurpassingGoogle (The Knowledge Bank of SteemGigs)</h3>
          <span class="right">
            <select class="browser-default">
              <option value="" disabled selected>Sort By</option>
              <option value="tranding">Trending</option>
              <option value="new">New</option>
              <option value="active">Active</option>
              <option value="hot">Hot</option>
              <option value="promoted">Promoted</option>
            </select>
          </span>
        </div>
        <div v-if="steemgigs.length < 1" class="col s12 center-align center">
          <plane v-if="!surpassinggoogleFetched" size="100" />
          <div v-if="surpassinggoogleFetched">
            <h5>Be the first to post a gig, click button below</h5>
             <el-button class="secondary" type="secondary"><router-link to="/create_gig">Create Gig</router-link></el-button>
          </div>
          <br><br>
          <br><br>
        </div>
        <div class="col s12 m6 l3" v-for="(gig, index) in surpassinggoogle.slice(0,8)" :key="index">
          <gig-card type="surpassingGoogle" :gigData="gig" />
        </div>
        <div v-if="testimonials.length > 0" class="col s12 center-align py-3">
           <el-button class="secondary" type="secondary"><router-link to="/categories/surpassinggoogle">View More</router-link></el-button>
        </div>
      </section>
      <!--End Surpassing Google segment-->
    </div>
    </el-main>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import {Plane} from 'vue-loading-spinner'
import Api from '@/services/api'
import CatNav from '@/components/layout/catNav'
import GigCard from '@/components/snippets/gigCard'
import TestimonialCard from '@/components/snippets/testimonialCard'
import WitnessCard from '@/components/snippets/witnessCard'
import InputTag from 'vue-input-tag'

export default {
  components: {
    Plane,
    CatNav,
    GigCard,
    Carousel,
    Slide,
    InputTag,
    TestimonialCard,
    WitnessCard
  },
  data () {
    return {
      editMode: false,
      testimonial: '',
      testimonialSubject: '',
      userTags: [],
      errorText: '',
      successText: '',
      isPosting: false,
      featuredFetched: false,
      surpassinggoogleFetched: false,
      postsFetched: false,
      gigrequestsFetched: false,
      testimonialsFetched: false,
      untalentedFetched: false,
      fetchingSteemgigs: false,
      fetchingFeatured: false,
      fetchingTestimonials: false
    }
  },
  methods: {
    getTags (entries) {
      this.userTags = entries
    },
    gettry () {
      console.log(Api.fetchSurpassingGoogle)
    }
  },
  computed: {
    steemgigs () {
      return this.$store.state.posts.steemgigs
    },
    // untalented () {
    //   return this.$store.state.posts.untalented
    // },
    gigrequests () {
      return this.$store.state.posts.gigrequests
    },
    featured () {
      return this.$store.state.posts.featured
    },
    surpassinggoogle () {
      return this.$store.state.posts.surpassinggoogle
    },
    testimonials () {
      return this.$store.state.posts.testimonials
    },
    tryonly () {
      return Api.fetchTestimonials
    }
  },
  mounted () {
    this.$eventBus.$on('featured-fetched', payload => {
      this.featuredFetched = true
    })
    this.$eventBus.$on('posts-fetched', payload => {
      this.postsFetched = true
    })
    this.$eventBus.$on('gigrequests-fetched', payload => {
      this.gigrequestsFetched = true
    })
    this.$eventBus.$on('surpassinggoogle-fetched', payload => {
      this.surpassingoogleFetched = true
    })
    this.$eventBus.$on('testimonials-fetched', payload => {
      this.testimonialsFetched = true
    })
    this.$eventBus.$on('untalented-fetched', payload => {
      this.untalentedFetched = true
    })
  },
  beforeDestroy () {
    this.$eventBus.$off('featured-fetched')
    this.$eventBus.$off('posts-fetched')
    this.$eventBus.$off('gigrequests-fetched')
    this.$eventBus.$off('surpassinggoogle-fetched')
    this.$eventBus.$off('testimonials-fetched')
    this.$eventBus.$off('untalented-fetched')
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
  img {
    height: 233px;
    background: #ccc;
    width: 100%;
    object-fit: cover;

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
      .task {
        font-weight: 600;
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
    padding-top: 15px !important;
    padding-bottom: 15px !important;
}

.browser-default {
  min-width: 150px;
}
}
</style>
