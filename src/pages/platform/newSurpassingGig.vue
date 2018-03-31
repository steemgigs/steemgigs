<template>
  <page :pageClasses="['post_new_steemgig__view', 'row']">
    <div class="description-section hide-on-med-and-down center"><span class="flow-text title">{{capitalize(getSubCategoryName.name)}}</span>
    <p v-text="getSubCategoryName.description"></p>
    </div>
    <ul class="sections hide-on-med-and-down center">
      <li v-for="(section, index) in sections" :key="index"><a v-text="section.replace('-title', capitalize(getSubCategoryName.name))" :class="{active: index === currentSection}" @click="switchTo(index)"></a></li>
    </ul>
    <dismissible-notice>
      <span>Oh you didn't find your gig! Post a custom request below</span>
    </dismissible-notice>
    <div class="container" @keypress.tab="nextSection">
      <div class="col s12 m7 l9 row" >
        <form class="card-panel row" v-if="currentSection === 0">
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
            <div v-if="errorr" class="simple-card card-panel">
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
// import sc2 from '@/services/sc2'
import Page from '@/components/page'
import CatNav from '@/components/layout/catNav'
import ImgUpload from '@/components/snippets/imgUpload'
import DismissibleNotice from '@/components/snippets/dismissibleNotice'
import { MarkdownEditor } from 'markdown-it-editor'
import VueMarkdown from 'vue-markdown'
import { VueEditor } from 'vue2-editor'
// import Steem from 'steem'
import { Carousel, Slide } from 'vue-carousel'
import SliderRange from 'vue-slider-component'
import debounce from '@/plugins/debounce'
import InputTag from 'vue-input-tag'

