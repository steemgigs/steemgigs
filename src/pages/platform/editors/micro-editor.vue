<template>
  <page :pageClasses="['new_steemgig__view', 'row']">
    <el-main>
      <h3>Create a Micro Task</h3>
      <h5>You can build aspects of your dream by creating a microtask. A microtask can take different forms. In most cases, participants are required to carry out a simple action e.g join a telegram, subscribe to my YouTube, leave a feedback on my post etc You can pay with SBD, Steem, Steem Power or with a Steem Upvote.</h5>
       <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
      <div class="form-container">
        <el-form :model="newMicroTask" :rules="gigRules" ref="newMicroTask" label-position="top">
          <!--  Title -->
          <el-form-item label="Title" prop="title">
            <el-input v-model="newMicroTask.title"><template slot="prepend">{{ editorPrefix }}</template></el-input>
          </el-form-item>
          <!-- Category -->
          <el-row :gutter="15">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="Category" prop="category">
                  <el-select @change="refreshSubCategory" v-model="newMicroTask.category" clearable placeholder="Select Category">
                    <el-option v-if="category.name != 'SurpassingGoogle'" v-for="(category, index) in categories" :key="index" :value="category.name" :label="category.name" />
                  </el-select>
              </el-form-item>
            </el-col>
            <!-- Sub Category -->
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item  label="Sub Category" prop="subcategory">
                <el-select :disabled='this.newMicroTask.category.length === 0' v-model="newMicroTask.subcategory" placeholder="Select Sub Category">
                  <el-option  v-for="(subcategory, index) in categories[selectedCategoryIndex].subcategories" :key="index" :value="subcategory.name" :label="subcategory.name"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!--  Body -->
          <el-form-item label="Description" prop="description">
            <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="newMicroTask.description" placeholder="Enter a detailed description for the gig" :upload="uploadConfig"></vue-editor>
          </el-form-item>
          <!-- Post Reward Type -->
          <el-form-item label="Reward" prop="payoutType">
            <el-select class="browser-default my-select category_select" v-model="newMicroTask.payoutType">
                  <el-option value="100%" label="100% STEEM POWER" />
                  <el-option value="50/50" label="50% SBD/50% SP" />
                  <el-option value="0" label="Declined" />
                </el-select>
          </el-form-item>
          <!-- Tags -->
          <el-form-item label="Tags" prop="tags">
            <div class="tags-container">
            <!-- Fixed Tags -->
            <el-tag v-for="(tag) in defaultTags" :key="tag">{{ tag }}</el-tag>
            <!-- Dynamic Tags -->
            <el-tag v-for="(userTag) in userTags" :key="userTag" closable  @close="handleClose(userTag)" > {{ userTag }} </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"/>
            <el-button v-else-if="userTags.length !== 2" class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </div>
          </el-form-item>
          <!-- Accordian Start -->
          <el-collapse v-model="activeNames">
            <el-collapse-item title="Pricing" name="1">
               <template slot="title"><i class="ion-cash"></i>Pricing</template>
              <!-- Pricing -->
              <el-row :gutter="15">
                <!-- Price -->
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <el-form-item label="Price" prop="price">
                    <el-input :disabled="isFree" v-model="newMicroTask.price"></el-input>
                  </el-form-item>
                </el-col>
                <!-- Currency -->
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-form-item label="Currency" prop="currency">
                  <el-select :disabled="isFree" v-model="newMicroTask.currency" placeholder="Select Currency">
                    <el-option value="STEEM">STEEM</el-option>
                    <el-option value="SBD">SBD</el-option>
                    <el-option value="SP" >SP</el-option>
                    <el-option value="TEARDROPS">TEARDROPS</el-option>
                    <el-option value="Upvote">Upvote</el-option>
                  </el-select>
                </el-form-item>
                </el-col>
                <!-- Is Free -->
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-checkbox v-model="isFree">No Payment Provided</el-checkbox>
                </el-col>
              </el-row>
              <!-- Pricing Description -->
              <el-form-item label="Pricing" prop="pricing">
                <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="newMicroTask.pricing" placeholder="Enter a detailed description for the gig" :upload="uploadConfig"></vue-editor>
              </el-form-item>
              </el-collapse-item>
              <!-- Requirements -->
              <el-collapse-item title="Requirements" name="2">
                <template slot="title"><i class="ion-briefcase"></i>Requirements</template>
              <el-form-item label="Requirements" prop="requirements">
                <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="newMicroTask.requirements" placeholder="Enter a detailed description for the gig" :upload="uploadConfig"></vue-editor>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="Duration" name="3">
              <template slot="title"><i class="ion-clock"></i>Duration</template>
               <!-- Duration -->
          <el-row :gutter="15">
          <!-- Days -->
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="Duration (Days)" prop="days">
            <el-select  v-model="newMicroTask.days">
              <el-option value="0" selected>Less than a day</el-option>
              <el-option v-for="(day, index) in 30" :key="index" :value="day">{{ day }} day(s)</el-option>
            </el-select>
            </el-form-item>
            </el-col>
            <!-- Hours -->
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="Duration (Hours)" prop="hours">
              <el-select v-model="newMicroTask.hours">
                <el-option selected value="0">Less than an Hour</el-option>
                <el-option v-for="(hour, index) in 24" :key="index" :value="hour"></el-option>
              </el-select>
          </el-form-item>
          </el-col>
          </el-row>
            </el-collapse-item>
            <!-- Microtask -->
            <el-collapse-item title="Porfolio" name="4">
                <el-row>
                  <!-- Unlimited Applicants -->
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-checkbox v-model="unlimitedApplicants">Unlimited Applicants</el-checkbox>
                </el-col>
              </el-row>
              <template slot="title"><i class="ion-images"></i>Applicants</template>
              <el-row :gutter="15">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <el-form-item label="Number of Applicants" prop="price">
                    <el-input type="Number" :disabled="unlimitedApplicants" v-model="newMicroTask.applicantCount"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                  <!-- Unlimited Submissions -->
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-checkbox v-model="unlimitedSubmissions">Unlimited Submissions</el-checkbox>
                </el-col>
              </el-row>
              <el-row :gutter="15">
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <el-form-item label="Submissions Per Application" prop="price">
                    <el-input type="Number" :disabled="unlimitedSubmissions" v-model="newMicroTask.submissionLimit"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
            <!-- Requirements' Sample -->
            <el-collapse-item title="Porfolio" name="4">
              <template slot="title"><i class="ion-images"></i>Requirements' Sample</template>
              <el-row :gutter="15">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                     <p>Consider adding images that help show applicants the quality of work you're searching for.</p>
                  <div class="col s12 m4 l3 mb-3" v-for="(image, index) in newMicroTask.portfolio" :key="image.key">
                  <img-upload :id="index" :img="image.url" />
                </div>
                <div class="col s12 m4 l3 mb-3" v-if="newMicroTask.portfolio.length < 8">
                  <div class="add-box center center-align pt-5" @click.prevent="morePics">
                    <button class="btn-floating indigo">
                      <i class="icon ion-android-add"></i>
                    </button><br><br>
                    <span>Click to add more images</span>
                  </div>
                </div>
                </el-col>
              </el-row>
              <p>Consider embedding a short video clip of you, telling potential participants how you would like your request to be catered to. This improves your general reputation even on steemit, make your content richer and more worthy of curation etc. (Optional)</p>
              <el-form-item label="Video URL" prop="videoURL">
                <el-input v-model="newMicroTask.videoUrl"></el-input>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
          <!-- Form Submission -->
          <el-form-item>
            <el-button  type="primary" @click="submitForm('newMicroTask')">Create</el-button>
            <el-button @click="resetForm('newMicroTask')">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
       </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <guide :header="guide.header" :subHeader="guide.subheader" :itemList="guide.items" :videoId="guide.video"></guide>
      </el-col>
      </el-row>
    </el-main>
  </page>
