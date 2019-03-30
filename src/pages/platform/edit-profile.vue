<template>
<page :pageClasses="['edit-profile__view', 'row']">
    <el-main class="edit-profile">
        <h3>Edit Profile</h3>
        <h5>Use the form below to edit your profile</h5>
        <el-row v-if="profile" :gutter="15">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="edit-profile-container">
                    <el-form :model="profile" ref="profile" label-position="top">
                        <h4>About You</h4>
                        <p>Tell us a little more about you</p>
                        <!-- About Field -->
                        <el-row>
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <el-form-item label="About">
                                    <el-input type="textarea" :rows="4" placeholder="Tell us about you" v-model="profile.about"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!--  Location Feild -->
                        <el-row>
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <el-form-item label="Location">
                                    <el-input v-model="profile.location"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- Skills -->
                        <el-row :gutter="15">
                        <h4>Skills & Hobbies</h4>
                        <p>Let the world the talents you have to offer</p>
                        <!-- Skills List -->
                        <el-form-item label="Skills & Hobbies">
                            <el-tag :key="tag" v-for="tag in profile.skillsAndHobbies" closable :disable-transitions="false" @close="handleClose(tag, 'skills')">
                                {{tag}}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="newSkillVisible" v-model="newSkill" ref="saveTagInput" size="mini" @keyup.enter.native="addSkill" @blur="addSkill">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput('skills')">+ Add Skill</el-button>
                        </el-form-item>
                        </el-row>
                        <el-row :gutter="15">
                        <h4>Learning</h4>
                        <p>What are you learning</p>
                        <!-- Learning List -->
                        <el-form-item label="Learning">
                            <el-tag :key="tag" v-for="tag in profile.learning" closable :disable-transitions="false" @close="handleClose(tag, 'learning')">
                                {{tag}}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="newLearningVisible" v-model="newLearning" ref="saveTagInput" size="mini" @keyup.enter.native="addLearning" @blur="addLearning">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput('learning')">+ Add Learning</el-button>
                        </el-form-item>
                        </el-row>
                        <!-- Help With -->
                        <el-row :gutter="15">
                        <h4>Help With</h4>
                        <p>What types of projects are you looking to help with?</p>
                        <el-form-item label="Help With">
                            <el-tag :key="tag" v-for="tag in profile.helpWith" closable :disable-transitions="false" @close="handleClose(tag, 'helpWith')">
                                {{tag}}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="newHelpWithVisible" v-model="newHelpWith" ref="saveTagInput" size="mini" @keyup.enter.native="addHelpWith" @blur="addHelpWith">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput('helpWith')">+ Add Help With</el-button>
                        </el-form-item>
                        </el-row>
                        <!-- Languages -->
                        <el-row :gutter="15">
                        <h4>Languages</h4>
                        <p>Speak more than one language? Let the world know.</p>
                        <!-- Language Spoken List -->
                        <el-form-item label="Languages">
                            <el-tag :key="tag" v-for="tag in profile.languages" closable :disable-transitions="false" @close="handleClose(tag, 'language')">
                                {{tag}}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="newLanguageVisible" v-model="newLanguage" ref="saveTagInput" size="mini" @keyup.enter.native="addLanguage" @blur="addLanguage">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput('language')">+ Add Language</el-button>
                        </el-form-item>
                        </el-row>
                        <!-- Social -->
                        <h4>Social Links</h4>
                        <p>Share your profile media accounts to your customers</p>
                        <!--  Social Links -->
                        <el-row :gutter="15">
                            <el-form-item class="social-item" v-for="(social, key, i) in profile.social" :key="i" :label="key">
                                <el-input type="text" :id="'social' + i" v-model="profile.social[key]" placeholder="Enter Username`" />
                                <el-button v-if="!((key == 'discord') || (key == 'github') || (key == 'facebook') || (key == 'website'))" type="secondary" @click="deleteSocial(key)">Delete</el-button>
                            </el-form-item>
                            <!-- Additional Social Links -->
                            <div class="add-new-social">
                            <h5>Add your own social profiles</h5>
                            <p>Add your own social media links below</p>
                            <el-row :gutter="15">
                                <!-- Platform -->
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                    <el-form-item label="Platform">
                                        <el-input type="text" v-model="social.platform" placeholder="Enter Platform" />
                                    </el-form-item>
                                </el-col>
                                <!-- Username -->
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                    <el-form-item label="Username">
                                        <el-input type="text" @keyup.enter="addToSocial" placeholder="Enter Username" v-model="social.username" />
                                    </el-form-item>
                                     <el-form-item>
                                     <el-button class="secondary" type="secondary" @click="addToSocial">Add Social Media Link</el-button>
                                      </el-form-item>
                                </el-col>
                            </el-row>
                            </div>
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item label="Social Reach">
                                <el-input type="text" v-model="profile.socialReach" placeholder="Enter Social Reach`" />
                            </el-form-item>
                            </el-col>
                        </el-row>
                        <!--  Vacation Mode -->
                        <h4>Enable Vacation Mode</h4>
                        <p>Let people know that you're not available for work at this current time.</p>
                        <!-- Enable Vacation Mode -->
                        <el-row>
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <el-form-item label="Vacaction Mode">
                                    <el-checkbox v-model="profile.vacation">Enable Vacation Mode</el-checkbox>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- Edit Profile Submission -->
                        <el-form-item>
                            <el-button class="primary" type="primary" @click="updateProfile()">Update Profile</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </el-main>
