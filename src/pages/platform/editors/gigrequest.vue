<template>
  <page :pageClasses="['post_new_steemgig__view', 'row']">
    <ul class="sections hide-on-med-and-down center">
      <li v-for="(section, index) in sections" :key="index"><a v-text="section" :class="{active: index === currentSection}" @click="switchTo(index)"></a></li>
    </ul>
    <el-main>
    <div class="container" @keypress.tab="nextSection">
          <dismissible-notice>
      <span>Oh you didn't find your gig! Post a custom request below</span>
    </dismissible-notice>
      <div class="col s12 m7 l9 row editor-container" >
        <form v-if="currentSection === 0">
          <div class="container gigForm">
            <div class="mx-2">
              <p class="flow-text title">Custom Request</p>
              <div class="input-field col s12">
            </div>
              <textarea @keypress.enter.prevent @input="search" @keyup.enter="''" v-model="newGigRequest.title" type="text" placeholder="Give a title to this custom request" row="2" maxlength="90" minlength="5" required>
              </textarea>
              <p class="word-count right" v-text="wordCount"></p>
              <div v-if="newGigRequest.title.length > 5" class="col s12 mb-2">
                <span class="simple-card">
                  <span v-if="duplicateTitle" class="green-text">You have already used this <router-link :to="`/@${$store.state.username}/${duplicateTitle.permlink}`" target="_blank">title</router-link>, you can still choose to proceed</span>
                  <span v-if="!duplicateTitle" class="green-text" v-text="validTitle" />
                </span>
              </div>
              <div class="tutorial_guide center-align">
                <div class="card">
                  <div class="card-content">
                    <span class="card-title">Make your Title Short, Simple and Clear to understand</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="input-field col s12">
              <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="newGigRequest.description" placeholder="Enter a detailed description for the gig" :upload="uploadConfig"></vue-editor>
              <div v-if="descError" class="col s12 my-3">
                <span class="simple-card">
                  <span class="red-text" v-text="descError" />
                </span>
              </div>
              <div class="tutorial_guide center-align">
                <div class="card">
                  <div class="card-content">
                    <span class="card-title">Give a detailed description of what you are looking for</span>
                    <p>How much are you willing to pay for this gig? etc. State these and other information clearly</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="mx-2">
              <p class="flow-text title">Category</p>
              <div class="row">
                <div class="input-field col s12 m6 l4">
                  <select class="browser-default my-select category_select" @change="refreshSubCategory" v-model="newGigRequest.category">
                    <option value="" disabled selected>Select Category</option>
                    <option v-if="category.name != 'SurpassingGoogle'" v-for="(category, index) in categories" :key="index" :value="category.name" v-text="category.name"></option>
                  </select>
                </div>
                <div class="input-field col s12 m6 l4" v-show="newGigRequest.category">
                  <select class="my-select browser-default subCategory_select" v-model="newGigRequest.subcategory">
                    <option value="" disabled selected>Select Subcategory</option>
                    <option v-for="(subcategory, index) in categories[selectedCategoryIndex].subcategories" :key="index" :value="subcategory.name" v-text="subcategory.name"></option>
                  </select>
                </div>
              </div>
              <p class="flow-text title">How soon do you want your order delivered?</p>
              <div class="row">
                <div class="input-field col s12 m3">
                  <select class="browser-default my-select category_select" v-model="newGigRequest.days">
                    <option value="0">Less than a day</option>
                    <option v-for="(day, index) in 30" :key="index" :value="day">{{ day }} day(s)</option>
                  </select>
                </div>
                <div class="input-field col s12 m3">
                  <select class="browser-default my-select category_select" v-model="newGigRequest.hours">
                    <option value="0">Less than an Hour</option>
                    <option v-for="(hour, index) in 24" :key="index" :value="hour">{{ hour }} hours(s)</option>
                  </select>
                </div>
              </div>
              <p class="flow-text title">What is your maximum budget? (Optional)</p>
              <div class="row">
                <div class="input-field col s12 m3">
                  <select class="browser-default my-select category_select" v-model="newGigRequest.currency">
                    <option value="" disabled selected>currency</option>
                    <option>STEEM</option>
                    <option>SBD</option>
                    <option>SP</option>
                  </select>
                </div>
                <div class="input-field col s12 m3">
                  <input type="number" v-model="newGigRequest.price" class="price" placeholder="price">
                </div>
              </div>
              <div class="input-field col s12 m6 row">
                <div class="col s5">
                  <p>
                    <label>
                      <input type="checkbox" :checked="newGigRequest.liked ? 'checked' : ''" v-model="newGigRequest.liked" />
                      <span>Like your post</span>
                    </label>
                  </p>
                </div>
                <div class="col s7 mt-4">
                  <slider-range v-if="newGigRequest.liked" :min="1" v-model="newGigRequest.upvoteRange" />
                </div>
              </div>
              <div class="col input-field s12">
                <input-tag limit="3" :read-only="true" :tags="defaultTags" />
                <input-tag limit="2" class="editable" placeholder="add tags" @update:tags="getTags" :tags="userTags" />
              </div>
              <div class="col s12 row">
                  <el-button type="primary" class="right primary waves-effect" @click.prevent="nextSection">Next</el-button>
              </div>
            </div>
          </div>
        </form>
        <div class="row" v-if="currentSection === 1">
          <div class="col s12 preview">
            <div class="card">
              <div class="card-content">
                <span class="card-title"> {{ steemedTitle }}</span>
                <p><span>{{ this.newGigRequest.category }}</span> / <span>{{ this.newGigRequest.subcategory }}</span></p>
              </div>
              <!-- <div class="card-image">
                <carousel :navigationEnabled="false" :autoplay="true" :autoplayHoverPause="true" :perPage="1">
                  <slide v-for="(image, index) in newGigRequest.portfolio" :key="index">
                    <img :src="image" class="responsive-img" :alt="newGigRequest.title">
                  </slide>
                </carousel>
              </div> -->
              <div class="card-content pt-0">
                <vue-markdown :source="previewData" />
              </div>
            </div>
            <div class="tutorial_guide hide-on-small-only">
              <div class="card">
                <div class="card-content">
                  <span class="card-title">How Nice?</span>
                  <p class="mt-1">Take a look at your Steemgigs Post to see if you have made errors</p>
                  <p class="mt-1">If error free, hit "publish", else, correct errors</p>
                  <p class="mt-1">Note: Your post will also appear on the Steem Blockchain</p>
                </div>
              </div>
            </div>
            <div v-if="errorr" class="simple-card">
              <p v-if="!validTitle" class="red-text mt-1 mb-0" v-text="'Title must be more than 5 characters'" />
              <p v-if="descError" class="red-text mt-1 mb-0" v-text="descError" />
              <p v-if="subcatError" class="red-text mt-1 mb-0" v-text="subcatError" />
            </div>
          </div>
          <div class="col s12 row">
            <el-button type="secondary" @click.prevent="prevSection" class="secondary waves-effect">Back</el-button>
            <el-button :disabled="Boolean(errorr)" type="primary" class="right waves-effect primary" @click.prevent="submit">
              <i class="fa fa-spinner fa-pulse" v-if="isPosting"></i>
              POST #STEEMGIG
            </el-button>
            <p class="red-text" v-if="errorText">Error: {{ errorText }}</p>
            <p class="indigo-text" v-if="successText">{{ successText }}</p>
          </div>
        </div>
      </div>
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
import debounce from '@/plugins/debounce'
import Util from '@/services/util'

export default {
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
      userTags: [],
      nextPressed: false,
      duplicateTitle: '',
      checkingTitle: false,
      newGigRequest: this.$store.state.newPosts.gigrequest,
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
      if (this.newGigRequest.title.length > 0) {
      } else {
        return `90 Characters`
      }
    },
    steemedTitle () {
      return '#STEEMGIGS: ' + this.newGigRequest.title
    },
    defaultTags () {
      return ['steemgigs', this.slugify(this.newGigRequest.category), this.slugify(this.newGigRequest.subcategory)]
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

<style lang="scss" scoped>

</style>
