<template>
  <div>
    <div class="owner">
      <div class="rotating-card" :class="editMode ? 'flipped' : ''">
        <div class="card-panel face">
          <span class="editProfile waves-effect" v-if="$store.state.username === profile.account">
            <i v-if="!editMode" @click="editMode = true" class="icon ion-android-create"></i>
          </span>
          <div class="profilePic">
            <img :src="profile.profile.profile_image" class="user-pict-img" :alt="profile.account" width="150" height="150">
          </div>
          <span class="username"> {{ profile.account + ' (' + repp + ') ' }} </span>
          <span class="expertise" v-text="profile.profile.about"></span>
          <span class="ratings">
            <i class="icon ion-ios-star amber-text" v-for="(star, index) in 5" :key="index"></i> 5.0 (No Reviews)
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
          <hr class="my-4">
          <div class="moreProfileInfo">
            <span class="card-title left-align">Description</span>
            <p v-text="profile.profile.about"></p>
            <router-link v-if="!profilepage" :to="'/@' + profile.account">See More <i class="ion-plus-round"></i></router-link>
          </div>
        </div>
        <div class="back card-panel indigo lighten-1 white-text">
            <i @click="closeEdit" class="icon ion-close"></i>
            <label class="profilePic" for="profile_image">
              <input type="file" accept="image/png,image/jpeg" class="hide" id="profile_image">
              <img :src="profileEdit.profile_image" class="user-pict-img" :alt="profile.account" width="150" height="150">
            </label>
            <div class="row">
              <textarea id="about_me" placeholder="about_me" v-model="profileEdit.about" class="materialize-textarea"></textarea>
            </div>
            <div class="row">
              <input type="text" @keyup.enter="addToSpeakArray" placeholder="I speak (Languages)" v-model="i_speak">
              <i @click="addToSpeakArray" class="ion-plus add-lang-icon right"></i>
            </div>
            <ul class="language-list">
              <li v-for="(spoken, i) in profileEdit.languages" :key="i">
                {{spoken}}
                <span class="right" @click="removeLanguage(i)"><i class="ion-close-round"></i></span>
              </li>
            </ul>
            <div v-for="(social, i) in profileEdit.socialArray" :key="i" class="row">
              <input type="text" :placeholder="capitalize(social.feed)" v-model="social.value">
            </div>
            <ul class="language-list">
              <li v-for="(social, i) in socialFeeds" :key="i">
                <b>{{social.feed}} :</b> {{social.value}}
                <span class="right" @click="removeSocial(i)"><i class="ion-close-round"></i></span>
              </li>
            </ul>
            <div class="row">
              <div class="col m5 pl-0">
                <input v-model="socialFeed" placeholder="Social">
              </div>
              <div class="col m7 pr-0">
                <input type="text" @keyup.enter="addToSocialArray" placeholder="Username" v-model="socialValue">
                <i @click="addToSocialArray" class="ion-plus add-lang-icon right"></i>
              </div>
            </div>
            <p>
              I'm on vacation <i class="icon ion-android-plane"></i>
              <span class="right">
                <div class="switch" v-if="true">
                  <label>
                    <input type="checkbox" v-model="profileEdit.vacation_mode" >
                    <span class="lever"></span>
                  </label>
                </div>
              </span>
            </p>
            <div class="row">
              <select class="validate browser-default my-select" v-model="profileEdit.gender">
                <option selected value="" disabled>Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unknown">Will rather not tell</option>
              </select>
            </div>
            <div class="row">
              <select class="validate browser-default my-select" v-model="profileEdit.location">
                <option selected value="" disabled>I am from</option>
                <option v-for="(country, index) in countries" :key="index" :value="country">{{ country }}</option>
              </select>
            </div>
            <button @click.prevent="updateProfile" class="btn-floating grey  right lighten-3"><i v-if="!isUpdating" class="ion-checkmark-round indigo-text"></i><i class="fa fa-spinner indigo-text fa-pulse" v-if="isUpdating"></i></button>
        </div>
      </div>
    </div>
    <div v-show="!editMode" class="card moreProfileInfo">
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
</template>

