<template>
  <div class="home__view row">
    <cat-nav />
    <div class="col s12 m4 l2 steemgigs_ads">
      <div class="card center center-align request">
        <div class="card-content">
          <p>Can&rsquo;t find what you&rsquo;re looking Seeking?<br>You can post Custom request and we&rsquo;ll lovingly look for reputable great minds to handle it</p>
          <button class="btn btn-block indigo">Post custom request</button>
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
          <p>Earn some rewards by telling us about your successful STEEMGIGS EXPERIENCE (both SteemGiggers &amp; Clients)</p>
          <button class="btn btn-block indigo">Post a Testimonial</button>
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
          <plane size="100" />
          <br><br>
          <br><br>
        </div>
        <div class="col s12 m6 l3" v-for="(gig, index) in steemgigs" :key="index">
          <gig-card taskPicture="/static/img/banner.jpeg" :sellerUsername="gig.author" :task="gig.title.split('#STEEMGIGS: ')[1]" :price="gig.json_metadata.price" :currency="gig.json_metadata.currency" :gigData="gig" />
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
          <!-- <plane size="100" /> -->
          <p class="flow-text grey-text">Be the first to post under this section</p>
          <router-link to="/create_gig" tag="button" class="btn-large indigo btn-floating waves-effect waves-light"><i class="icon ion-android-add"></i></router-link>
          <br><br>
          <br><br>
        </div>
        <div class="col s12 m6 l3" v-for="(gig, index) in untalented" :key="index">
          <gig-card :profilePicUrl="gig.json_metadata.authorPic" taskPicture="/static/img/banner.jpeg" :sellerUsername="gig.author" :task="gig.title.split('#STEEMGIGS: ')[1]" :price="gig.json_metadata.price" :currency="gig.json_metadata.currency" :upvotes="gig.active_votes.length" :comments="gig.children" :payout="'$' + gig.pending_payout_value.amount" :body="gig.body" />
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
          <!-- <plane size="100" /> -->
          <p class="flow-text grey-text">Post a fantastic STEEMGIG, it stands a chance of being featured here</p>
          <router-link to="/create_gig" tag="button" class="btn-large indigo btn-floating waves-effect waves-light"><i class="icon ion-android-add"></i></router-link>
          <br><br>
          <br><br>
        </div>
        <div class="col s12 m6 l3" v-for="(gig, index) in featured" :key="index">
          <gig-card :profilePicUrl="gig.json_metadata.authorPic" taskPicture="/static/img/banner.jpeg" :sellerUsername="gig.author" :task="gig.title.split('#STEEMGIGS: ')[1]" :price="gig.json_metadata.price" :currency="gig.json_metadata.currency" :upvotes="gig.active_votes.length" :comments="gig.children" :payout="'$' + gig.pending_payout_value.amount" :body="gig.body" />
        </div>
      </section>
      <section id="gigrequests" class="row">
        <div class="col s12">
          <h5 class="left">#STEEMGIG REQUESTS</h5>
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
        <div v-if="gigRequests.length < 1" class="col s12 center-align center">
          <!-- <plane size="100" /> -->
          <p class="flow-text grey-text">Couldn&rsquo;t find what you&rsquo;re looking for?</p>
          <router-link to="/create_gig" tag="button" class="btn indigo waves-effect waves-light"><i class="icon ion-android-add"></i> Post a request</router-link>
          <br><br>
          <br><br>
        </div>
        <div class="col s12 m6 l3" v-for="(gig, index) in featured" :key="index">
          <gig-card :profilePicUrl="gig.json_metadata.authorPic" taskPicture="/static/img/banner.jpeg" :sellerUsername="gig.author" :task="gig.title.split('#STEEMGIGS: ')[1]" :price="gig.json_metadata.price" :currency="gig.json_metadata.currency" :upvotes="gig.active_votes.length" :comments="gig.children" :payout="'$' + gig.pending_payout_value.amount" :body="gig.body" />
        </div>
      </section>
      <section id="testimonials" class="row">
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
      </section>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import {Plane} from 'vue-loading-spinner'
import CatNav from '@/components/layout/catNav'
import GigCard from '@/components/snippets/gigCard'
export default {
  components: {
    Plane,
    CatNav,
    GigCard,
    Carousel,
    Slide
  },
  computed: {
    steemgigs () {
      return this.$store.state.posts.steemgigs
    },
    untalented () {
      return this.$store.state.posts.untalented
    },
    gigRequests () {
      return this.$store.state.posts.gigrequests
    },
    featured () {
      return this.$store.state.posts.featured
    },
    testimonials () {
      return this.$store.state.posts.testimonials
    }
  }
}
</script>

<style lang="scss" scoped>
$blue: #4757b2;
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
