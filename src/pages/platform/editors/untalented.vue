<template>
  <page :pageClasses="['post_new_steemgig__view', 'row']">
    <el-main>
      <h3>Create new Untalented</h3>
      <h5>Not an expert yet? No worries! On SteemGigs, you can hone your expertise while offering a service.</h5>
      <el-row :gutter="15">
      <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
      <div class="form-container">
        <el-form :model="untalented" :rules="untalentedRules" ref="untalented" label-position="top">
          <!--  Title -->
          <el-form-item label="Title" prop="title">
            <el-input v-model="untalented.title"></el-input>
          </el-form-item>
          <!-- Body -->
          <el-form-item label="Description" prop="description">
            <vue-editor v-model="untalented.description" placeholder="Type your post here" :upload="uploadConfig" />
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
            <el-button class="primary" type="primary" @click="submitForm('untalented')">Create</el-button>
            <el-button @click="resetForm('untalented')">Reset</el-button>
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
import ImgUpload from '@/components/snippets/imgUpload'
import DismissibleNotice from '@/components/snippets/dismissibleNotice'
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
    MarkdownEditor,
    VueMarkdown,
    ImgUpload,
    VueEditor,
    DismissibleNotice,
    guide
  },
  data () {
    return {
      untalented: {
        title: '',
        description: '',
        images: []
      },
      defaultTags: ['untalented'],
      sections: ['Create a steemit post', 'Publish'],
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['image', 'code-block']
      ],
      uploadConfig: {
        name: 'file',
        accept: 'image/jpg,image/jpeg,image/png',
        url: this.$imgUploadURL
      },
      guide: {
        header: 'Tell us what you love',
        subheader: 'Have you had a great experience with Steem Gigs? Share it with the world!',
        video: 'xeLYLA6C2AE',
        items: [
          'For Clients Were you delighted with the service of the SteemGigger who rendered your service? Tell us! Note: You can earn steem rewards by writing a SteemGIG testimonial as it we look to support it and it appears on the steem blockchain as well',
          'Give a detailed description about what your GIG was about',
          'You can document "the process" e.g if it is a logo, you can decide to put samples in your post for further transparency',
          'You can explain your general experiences with clients e.g "was payment prompt"; "was communication easy"; "would you love future relationships" etc'
        ]
      },
      untalentedRules: {
        title: [
          { required: true, message: 'Please enter a post title', trigger: 'blur' },
          { min: 5, message: 'Your title should be at least 5 characters', trigger: 'blur' }
        ],
        description: [
          { required: true, message: 'Please enter a post description', trigger: 'blur' },
          { min: 300, message: 'Your description should be 300 Characters or more, please read style guide for clarification', trigger: 'blur' }
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
          type: 'steemgigs_untalented',
          deleted: false
          // images: this.untalented.portfolio,
        }
        let username = this.$store.state.username
        let permlink = this.slugify(this.untalented.title)
        let steemGigsTag = this.htmlHide(`
  <i>this post was made on <a href="https://steemgigs.org/@${username}/${permlink}">STEEMGIGS Where everyone has something to offer</a></i>
        `)
        let body = this.previewData + steemGigsTag
        let token = this.$store.state.accessToken
        let title = this.steemedTitle
        if (this.duplicateTitle) {
          let modifiedTitle = this.untalented.title + Math.floor(Math.random() * 1000)
          permlink = this.slugify(modifiedTitle)
          title = '#STEEMGIGS: I will ' + modifiedTitle
        }
        let liked = this.untalented.liked
        let upvoteRange = this.untalented.upvoteRange

        const imagesFromBody = Util.getImagesFromBody(this.previewData)
        if (imagesFromBody.length) {
          jsonMetadata['images'] = imagesFromBody
        }

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
          that.$store.commit('RESET_NEW_UNTALENTED')
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
      if (this.untalented.title.length > 0) {
        return `${this.untalented.title.length} of 90 Characters`
      } else {
        return `90 Characters`
      }
    },
    steemedTitle () {
      return this.untalented.title
    },
    previewData () {
      return `<h2 class="headline">Description</h2>
<hr />
${Util.convertImageUrlToHTML(this.untalented.description)}
      `
    }
  },
  mounted () {
    this.$eventBus.$on('img-uploaded', payload => {
      console.log(payload)
      this.untalented.portfolio[payload.index] = payload.url
    })
  },
  deforeDestroy () {
    this.$eventBus.$off('img-uploaded')
  }
}
</script>
