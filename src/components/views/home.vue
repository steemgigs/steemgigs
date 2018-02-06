<template>
  <div class="home__view row">
    <cat-nav />
    <div class="col s12 m4 l2 steemgigs_ads">
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
      <div class="rotating-card" :class="editMode ? 'flipped' : ''">
        <div class="face">
          <div class="card center center-align request">
            <div class="card-content">
              <p>Earn some rewards by telling us about your successful STEEMGIGS EXPERIENCE (both SteemGiggers &amp; Clients)</p>
              <button class="btn btn-block indigo" @click="editMode = true">Post a Testimonial</button>
            </div>
          </div>
        </div>
        <div class="back card-panel indigo lighten-1 white-text">
            <i class="icon ion-close" @click="editMode = false"></i>
            <div class="input-field">
              <textarea id="textarea1" v-model="testimonialSubject" class="materialize-textarea"></textarea>
              <label for="textarea1">Subject</label>
            </div>
            <div class="input-field">
              <textarea id="testimonial" v-model="testimonial" class="materialize-textarea"></textarea>
              <label for="testimonial">Write your testimonial</label>
            </div>
              <div class="jjinput-field">
                <input-tag limit="2" class="editable" placeholder="add tags" @update:tags="getTags" :tags="userTags" />
              </div>
            <button class="btn-floating grey  right lighten-3" @click="submitTestimonial">
              <i class="ion-checkmark-round indigo-text" v-if="!isPosting"></i>
              <i class="fa fa-spinner fa-pulse indigo-text" v-if="isPosting"></i>
            </button>
        </div>
      </div>
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
            <p class="flow-text grey-text">Be the first to post gig, click button below</p>
            <router-link to="/create_gig" tag="button" class="btn-large indigo btn-floating waves-effect waves-light"><i class="icon ion-android-add"></i></router-link>
          </div>
          <br><br>
          <br><br>
        </div>
        <div class="col s12 m6 l3" v-for="(gig, index) in steemgigs" :key="index">
          <gig-card :gigData="gig" />
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
            <p class="flow-text grey-text">Can&rsquo;t find what you&rsquo;re looking Seeking?<br>You can post Custom request and we&rsquo;ll lovingly look for reputable great minds to handle it</p>
            <router-link to="/steemgigs_request" tag="button" class="btn btn-large indigo">Post custom request</router-link>
          </div>
          <br><br>
          <br><br>
        </div>
        <div class="col s12 m6 l3" v-for="(gig, index) in gigrequests" :key="index">
          <gig-card :gigData="gig" />
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
        <div v-if="!testimonialsFetched && testimonials.length < 1" class="col s12 center-align center">
          <plane size="100" />
          <br><br>
          <br><br>
        </div>
        <div class="col s12 m6 l3" v-for="(testimonial, index) in testimonials" :key="index">
          <testimonial-card :testimonial="testimonial" />
        </div>
      </section>
      <!-- <section id="testimonials" class="row">
        <div class="col s12">
          <h5 class="left">Steemgigs Testimonials</h5>
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
        <div class="col s12 m4 l3">
          <div class="card">
            <div class="card-content">
              <p><router-link to="/users/eric">@eric</router-link> did a very job and delivered on time</p>
            </div>
            <div class="card-action">
              <a><i class="fa fa-thumbs-up" aria-hidden="true"></i> 336</a>
              <a><i class="icon ion-chatbox-working" aria-hidden="true"></i> 323</a>
              <a><i class="icon ion-ios-redo" aria-hidden="true"></i></a>
              <span class="right">$884.3</span>
            </div>
          </div>
        </div>
      </section> -->
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import {Plane} from 'vue-loading-spinner'
import CatNav from '@/components/layout/catNav'
import GigCard from '@/components/snippets/gigCard'
import GigRequest from '@/components/snippets/requestGigCard'
import TestimonialCard from '@/components/snippets/testimonialCard'
import sc2 from '@/services/sc2'
import InputTag from 'vue-input-tag'

export default {
  components: {
    Plane,
    CatNav,
    GigCard,
    Carousel,
    Slide,
    InputTag,
    GigRequest,
    TestimonialCard
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
      untalentedFetched: false
    }
  },
  methods: {
    getTags (entries) {
      this.userTags = entries
    },
    submitTestimonial () {
      let that = this
      this.errorText = ''
      this.successText = ''
      this.isPosting = true
      let jsonMetadata = {
        app: 'steemgig',
        tags: ['steemgigs', 'testimonial'].concat(this.userTags),
        timestamp: new Date().getTime(),
        authorPic: this.$store.state.profile.profileImage,
        type: 'steemgigs_testimonial',
        deleted: true,
        generated: true
      }
      sc2.setAccessToken(this.$store.state.accessToken)
      let body = this.testimonial
      let permlink = this.slugify(this.testimonialSubject)
      let username = this.$store.state.username
      let title = '#STEEMGIGS ' + this.testimonialSubject
      sc2.comment('', 'steemgigs', username, permlink, title, body, jsonMetadata, (err, res) => {
        console.log(err, res)
        that.isPosting = false
        if (err) {
          that.errorText = 'Error pushing post to steem, try again'
        } else {
          that.successText = 'Successfully pushed to steem!'
        }
      })
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
  height: 10em !important;
}
.steemgigs_ads {
  box-sizing: border-box;
  padding: 0;
  padding-left: 0.5em;
  .card {
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
