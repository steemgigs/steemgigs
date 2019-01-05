<template>
  <page :pageClasses="['new_steemgig__view', 'row']">
    <el-main>
      <h3>Create Gig</h3>
      <h5>Not an expert yet? No worries! On SteemGigs, you can hone your expertise while offering a service. Select this editor to do just so.</h5>
      <div class="form-container">
        <el-form :model="newGigData" :rules="testimonialRules" ref="newGigData" label-position="top">
          <!--  Title -->
          <el-form-item label="Title" prop="title">
            <el-input v-model="newGigData.title"></el-input>
          </el-form-item>
          <!-- Category -->
          <el-row :gutter="15">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="Category" prop="category">
                <select class="browser-default my-select category_select" @change="refreshSubCategory" v-model="newGigData.category">
                        <option value="" disabled selected>Select Category</option>
                        <option v-if="category.name != 'SurpassingGoogle'" v-for="(category, index) in categories" :key="index" :value="category.name" v-text="category.name"></option>
                      </select>
              </el-form-item>
            </el-col>
            <!-- Sub Category -->
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="Sub Category" prop="subCategory">
                <select :disabled='this.newGigData.category.length === 0' class="my-select browser-default subCategory_select" v-model="newGigData.subcategory">
                        <option value="" disabled selected>Select Subcategory</option>
                        <option v-for="(subcategory, index) in categories[selectedCategoryIndex].subcategories" :key="index" :value="subcategory.name" v-text="subcategory.name"></option>
                      </select>
              </el-form-item>
            </el-col>
          </el-row>
          <!--  Body -->
          <el-form-item label="Description" prop="description">
            <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="newGigData.description" placeholder="Enter a detailed description for the gig" :upload="uploadConfig"></vue-editor>
          </el-form-item>

          <el-form-item label="Reward" prop="reward">
            <select class="browser-default my-select category_select" v-model="newGigData.reward">
                  <option>100% STEEM POWER</option>
                  <option>50% SBD 50% SP</option>
                  <option>Declined</option>
                </select>
          </el-form-item>
          <!-- Tags -->
          <el-form-item label="Tags" prop="tags">
            <!-- Fixed Tags -->
            <el-tag v-for="(tag, index) in defaultTags" :key="index">{{ tag }}</el-tag>
            <!-- Dynamic Tags -->
            <el-tag v-for="(userTag, index) in userTags" :key="index" closable> {{ userTag }} </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" />
            <el-button v-else-if="userTags.length < 5 - defaultTags.length" class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </el-form-item>
          <!-- Accordian Start -->
          <el-collapse v-model="activeName" accordion>
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
                  <el-form-item label="Currency" prop="currency">
                    <select class="browser-default my-select category_select" v-model="newGigData.currency">
                    <option value="" disabled selected>currency</option>
                    <option>STEEM</option>
                    <option>SBD</option>
                    <option>SP</option>
                </select>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- Pricing Description -->
              <el-form-item label="Pricing" prop="pricing">
                <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="newGigData.pricing" placeholder="Enter a detailed description for the gig" :upload="uploadConfig"></vue-editor>
              </el-form-item>
              <!-- Pricing Requirements -->
              <el-form-item label="Requirements" prop="requirements">
                <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="newGigData.requirements" placeholder="Enter a detailed description for the gig" :upload="uploadConfig"></vue-editor>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="Delivery" name="1">
              <!-- Delivery Date -->
              <el-row :gutter="15">
                <!-- Days -->
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <el-form-item label="Delivery Date (Days)" prop="days">
                    <select class="browser-default my-select category_select" v-model="newGigData.days">
                <option value="0">Less than a day</option>
                <option v-for="(day, index) in 30" :key="index" :value="day">{{ day }} day(s)</option>
              </select>
                  </el-form-item>
                </el-col>
                <!-- Hours -->
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                  <el-form-item label="Delivery Date (Hours)" prop="hours">
                    <select class="browser-default my-select category_select" v-model="newGigData.hours">
                  <option value="0">Less than an Hour</option>
                  <option v-for="(hour, index) in 24" :key="index" :value="hour">{{ hour }} hours(s)</option>
                </select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
            <!-- Portfolio -->
            <el-collapse-item title="Porfolio" name="2">
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
              <el-form-item label="Video URL" prop="title">
                <el-input v-model="newGigData.videoUrl"></el-input>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>

          <!-- Form Submission -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('newTestimonial')">Create</el-button>
            <el-button @click="resetForm('newTestimonial')">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
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

