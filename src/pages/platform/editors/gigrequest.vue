<template>
  <page :pageClasses="['post_new_steemgig__view', 'row']">
    <el-main>
      <h3>Create new gig request</h3>
      <h5>Not an expert yet? No worries! On SteemGigs, you can hone your expertise while offering a service. Select this editor to do just so.</h5>
      <div class="form-container">
        <el-form :model="newGigRequest" :rules="requestRules" ref="newTestimonial" label-position="top">
          <!--  Title -->
          <el-form-item label="Title" prop="title">
            <el-input v-model="newGigRequest.title"></el-input>
          </el-form-item>
          <!--  Body -->
          <el-form-item label="Description" prop="description">
            <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="newGigRequest.description" placeholder="Enter a detailed description for the gig" :upload="uploadConfig"></vue-editor>
          </el-form-item>
          <!-- Category & Sub Category Row -->
          <el-row :gutter="15">
          <!-- Category -->
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="Category" prop="category">
                  <el-select @change="refreshSubCategory" v-model="newGigRequest.category" clearable placeholder="Select Category">
                    <el-option v-if="category.name != 'SurpassingGoogle'" v-for="(category, index) in categories" :key="index" :value="category.name" :label="category.name" />
                  </el-select>
              </el-form-item>
          </el-col>
          <!-- Sub Category -->
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item  label="Sub Category" prop="subCategory">
                <el-select :disabled='this.newGigRequest.category.length === 0' v-model="newGigRequest.subcategory" placeholder="Select Sub Category">
                  <el-option  v-for="(subcategory, index) in categories[selectedCategoryIndex].subcategories" :key="index" :value="subcategory.name" :label="subcategory.name"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- Delivery Date -->
          <el-row :gutter="15">
          <!-- Days -->
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="Delivery Date (Days)" prop="days">
            <el-select  v-model="newGigRequest.days">
              <el-option value="0" selected>Less than a day</el-option>
              <el-option v-for="(day, index) in 30" :key="index" :value="day">{{ day }} day(s)</el-option>
            </el-select>
            </el-form-item>
            </el-col>
            <!-- Hours -->
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="Delivery Date (Hours)" prop="hours">
              <el-select v-model="newGigRequest.hours">
                <el-option selected value="0">Less than an Hour</el-option>
                <el-option v-for="(hour, index) in 24" :key="index" :value="hour"></el-option>
              </el-select>
          </el-form-item>
          </el-col>
          </el-row>
          <!-- Budget -->
          <el-row :gutter="15">
            <!-- Price -->
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="Price" prop="price">
                <el-input v-model="newGigRequest.price"></el-input>
              </el-form-item>
            </el-col>
            <!-- Currency -->
              <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-form-item label="Currency" prop="currency">
                  <el-select v-model="newGigRequest.currency" placeholder="Select Currency">
                    <el-option value="STEEM">STEEM</el-option>
                    <el-option value="SBD">SBD</el-option>
                    <el-option value="SP" >SP</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
          </el-row>
            <!-- Tags -->
          <el-form-item label="Tags" prop="tags">
          <div class="tags-container">
            <!-- Fixed Tags -->
            <el-tag v-for="(tag, index) in defaultTags" :key="index">{{ tag }}</el-tag>
            <!-- Dynamic Tags -->
            <el-tag v-for="(userTag, index) in userTags" :key="index" closable> {{ userTag }} </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"/>
            <el-button v-else-if="userTags.length < 5 - defaultTags.length" class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </div>
          </el-form-item>
          <!-- Form Submission -->
          <el-form-item>
            <el-button type="primary" class="primary" @click="submitForm('newTestimonial')">Create</el-button>
            <el-button @click="resetForm('newTestimonial')"">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </page>
</template>

<script>

