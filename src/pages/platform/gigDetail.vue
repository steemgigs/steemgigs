<template>
  <page :pageClasses="['profile__view', 'row']">
    <cat-nav />
    <div class="container">
      <div class="col s12 m8 l9 row">
        <ul class="tabs">
          <li class="tab col s3"><a class="waves-effect" :class="{active: currentView === 'active_gigs'}" @click="changeView('active_gigs')">DETAILS</a></li>
          <li class="tab col s3"><a class="waves-effect" :class="{active: currentView === 'inactive_gigs'}" @click="changeView('inactive_gigs')">REVIEWS</a></li>
        </ul>
        <div class="col s12">
          <div class="card">
            <div class="card-content">
              <span class="card-title">{{ title }}</span>
            </div>
            <div class="card-image">
              <carousel v-if="portfolio.length > 0" :navigationEnabled="false" :autoplay="true" :perPage="1">
                <slide v-for="(image, index) in portfolio" :key="index">
                  <img :src="image" class="responsive-img" :alt="currentGig.title">
                </slide>
              </carousel>
            </div>
            <div class="card-content">
              <div v-html="currentGig.body"></div>
              <hr class="my-4">
              <vue-editor editorToolbar="[]" v-model="comment" placeholder="Type your comment here" :upload="uploadConfig"></vue-editor>
            </div>
          </div>
        </div>
      </div>
       <div class="col s12 m4 l3">
        <div class="card-panel profileOwner">
          <span class="editProfile waves-effect" v-if="$store.state.username === profileData.account">
            <i class="icon ion-android-create"></i>
          </span>
          <label class="profilePic" for="profile_image">
            <input type="file" accept="image/png,image/jpeg" class="hide" id="profile_image">
            <img :src="profile.profile_image" class="user-pict-img" :alt="profileData.account" width="150" height="150">
          </label>
          <span class="username" v-text="profile.name"></span>
          <span class="expertise">Experienced Web Developer</span>
          <span class="ratings">
            <i class="icon ion-ios-star amber-text" v-for="(star, index) in 5" :key="index"></i> 5.0 (2 reviews)
          </span>
          <p class="location"><i class="icon ion-android-pin"></i> From <span class="right" v-text="profile.location"></span></p>
          <p class="member_since"> <i class="icon ion-android-person"></i> Member since <span class="right" v-text="since"></span></p>
          <p class="member_since"> <i class="icon ion-ios-briefcase"></i> Last delivery <span class="right" v-text="ago"></span></p>
          <p>
            <i class="icon ion-android-plane"></i>
            Vacation mode
            <span class="right">
              <div class="switch" v-if="$store.state.username === profileData.account">
                <label>
                  <input type="checkbox" v-model="vacation_mode" :disabled="$store.state.username !== profileData.account">
                  <span class="lever"></span>
                </label>
              </div>
            </span>
          </p>
          <hr>
          <div class="moreProfileInfo">
            <span class="card-title">Description</span>
            <p v-text="profile.about"></p>
          </div>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import Api from '@/services/api'
import Page from '@/components/page'
import CatNav from '@/components/layout/catNav'
import GigCard from '@/components/snippets/gigCard'
import { Carousel, Slide } from 'vue-carousel'
import { VueEditor } from 'vue2-editor'
import moment from 'moment'
// import steem from 'steem'
export default {
  components: {
    Page,
    CatNav,
    GigCard,
    Carousel,
    Slide,
    VueEditor
  },
  data () {
    return {
      profile: {},
      profileData: {},
      currentGig: {
        title: '',
        json_metadata: {
          images: []
        }
      },
      vacation_mode: false,
      currentView: 'active_gigs',
      comment: ''
    }
  },
  mounted () {
    let {username, task} = this.$route.params
    this.fetchUserInfo(username)
    Api.fetchSinglePost(username, task).then(response => {
      this.currentGig = response.data
    }).catch(err => {
      console.log(err)
    })
  },
  computed: {
    title () {
      return this.desteemgify(this.currentGig.title)
    },
    portfolio () {
      return this.currentGig.json_metadata.images
    },
    since () {
      return moment(this.profileData.created).format('MMMM YYYY')
    },
    ago () {
      return moment(this.profileData.last_post).fromNow()
    }
  },
  methods: {
    async fetchUserInfo (username) {
      try {
        let response = await Api.fetchUserData(username)
        this.profileData = response.data
        this.profile = this.profileData.profile
        console.log(this.profileData)
      } catch (err) {
        console.log('error retrieving user info: \n error:', this.stringify(err))
      }
    },
    changeView (view) {
      this.currentView = view
    }
  }
}
</script>

<style lang="scss" scoped>
  .ql-editor {
      min-height: 80px;
      font-size: 16px;
  }
  .container {
    min-width: 90%;
  }
  h2.headline {
    color: rgb(160, 158, 158);
    font-size: 2.5;
  }
  .profileOwner {
    position: relative;
    .profilePic {
      cursor: pointer;
      float: none;
      display: block;
      position: relative;
      margin: 0 auto 15px;
      border-radius: 0;
      object-fit: cover;
      overflow: visible;
      box-sizing: border-box;
      width: 150px;
      height: 150px;
      &::before {
        background: rgba(0,0,0,.65);
        content: "\F030";
        font: 30px/150px FontAwesome;
        color: #fff;
        border-radius: 50%;
        position: absolute;
        z-index: 3;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        text-align: center;
      }
      img.user-pict-img {
        border-radius: 50%;
        width: 150px;
        height: 150px;
        display: block;
      }
    }
    span {
      display: block;
      text-align: center;
      &.username {
        font-weight: 600;
      }
      &.editProfile {
        cursor: pointer;
        display: inline-block;
        position: absolute;
        border-radius: 50%;
        padding: 0 0.5em;
        top: 1em;
        right: 0.5em;
        i.icon {
          font-size: 1.5em;
        }
      }
    }
    p {
      i.icon {
        margin-right: 0.5em;
      }
      span.right {
        font-weight: 600;
        .switch {
          margin-top: 0.2em;
        }
      }
    }
  }
  .moreProfileInfo {
    .card-title {
      font-size: 1.2em;
      font-weight: 600;
      &:first-child {
        font-size: 1.2em;
        margin-top: 1em;
        margin-bottom: -0.6em;
        text-align: left;
      }
      &:not(:first-child) {
        margin-top: 1em;
      }
    }
    ul {
      margin-top: 0;
    }
  }
  .tabs {
    width: 100%;
    float: left;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    a {
      color: rgb(63, 78, 188);
      font-weight: 600;
      font-size: 1.1em;
      cursor: pointer;
      transition: all ease-in-out .3s;
      &:hover {
        color: rgb(63, 80, 198);
      }
      &.active {
        border-bottom: 2px rgb(63, 78, 188);
        color: rgb(63, 80, 198);
        position: relative;
        &:after {
          content: ' ';
          width: 100%;
          position: absolute;
          bottom: 0;
          height: 2px;
          left: 0;
          background: rgb(63, 78, 188);
        }
      }
    }
  }
  .inactiveGigs {
    .card {
      opacity: 0.6;
    }
  }
</style>
