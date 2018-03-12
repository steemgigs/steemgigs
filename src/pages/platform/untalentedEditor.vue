<template>
  <page :pageClasses="['post_new_steemgig__view', 'row']">
    <dismissible-notice>
      <span>#Untalented editor: This is a simple preview into the future of https://steemgigs.org and for now, it is simply a "specialized editor" for posting awesome steemit blog posts.

      This editor can be used by any steemian and to create posts in any genre or tag.
      (#untalented covers all levels of talent.)
      We simply offer you a simple editor that guides the format of your steemit posts and making them worthier of support by steemit curators.
      Products of this editor will be celebrated and propagated to curators all-round steemit as hotcake.
      You can also use this editor if you're a new steemian to startup your steemit journey (#introduceyourself) as this editor will create a flow that you can follow closely for your posts to appear enviable on steemit.
      Posts created on this editor will only appear on https://busy.org and https://steemit.com for now and will not appear on https://steemgigs.org yet</span>
    </dismissible-notice>
    <ul class="sections hide-on-med-and-down center">
      <li v-for="(section, index) in sections" :key="index"><a v-text="section" :class="{active: index === currentSection}" @click="switchTo(index)"></a></li>
    </ul>
    <div class="container" @keypress.tab="nextSection">
      <div class="col s12 m7 l9 row" >
        <form class="card-panel row" v-if="currentSection === 0">
          <div class="container gigForm">
            <div class="mx-2">
              <p class="flow-text title">Post Title</p>
              <div class="input-field col s12">
            </div>
              <textarea @keypress.enter.prevent @keyup.enter="''" v-model="untalented.title" @input="search" type="text" placeholder="Write a title for your awesome post" row="2" maxlength="90" minlength="5" required>
              </textarea>
              <p class="word-count right" v-text="wordCount"></p>
              <div v-if="untalented.title.length > 5" class="col s12 my-3">
                <span class="simple-card">
                  <span v-if="duplicateTitle" class="green-text">You have already used this <router-link :to="`/@${$store.state.username}/${duplicateTitle.permlink}`" target="_blank">title</router-link>, you can still choose to proceed</span>
                  <span v-if="!duplicateTitle" class="green-text" v-text="validTitle" />
                </span>
              </div>
              <div class="tutorial_guide center-align">
                <div class="card">
                  <div class="card-content">
                    <span class="card-title">Make your title short and simple to understand</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="input-field col s12">
              <vue-editor v-model="untalented.description" placeholder="Type your post here" :upload="uploadConfig"></vue-editor>
              <div v-if="descError" class="col s12 my-3">
                <span class="simple-card">
                  <span class="red-text" v-text="descError" />
                </span>
              </div>
              <div class="tutorial_guide">
                <div class="card">
                  <div class="card-content">
                    <span class="card-title grey-text text-darken-1 left-align mb-2">Want to write a perfect #introduceyourself post</span>
                    <p class="mb-4 grey-text text-darken-3"><a class="indigo-text" target="_blank" href="https://steemit.com/steemit/@surpassinggoogle/steemit-s-untalented-is-in-beta-participate-freely-because-every-participant-in-this-contest-will-win-something-no-losers">Read</a> the style guide</p>
                    <span class="grey-text text-darken-1 left-align mb-4">Follow these tips to create a magical steemit post. (Make it "curator-worthy" and free of "cheetah worries")</span>
                    <p class="mt-2 mb-2">Give us a preface of what your post is about to be about.</p>
                    <p class="mb-2">If you are using resources from the internet, digest it first, then tell us about it, using your own words.</p>
                    <p class="mb-2">Be expressive. Relegate reservations. Flaws allowed
(The more pictures, words etc, the more exciting).</p>
                    <p class="mb-2">To conclude, ask us questions. Make us think. Aim to truly touch us with your beauty.</p>
                    <p class="mb-2">You have an audience in the search engines as well, so aim to touch them too.</p>
                    <p class="mb-3">Make sure to state source URL of every image resourced online. No loss, if you always give credit.</p>
                    <span>Conclusion: Be confident about tell us why people should support your content, share and return</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col input-field s12">
              <input-tag limit="2" :read-only="true" :tags="defaultTags" />
              <input-tag limit="3" class="editable" placeholder="add tags" @update:tags="getTags" :tags="userTags" />
            </div>
          </div>
          <div class="input-field col s12 m6 row">
            <div class="col s5">
              <p>
                <label>
                  <input type="checkbox" :checked="untalented.liked ? 'checked' : ''" v-model="untalented.liked" />
                  <span>Like your post</span>
                </label>
              </p>
            </div>
            <div class="col s7 mt-4">
              <slider-range v-if="untalented.liked" :min="1" v-model="untalented.upvoteRange" />
            </div>
          </div>
          <div class="col s12 row">
              <button class="right btn indigo waves-effect" @click.prevent="nextSection">Save and Proceed</button>
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
                  <slide v-for="(image, index) in untalented.portfolio" :key="index">
                    <img :src="image" class="responsive-img" :alt="untalented.title">
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
            <button @click.prevent="prevSection" class="btn indigo accent-2 waves-effect">back</button>
            <button :disabled="Boolean(errorr)" class="right btn indigo waves-effect" @click.prevent="submit">
              <i class="fa fa-spinner fa-pulse" v-if="isPosting"></i>
              POST #STEEMGIG
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
import Api from '@/services/api'
import Page from '@/components/page'
import CatNav from '@/components/layout/catNav'
import ImgUpload from '@/components/snippets/imgUpload'
import DismissibleNotice from '@/components/snippets/dismissibleNotice'
import { MarkdownEditor } from 'markdown-it-editor'
import VueMarkdown from 'vue-markdown'
import { VueEditor } from 'vue2-editor'
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
      sections: ['Create a steemit post', 'Publish'],
      currentSection: 0,
      totalPics: 1,
      userTags: [],
      nextPressed: false,
      defaultTags: ['untalented'],
      duplicateTitle: '',
      checkingTitle: false,
      untalented: this.$store.state.newPosts.untalented,
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
      if (!this.untalented.liked) {
        this.untalented.liked = true
      } else {
        this.untalented.liked = false
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
    validTitle () {
      if (this.untalented.title.length > 5 && this.checkingTitle) {
        return 'Wait a sec...'
      } else if (this.untalented.title.length > 5) {
        return 'Title is valid, your\'re cool!'
      } else {
        return ''
      }
    },
    descError () {
      if (this.nextPressed && this.untalented.description.length < 300) {
        return 'Your description should be 300 Characters or more, please read style guide for clarification'
      } else {
        return ''
      }
    },
    errorr () {
      return this.descError || !this.validTitle
    },
    subcatError () {
      if (!this.untalented.subcategory) {
        return 'You must select a category/subcategory'
      } else {
        return ''
      }
    },
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
${this.untalented.description}
      `
    }
  },
  watch: {
    untalented: {
      handler (val) { this.$store.commit('SET_NEW_UNTALENTED', val) },
      deep: true
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
    top: 20%;
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