import Api from '@/services/api'
import axios from '@/plugins/axios'
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
      successText: '',
      errorText: '',
      isPosting: false,
      sections: ['Post a Gig request', 'Publish'],
      currentSection: 0,
      totalPics: 1,
      nextPressed: false,
      duplicateTitle: '',
      checkingTitle: false,
      newGigRequest: {
        title: '',
        category: '',
        subcategory: '',
        description: '',
        hours: 0,
        days: 0,
        currency: 'STEEM',
        images: [],
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
      },
      requestRules: {
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
        subCategory: [
          { required: true, message: 'Please enter a subcategory', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid, err) => {
        if (valid) {
          this.submit()
        } else {
          this.$notify.error({
            title: 'Error',
            message: 'Please check the form, there appears to be an issue with the information you provided'
          })
        }
      })
    },
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
          this.portfolioImages.push(url)
          // this.newGigRequest.portfolio = this.portfolioImages
        })
        .catch((err) => {
          console.log(err)
        })
    },
    prevSection () {
      if (this.currentSection > 0) this.currentSection--
    },
    refreshSubCategory () {
      this.newGigRequest.subcategory = ''
    },
    morePics () {
      if (this.totalPics < 4) this.totalPics++
    },
    submit () {
      if (!this.errorr) {
        if (this.isPosting) return
        let that = this
        this.errorText = ''
        this.successText = ''
        this.isPosting = true
        this.isPosting = true
        let jsonMetadata = {
          app: 'steemgig',
          tags: [...this.userTags, ...this.defaultTags],
          format: 'Markdown',
          timestamp: new Date().getTime(),
          price: this.newGigRequest.price,
          currency: this.newGigRequest.currency,
          authorPic: this.$store.state.profile.profileImage,
          category: this.slugify(this.newGigRequest.category),
          subcategory: this.slugify(this.newGigRequest.subcategory),
          type: 'steemgigs_request',
          deleted: true,
          // images: this.newGigRequest.portfolio,
          generated: true
        }
        let username = this.$store.state.username
        let permlink = this.slugify(this.newGigRequest.title)
        let steemGigsTag = this.htmlHide(`
    <i>this post was made on <a href="https://steemgigs.org/@${username}/${permlink}">STEEMGIGS Where everyone has something to offer</a></i>
          `)
        let body = this.previewData + steemGigsTag
        let token = this.$store.state.accessToken
        let title = this.steemedTitle
        if (this.duplicateTitle) {
          let modifiedTitle = this.newGigRequest.title + Math.floor(Math.random() * 1000)
          permlink = this.slugify(modifiedTitle)
          title = '#STEEMGIGS: I will ' + modifiedTitle.replace('#STEEMGIGS:', ' ')
        }
        let liked = this.newGigRequest.liked
        let upvoteRange = this.newGigRequest.upvoteRange
        const imagesFromBody = Util.getImagesFromBody(this.previewData)
        if (imagesFromBody.length) {
          jsonMetadata['images'] = imagesFromBody
        }
        Api.post({
          username,
          permlink,
          title,
          body,
          jsonMetadata,
          liked,
          upvoteRange
        }, token).then((err, res) => {
          console.log(err, res)
          that.isPosting = false
          this.$notify({
            group: 'foo',
            title: 'Success',
            text: 'Successfully pushed to steem!',
            type: 'success'
          })
          that.successText = 'Successfully pushed to steem!'
          that.$store.commit('RESET_NEW_GIGREQUEST')
        }).catch((e) => {
          that.isPosting = false
          this.$notify({
            group: 'foo',
            title: 'Error',
            text: 'Error pushing post to steem.',
            type: 'error'
          })
          that.errorText = 'Error pushing post to steem.'
        })
      }
    }
  },
  computed: {
    selectedCategoryIndex () {
      let catIndex = 0
      this.categories.forEach((category, index) => {
        if (category.name === this.newGigRequest.category) catIndex = index
      })
      return catIndex
    },
    wordCount () {
      if (this.newGigRequest.title.length > 0) {} else {
        return `90 Characters`
      }
    },
    steemedTitle () {
      return '#STEEMGIGS: ' + this.newGigRequest.title
    },
    defaultTags () {
      let tags = ['steemgigs']
      if (this.newGigRequest.category) {
        tags.push(this.newGigRequest.category)
      }
      if (this.newGigRequest.subcategory) {
        tags.push(this.newGigRequest.subcategory)
      }
      return tags
    },
    previewData () {
      return `<h2 class="headline">Description</h2>
  <hr />
  ${this.newGigRequest.description}
  <h5>Maximum Budget: ${this.newGigRequest.price} ${this.newGigRequest.currency}</h5>
  
  <h5>Delivery: ${this.newGigRequest.days} day(s) ${this.newGigRequest.hours} hour(s)</h5>
        `
    }
  },
  mounted () {
    this.$eventBus.$on('img-uploaded', payload => {
      console.log(payload)
      this.newGigRequest.portfolio[payload.index] = payload.url
    })
  },
  deforeDestroy () {
    this.$eventBus.$off('img-uploaded')
  }
}
</script>