<template>
  <page :pageClasses="['post_new_steemgig__view', 'row']">
    <el-main>
      <h3>Create new {{capitalize(getSubCategoryName.name)}}</h3>
      <h5 v-text="getSubCategoryName.description" />
       <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
      <div class="form-container">
        <el-form :model="newGigRequest" :rules="surpassingRules" ref="newGigRequest" label-position="top">
          <!--  Title -->
          <el-form-item label="Title" prop="title">
            <el-input v-model="newGigRequest.title"></el-input>
          </el-form-item>
          <!-- Category -->
          <el-row :gutter="15">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item label="Category" prop="category">
                  <el-select @change="refreshSubCategory" v-model="newGigRequest.category" clearable placeholder="Select Category">
                    <el-option v-if="category.name != 'SurpassingGoogle'" v-for="(category, index) in categories" :key="index" :value="category.name" :label="category.name" />
                  </el-select>
              </el-form-item>
            </el-col>
            <!-- Sub Category -->
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form-item  label="Sub Category" prop="subcategory">
                <el-select :disabled='this.newGigRequest.category.length === 0' v-model="newGigRequest.subcategory" placeholder="Select Sub Category">
                  <el-option  v-for="(subcategory, index) in categories[selectedCategoryIndex].subcategories" :key="index" :value="subcategory.name" :label="subcategory.name"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- Body -->
          <el-form-item label="Description" prop="description">
            <vue-editor v-model="newGigRequest.description" placeholder="Type your post here" :upload="uploadConfig" />
          </el-form-item>
          <!-- Post Reward Type -->
          <el-form-item label="Reward" prop="payoutType">
            <el-select class="browser-default my-select category_select" v-model="newGigRequest.payoutType">
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
            </div>
          </el-form-item>
          <!-- Form Submission -->
          <el-form-item>
            <el-button class="primary" type="primary" @click="submitForm('newGigRequest')">Create</el-button>
            <el-button @click="resetForm('newGigRequest')">Reset</el-button>
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
      totalPics: 1,
      portfolioImages: [],
      PageDescription: '',
      newGigRequest: {
        title: '',
        category: '',
        subcategory: '',
        description: '',
        hours: 0,
        days: 0,
        currency: 'STEEM',
        images: [],
        price: 0,
        liked: false,
        upvoteRange: 100,
        payoutType: '50/50',
      },
      guide: {
        header: 'Share Your Knowledge',
        subheader: 'Everyone has something to offer',
        video: 'xeLYLA6C2AE',
        items: [
          'Make your title concise simple to understand and specific to a particular niche, industry, field, expertise etc.',
          'Be yourself and as expressive as possible. The world and generations yet unborn will come here to dig from your knowledge.',
          'Every post you write here appears on the decentralized steem blockchain and can earn you rewards. Make the most of each post.',
          'Clients may visit your blogs to ascertain your reputation, before availing of your Gigs.'
        ]
      },
      surpassingRules: {
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
          this.portfolioImages.push(url)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    refreshSubCategory () {
      this.newGigRequest.subcategory = ''
    },
    morePics () {
      if (this.totalPics < 4) this.totalPics++
    },
    getTags (entries) {
      this.userTags = entries
    },
    trypics () {
      console.log(this.newGigRequest.portfolio)
    },
    async submit () {
      this.$store.commit('setLoading', true)
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
          price: 0,
          currency: 'SBD',
          authorPic: this.$store.state.profile.profileImage,
          category: 'surpassinggoogle',
          subcategory: this.slugify(this.$route.params.subcategory),
          type: 'steemgigs_surpassinggoogle',
          deleted: true,
          images: this.portfolioImages,
          generated: true
        }
        let username = this.$store.state.username
        let permlink = this.slugify(this.newGigRequest.title)
        let steemLink = this.htmlHide(`Visit <a href="https://steemgigs.org">https://steemgigs.org</a> now, to use it for free<br  />`)
        let steemGigsTag = this.htmlHide(`<i>This post was made on <a href="https://steemgigs.org/@${username}/${permlink}">STEEMGIGS Where everyone has something to offer</a></i>`)
        let body = this.previewData + steemLink + steemGigsTag
        let token = this.$store.state.accessToken
        let title = this.steemedTitle
        let liked = this.newGigRequest.liked
        let payoutType = this.newGigRequest.payoutType
        let upvoteRange = this.newGigRequest.upvoteRange
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
    getSubCategoryName () {
      var PageName = ''
      this.categories[4].subcategories.forEach((sub, index) => {
        if (this.slugify(sub.name) === this.$route.params.subcategory) {
          PageName = sub
        }
      })
      return PageName
    },
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
      return '#STEEMGIGS: ' + '(' + this.getSubCategoryName.name + ') — ' + this.newGigRequest.title
    },
    defaultTags () {
      let tags = ['steemgigs', 'surpassinggoogle', this.slugify(this.$route.params.subcategory)]
      if (this.newGigRequest.category) {
        tags.push(this.newGigRequest.category)
      }
      if (this.newGigRequest.subcategory) {
        tags.push(this.newGigRequest.subcategory)
      }
      return tags
    },
    previewData () {
      return `${this.newGigRequest.description}`
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