</page>
</template>

<script>
import Api from '@/services/api'
import Page from '@/components/page'
export default {
  name: 'profile-edit',
  components: {
    Page
  },
  data () {
    return {
      profile: null,
      newLanguage: '',
      newLanguageVisible: false,
      newSkill: '',
      newSkillVisible: false,
      newHelpWith: '',
      newHelpWithVisible: false,
      newLearning: '',
      newLearningVisible: false,
      social: {
        platform: '',
        username: ''
      }
    }
  },
  mounted () {
    this.getProfile()
  },
  methods: {
    async getProfile () {
      this.$store.dispatch('setFullLoading', true)
      await Api.fetchUserData(this.$route.params.username)
        .then(response => {
          this.profile = response.data
        }).catch(err => {
          this.$notify.error({
            title: 'Error',
            message: `There was an error getting your profile - Err Details: ${err}`
          })
        })
      this.$store.dispatch('setFullLoading', false)
    },
    async updateProfile () {
      this.$store.dispatch('setFullLoading', true)
      await Api.profileUpdate(this.profile, this.$store.state.accessToken).then((result) => {
        this.$notify({
          title: 'Success',
          message: 'Profile Successfully Updated',
          type: 'success'
        })
      }).catch((err) => {
        this.isUpdating = false
        this.$notify.error({
          title: 'Error',
          message: `There was an error updating your profile - Err Details: ${err}`
        })
      })
      this.$store.dispatch('setFullLoading', false)
    },
    handleClose (tag, type) {
        switch(type) {
          case 'skills':
          this.profile.skillsAndHobbies.splice(this.profile.skillsAndHobbies.indexOf(tag), 1)
          break;
          case 'language':
          this.profile.languages.splice(this.profile.languages.indexOf(tag), 1)
          break;
          case 'learning':
          this.profile.learning.splice(this.profile.learning.indexOf(tag), 1)
          break;
          case 'helpWith':
          this.profile.helpWith.splice(this.helpWith.learning.indexOf(tag), 1)
          break;
        }
    },
    showInput (type) {
      switch(type) {
        case 'skills':
        this.newSkillVisible = true
        break;
        case 'language':
        this.newLanguageVisible = true
        break;
        case 'learning':
        this.newLearningVisible = true
        break;
        case 'helpWith':
        this.newHelpWithVisible = true
        break;
        }
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    addLanguage () {
      let inputValue = this.newLanguage
      if (inputValue) {
        this.profile.languages.push(inputValue)
      }
      this.newLanguageVisible = false
      this.newLanguage = ''
    },
     addSkill () {
      let inputValue = this.newSkill
      if (inputValue) {
        this.profile.skillsAndHobbies.push(inputValue)
      }
      this.newSkillVisible = false
      this.newSkill = ''
    },
    addHelpWith () {
      let inputValue = this.newHelpWith
      if (inputValue) {
        this.profile.helpWith.push(inputValue)
      }
      this.newHelpWithVisible = false
      this.newHelpWith = ''
    },
    addLearning () {
      let inputValue = this.newLearning
      if (inputValue) {
        this.profile.learning.push(inputValue)
      }
      this.newLearningVisible = false
      this.newLearning = ''
    },
    addToSocial () {
      this.$set(this.profile.social, this.social.platform, this.social.username)
      this.social.platform = ''
      this.social.username = ''
    },
    deleteSocial (key) {
      this.$delete(this.profile.social, key)
    }
  }
}
</script>

<style lang="scss">

.social-item {
    margin-bottom: 15px;
    .el-form-item__content {
    display: flex;
    flex-direction: row;
    button {
      margin-left: 10px;
    }
    }
}
.edit-profile {
  p {
        margin-top: 5px;
    }
    h5 {
        margin-top: 15px;
    }
  .el-col {
    padding: 0 !important;
  }
  .el-row {
    margin: 0 !important;
  }
  .edit-profile-container {
      background: white;
      padding: 20px;
      box-shadow: 0 3px 13px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      h3, h4 {
        margin: 0;
      }
      textarea {
        min-height: 150px !important;
      }
      .add-new-social {
        border: 1px dashed #dcdfe6;
        padding: 0 20px;
        margin-bottom: 20px;
        border-radius: 5px;
      }
  }
}
</style>
