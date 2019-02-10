<template>
  <page :pageClasses="['post_new_steemgig__view', 'row']">
    <el-main>
       <h3>Create A New Testimonial</h3>
      <h5>Share your overall SteemGigs-experience with us. Why not record your service progress &amp; updates, successful deliveries, shout-outs, successful payments etc using this editor.</h5>
      <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
      <div class="form-container">
        <el-form :model="newTestimonial" :rules="testimonialRules" ref="newTestimonial" label-position="top">
          <!--  Title -->
          <el-form-item label="Title" prop="title">
            <el-input v-model="newTestimonial.title"><template slot="prepend">{{ editorPrefix }}</template></el-input>
          </el-form-item>
          <!-- Body -->
          <el-form-item label="Description" prop="description">
            <vue-editor v-model="newTestimonial.description" placeholder="Type your post here" :upload="uploadConfig" />
          </el-form-item>
          <!-- Payout Type -->
          <el-form-item label="Reward" prop="payoutType">
            <el-select class="browser-default my-select category_select" v-model="newTestimonial.payoutType">
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
            <el-tag v-for="(userTag) in userTags" :key="userTag" closable @close="handleClose(userTag)"> {{ userTag }} </el-tag>
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
        <guide :header="guide.header" :subHeader="guide.subheader" :itemList="guide.items" :videoId="guide.video"></guide>
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
      editorPrefix: '#STEEMGIGS (Testimonials):',
      sections: ['Post a Testimonial', 'Publish'],
      totalPics: 1,
      nextPressed: false,
      defaultTags: ['steemgigs', 'steemgigs-testimonial'],
      newTestimonial: {
        title: '',
        description: '',
        images: [],
        payoutType: '50/50'
      },
      guide: {
        header: 'Tell Us Everything',
        subheader: 'Have you had a great experience with SteemGigs? Share it with the world!',
        video: 'xeLYLA6C2AE',
        items: [
          'For Clients: Were you delighted with the service of the SteemGigger who rendered your service? Tell us!',
          'For Clients: You can decide to discuss in a post, your overall experience on Steemgigs, including suggestions, feedback, dispute etc',
          'For SteemGigger: You can document \'the process\' in a post e.g if it is a logo, you can decide to put progress-samples in your post for further transparency',
          'For SteemGigger: You can explain your general experiences with clients e.g \'was payment prompt\';, \'was communication easy\'; \'would you love future relationships\' etc',
          'Notice: Note: You can earn steem rewards by writing a SteemGig-testimonial as it appears as post on the steem blockchain, subject to curation by our community'
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
  watch: {
    'newTestimonial': {
      handler: function () {
        this.saveDraft('testimonial', this.newTestimonial)
      },
      deep: true
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
          authorPic: this.$store.state.profile.profileImage,
          type: 'steemgigs_testimonial',
          deleted: false,
          generated: true
        }
        let username = this.$store.state.username
        let permlink = this.slugify(this.newTestimonial.title)
        let steemGigsTag = this.htmlHide(`<i>This post was made on <a href="https://steemgigs.org/@${username}/${permlink}">STEEMGIGS Where everyone has something to offer</a></i>`)
        let body = this.newTestimonial.description + steemGigsTag
        let title = this.steemedTitle
        let token = this.$store.state.accessToken
        let liked = this.newTestimonial.liked
        let upvoteRange = this.newTestimonial.upvoteRange
        let payoutType = this.newTestimonial.payoutType

        const imagesFromBody = Util.getImagesFromBody(this.previewData)
        if (imagesFromBody.length) {
          jsonMetadata['images'] = imagesFromBody
        }

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
          this.removeDraft('testimonial')
          // Push user to post upon success, the permlink must be set from the API because it can be changed in the API if it's a duplicated permlink
          this.$router.push(`/@${username}/${result.data.permlink}`)
        } catch (err) {
          that.isPosting = false
          this.$notify.error({
            title: 'Error',
            message: `Sorry, there seems to have been an error. Error Details - ${err}`
          })
          this.$store.commit('setLoading', false)
        }
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
      return this.editorPrefix + ' ' + this.newTestimonial.title
    },
    previewData () {
      return `<h2 class="headline">Description</h2><hr />${Util.convertImageUrlToHTML(this.newTestimonial.description)}`
    }
  },
  mounted () {
    // Get draft from local storage using mixin
    const draft = this.getDrafts('testimonial')
    if (draft) {
      this.newTestimonial = draft
    }
    this.$eventBus.$on('img-uploaded', payload => {
    })
  },
  deforeDestroy () {
    this.$eventBus.$off('img-uploaded')
  }
}
</script>