export default {
  components: {
    Page,
    CatNav,
    MarkdownEditor,
    VueMarkdown,
    Carousel,
    Slide,
    ImgUpload,
    VueEditor,
    InputTag,
    DismissibleNotice,
    SliderRange
  },
  data () {
    return {
      successText: '',
      errorText: '',
      isPosting: false,
      sections: ['Create a -title (POST)', 'Publish'],
      currentSection: 0,
      totalPics: 1,
      portfolioImages: [],
      PageDescription: '',
      userTags: [],
      nextPressed: false,
      duplicateTitle: '',
      checkingTitle: false,
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
    search: debounce(function () {
      this.checkingTitle = true
      let searchTerm = this.steemedTitle
      console.log('search term:', searchTerm)
      Api.checkTitleExistence({username: this.$store.state.username, title: this.steemedTitle}).then(result => {
        this.checkingTitle = false
        this.duplicateTitle = result.data
        console.log(result)
      }).catch(e => {
        this.checkingTitle = false
        this.errorText = 'there was an error with search'
        console.log('error:', e)
      })
    }, 1000),
    tryoutput () {
      console.log(this.$route.params.subcategory)
    },
    vote () {
      if (!this.newGigRequest.liked) {
        this.newGigRequest.liked = true
      } else {
        this.newGigRequest.liked = false
      }
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
          // this.portfolioImages.push(url)
          // this.newGigRequest.portfolio = this.portfolioImages
        })
        .catch((err) => {
          console.log(err)
        })
    },
    switchTo (index) {
      this.nextPressed = true
      this.currentSection = index
    },
    nextSection () {
      this.nextPressed = true
      if (this.currentSection < this.sections.length) this.currentSection++
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
        let steemGigsTag = this.htmlHide(`
  <i>this post was made on <a href="https://steemgigs.org/@${username}/${permlink}">STEEMGIGS Where everyone has something to offer</a></i>
        `)
        let body = this.previewData + steemGigsTag
        let token = this.$store.state.accessToken
        let title = this.steemedTitle
        if (this.duplicateTitle) {
          let modifiedTitle = this.newGigRequest.title + Math.floor(Math.random() * 1000)
          permlink = this.slugify(modifiedTitle)
          title = '#STEEMGIGS: ' + modifiedTitle
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
  watch: {
    newGigRequest: {
      handler (val) { this.$store.commit('SET_NEW_SURPASSINGGOOGLE', val) },
      deep: true
    }
  },
  computed: {
    validTitle () {
      if (this.newGigRequest.title.length > 5 && this.checkingTitle) {
        return 'Wait a sec...'
      } else if (this.newGigRequest.title.length > 5) {
        return 'Title is valid, your\'re cool!'
      } else {
        return ''
      }
    },
    getSubCategoryName () {
      var PageName = ''
      this.categories[4].subcategories.forEach((sub, index) => {
        if (this.slugify(sub.name) === this.$route.params.subcategory) {
          PageName = sub
        }
      })
      return PageName
    },
    validCategories () {
      return this.categories.filter(function (c) {
        if (c.name !== 'surpassing google') {
          return c.name
        }
      })
    },
    descError () {
      if (this.nextPressed && this.newGigRequest.description.length < 300) {
        return 'Your description should be 300 Characters or more, please read style guide for clarification'
      } else {
        return ''
      }
    },
    subcatError () {
      if (!this.newGigRequest.subcategory) {
        return 'You must select a category/subcategory'
      } else {
        return ''
      }
    },
    errorr () {
      return this.descError || this.subcatError || !this.validTitle
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
      return '#STEEMGIGS: ' + this.newGigRequest.title
    },
    defaultTags () {
      return ['steemgigs', 'surpassinggoogle', this.slugify(this.$route.params.subcategory), this.slugify(this.newGigRequest.category), this.slugify(this.newGigRequest.subcategory)]
    },
    previewData () {
      return `<h2 class="headline">Description</h2>
<hr />
${this.newGigRequest.description}

<h5>Price: FREE</h5>

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
form .input-field {
  position: relative;
}
select.my-select {
  width: initial !important;
  pointer-events: initial !important;
  height: 2.5em !important;
  min-width: 10em;
  position: static;
  opacity: 1 !important;
}
.description-section
{
  background: white;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #f8f8f8;
  top: 50px;
  position: fixed;
  height: 120px;
  width: 100%;
  z-index: 3;
},
.sections {
  background: white;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #f8f8f8;
  top: 150px;
  position: fixed;
  width: 100%;
  z-index: 2;
  li {
    &:not(:first-child) {
      &>a::before {
        font-family: "Ionicons";
        content: "\f125";
        position: absolute;
        left: -0.5em;
      }
    }
    display: inline-block;
    position: relative;
    &:first-child>a::before {
      content: ''
    }
    a {
      padding: 15.5px 1em;
      line-height: 50px;
      font-weight: 500;
      color: #757575;
      cursor: pointer;
      margin-left: 1em;
      position: relative;
      box-sizing: border-box;
      transition: all ease-in-out .3s;
      &.active, &:hover {
        color: black;
        font-weight: 500;
      }
      &::after, &.active::after {
        content: ' ';
        height: 2px;
        width: 0%;
        background: black;
        display: inline-block;
        position: absolute;
        left: 0;
        bottom: 0;
        transition: all ease-in-out .3s;
      }
      &:hover::after, &.active::after {
        width: 100%;
      }
      &.active::after {
        height: 1px;
      }
      &:hover::after {
        height: 2px;
      }
    }
  }
}
.container {
  min-width: 95%;
  padding-top: 1.5em;
  &>.col>.card {
    // padding: 1em;
    padding-bottom: 40px;
  }
}
// .input-field>label:not(.label-icon).active {
//     -webkit-transform: translateY(-14px) scale(0.8);
//     transform: translateY(-14px) translateX(-38px) scale(1);
//     -webkit-transform-origin: 0 0;
//     transform-origin: 0 0;
//     color: black;
// }
.input-field {
  margin-bottom: 1em;
}
p {
  &.title {
    color: #757575;
    margin-bottom: 0;
    margin-top: 0
  }
  &.sub-title {
    margin-left: 2rem;
    color: rgb(119, 85, 143);
  }
}
.select-wrapper {
  position: relative;
  outline: 0px solid;
  border: 1px solid #BDBDBD;
  margin-left: -0.5em;
  padding-left: 5px;
  input.select-dropdown {
    margin-bottom: 0;
  }
}
.gigForm {
  position: relative;
  .title-before {
    position: absolute;
    color: #757575;
    top: 0.9px;
    left: 0.6em;
    font-size: 28px;
  }
  textarea {
    font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    line-height: 41.5px;
    font-size: 28px;
    padding: 10px;
    min-height: 3.5em;
    resize: none;
    color: #757575;
    overflow-y: auto;
    border: 2px solid #bdbdbd5e;
    box-sizing: border-box;
    border-radius: 4px;
    &:focus {
      border: 2px solid #9FA8DA;
      outline: 0px solid;
    }
  }
}
.word-count {
  margin-top: 0;
}
.form-navs {
  display: block;
  margin-top: 5em;
  button {
    line-height: 3px;
    text-transform: initial;
    font-weight: 500;
  }
}
.tutorial_guide {
  position: absolute;
  right: -28vw;
  width: 23.5vw;
  top: 0em;
  &::before {
    content: ' ';
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #FFFFFC;
    position: absolute;
    left: -10px;
    top: 45%;
    z-index: 3;
    box-shadow: 0px 0px 0px black;
  }
  .card-content {
    p {
      display: list-item;
      margin-left: 1em;
    }
  }
}
.push-down {
  margin-top: 4.2em;
}
button.addPic {
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
}
</style>