</template>

<script>
import axios from '@/plugins/axios'
import Api from '@/services/api'
import Page from '@/components/page'
import CatNav from '@/components/layout/catNav'
import ImgUpload from '@/components/snippets/imgUpload'
import { MarkdownEditor } from 'markdown-it-editor'
import VueMarkdown from 'vue-markdown'
import { VueEditor } from 'vue2-editor'
import form from '@/mixins/form.js'
import Util from '@/services/util'
import guide from '@/components/snippets/guide-box'

export default {
  mixins: [form],
  components: {
    Page,
    CatNav,
    MarkdownEditor,
    VueMarkdown,
    ImgUpload,
    VueEditor,
    guide
  },
  data () {
    return {
      editorPrefix: '#STEEMGIGS: Micro Task -',
      isPosting: false,
      totalPics: 1,
      activeNames: ['0'],
      isFree: false,
      unlimitedApplicants: true,
      unlimitedSubmissions: true,
      newMicroTask: {
        title: '',
        category: '',
        subcategory: '',
        description: '',
        requirements: '',
        applicantCount: '',
        submissionLimit: '',
        pricing: '',
        hours: 0,
        days: 0,
        currency: 'STEEM',
        portfolio: [{
          url: '',
          key: 183
        }],
        payoutType: '50/50',
        price: 0,
        liked: false,
        upvoteRange: 100
      },
      guide: {
        header: 'Create The Perfect Microtask',
        subheader: 'Request help from the world',
        video: 'xeLYLA6C2AE',
        items: [
          'Make your title short, describing exactly what service(s) you offer as this is the likeliest way to boost viewership, potential & eventual sales',
          'Select the most accurately-describing category and subcategory',
          'Choose the best follow-up tags',
          'Be as expressive as possible as this is your chance to tell postential clients and steemians what you offer, why your microtask is special and why they should give you opportunities etc.',
          'Tell readers whether your \'requirements\' are optional or compulsory.'
        ]
      },
      gigRules: {
        title: [
          { required: true, message: 'Please enter a post title', trigger: 'blur' },
          { min: 5, message: 'Your title should be at least 5 characters', trigger: 'blur' }
        ],
        description: [
          { required: true, message: 'Please enter a post description', trigger: 'blur' },
          { min: 300, message: 'Your description should be 300 Characters or more, please read style guide for clarification', trigger: 'blur' }
        ],
        category: [
          { required: true, message: 'Please enter a category', trigger: 'blur' }
        ],
        subcategory: [
          { required: true, message: 'Please enter a subcategory', trigger: 'blur' }
        ],
        pricing: [
          { required: true, message: 'Please enter a pricing description', trigger: 'blur' },
          { min: 100, message: 'Your description should be 100 Characters or more, please read style guide for clarification', trigger: 'blur' }
        ],
        requirements: [
          { required: true, message: 'Please enter a requirements description', trigger: 'blur' },
          { min: 100, message: 'Your description should be 100 Characters or more, please read style guide for clarification', trigger: 'blur' }
        ]
      },
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{
          'list': 'ordered'
        }, {
          'list': 'bullet'
        }],
        ['image', 'code-block']
      ],
      uploadConfig: {
        name: 'file',
        accept: 'image/jpg,image/jpeg,image/png',
        url: this.$imgUploadURL
      }
    }
  },
  methods: {
    handleImageAdded (file, Editor, cursorLocation) {
      const CLIENT_ID = '993793b1d8d3e2e'
      var formData = new FormData()
      formData.append('image', file)

      axios({
        url: 'https://api.imgur.com/3/image',
        method: 'POST',
        headers: {
          'Authorization': 'Client-ID ' + CLIENT_ID
        },
        data: formData
      })
        .then((result) => {
          console.log(result)
          let url = result.data.data.link
          Editor.insertEmbed(cursorLocation, 'image', url)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    refreshSubCategory () {
      this.newMicroTask.subcategory = ''
    },
    getTags (entries) {
      this.userTags = entries
    },
    morePics () {
      if (this.newMicroTask.portfolio.length < 8) {
        this.newMicroTask.portfolio.push({
          url: '',
          key: Math.floor(Math.random() * 1000)
        })
      }
    },
    async submit () {
      this.$store.commit('setLoading', true)
      if (!this.errorr) {
        if (this.isPosting) return
        let that = this
        this.errorText = ''
        this.successText = ''
        this.isPosting = true
        let jsonMetadata = {
          app: 'steemgig',
          users: ['steemgigs', this.$store.state.username],
          tags: [...this.userTags, ...this.defaultTags],
          format: 'Markdown',
          timestamp: new Date().getTime(),
          price: this.newMicroTask.price,
          currency: this.newMicroTask.currency,
          authorPic: this.$store.state.profile.profileImage,
          category: this.slugify(this.newMicroTask.category),
          subcategory: this.slugify(this.newMicroTask.subcategory),
          images: this.portfolio,
          type: 'microtask_post',
          generated: true,
          videoUrl: this.newMicroTask.videoUrl
        }
        let textifiedPics = '\n<h2>Requirements Sample</h2>\n<hr/>\n'
        this.portfolio.forEach(url => {
          textifiedPics += `<img src="${url}"><br/>`
        })
        let username = this.$store.state.username
        let permlink = this.slugify(this.newMicroTask.title)
        let steemGigsTag = `<i>This post was made on <a href="https://steemgigs.org/@${username}/${permlink}">STEEMGIGS Where everyone has something to offer</a></i>`
        let contentToHide = textifiedPics + steemGigsTag
        let hiddenContainer = this.htmlHide(contentToHide)
        let body = this.previewData + hiddenContainer
        let token = this.$store.state.accessToken
        let title = this.steemedTitle
        let payoutType = this.newMicroTask.payoutType

        const imagesFromBody = Util.getImagesFromBody(this.previewData)
        if (imagesFromBody.length) {
          jsonMetadata.images = jsonMetadata.images.concat(imagesFromBody)
        }
        let liked = this.newMicroTask.liked
        let upvoteRange = this.newMicroTask.upvoteRange
        try {
        // username, permlink, title, body, jsonMetadata, token
          let result = await Api.post({
            username,
            permlink,
            title,
            body,
            jsonMetadata,
            liked,
            upvoteRange,
            payoutType
          }, token)
          this.$notify({
            title: 'Success',
            message: 'Your post was successful',
            type: 'success'
          })
          this.$store.commit('setLoading', false)
          this.removeDraft('gig')
          // Push user to post upon success, the permlink must be set from the API because it can be changed in the API if it's a duplicated permlink
          this.$router.push(`/steemgigs/@${username}/${result.data.permlink}`)
        } catch (err) {
          that.isPosting = false
          this.$notify.error({
            title: 'Error',
            message: `Sorry, there seems to have been an error. Error Details - ${err}`
          })
        }
      }
    }
  },
  computed: {
    steemedTitle () {
      return this.editorPrefix + ' ' + this.newMicroTask.title
    },
    portfolio () {
      return this.newMicroTask.portfolio.filter(image => image.url).map(image => image.url)
    },
    selectedCategoryIndex () {
      let catIndex = 0
      this.categories.forEach((category, index) => {
        if (category.name === this.newMicroTask.category) catIndex = index
      })
      return catIndex
    },
    numberOfApplicants () {
      if (this.unlimitedApplicants) {
        return 'Unlimited'
      } else {
        return this.newMicroTask.applicantCount
      }
    },
    numberOfSubmissions () {
      if (this.unlimitedSubmissions) {
        return 'Unlimited'
      } else {
        return this.newMicroTask.submissionLimit
      }
    },
    defaultTags () {
      let tags = ['steemgigs']
      if (this.newMicroTask.category) {
        tags.push(this.newMicroTask.category)
      }
      if (this.newMicroTask.subcategory) {
        tags.push(this.newMicroTask.subcategory)
      }
      return tags
    },
    wordCount () {
      if (this.newMicroTask.title.length > 0) {
        return `${this.newMicroTask.title.length} / 90 Characters`
      } else {
        return `90 Characters`
      }
    },
    previewData () {
      const embedVideoUrl = Util.getEmbedVideoUrl(this.newMicroTask.videoUrl)
      const iframeVideo = embedVideoUrl ? `<h5 class="headline">Here Is A Video Showing Why You Should Avail Of My Gig!</h5><iframe src="${embedVideoUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>` : ''
      return `<h2 class="headline">Description</h2><hr />${this.newMicroTask.description}<h2 class="headline">Pricing</h2> <hr />${this.newMicroTask.pricing}<h5>Price: Starting at ${this.newMicroTask.price} ${this.newMicroTask.currency}</h5><h5>Duration: ${this.newMicroTask.days} day(s) ${this.newMicroTask.hours} hour(s)</h5><h2 class="headline">Number of Applicants</h2><hr/><p>${this.numberOfApplicants} Applicants</p></h2><h2 class="headline">Number of Submissions Per Applicant</h2><hr/><p>${this.numberOfSubmissions} Submissions</p><h2 class="headline">Requirements</h2><hr />${this.newMicroTask.requirements}${iframeVideo}`
    }
  },
  watch: {
    'newMicroTask': {
      handler: function () {
        this.saveDraft('microtask', this.newMicroTask)
      },
      deep: true
    },
    'isFree': {
      handler: function () {
        this.newMicroTask.currency = 'STEEM'
        this.newMicroTask.price = 0
      }
    },
    'unlimitedApplicants': {
      handler: function () {
        this.newMicroTask.applicantCount = ''
      }
    },
    'unlimitedSubmissions': {
      handler: function () {
        this.newMicroTask.submissionLimit = ''
      }
    },
  },
  mounted () {
    // Get draft from local storage using mixin
    const draft = this.getDrafts('gig')
    if (draft) {
      this.newMicroTask = draft
    }
    this.$eventBus.$on('img-uploaded', payload => {
      console.log(payload)
      this.newMicroTask.portfolio[payload.index].url = payload.url
    })
    this.$eventBus.$on('delete-image-url', payload => {
      this.newMicroTask.portfolio.splice(payload, 1)
    })
  },
  deforeDestroy () {
    this.$eventBus.$off('img-uploaded')
    this.$eventBus.$off('delete-image-url')
  }
}
</script>