<script>
import sc2 from '@/services/sc2'
import Api from '@/services/api'
import moment from 'moment'

const countries = require('country-list')()

export default {
  data () {
    return {
      repp: '',
      usergigs: [],
      userRequests: [],
      profileUsername: '',
      currentView: 'active_gigs',
      i_speak: '',
      socialFeed: '',
      socialValue: '',
      socialFeeds: [],
      countries: countries.getNames(),
      editMode: false,
      isUpdating: false,
      profileEdit: {
        username: this.profile.account,
        expertise: '',
        profilePic: '',
        coverPic: '',
        languages: [],
        location: '',
        vacation: false,
        about: this.profile.profile.about,
        profile_image: this.profile.profile.profile_image,
        gender: '',
        social: {
          facebook: '',
          website: '',
          discord: ''
        },
        socialArray: [
          {
            feed: 'website',
            value: ''
          },
          {
            feed: 'github',
            value: ''
          },
          {
            feed: 'facebook',
            value: ''
          }
        ]
      }
    }
  },
  methods: {
    addToSpeakArray () {
      if (!this.i_speak) return
      this.profileEdit.languages.push(this.i_speak)
      this.i_speak = ''
    },
    addToSocialArray () {
      if (!this.socialFeed) return
      let obj = {
        feed: this.socialFeed,
        value: this.socialValue
      }
      this.socialFeeds.push(obj)
      this.socialFeed = ''
      this.socialValue = ''
    },
    updateProfile () {
      let profile = this.profile
      this.isUpdating = true
      profile.languages = this.languages || this.i_speak
      console.log('I got called with', this.profileEdit)
      Api.profileUpdate(this.profileEdit, this.$store.state.accessToken).then((result) => {
        this.isUpdating = false
        console.log('update', result)
      }).catch((e) => {
        this.isUpdating = false
        console.log(e)
      })
      // sc2.setAccessToken(this.$store.state.accessToken)
      // sc2.updateUserMetadata(this.profileEdit, (err, res) => {
      //   this.isUpdating = false
      //   console.log('res', res)
      //   console.log('err', err)
      // })
    },
    closeEdit () {
      this.editMode = false
      this.i_speak = ''
    },
    removeLanguage (index) {
      this.profileEdit.languages = this.profileEdit.languages.filter((language, i) => {
        return index !== i
      })
    },
    removeSocial (index) {
      this.socialFeeds = this.socialFeeds.filter((social, i) => {
        return index !== i
      })
    },
    fetchUserRep () {
      Api.fetchCommentInfo(this.profile.account).then((result) => {
        this.repp = result.data.rep
      })
    }
  },
  computed: {
    since () {
      return moment(this.profile.created).format('MMMM YYYY')
    },
    ago () {
      return moment(this.profile.last_post).fromNow()
    },
    steemgigs () {
      return this.usergigs.filter((gig) => {
        return gig.json_metadata.type === 'steemgigs_post'
      })
    },
    gigrequests () {
      return this.usergigs.filter((gig) => {
        return gig.json_metadata.type === 'steemgigs_request'
      })
    }
    // social () {
    //   return [...this.profileEdit.socialArray, ...this.socialFeeds].reduce((a) => {
        
    //   })
    // }
  },
  props: {
    profile: {
      type: Object,
      required: true
    },
    profilepage: {
      type: Boolean
    }
  },
  mounted () {
    this.fetchUserRep()
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
      min-height: 600px;
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
        position: absolute;
        ul.language-list li {
          list-style-type: initial;
          color: #d1d1d1;
          margin-left: 21px;
          font-size: .93rem;
          i.ion-close-round {
            cursor: pointer;
            transition: transform .5s ease-in-out;
            &:hover {
              transform: rotate(90deg)
            }
          }
        }
        input[type=text] {
          color: white;
          width: 100%;
          height: 3rem
        }
        textarea {
          min-height: 63px;
        }
        i.add-lang-icon, i.ion-close {
          transform: translateY(-38px);
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
      text-align: left;
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
</style>
