<template>
  <div class="home__view row">
    <cat-nav />
    <div class="col s12 m4 l2 hide-on-med-and-down steemgigs_ads">
      <div class="card center center-align request">
        <div class="card-content">
          <p>Can&rsquo;t find what you&rsquo;re looking Seeking?<br>You can post Custom request and we&rsquo;ll lovingly look for reputable great minds to handle it</p>
          <router-link to="/steemgigs_request" tag="button" class="btn btn-block indigo">Post custom request</router-link>
        </div>
      </div>
      <div class="card searches">
        <div class="card-content">
          <span class="card-title red-text">Popular Searches</span>
          <ul>
            <li><a>#Steemgigs</a></li>
            <li><a>#javascript</a></li>
            <li><a>#illustration</a></li>
            <li><a>#Design</a></li>
            <li><a>#logo</a></li>
          </ul>
        </div>
      </div>
      <div class="card center center-align request">
        <div class="card-content">
          <p>Earn some rewards by telling us about your successful "SteemGigs Experience"</p><p> (For both SteemGiggers &amp; Clients)</p>
          <router-link to="/create_testimonial" tag="button" class="btn btn-block indigo">Post a testimonial</router-link>
        </div>
      </div>
      <div class="card center center-align request">
        <div class="card-content">
          <p>New to steemgigs and not sure what to do?</p>
          <router-link to="/untalented_editor" tag="button" class="btn btn-block indigo">Use the Untalented Editor</router-link>
        </div>
      </div>
      <witness-card v-if="!$store.state.profile.steemgigsWitness"/>
    </div>
    <div class="col s12 m8 l10">
      <carousel id="home_ad_slider" :navigationEnabled="false" :autoplay="true" :autoplayHoverPause="true" :perPage="1">
        <slide>
          <img src="/static/img/boy_slide.png" class="responsive-img" alt="">
          <div class="caption">
            <h2>Want to build a dream?</h2>
            <p class="flow-text">Find out now!</p>
          </div>
        </slide>
        <slide>
          <img src="/static/img/working.png" class="responsive-img" alt="">
          <div class="caption">
            <h2>Want to build a dream?</h2>
            <p class="flow-text">Find out now!</p>
          </div>
        </slide>
      </carousel>
      <section id="steemgigs" class="row">
        <div class="col s12">
          <h4 class="left">#STEEMGIGS</h4>
          <span class="right" style="margin-top: 1.5em;">
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
            <p class="flow-text grey-text">Be the first to post a gig, click button below</p>
            <router-link to="/create_gig" tag="button" class="btn-large indigo btn-floating waves-effect waves-light"><i class="icon ion-android-add"></i></router-link>
          </div>
          <br><br>
          <br><br>
        </div>
        <div class="col s12 m6 l3" v-for="(gig, index) in steemgigs" :key="index">
          <gig-card :gigData="gig" />
        </div>
        <div v-if="testimonials.length > 0" class="col s12 center-align py-3">
          <router-link class="btn indigo" to="/steemgigs" tag="button">View More</router-link>
        </div>
      </section>
      <section id="untalented" class="row">
        <div class="col s12">
          <h5 class="left">#Untalented</h5>
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
      </section>
      <section id="featured" class="row">
        <div class="col s12">
          <h5 class="left">#FEATURED</h5>
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
            <p class="flow-text grey-text">Post a fantastic STEEMGIG, it stands a chance of being featured here</p>
            <router-link to="/create_gig" tag="button" class="btn-large indigo btn-floating waves-effect waves-light"><i class="icon ion-android-add"></i></router-link>
          </div>
          <br><br>
          <br><br>
        </div>
        <div class="col s12 m6 l3" v-for="(gig, index) in featured" :key="index">
          <!-- <gig-card :gigData="gig" /> -->
        </div>
        <div class="col s12 center-align py-3">
          <button @click="moreFeatured" v-if="featured.length > 0" class="btn indigo">View More
            <i v-if="fetchingFeatured" class="fa fa-spinner fa-pulse"></i>
          </button>
        </div>
      </section>
      <section id="gigrequests" class="row">
        <div class="col s12">
          <h5 class="left">#GIGREQUESTS</h5>
          <span class="right" style="margin-top: 1.5em;">
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
            <p class="flow-text grey-text">Can&rsquo;t find what you&rsquo;re Seeking?<br>You can post Custom requests and we&rsquo;ll lovingly look for reputable great minds to handle it</p>
            <router-link to="/steemgigs_request" tag="button" class="btn btn-large indigo">Post custom request</router-link>
          </div>
          <br><br>
          <br><br>
        </div>
        <div class="col s12 m6 l3" v-for="(gig, index) in gigrequests" :key="index">
          <gig-card type="gigRequest" :gigData="gig" />
        </div>
        <div v-if="gigrequests.length > 0" class="col s12 center-align py-3">
          <router-link class="btn indigo" to="/requested_gigs" tag="button">View More</router-link>
        </div>
      </section>
      <section id="testimonials" class="row">
        <div class="col s12">
          <h5 class="left">#TESTIMONIALS</h5>
          <span class="right" style="margin-top: 1.5em;">
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
            <p class="flow-text grey-text">Be the first to tell how much you love steemgigs</p>
            <router-link to="/create_testimonial" tag="button" class="btn indigo">Post a testimonial</router-link>
          </div>
          <br><br>
          <br><br>
        </div>
        <div class="col s12 m6 l3" v-for="(testimonial, index) in testimonials" :key="index">
          <testimonial-card :testimonial="testimonial" />
        </div>
        <div v-if="testimonials.length > 0" class="col s12 center-align py-3">
          <router-link class="btn indigo" to="/testimonials" tag="button">View More</router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import {Plane} from 'vue-loading-spinner'
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
    }
  },
  computed: {
    steemgigs () {
      return this.$store.state.posts.steemgigs
    },
    untalented () {
      return this.$store.state.posts.untalented
    },
    gigrequests () {
      return this.$store.state.posts.gigrequests
    },
    featured () {
      return this.$store.state.posts.featured
    },
    testimonials () {
      return this.$store.state.posts.testimonials
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
    this.$eventBus.$off('testimonials-fetched')
    this.$eventBus.$off('untalented-fetched')
  }
}
</script>

<style lang="scss">
$blue: #4757b2;
.card.gig .card-image {
  // height: 10em !important;
}
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
    margin-top: 0.5em;
    filter: brightness(0.75);
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
  padding: 0 2em 0 1em;
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
        position: absolute;
        left: 4.5em;
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
}
</style>
