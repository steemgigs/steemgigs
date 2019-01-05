<template>
  <page :pageClasses="['post_new_steemgig__view', 'row']">
    <el-main>
       <h3>Create new Testimonial</h3>
      <h5>Share your overall SteemGigs experience with us. So, why not record your service progress & updates, successful deliveries, shout-outs, payments etc using this editor.</h5>
      <el-row :gutter="10">
      <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
      <div class="form-container">
        <el-form :model="newTestimonial" :rules="testimonialRules" ref="newTestimonial" label-position="top">
          <!--  Title -->
          <el-form-item label="Title" prop="title">
            <el-input v-model="newTestimonial.title"></el-input>
          </el-form-item>
          <!-- Body -->
          <el-form-item label="Description" prop="description">
            <vue-editor v-model="newTestimonial.description" placeholder="Type your post here" :upload="uploadConfig" />
          </el-form-item>
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
            <el-button class="primary" type="primary" @click="submitForm('newTestimonial')">Create</el-button>
            <el-button @click="resetForm('newTestimonial')">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <guide :header="guide.header" :subHeader="guide.subheader" :itemList="guide.items"></guide>
      </el-col>
      </el-row>
    </el-main>
  </page>
</template>

<script>
import Api from '@/services/api'
import Page from '@/components/page'
import CatNav from '@/components/layout/catNav'
import ImgUpload from '@/components/snippets/imgUpload'
import { MarkdownEditor } from 'markdown-it-editor'
import VueMarkdown from 'vue-markdown'
import { VueEditor } from 'vue2-editor'
import Util from '@/services/util'
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
      sections: ['Post a Testimonial', 'Publish'],
      totalPics: 1,
      nextPressed: false,
      defaultTags: ['steemgigs', 'steemgigs-testimonial'],
      newTestimonial: {
        title: '',
        description: '',
        images: [],
        upvoteRange: 100,
        liked: false
      },
      guide: {
        header: 'Hello World',
        subheader: 'Goodbye',
        items: [
          'Make your title short, describing exactly what service(s) you offer as this is the likeliest way to boost viewership, potential & eventual sales',
          'Select the most accurately describing category and subcategory',
          'Choose the best follow up tags',
          'Be as expressive as possible as this is your chance to tell postential clients and steemians what you offer, why you gig is special and why they should give you opportunities etc.',
          'Give your PACKAGE an appealing name.',
          'Tell us if you are willing to do revisions. If so, "how many revisions?"; "will it cost extra?" etc',
          'Are there aspects of your GIG that you are will to offering lovingly for free etc?',
          'Tell them if your "requirements" are optional or compulsory.'
        ]
      },
      testimonialRules: {
        title: [
          { required: true, message: 'Please enter a post title', trigger: 'blur' },
          { min: 5, message: 'Your title should be at least 5 characters', trigger: 'blur' }
        ],
        description: [
          { required: true, message: 'Please enter a post description', trigger: 'blur' },
          { min: 300, message: 'Your description should be 300 Characters or more, please read style guide for clarification', trigger: 'blur' }
        ]
      },
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
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
          authorPic: this.$store.state.profile.profileImage,
          type: 'steemgigs_testimonial',
          deleted: false,
          // images: this.newTestimonial.portfolio,
          generated: true
        }
        let username = this.$store.state.username
        let permlink = this.slugify(this.newTestimonial.title)
        let steemGigsTag = this.htmlHide(`
  <i>this post was made on <a href="https://steemgigs.org/@${username}/${permlink}">STEEMGIGS Where everyone has something to offer</a></i>
        `)
        let body = this.newTestimonial.description + steemGigsTag
        let title = this.steemedTitle
        if (this.duplicateTitle) {
          let modifiedTitle = this.newTestimonial.title + Math.floor(Math.random() * 1000)
          permlink = this.slugify(modifiedTitle)
          title = '#STEEMGIGS: I will ' + modifiedTitle
        }
        let token = this.$store.state.accessToken
        let liked = this.newTestimonial.liked
        let upvoteRange = this.newTestimonial.upvoteRange

        const imagesFromBody = Util.getImagesFromBody(this.previewData)
        if (imagesFromBody.length) {
          jsonMetadata['images'] = imagesFromBody
        }

        // username, permlink, title, body, jsonMetadata, token
        Api.post({username, permlink, title, body, jsonMetadata, liked, upvoteRange}, token).then((err, res) => {
          console.log(err, res)
          that.isPosting = false
          this.$notify({
            group: 'foo',
            title: 'Success',
            text: 'Successfully pushed to steem!',
            type: 'success'
          })
          that.successText = 'Successfully pushed to steem!'
          that.$store.commit('RESET_NEW_TESTIMONIAL')
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
    wordCount () {
      if (this.newTestimonial.title.length > 0) {
      } else {
        return `90 Characters`
      }
    },
    steemedTitle () {
      return '#STEEMGIGS: ' + this.newTestimonial.title
    },
    previewData () {
      return `<h2 class="headline">Description</h2>
<hr />
${Util.convertImageUrlToHTML(this.newTestimonial.description)}
      `
    }
  },
  mounted () {
    this.$eventBus.$on('img-uploaded', payload => {
    //   console.log(payload)
    //   this.newTestimonial.portfolio[payload.index] = payload.url
    })
  },
  deforeDestroy () {
    this.$eventBus.$off('img-uploaded')
  }
}
</script>
