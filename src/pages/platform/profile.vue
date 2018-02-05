<template>
  <page :pageClasses="['profile__view', 'row']">
    <cat-nav />
    <div class="col s12 m4 l3">
      <div class="owner">
        <div class="rotating-card" :class="editMode ? 'flipped' : ''">
          <div class="card-panel face">
            <span class="editProfile waves-effect" v-if="$store.state.username === profileData.account">
              <i @click="editMode = true" class="icon ion-android-create"></i>
            </span>
            <div class="profilePic">
              <img :src="profile.profile_image" class="user-pict-img" :alt="profileData.account" width="150" height="150">
            </div>
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
                <div class="switch" v-if="true">
                  <label>
                    <input checked type="checkbox" disabled v-model="updateProfile.vacation_mode" >
                    <span class="lever"></span>
                  </label>
                </div>
              </span>
            </p>
          </div>
          <div class="back card-panel indigo lighten-1 white-text">
              <i @click="closeEdit" class="icon ion-close"></i>
              <label class="profilePic" for="profile_image">
                <input type="file" accept="image/png,image/jpeg" class="hide" id="profile_image">
                <img :src="profile.profile_image" class="user-pict-img" :alt="profileData.account" width="150" height="150">
              </label>
              <div class="input-field">
                <input type="text" placeholder="About me" v-model="profileUpdate.about" id="desc">
              </div>
              <div class="input-field">
                <input type="text" @keyup.enter="addToSpeakArray" placeholder="I speak (Languages)" v-model="i_speak" id="desc">
                <i @click="addToSpeakArray" class="ion-plus add-lang-icon right"></i>
              </div>
              <ul class="language-list">
                <li v-for="(spoken, i) in languages_i_speak" :key="i" v-text="spoken" />
              </ul>
              <p>
                I'm on vacation <i class="icon ion-android-plane"></i>
                <span class="right">
                  <div class="switch" v-if="true">
                    <label>
                      <input type="checkbox" v-model="profileUpdate.vacation_mode" >
                      <span class="lever"></span>
                    </label>
                  </div>
                </span>
              </p>
              <div class="input-field">
                <select class="validate browser-default my-select" v-model="profileUpdate.country">
                  <option selected value="" disabled>I am from</option>
                  <option v-for="(country, index) in countries" :key="index" :value="country">{{ country }}</option>
                </select>
              </div>
              <button @click.prevent="updateProfile" class="btn-floating grey  right lighten-3"><i class="ion-checkmark-round indigo-text"></i></button>
          </div>
        </div>
      </div>
      <div class="card moreProfileInfo">
        <div class="card-content">
          <span class="card-title">Description</span>
          <p v-text="profile.about"></p>
          <span class="card-title">Languages</span>
          <ul>
            <li>English - fluent</li>
            <li>French (Français) - Conversational</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col s12 m8 l9 row">
      <ul class="tabs">
        <li class="tab col s3"><a class="waves-effect" :class="{active: currentView === 'active_gigs'}" @click="changeView('active_gigs')">ACTIVE STEEMGIGS</a></li>
        <li class="tab col s3"><a class="waves-effect" :class="{active: currentView === 'gig_requests'}" @click="changeView('gig_request')">CUSTOM REQUESTS</a></li>
      </ul>
      <div v-if="currentView === 'active_gigs'" class="activeGigs">
        <div class="col s12 m6 l4" v-for="(gig, index) in usergigs" :key="index">
          <gig-card :gigData="gig" meantFor="profile" />
        </div>
      </div>
      <div v-if="currentView !== 'gig_requests'" class="inactiveGigs">
        <div class="col s12 m6 l4" v-for="(gig, index) in userRequests" :key="index">
          <gig-card :gigData="gig" meantFor="profile" />
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import Api from '@/services/api'
import sc2 from '@/services/sc2'
import Page from '@/components/page'
import CatNav from '@/components/layout/catNav'
import GigCard from '@/components/snippets/gigCard'
import moment from 'moment'
const countries = require('country-list')()

export default {
  components: {
    Page,
    CatNav,
    GigCard
  },
  data () {
    return {
      profile: {},
      profileData: {},
      usergigs: [],
      userRequests: [],
      profileUpdate: {
        country: '',
        about: '',
        vacation_mode: false
      },
      languages_i_speak: [],
      profileUsername: '',
      currentView: 'active_gigs',
      i_speak: '',
      countries: countries.getNames(),
      editMode: false
    }
  },
  beforeCreate () {
    Api.fetchUserData(this.profileUsername).then(response => {
      this.profileData = response.data
      this.profile = this.profileData.profile
      console.log(this.profileData)
    }).catch(err => {
      console.log('error retrieving user info: \n error:', this.stringify(err))
    })
    Api.fetchUserGigs(this.profileUsername).then(response => {
      console.log(response.data)
    }).catch(err => {
      console.log('error retrieving user gigs: \n error:', this.stringify(err))
    })
  },
  mounted () {
    this.profileUsername = this.$route.params.username
  },
  computed: {
    since () {
      return moment(this.profileData.created).format('MMMM YYYY')
    },
    ago () {
      return moment(this.profileData.last_post).fromNow()
    }
  },
  methods: {
    changeView (view) {
      this.currentView = view
    },
    addToSpeakArray () {
      this.languages_i_speak.push(this.i_speak)
      this.i_speak = ''
    },
    updateProfile () {
      let profile = this.profileUpdate
      profile.languages_i_speak = this.languages_i_speak || this.i_speak
      console.log('I got called with')
      sc2.updateUserMetadata = (profile, (err, res) => {
        alert(res, err)
        console.log('res', res)
        console.log('err', err)
      })
    },
    closeEdit () {
      this.editMode = false
      this.profileUpdate = {}
      this.i_speak = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  select.my-select {
    width: 100% !important;
    pointer-events: initial !important;
    height: 2.5em !important;
    position: static;
    opacity: 1 !important;
  }
  .owner {
    .rotating-card{
      position: relative;
      min-height: 120px;
      .face{
        position: absolute;
        width: 100%;
        height: 100%;
        margin: 0;
        z-index: 1;
        transform-style: preserve-3d;
        backface-visibility: hidden;
        transition: transform .6s ease-in;
      }
      .back{
        ul.language-list li {
          list-style-type: initial;
          color: #d1d1d1;
          margin-left: 21px;
          font-size: .93rem;
        }
        input[type=text] {
          color: white;
        }
        i.add-lang-icon, i.ion-close {
          transform: translateY(-35px);
          cursor: pointer;
        }
        transform: rotateY(-180deg);
        backface-visibility: hidden;
        transition: transform .6s ease-in;
        .btn-floating i {
          font-size: 1rem
        }
      }
      &.flipped {
        .face{
          transform: rotateY(180deg);
        }
        .back{
          transform: rotateY(0);
        }
      }
    }
    position: relative;
    .profilePic {
      cursor: pointer;
      float: none;
      display: block;
      position: relative;
      margin: 0 auto 15px;
      border-radius: 0;
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
        margin-top: -0.5em;
        margin-bottom: 0em;
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
    width: 98.5%;
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
