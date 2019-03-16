<template>
<page :pageClasses="['edit-profile__view', 'row']">
    <el-main>
        <h3>Edit Profile</h3>
        <h5>Use the form below to edit your profile</h5>
        <el-row v-if="profile" :gutter="15">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="form-container">
                    <el-form :model="profile" ref="profile" label-position="top">
                        <h3>About You</h3>
                        <p>Tell us about you</p>
                        <!-- About Field -->
                        <el-row>
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <el-form-item label="About">
                                    <el-input type="textarea" :rows="4" placeholder="Tell us about you" v-model="profile.about"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- Hobbies -->
                        <el-form-item label="Hobbies">
                            <el-tag :key="tag" v-for="tag in profile.skills" closable :disable-transitions="false" @close="handleClose(tag)">
                                {{tag}}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="newSkillVisible" v-model="newSkill" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Add Hobby</el-button>
                        </el-form-item>
                        <!--  Location Feild -->
                        <el-row>
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <el-form-item label="Location">
                                    <el-input v-model="profile.location"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- Skills, Learning & Languages -->
                        <h3>Skills & Languages</h3>
                        <p>Let us know your talents</p>
                        <!-- Language Spoken List -->
                        <el-form-item label="Languages">
                            <el-tag :key="tag" v-for="tag in profile.languages" closable :disable-transitions="false" @close="removeLanguage(tag)">
                                {{tag}}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="newLanguageVisible" v-model="newLanguage" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Add Language</el-button>
                        </el-form-item>
                        <!-- Skills List -->
                        <el-form-item label="Skills">
                            <el-tag :key="tag" v-for="tag in profile.skills" closable :disable-transitions="false" @close="handleClose(tag)">
                                {{tag}}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="newSkillVisible" v-model="newSkill" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Add Skill</el-button>
                        </el-form-item>
                        <!-- Learning -->
                        <el-form-item label="Learning">
                            <el-tag :key="tag" v-for="tag in profile.skills" closable :disable-transitions="false" @close="handleClose(tag)">
                                {{tag}}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="newSkillVisible" v-model="newSkill" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Add New</el-button>
                        </el-form-item>
                        <!-- Social -->
                        <h3>Social Links</h3>
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
                                        <el-input type="text" v-model="socialFeed" placeholder="Enter Platform" />
                                    </el-form-item>
                                </el-col>
                                <!-- Username -->
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                    <el-form-item label="Username">
                                        <el-input type="text" @keyup.enter="addToSocial" placeholder="Enter Username" v-model="socialName" />
                                    </el-form-item>
                                </el-col>
                                <el-button class="secondary" type="secondary" @click="alert('Submit')">Add Social Media Link</el-button>
                            </el-row>
                        </el-row>
                        <!-- Help with -->
                        <h4>I can help with</h4>
                        <p>Let people know the types of things you're looking to help them with</p>
                        <!--  Vacation Mode -->
                        <h4>Enable Vacation Mode</h4>
                        <p>Let people know if you're not</p>
                        <!-- Enable Vacation Mode -->
                        <el-row>
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <el-form-item label="Vacaction Mode">
                                    <el-checkbox v-model="profile.vacaction">Enable Vacation Mode</el-checkbox>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- Edit Profile Submission -->
                        <el-form-item>
                            <el-button class="primary" type="primary" @click="submitForm('newMicroTask')">Create</el-button>
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
      newHobbie: '',
      newHobbieVisuble: false
    }
  },
  mounted () {
    this.getProfile()
  },
  methods: {
    async getProfile () {
      await Api.fetchUserData(this.$route.params.username)
        .then(response => {
          this.profile = { ...response.data,
            ...{
              skills: [],
              interests: [],
              learning: [],
              helpWith: []
            }
          }
        }).catch(err => {
          this.$notify.error({
            title: 'Error',
            message: `There was an error getting your profile - Err Details: ${err}`
          })
        })
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
    handleClose (valueLocation, tag) {
      valueLocation.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput (valueLocationVisible) {
      valueLocationVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm (newTagValue, valueLocationVisible, valueLocation) {
      let inputValue = newTagValue
      if (inputValue) {
        valueLocation.push(inputValue)
      }
      valueLocationVisible = false
      newTagValue = ''
    }
  }
}
</script>

<style lang="scss">
.social-row {
    margin-bottom: 15px;
}
</style>
