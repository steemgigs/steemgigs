<template>
  <page :pageClasses="['post_new_steemgig__view', 'row']">
    <div class="description-section hide-on-med-and-down center"><span class="flow-text title">{{capitalize(getSubCategoryName.name)}}</span>
    <p v-text="getSubCategoryName.description"></p>
    </div>
    <ul class="sections hide-on-med-and-down center">
      <li v-for="(section, index) in sections" :key="index"><a v-text="section.replace('-title', capitalize(getSubCategoryName.name))" :class="{active: index === currentSection}" @click="switchTo(index)"></a></li>
    </ul>
    <div class="container" @keypress.tab="nextSection">
      <div class="col s12 m7 l9 row" >
        <form class=" row" v-if="currentSection === 0">
          <div class="container gigForm">
            <div class="mx-2">
              <p class="flow-text title">{{capitalize(getSubCategoryName.name)}}</p>
              <div class="input-field col s12">
            </div>
              <textarea @keypress.enter.prevent @input="search" @keyup.enter="''" v-model="newGigRequest.title" type="text" :placeholder="'SteemGigs(' + getSubCategoryName.name + ')'" row="2" maxlength="90" minlength="5" required>
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
                    <span class="card-title">Make your title concise simple to understand and specific to a particular niche, industry , field,
                    expertise etc.</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="input-field col s12">
              <vue-editor   useCustomImageHandler @imageAdded="handleImageAdded" v-model="newGigRequest.description" placeholder="Enter a detailed description for the gig" :upload="uploadConfig"></vue-editor>
              <div v-if="descError" class="col s12 my-3">
                <span class="simple-card">
                  <span class="red-text" v-text="descError" />
                </span>
              </div>
            </div>
            <div class="mx-2">
              <p class="flow-text title">Category</p>
              <div class="row">
                <div class="input-field col s12 m6 l4">
                  <select class="browser-default my-select category_select" @change="refreshSubCategory" v-model="newGigRequest.category">
                    <option value="" disabled selected>Select Category</option>
                    <option v-for="(category, index) in validCategories" :key="index" :value="category.name" v-text="category.name"></option>
                  </select>
                </div>
                <div class="input-field col s12 m6 l4" v-show="newGigRequest.category">
                  <select class="my-select browser-default subCategory_select" v-model="newGigRequest.subcategory">
                    <option value="" disabled selected>Select Subcategory</option>
                    <option v-for="(subcategory, index) in categories[selectedCategoryIndex].subcategories" :key="index" :value="subcategory.name" v-text="subcategory.name"></option>
                  </select>
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
                  <button class="right btn indigo waves-effect" @click.prevent="nextSection">Save and Proceed</button>
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
              <div class="card-content pt-0">
                <vue-markdown :source="previewData" />
              </div>
            </div>
            <div v-if="errorr" class="simple-card ">
              <p v-if="!validTitle" class="red-text mt-1 mb-0" v-text="'Title must be more than 5 characters'" />
              <p v-if="descError" class="red-text mt-1 mb-0" v-text="descError" />
              <p v-if="subcatError" class="red-text mt-1 mb-0" v-text="subcatError" />
            </div>
          </div>
          <div class="col s12 row">
            <button @click.prevent="prevSection" class="btn indigo accent-2 waves-effect">back</button>
            <button :disabled="Boolean(errorr)" class="right btn indigo waves-effect" @click.prevent="submit">
              <i class="fa fa-spinner fa-pulse" v-if="isPosting"></i>
              POST #STEEMGIGS
            </button>
            <p class="red-text" v-if="errorText">Error: {{ errorText }}</p>
            <p class="indigo-text" v-if="successText">{{ successText }}</p>
          </div>
        </div>
      </div>
    </div>
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
import { Carousel, Slide } from 'vue-carousel'

export default {
  components: {
    Page,
    CatNav,
    MarkdownEditor,
    VueMarkdown,
    Carousel,
    Slide,
    ImgUpload,
    VueEditor
  },
  data () {
    return {
      totalPics: 1,
      portfolioImages: [],
      PageDescription: '',
      newGigRequest: this.$store.state.newPosts.surpassinggoogle,
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
        let steemGigsTag = this.htmlHide(`
  <i>this post was made on <a href="https://steemgigs.org/@${username}/${permlink}">STEEMGIGS Where everyone has something to offer</a></i>
        `)
        let body = this.previewData + steemLink + steemGigsTag
        let token = this.$store.state.accessToken
        let title = this.steemedTitle
        if (this.duplicateTitle) {
          let modifiedTitle = this.newGigRequest.title + Math.floor(Math.random() * 1000)
          permlink = this.slugify(modifiedTitle)
          title = '#STEEMGIGS: ' + '(' + this.getSubCategoryName.name + ') — ' + modifiedTitle.replace('#STEEMGIGS:', ' ') // this will prevent title for not showing on the gigcard due to duplicated '#STEEMGIGS:' string
        }
        let liked = this.newGigRequest.liked
        let upvoteRange = this.newGigRequest.upvoteRange
        // sc2.setAccessToken(this.$store.state.accessToken)
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
          that.$store.commit('RESET_NEW_SURPASSINGGOOGLE')
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
      if (this.newGigRequest.title.length > 0) {
      } else {
        return `90 Characters`
      }
    },
    steemedTitle () {
      return '#STEEMGIGS: ' + '(' + this.getSubCategoryName.name + ') — ' + this.newGigRequest.title
    },
    defaultTags () {
      return ['surpassinggoogle', 'steemgigs', this.slugify(this.$route.params.subcategory), this.slugify(this.newGigRequest.category), this.slugify(this.newGigRequest.subcategory)]
    },
    previewData () {
      return `
${this.newGigRequest.description}
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