export default {
  mixins: [form],
  components: {
    Page,
    CatNav,
    MarkdownEditor,
    VueMarkdown,
    ImgUpload,
    VueEditor
  },
  data () {
    return {
      isPosting: false,
      sections: ['Overview', 'Description', 'Pricing', 'Requirements', 'Portfolio', 'Publish'],
      totalPics: 1,
      activeName: '0',
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
        let textifiedPics = '\n<h2>Portfolio</h2>\n<hr />\n'
        this.portfolio.forEach(url => {
          textifiedPics += `<img src="${url}"> <br />`
        })
        let username = this.$store.state.username
        let permlink = this.slugify(this.newGigData.title)
        let steemGigsTag = `
    <i>this post was made on <a href="https://steemgigs.org/@${username}/${permlink}">STEEMGIGS Where everyone has something to offer</a></i>
          `
        let contentToHide = textifiedPics + steemGigsTag
        let hiddenContainer = this.htmlHide(contentToHide)
        let body = this.previewData + hiddenContainer

        const imagesFromBody = Util.getImagesFromBody(this.previewData)
        if (imagesFromBody.length) {
          jsonMetadata.images = jsonMetadata.images.concat(imagesFromBody)
        }

        let token = this.$store.state.accessToken
        let title = this.steemedTitle
        // if (this.duplicateTitle) {
        //   let splittedTitle = title.split(' ')
        //   let lastNumber = parseInt(splittedTitle[splittedTitle.length - 1])
        //   title = lastNumber ? title + ' ' + lastNumber++ : title + ' 1'
        // })
        if (this.duplicateTitle) {
          let modifiedTitle = this.newGigData.title + Math.floor(Math.random() * 1000)
          permlink = this.slugify(modifiedTitle)
          title = '#STEEMGIGS: I will ' + modifiedTitle
        }
        let liked = this.newGigData.liked
        let upvoteRange = this.newGigData.upvoteRange
        // username, permlink, title, body, jsonMetadata, token
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
          that.isPosting = false
          this.$notify({
            group: 'foo',
            title: 'Success',
            text: 'Successfully pushed to steem!',
            type: 'success'
          })
          that.successText = 'Successfully pushed to steem!'
          that.$store.commit('RESET_NEW_STEEMGIG')
        }).catch((e) => {
          console.log(e)
          that.isPosting = false
          this.$notify({
            group: 'foo',
            title: 'Error',
            text: 'Error pushing post to steem',
            type: 'error'
          })
          that.errorText = 'Error pushing post to steem'
        })
      }
    }
  },
  computed: {
    steemedTitle () {
      return '#STEEMGIGS: I will ' + this.newGigData.title
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
      return `
  <h2 class="headline">Description</h2>
  <hr />
  ${this.newGigData.description}
  <h2 class="headline">Pricing</h2> 
  <hr />
  ${this.newGigData.pricing}
  
  <h5>Price: Starting at ${this.newGigData.price} ${this.newGigData.currency}</h5>
  <h5>Delivery: ${this.newGigData.days} day(s) ${this.newGigData.hours} hour(s)</h5>
  <hr />
  <h2 class="headline">Requirements</h2>
  <hr />
  ${this.newGigData.requirements}
  ${iframeVideo}
        `
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

<style lang="scss" scoped>
  .form-container {
    background: white;
    padding: 20px;
  }
</style>
