<template>
  <div class="home__view row">
    <cat-nav />

    <el-main>
       <el-row :gutter="15">
      <el-col :xs="0" :sm="10" :md="7" :lg="6" :xl="6">
      <div class="card welcome">
        <div class="cardbody">
        <div class="profilePic">
        <img :src="'https://steemitimages.com/u/' + $store.state.username + '/avatar'" class="user-pict-img" :alt="$store.state.username" width="60" height="60">
        </div>
        <span class="greetings">Hi
        <router-link :to="'/@' + $store.state.username">@{{ $store.state.username }}!</router-link>
        </span>
        <carousel :navigationEnabled="false" :autoplay="false" :perPage="1" :paginationPadding="5" paginationActiveColor="#6361D0">
        <slide>
        <p class="g2">Get Offers from Sellers</p>
        <p class="g2">to Build your Project!</p>
          <router-link to="/steemgigs_request"><el-button  type="secondary  wl-card">Create a Request</el-button></router-link>
          <router-link to="/create_microtask"><el-button  type="secondary wl-card">Create A Micro-Task</el-button></router-link>
        </slide>
        <slide>
        <p class="g2">Get Perfect Byer</p>
        <p class="g2">for your Skills and Work!</p>
          <router-link to="/requested_gigs"><el-button  type="secondary  wl-card">Check Requests</el-button></router-link>
          <router-link to="/create_gig"><el-button  type="secondary wl-card">Create A Gig</el-button></router-link>
        </slide>
        </carousel>
        </div>
      </div>
      </el-col>
      <el-col :xs="24" :sm="14" :md="17" :lg="18" :xl="18">
        <carousel id="home_ad_slider" :navigationEnabled="false" :autoplay="true" :loop="true" :autoplayHoverPause="true" :perPage="1" :autoplayTimeout="4500" :paginationPadding="5" :paginationSize="15" paginationActiveColor="#6361D0">
        <slide>
          <img src="/static/img/bropro.png" class="responsive-img" alt="">
          <router-link to="/bropro">
          <el-button  type="secondary innerSlideBtn">Visit BroPro</el-button>
          </router-link>
        </slide>
          <slide>
            <img src="/static/img/share.png" class="responsive-img" alt="">
            <router-link to="/create_gig">
            <el-button  type="secondary innerSlideBtn">Create A Gig</el-button>
            </router-link>
          </slide>
          <slide>
            <img src="/static/img/customrequest.png" class="responsive-img" alt="">
            <router-link to="/steemgigs_request">
            <el-button  type="secondary innerSlideBtn">Create a Custom Request</el-button>
            </router-link>
          </slide>
        </carousel>
        </el-col>
      </el-row>
      <!-- Gigs -->
      <el-row :gutter="15">
      <categoryPreview post_type="steemgigs_post" mode="preview" :limit="cardCount.gigs" header="SteemGigs" description="See what the SteemGigs community has to offer" />
      </el-row>
      <!-- Gigs Requests -->
      <el-row :gutter="15">
      <categoryPreview post_type="steemgigs_request" mode="preview" :limit="cardCount.requests" header="SteemGig Requests" description="Custom requests as provided by our community."></categoryPreview>
      </el-row>
      <!-- Microtasks -->
      <el-row :gutter="15">
      <categoryPreview post_type="microtask_post" mode="preview" :limit="cardCount.microTasks" header="Microtasks" description="A microtask can take different forms. Participants are required to carry out a simple action e.g join a telegram, subscribe to my YouTube, etc "></categoryPreview>
      </el-row>
       <!-- Testimonial -->
       <el-row :gutter="15">
         <categoryPreview post_type="steemgigs_testimonial" mode="preview" :limit='cardCount.testimonials' header="Testimonials" description="SteemGigs success-stories written by our users"></categoryPreview>
      </el-row>
      <!-- SurpassingGoogle -->
      <el-row :gutter="15">
      <categoryPreview post_type="steemgigs_surpassinggoogle" mode="preview" :limit="cardCount.surpassinggoogle" header="SurpassingGoogle" description="The Knowledge-Bank of SteemGigs"></categoryPreview>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import {Plane} from 'vue-loading-spinner'
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
      isPosting: false,
      cardCount: {
        gigs: 8,
        requests: 4,
        testimonials: 4,
        surpassinggoogle: 4,
        microTasks: 4
      }
    }
  },
  methods: {
    getTags (entries) {
      this.userTags = entries
    }
  }
}
</script>

<style lang="scss">
$blue: #6361D0;
$slideHeight: 330px;
.innerSlideBtn{
  position: absolute;
  right: 50%;
  bottom: 1.8em;
  transform: translate(50%);
  opacity: 0.7;
  &:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    opacity: 1;
  }
}
.welcome, #home_ad_slider {
  .VueCarousel-pagination {
  display: inline-block !important;
  }
}
.card.welcome {
  margin: 0 !important;
  box-shadow: 0 3px 13px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  border: 1px solid $blue;
  transition: all .2s ease-in;
  height: $slideHeight !important;  
  overflow: hidden;
  z-index: 1;
  &:hover {
    box-shadow: 0 3px 30px rgba(0, 0, 0, 0.15);
  }
  .cardbody{
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  text-align: center;
  justify-content: center;
  height: $slideHeight;
  }
  .wl-card{
    margin: 3px 0;
    width: 200px;
  }
  .greetings{
    word-break: break-word;
    font-size: 1.1rem;
    margin: 0;
    margin-bottom: 0.9em;
  }
  .g2{
    padding: 0 30px;
    word-break: break-word;
    margin:0 !important;
  }
  .g2:nth-child(2){
    margin-bottom: 0.8em !important;
  }
}
.VueCarousel-dot-button{
  border: 1px solid $blue !important;
  vertical-align: middle;
}
.VueCarousel-dot-button:focus{
  outline: none !important;
}
.VueCarousel-slide{
  position: relative !important;
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
    margin-bottom: 20px;
  img {
    height: $slideHeight;
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
  .VueCarousel-wrapper {
    border-radius: 10px;
    border: 1px solid $blue;
  }
  .VueCarousel-dot-container {
    display: inline-block !important;
    margin: 0 auto !important;
    position: absolute !important;
    left: 1.5em !important;
    bottom: 2.5em !important;
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
</style>
