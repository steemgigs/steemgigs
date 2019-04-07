<template>
  <page :pageClasses="['post_new_steemgig__view', 'row']">
    <el-main>
      <h3>Create A New #untalented Post</h3>
      <h5>Not an expert yet? No worries! On SteemGigs, you can hone your expertise while offering a service.</h5>
      <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
      <div class="form-container">
        <el-form :model="untalented" :rules="untalentedRules" ref="untalented" label-position="top">
          <!--  Title -->
          <el-form-item label="Title" prop="title">
            <el-input v-model="untalented.title"><template slot="prepend">{{ editorPrefix }}</template></el-input>
          </el-form-item>
          <!-- Body -->
          <el-form-item label="Description" prop="description">
            <vue-editor v-model="untalented.description" placeholder="Type your post here" :upload="uploadConfig" />
          </el-form-item>
          <!-- Payout Type -->
          <el-form-item label="Reward" prop="payoutType">
            <el-select class="browser-default my-select category_select" v-model="untalented.payoutType">
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
            <el-button  type="primary" @click="submitForm('untalented')">Create</el-button>
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
      editorPrefix: '#STEEMGIGS (Un(talented):',
      untalented: {
        title: '',
        description: '',
        images: [],
        payoutType: '50/50'
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
        header: 'Create A Great Un(dis)talented Post',
        subheader: 'This editor can be used by any steemian to create posts in any genre or tag.',
        video: 'xeLYLA6C2AE',
        items: [
          'Make your title short and simple to understand',
          'Give us a preface of what your post will entail.',
          'If you are using resources from the internet, digest it first, then tell us about it, using your own words.',
          'Be expressive. Relegate reservations. Flaws allowed (The more pictures, words etc, the more exciting).',
          'To conclude your post, ask us questions, make us think, aim to truly touch us with your beauty.',
          'You have an audience in the search engines as well, so aim to touch them too.',
          'Make sure to state the source-URL of every image that you have resourced online. No loss, if you always give credit.'
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
          type: 'steemgigs_untalented',
          deleted: false
        }
        let username = this.$store.state.username
        let permlink = this.slugify(this.untalented.title)
        let steemGigsTag = this.htmlHide(`<i>This post was made on <a href="https://steemgigs.org/@${username}/${permlink}">STEEMGIGS Where everyone has something to offer</a></i>`)
        let body = this.previewData + steemGigsTag
        let token = this.$store.state.accessToken
        let title = this.steemedTitle
        let liked = this.untalented.liked
        let upvoteRange = this.untalented.upvoteRange
        let payoutType = this.untalented.payoutType

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
          this.removeDraft('untalented')
          // Push user to post upon success, the permlink must be set from the API because it can be changed in the API if it's a duplicated permlink
          this.$router.push(`steemgigs/@${username}/${result.data.permlink}`)
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
    wordCount () {
      if (this.untalented.title.length > 0) {
        return `${this.untalented.title.length} of 90 Characters`
      } else {
        return `90 Characters`
      }
    },
    steemedTitle () {
      return this.editorPrefix + ' ' + this.untalented.title
    },
    previewData () {
      return `<h2 class="headline">Description</h2><hr />${Util.convertImageUrlToHTML(this.untalented.description)}`
    }
  },
  watch: {
    'untalented': {
      handler: function () {
        this.saveDraft('untalented', this.untalented)
      },
      deep: true
    }
  },
  mounted () {
    // Get draft from local storage using mixin
    const draft = this.getDrafts('untalented')
    if (draft) {
      this.untalented = draft
    }
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
