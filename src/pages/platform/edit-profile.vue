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
                        <p>Tell us about you</p>
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
                        <!-- Skills, Learning & Languages -->
                        <el-row :gutter="15">
                        <h4>Skills & Languages</h4>
                        <p>Let us know your talents</p>
                        <!-- Language Spoken List -->
                        <el-form-item label="Languages">
                            <el-tag :key="tag" v-for="tag in profile.languages" closable :disable-transitions="false" @close="handleClose(tag)">
                                {{tag}}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="newLanguageVisible" v-model="newLanguage" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Add Language</el-button>
                        </el-form-item>
                        </el-row>
                        <!-- Social -->
                        <h4>Social Links</h4>
                        <p>Share your profile media accounts to your customers</p>
                        <!--  Social Links -->
                        <el-row :gutter="15">
                            <el-form-item v-for="(social, key, i) in profile.social" :key="i" :label="key">
                                <el-input type="text" :id="'social' + i" v-model="profile.social[key]" placeholder="Enter Username`" />
                            </el-form-item>
                            <!-- Additional Social Links -->
                            <h5>Add your own social profiles</h5>
                            <p>Use the form below to add your own social media links</p>
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
                        </el-row>
                        <!--  Vacation Mode -->
                        <h4>Enable Vacation Mode</h4>
                        <p>Let people know if you're not</p>
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
      await Api.profileUpdate(this.profile, this.$store.state.accessToken).then((result) => {
        this.$notify({
          title: 'Success',
          message: 'Profile Successfully Updated',
          type: 'success'
        }).catch((err) => {
          this.isUpdating = false
          this.$notify.error({
            title: 'Error',
            message: `There was an error updating your profile - Err Details: ${err}`
          })
        })
      })
    },
    handleClose (tag) {
      this.profile.languages.splice(this.profile.languages.indexOf(tag), 1)
    },
    showInput () {
      this.newLanguageVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.newLanguage
      if (inputValue) {
        this.profile.languages.push(inputValue)
      }
      this.newLanguageVisible = false
      this.newLanguage = ''
    },
    addToSocial () {
      this.profile.social[this.social.platform] = this.social.username
    }
  }
}
</script>

<style lang="scss">

.social-row {
    margin-bottom: 15px;
}

.edit-profile {
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
      h4 {
        margin: 0;
      }
  }
}
</style>
