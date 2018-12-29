<template>
  <page :pageClasses="['post_new_steemgig__view', 'row']">
    <ul class="sections hide-on-med-and-down center">
      <li v-for="(section, index) in sections" :key="index"><a v-text="section" :class="{active: index === currentSection}" @click="switchTo(index)"></a></li>
    </ul>
    <el-main>
    <div class="container" @keypress.tab="nextSection">
      <dismissible-notice>
      <span>The steemgigs testimonial editor can be used by both steemgigan and steemian client over the course of a successful transaction and will appear as full blown blog posts both on steemgigs.org and steemit for potential rewards. Both parties can earn additional rewards from writing steemgigs testimonials as not only does it increase the reputation of both parties but it creates values as post, creates transparency and promotes steem in the search engine and also as a blockchain where "where everyone is a reputable/talented brother"</span>
      </dismissible-notice>
      <div class="col s12 m7 l9 row editor-container" >
        <form v-if="currentSection === 0">
          <div class="container gigForm">
            <!-- <p class="sub-title">Oh you didn't find your gig! Post a custom request below</p> -->
            <div class="mx-2">
              <p class="flow-text title">Title</p>
              <div class="input-field col s12">
            </div>
              <textarea @keypress.enter.prevent @keyup.enter="''" @input="search" v-model="newTestimonial.title" type="text" placeholder="Give a title to this testimonial" row="2" maxlength="90" minlength="5" required>
              </textarea>
              <p class="word-count right" v-text="wordCount"></p>
              <div v-if="newTestimonial.title.length > 5" class="col s12 mb-2">
                <span class="simple-card">
                  <span v-if="duplicateTitle" class="green-text">You have already used this <router-link :to="`/@${$store.state.username}/${duplicateTitle.permlink}`" target="_blank">title</router-link>, you can still choose to proceed</span>
                  <span v-if="!duplicateTitle" class="green-text" v-text="validTitle" />
                </span>
              </div>
              <div class="tutorial_guide center-align hide-on-small-only">
                <div class="card">
                  <div class="card-content">
                    <!-- <span class="card-title">How delighted are you by steemgigs?</span> -->
                    <p class="grey-text text-darken-3">For Clients
Were you delighted with the service of the SteemGigger who rendered your service? Tell us!
Note: You can earn steem rewards by writing a SteemGIG testimonial as it we look to support it and it appears on the steem blockchain as well</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="input-field col s12">
              <vue-editor v-model="newTestimonial.description" placeholder="Describe your experience with steemgigs" :upload="uploadConfig"></vue-editor>
              <div v-if="descError" class="simple-card card-panel">
                <p v-if="descError" class="red-text mt-1 mb-0" v-text="descError" />
              </div>
              <div class="tutorial_guide hide-on-small-only center-align">
                <div class="card">
                  <div class="card-content">
                    <span class="card-title grey-text text-darken-1 left-align mb-4">If you're a steemgiger, you can apply this flow below in writing your SteemGigs testimonial:</span>
                    <p class="grey-text text-darken-3">Give a detailed description about what your GIG was about</p>
                    <p class="grey-text text-darken-3">You can document "the process" e.g if it is a logo, you can decide to put samples in your post for further transparency</p>
                    <p class="grey-text text-darken-3">You can explain your general experiences with clients e.g "was payment prompt"; "was communication easy"; "would you love future relationships" etc</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col input-field s12">
              <input-tag limit="2" :read-only="true" :tags="defaultTags" />
              <input-tag limit="3" class="editable" placeholder="add tags" @update:tags="getTags" :tags="userTags" />
            </div>
            <div class="input-field col s12 m6 row">
              <div class="col s5">
                <p>
                  <label>
                    <input type="checkbox" :checked="newTestimonial.liked ? 'checked' : ''" v-model="newTestimonial.liked" />
                    <span>Like your post</span>
                  </label>
                </p>
              </div>
              <div class="col s7 mt-4">
                <slider-range v-if="newTestimonial.liked" :min="1" v-model="newTestimonial.upvoteRange" />
              </div>
            </div>
          </div>
          <div class="col s12 row">
              <el-button class="right waves-effect" @click.prevent="nextSection">Next</el-button>
          </div>
        </form>
        <div class="row" v-if="currentSection === 1">
          <div class="col s12 preview">
            <div class="card">
              <div class="card-content">
                <span class="card-title"> {{ steemedTitle }}</span>
              </div>
              <!-- <div class="card-image">
                <carousel :navigationEnabled="false" :autoplay="true" :autoplayHoverPause="true" :perPage="1">
                  <slide v-for="(image, index) in newTestimonial.portfolio" :key="index">
                    <img :src="image" class="responsive-img" :alt="newTestimonial.title">
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
              <p v-if="!validTitle" class="red-text mt-1 mb-0" >Title must be at least 5 characters</p>
              <p v-if="descError" class="red-text mt-1 mb-0" v-text="descError" />
            </div>
          </div>
          <div class="col s12 row">
            <el-button type="secondary" @click.prevent="prevSection" class="secondary waves-effect">Back</el-button>
            <el-button :disabled="Boolean(errorr)"  type="primary" class="right primary waves-effect" @click.prevent="submit">
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
import Page from '@/components/page'
import CatNav from '@/components/layout/catNav'
import ImgUpload from '@/components/snippets/imgUpload'
import DismissibleNotice from '@/components/snippets/dismissibleNotice'
import { MarkdownEditor } from 'markdown-it-editor'
import VueMarkdown from 'vue-markdown'
import { VueEditor } from 'vue2-editor'
import { Carousel, Slide } from 'vue-carousel'
import debounce from '@/plugins/debounce'
import InputTag from 'vue-input-tag'
import SliderRange from 'vue-slider-component'
import Util from '@/services/util'

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
      sections: ['Post a Testimonial', 'Publish'],
      currentSection: 0,
      totalPics: 1,
      nextPressed: false,
      userTags: [],
      duplicateTitle: '',
      checkingTitle: false,
      defaultTags: ['steemgigs', 'steemgigs-testimonial'],
      newTestimonial: this.$store.state.newPosts.testimonial,
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
    vote () {
      if (!this.newTestimonial.liked) {
        this.newTestimonial.liked = true
      } else {
        this.newTestimonial.liked = false
      }
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
    getTags (entries) {
      this.userTags = entries
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
  watch: {
    newTestimonial: {
      handler (val) { this.$store.commit('SET_NEW_TESTIMONIAL', val) },
      deep: true
    }
  },
  computed: {
    validTitle () {
      if (this.newTestimonial.title.length > 5 && this.checkingTitle) {
        return 'Wait a sec...'
      } else if (this.newTestimonial.title.length > 5) {
        return 'Title is valid, your\'re cool!'
      } else {
        return ''
      }
    },
    voteBtnTitle () {
      if (!this.newTestimonial.liked) {
        return { content: 'Like your post', classes: ['tooltip'] }
      } else {
        return { content: 'Remove upvote', classes: ['tooltip'] }
      }
    },
    descError () {
      if (this.nextPressed && this.newTestimonial.description.length < 300) {
        return 'Your description should be 300 Characters or more, please read style guide for clarification'
      } else {
        return ''
      }
    },
    errorr () {
      return this.descError || !this.validTitle
    },
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
.sections {
  background: white;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #f8f8f8;
  top: 41px;
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
  top: 4em;
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
