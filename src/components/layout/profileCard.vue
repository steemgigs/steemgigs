<template>
  <div>
    <div class="owner">
      <div class="rotating-card" :class="editMode ? 'flipped' : ''">
        <div class="face">
          <div class="card-panel">
            <span class="editProfile waves-effect" v-if="$store.state.username === profile.username">
              <i v-if="!editMode" @click="editMode = true" class="icon ion-android-create"></i>
            </span>
            <div class="profilePic">
              <img :src="profile.profilePic || placeholderImg" class="user-pict-img" :alt="profile.username" width="150" height="150">
            </div>
            <span class="username"> {{ profile.username + ' (' + profile.rep + ') ' }} </span>
            <span class="expertise" v-text="profile.about"></span>
            <span class="ratings">
              <i class="icon ion-ios-star amber-text" v-for="(star, index) in 5" :key="index"></i> 5.0 (No Reviews)
            </span>
            <p class="location"><i class="icon ion-android-pin"></i> From <span class="right" v-text="profile.location || 'Not set'"></span></p>
            <p class="member_since"> <i class="icon ion-android-person"></i> Member since <span class="right" v-text="since"></span></p>
            <p class="member_since"> <i class="icon ion-ios-briefcase"></i> Last delivery <span class="right" v-text="ago"></span></p>
            <p>
              <i class="icon ion-android-plane"></i>
              Vacation mode
              <span class="right">
                <div class="switch" v-if="true">
                  <label>
                    <input :checked="profile.vacation" type="checkbox" disabled >
                    <span class="lever"></span>
                  </label>
                </div>
              </span>
            </p>
            <hr class="my-4">
            <div class="moreProfileInfo">
              <span class="card-title left-align">Description</span>
              <p v-text="profile.about"></p>
              <router-link v-if="!profilepage" :to="'/@' + profile.username">See More <i class="ion-plus-round"></i></router-link>
            </div>
          </div>
          <div v-show="!editMode" class="card moreProfileInfo">
            <div class="card-content">
              <span class="card-title">Links</span>
              <p class="" v-for="(social, key, index) in profile.social" :key="index" v-text="key + ' - ' + social" />
              <span class="card-title">Languages</span>
              <ul>
                <li v-for="(language, index) in profile.languages" :key="index">{{`${language} - Fluent`}}</li>
              </ul>
            </div>
          </div>
          <witness-card v-if="!$store.state.profile.steemgigsWitness"/>
        </div>
        <div class="back card-panel indigo lighten-1 white-text">
          <i @click="closeEdit" class="icon ion-close"></i>
          <form  enctype="multipart/form-data">
            <label class="profilePic" for="profile_image">
              <input type="file" accept="image/png,image/jpeg" name="photos" :disabled="profileImgStatus === 'uploading'" @change="filesChange($event.target.name, $event.target.files)" class="hide" id="profile_image">
              <img :src="profileEdit.profilePic" class="user-pict-img" :alt="profile.username" width="150" height="150">
            </label>
            <i class="fa fa-spinner center center-align fa-pulse" v-if="profileImgStatus === 'uploading'"></i>
          </form>
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
            <!-- <div class="input-field col s12">
              <input placeholder="Placeholder" id="first_name" type="text" class="validate">
            </div> -->
            <div v-for="(social, key, i) in profileEdit.social" :key="i" class="row input-field">
              <input type="text" :id="'social' + i" v-model="profileEdit.social[key]">
              <label :class="{active: social.length > 0}" :for="'social' + i">{{capitalize(key)}}</label>
            </div>
            <div class="row">
              <div class="col m5 pl-0">
                <input type="text" v-model="socialFeed" placeholder="Social">
              </div>
              <div class="col m7 pr-0">
                <input type="text" @keyup.enter="addToSocial" placeholder="Username" v-model="socialName">
                <i @click="addToSocial" class="ion-plus add-lang-icon right"></i>
              </div>
            </div>
            <p>
              I'm on vacation <i class="icon ion-android-plane"></i>
              <span class="right">
                <div class="switch" v-if="true">
                  <label>
                    <input type="checkbox" v-model="profileEdit.vacation" >
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
  </div>
</template>

<script>
// import sc2 from '@/services/sc2'
import Api from '@/services/api'
import moment from 'moment'
import WitnessCard from '@/components/snippets/witnessCard'

const countries = require('country-list')()

export default {
  components: {
    WitnessCard
  },
  data () {
    return {
      i_speak: '',
      countries: countries.getNames(),
      editMode: false,
      isUpdating: false,
      socialFeed: '',
      socialName: '',
      profileImgStatus: 'initial',
      profileEdit: {
        username: this.profile.username,
        expertise: this.profile.expertise || '',
        profilePic: this.profile.profilePic || this.placeholderImg,
        coverPic: this.profile.coverPic || '',
        languages: this.profile.languages || [],
        location: this.profile.location || '',
        vacation: this.profile.vacation,
        test: false,
        about: this.profile.about || '',
        gender: this.profile.gender || '',
        social: this.profile.social || {
          facebook: '',
          website: '',
          discord: ''
        }
      }
    }
  },
  methods: {
    addToSpeakArray () {
      if (!this.i_speak) return
      this.profileEdit.languages.push(this.i_speak)
      this.i_speak = ''
    },
    addToSocial () {
      if (!this.socialFeed || !this.socialName) return
      this.profileEdit.social[this.socialFeed] = this.socialName
      this.socialFeed = ''
      this.socialName = ''
    },
    updateProfile () {
      if (this.isUpdating) return
      this.isUpdating = true
      this.profileEdit.languages = this.profileEdit.languages || [this.i_speak]
      console.log('I got called with', this.profileEdit)
      Api.profileUpdate(this.profileEdit, this.$store.state.accessToken).then((result) => {
        this.isUpdating = false
        console.log('from profile edit', result.data)
        this.$eventBus.$emit('profile-updated', result.data)
        this.$notify({
          group: 'foo',
          title: 'Success',
          text: 'Profile update successful',
          type: 'success'
        })
        this.closeEdit()
      }).catch((e) => {
        this.isUpdating = false
        this.$notify({
          group: 'foo',
          title: 'Error',
          text: 'Could not update profile, please try again',
          type: 'error'
        })
        console.log(e)
      })
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
      // this.socialFeeds = this.socialFeeds.filter((social, i) => {
      //   return index !== i
      // })
    },
    save (formData) {
      this.profileImgStatus = 'uploading'
      Api.imageUpload(formData)
        .then(x => {
          console.log('img-upload', x.data)
          this.profileEdit.profilePic = x.data
          this.profileImgStatus = 'success'
        })
        .catch(err => {
          console.log(err)
          this.uploadError = err.response
          this.profileImgStatus = 'failed'
        })
    },
    filesChange (fieldName, fileList) {
      // handle file changes
      const formData = new FormData()

      if (!fileList.length) return
      console.log({fieldName, fileList})
      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name)
        })

      // save it
      this.save(formData)
    }
  },
  computed: {
    // sociall () {
    //   let social = this.profile.social
    //   for (var key in social) {
    //     if (!social[key]) {
    //       delete social[key]
    //     }
    //   }
    //   return this.profile.social
    // },
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
  },
  props: {
    profile: {
      type: Object,
      required: true
    },
    profilepage: {
      type: Boolean
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
      min-height: 850px;
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
        .profilePic {
          cursor: pointer;
        }
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
