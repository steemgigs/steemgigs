<template>
  <page :pageClasses="['new_steemgig__view', 'row']">
    <el-main>
      <h3>Create Gig</h3>
      <h5>Offer a service (related to your expertise, talents/un(dis)talents, experience etc) in exchange for Steem, SBD, Steem Power or for free.</h5>
       <el-row :gutter="15">
      <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
      <div class="form-container">
        <el-form :model="newGigData" :rules="gigRules" ref="newGigData" label-position="top">
          <!--  Title -->
          <el-form-item label="Title" prop="title">
            <el-input v-model="newGigData.title"></el-input>
          </el-form-item>
          <!-- Category -->
          <el-row :gutter="15">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="Category" prop="category">
                  <el-select @change="refreshSubCategory" v-model="newGigData.category" clearable placeholder="Select Category">
                    <el-option v-if="category.name != 'SurpassingGoogle'" v-for="(category, index) in categories" :key="index" :value="category.name" :label="category.name" />
                  </el-select>
              </el-form-item>
            </el-col>
            <!-- Sub Category -->
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item  label="Sub Category" prop="subcategory">
                <el-select :disabled='this.newGigData.category.length === 0' v-model="newGigData.subcategory" placeholder="Select Sub Category">
                  <el-option  v-for="(subcategory, index) in categories[selectedCategoryIndex].subcategories" :key="index" :value="subcategory.name" :label="subcategory.name"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!--  Body -->
          <el-form-item label="Description" prop="description">
            <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="newGigData.description" placeholder="Enter a detailed description for the gig" :upload="uploadConfig"></vue-editor>
          </el-form-item>
          <!-- Post Reward Type -->
          <el-form-item label="Reward" prop="reward">
            <el-select class="browser-default my-select category_select" v-model="newGigData.reward">
                  <el-option value="100% STEEM POWER" label="100% STEEM POWER" />
                  <el-option value="50% SBD/50% SP" label="50% SBD/50% SP" />
                  <el-option value="Declined" label="Declined" />
                </el-select>
          </el-form-item>
          <!-- Tags -->
          <el-form-item label="Tags" prop="tags">
            <div class="tags-container">
            <!-- Fixed Tags -->
            <el-tag v-for="(tag, index) in defaultTags" :key="index">{{ tag }}</el-tag>
            <!-- Dynamic Tags -->
            <el-tag v-for="(userTag, index) in userTags" :key="index" closable> {{ userTag }} </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" />
            <el-button v-else-if="userTags.length < 5 - defaultTags.length" class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </div>
          </el-form-item>
          <!-- Accordian Start -->
          <el-collapse v-model="activeNames">
            <el-collapse-item title="Pricing" name="1">
              <!-- Pricing -->
              <el-row :gutter="15">
                <!-- Price -->
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <el-form-item label="Price" prop="price">
                    <el-input v-model="newGigData.price"></el-input>
                  </el-form-item>
                </el-col>
                <!-- Currency -->
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-form-item label="Currency" prop="currency">
                  <el-select v-model="newGigData.currency" placeholder="Select Currency">
                    <el-option value="STEEM">STEEM</el-option>
                    <el-option value="SBD">SBD</el-option>
                    <el-option value="SP" >SP</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
                </el-col>
              </el-row>
              <!-- Pricing Description -->
              <el-form-item label="Pricing" prop="pricing">
                <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="newGigData.pricing" placeholder="Enter a detailed description for the gig" :upload="uploadConfig"></vue-editor>
              </el-form-item>
              </el-collapse-item>
              <!-- Requirements -->
              <el-collapse-item title="Requirements" name="2">
              <el-form-item label="Requirements" prop="requirements">
                <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="newGigData.requirements" placeholder="Enter a detailed description for the gig" :upload="uploadConfig"></vue-editor>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="Delivery" name="3">
               <!-- Delivery Date -->
          <el-row :gutter="15">
          <!-- Days -->
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="Delivery Date (Days)" prop="days">
            <el-select  v-model="newGigData.days">
              <el-option value="0" selected>Less than a day</el-option>
              <el-option v-for="(day, index) in 30" :key="index" :value="day">{{ day }} day(s)</el-option>
            </el-select>
            </el-form-item>
            </el-col>
            <!-- Hours -->
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="Delivery Date (Hours)" prop="hours">
              <el-select v-model="newGigData.hours">
                <el-option selected value="0">Less than an Hour</el-option>
                <el-option v-for="(hour, index) in 24" :key="index" :value="hour"></el-option>
              </el-select>
          </el-form-item>
          </el-col>
          </el-row>
            </el-collapse-item>
            <!-- Portfolio -->
            <el-collapse-item title="Porfolio" name="4">
              <el-row :gutter="15">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <div class="col s12 m4 l3 mb-3" v-for="(image, index) in newGigData.portfolio" :key="image.key">
                  <img-upload :id="index" :img="image.url" />
                </div>
                <div class="col s12 m4 l3 mb-3" v-if="newGigData.portfolio.length < 8">
                  <div class="add-box center center-align pt-5" @click.prevent="morePics">
                    <button class="btn-floating indigo">
                      <i class="icon ion-android-add"></i>
                    </button><br><br>
                    <span>Click to add more images</span>
                  </div>
                </div>
                </el-col>
              </el-row>
              <p>Consider embedding a short video clip of you, telling potential clients why they should avail of your service. This improves your general reputation even on steemit, make your content richer and more worthy of curation etc. (Optional)</p>
              <el-form-item label="Video URL" prop="videoURL">
                <el-input v-model="newGigData.videoUrl"></el-input>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
          <!-- Form Submission -->
          <el-form-item>
            <el-button class="primary" type="primary" @click="submitForm('newGigData')">Create</el-button>
            <el-button @click="resetForm('newGigData')">Reset</el-button>
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
      isPosting: false,
      totalPics: 1,
      activeNames: ['0'],
      newGigData: {
        title: '',
        category: '',
        subcategory: '',
        description: '',
        requirements: '',
        pricing: '',
        hours: 0,
        days: 0,
        currency: 'STEEM',
        portfolio: [{
          url: '',
          key: 183
        }],
        reward: '100% STEEM POWER',
        price: 0,
        liked: false,
        upvoteRange: 100
      },
      guide: {
        header: 'Create the perfect Steem Gig',
        subheader: 'Share your talent/un(dis)talents with the world',
        video: 'xeLYLA6C2AE',
        items: [
          'Make your title short, describing exactly what service(s) you offer as this is the likeliest way to boost viewership, potential & eventual sales',
          'Select the most accurately describing category and subcategory',
          'Choose the best follow up tags',
          'Be as expressive as possible as this is your chance to tell postential clients and steemians what you offer, why you gig is special and why they should give you opportunities etc.',
          'Describe what will be contained in your package for each price.',
          'Are there aspects of your GIG that you are will to offering lovingly for free etc?',
          'Tell them if your "requirements" are optional or compulsory.'
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
      this.newGigData.subcategory = ''
    },
    getTags (entries) {
      this.userTags = entries
    },
    morePics () {
      if (this.newGigData.portfolio.length < 8) {
        this.newGigData.portfolio.push({
          url: '',
          key: Math.floor(Math.random() * 1000)
        })
      }
    },
    submit () {
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
          price: this.newGigData.price,
          currency: this.newGigData.currency,
          authorPic: this.$store.state.profile.profileImage,
          category: this.slugify(this.newGigData.category),
          subcategory: this.slugify(this.newGigData.subcategory),
          images: this.portfolio,
          type: 'steemgigs_post',
          generated: true,
          videoUrl: this.newGigData.videoUrl
        }
        let textifiedPics = '\n<h2>Portfolio</h2>\n<hr/>\n'
        this.portfolio.forEach(url => {
          textifiedPics += `<img src="${url}"><br/>`
        })
        let username = this.$store.state.username
        let permlink = this.slugify(this.newGigData.title)
        let steemGigsTag = `<i>This post was made on <a href="https://steemgigs.org/@${username}/${permlink}">STEEMGIGS Where everyone has something to offer</a></i>`
        let contentToHide = textifiedPics + steemGigsTag
        let hiddenContainer = this.htmlHide(contentToHide)
        let body = this.previewData + hiddenContainer
        let token = this.$store.state.accessToken
        let title = this.steemedTitle

        const imagesFromBody = Util.getImagesFromBody(this.previewData)
        if (imagesFromBody.length) {
          jsonMetadata.images = jsonMetadata.images.concat(imagesFromBody)
        }
        let liked = this.newGigData.liked
        let upvoteRange = this.newGigData.upvoteRange
        Api.post({
          username,
          permlink,
          title,
          body,
          liked,
          upvoteRange,
          jsonMetadata
        }, token).then((err, res) => {
          console.log('err', err, 'res', res)
          this.$notify({
            title: 'Success',
            message: 'Your post was successful',
            type: 'success'
          })
          this.$store.commit('setLoading', false)
          // Push user to post upon success
          this.$router.push(`/steemgigs/@${username}/${permlink}`)
        }).catch((e) => {
          this.$store.commit('setLoading', false)
          this.$notify.error({
            title: 'Error',
            message: `Sorry, there seems to have been an error. Error Details - ${e}`
          })
          that.errorText = 'Error pushing post to steem'
        })
      }
    }
  },
  computed: {
    steemedTitle () {
      return '#STEEMGIGS: ' + this.newGigData.title
    },
    portfolio () {
      return this.newGigData.portfolio.filter(image => image.url).map(image => image.url)
    },
    selectedCategoryIndex () {
      let catIndex = 0
      this.categories.forEach((category, index) => {
        if (category.name === this.newGigData.category) catIndex = index
      })
      return catIndex
    },
    defaultTags () {
      let tags = ['steemgigs']
      if (this.newGigData.category) {
        tags.push(this.newGigData.category)
      }
      if (this.newGigData.subcategory) {
        tags.push(this.newGigData.subcategory)
      }
      return tags
    },
    wordCount () {
      if (this.newGigData.title.length > 0) {
        return `${this.newGigData.title.length} / 90 Characters`
      } else {
        return `90 Characters`
      }
    },
    previewData () {
      const embedVideoUrl = Util.getEmbedVideoUrl(this.newGigData.videoUrl)
      const iframeVideo = embedVideoUrl ? `<h5 class="headline">Here Is A Video Showing Why You Should Avail Of My Gig!</h5><iframe src="${embedVideoUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>` : ''
      return `<h2 class="headline">Description</h2><hr />${this.newGigData.description}<h2 class="headline">Pricing</h2> <hr />${this.newGigData.pricing}<h5>Price: Starting at ${this.newGigData.price} ${this.newGigData.currency}</h5><h5>Delivery: ${this.newGigData.days} day(s) ${this.newGigData.hours} hour(s)</h5><h2 class="headline">Requirements</h2><hr />${this.newGigData.requirements}${iframeVideo}`
    }
  },
  watch: {
    newGigData: {
      handler (val) {
        this.$store.commit('SET_NEW_STEEMGIG', val)
      },
      deep: true
    }
  },
  mounted () {
    this.$eventBus.$on('img-uploaded', payload => {
      console.log(payload)
      this.newGigData.portfolio[payload.index].url = payload.url
    })
    this.$eventBus.$on('delete-image-url', payload => {
      this.newGigData.portfolio.splice(payload, 1)
    })
  },
  deforeDestroy () {
    this.$eventBus.$off('img-uploaded')
    this.$eventBus.$off('delete-image-url')
  }
}
</script>
