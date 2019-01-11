<template>
  <div >
    <div class="owner">
      <div class="rotating-card" :class="editMode ? 'flipped' : ''">
        <div class="face">
          <div class="profile-card">
            <span class="editProfile waves-effect" v-if="$store.state.username === profile.username">
              <i v-if="!editMode" @click="editMode = true" class="icon ion-android-create"></i>
            </span>
            <div class="profilePic">
              <img :src="profileImage || placeholderImg" class="user-pict-img" :alt="profile.username" width="150" height="150">
            </div>
            <span class="username"> {{ profile.username + ' (' + profile.rep + ') ' }} </span>
            <span class="expertise" v-text="profile.about"></span>
            <span class="ratings">
              <i class="icon ion-ios-star amber-text" v-for="(star, index) in 5" :key="index"></i> 5.0 (No Reviews)
            </span>
            <p class="location"><i class="icon ion-android-pin"></i> From <span class="right" v-text="profile.location || 'Not set'"></span></p>
            <p class="member_since"> <i class="icon ion-android-person"></i> Member since <span class="right" v-text="since"></span></p>
            <p class="member_since"> <i class="icon ion-ios-briefcase"></i> Last delivery <span class="right">N/A</span></p>
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
            <div>
              <router-link v-if="!profilepage" :to="'/@' + profile.username"><el-button class="secondary explore-profile" type="secondary">Explore Profile</el-button></router-link>
            </div>
          </div>
          <div v-show="!editMode" class="moreProfileInfo">
            <div class="card-content">
              <span class="card-title">Links</span>
              <p class="social-link" v-for="(social, key, index) in profile.social" :key="index">
                <span class="site-label">{{ key }}:</span><span class="site-link"> {{ social || 'Link not provided' }}</span>
                </p>
              <span class="card-title">Languages</span>
              <ul>
                <li v-for="(language, index) in profile.languages" :key="index">{{`${language} - Fluent`}}</li>
                <li class="not-avail" v-if='profile.languages.length === 0'>No Languages Provided</li>
              </ul>
            </div>
          </div>
          <witness-card v-if="!$store.state.profile.steemgigsWitness"/>
        </div>
        <!-- Edit Profile -->
        <div class="back edit-card-container">
          <i @click="closeEdit" class="icon ion-close"></i>
          <!-- User Profile Page -->
          <el-form :model="profileEdit" :rules="profileRules" ref="profileEdit" label-width="120px" class="demo-ruleForm" label-position="top" @submit.native.prevent @keydown.enter.native.prevent="submitForm">
          <!-- Profile Image -->
          <form  enctype="multipart/form-data">
            <label class="profilePic" for="profile_image">
              <input type="file" accept="image/png,image/jpeg" name="photos" :disabled="profileImgStatus === 'uploading'" @change="filesChange($event.target.name, $event.target.files)" class="hide" id="profile_image">
              <img :src="profileEdit.profilePic" class="user-pict-img" :alt="profile.username" width="150" height="150">
            </label>
            <i class="fa fa-spinner center center-align fa-pulse" v-if="profileImgStatus === 'uploading'"></i>
          </form>
          <!-- About -->
          <el-form-item label="About" prop="name">
              <el-input type="textarea" v-model="profileEdit.about" placeholder="Enter About"></el-input>
          </el-form-item>
          <!-- Languages -->
          <el-form-item label="Languages" prop="name">
              <el-input type="text" @keyup.enter="addToSpeakArray" v-model="i_speak" placeholder="Enter Language"></el-input>
          </el-form-item>
          <!-- Language Spoken List -->
          <ul class="language-list">
              <li v-for="(spoken, i) in profileEdit.languages" :key="i">
                {{spoken}}
                <span class="right" @click="removeLanguage(i)"><i class="ion-close-round"></i></span>
              </li>
            </ul>
            <!-- Social Links -->
            <el-form-item v-for="(social, key, i) in profileEdit.social" :key="i" :label="capitalize(key)">
              <el-input type="text" :id="'social' + i" v-model="profileEdit.social[key]" placeholder="Enter Username`"/>
            </el-form-item>
            <!-- Additional Social Links -->
            <el-row :gutter="15">
            <!-- Platform -->
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
             <el-form-item label="Platform">
               <el-input type="text" v-model="socialFeed" placeholder="Enter Platform" />
             </el-form-item>
            </el-col>
             <!-- Username -->
             <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
             <el-form-item label="Username">
               <el-input type="text" @keyup.enter="addToSocial" placeholder="Enter Username" v-model="socialName" />
             </el-form-item>
             </el-col>
            </el-row>
            <!-- Vacaction Mode -->
            <el-form-item label="Vacation Mode" prop="name">
              <el-switch v-model="profileEdit.vacation" active-color="#13ce66" inactive-color="#ff4949" active-text="Active" inactive-text="Inactive"></el-switch>
            </el-form-item>
            <!-- Gender -->
            <el-form-item label="Gender">
              <el-select v-model="profileEdit.gender" placeholder="Select Gender">
                <el-option value="male">Male</el-option>
                <el-option value="female">Female</el-option>
                <el-option value="unknown">Rather not say</el-option>
              </el-select>
            </el-form-item>
            <!-- Location -->
            <el-form-item label="Location">
              <el-select v-model="profileEdit.location" placeholder="Select Location">
                <el-option v-for="(country, index) in countries" :key="index" :value="country">{{ country }}</el-option>
              </el-select>
            </el-form-item>
        </el-form>
            <el-button type="primary" @click.prevent="updateProfile" class="primary">Save Profile</el-button>
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
    profileImage () {
      return `https://steemitimages.com/u/${this.profile.username}/avatar`
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

   .profile-card {
      border-radius: 10px;
      background: white;
      padding: 20px;
      box-shadow: 0 3px 13px rgba(0, 0, 0, 0.05);
    }

  select.my-select {
    width: 100% !important;
    pointer-events: initial !important;
    height: 2.5em !important;
    position: static;
    opacity: 1 !important;
  }
  .owner {
    .profile-card span {
       text-align: center;
       word-break: break-word;
    }
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
    .user-pict-img {
      height: 75px;
      width: 75px;
      border-radius: 50%;
      margin: auto;
      display: block;
    }
    span {
      display: block;
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
    background: white;
    padding: 20px;
    margin: 20px 0;
    border-radius: 10px;
    box-shadow: 0 3px 13px rgba(0, 0, 0, 0.05);
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
    .site-label {
      font-weight: bold;
      text-transform: capitalize;
    }

    .social-link {
      display: block;
      word-break: break-word;
    }

    .not-avail {
      font-size: 14px;
    }
  }

  .explore-profile {
    display: block;
    margin: auto;
  }

  .expertise {
    margin: 10px;
  }

  .edit-card-container {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 3px 13px rgba(0, 0, 0, 0.05);
    color: black;
    width: 100%;
  }
</style>
