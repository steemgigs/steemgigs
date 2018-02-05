<template>
  <page :pageClasses="['new_steemgig__view', 'row']">
    <ul class="sections center">
      <li v-for="(section, index) in sections" :key="index"><a v-text="section" :class="{active: index === currentSection}" @click="switchTo(index)"></a></li>
    </ul>
    <div class="container" @keypress.tab="nextSection">
      <div class="col s12 m7 l9 row">
        <form class="card-panel row" v-if="currentSection === 0">
          <div class="container gigForm">
            <p class="flow-text title">Gig Title</p>
            <div class="input-field col s12">
              <span class="title-before">#STEEMGIGS: I will</span>
              <textarea @keypress.enter.prevent @keyup.enter="''" v-model="newGigData.title" type="text" placeholder="do this (what you can do well) just the way they want it" row="2" maxlength="90" minlength="5" required>
              </textarea>
              <p class="word-count right" v-text="wordCount"></p>
              <div class="tutorial_guide center-align">
                <div class="card">
                  <div class="card-content">
                    <span class="card-title">Make your Title Short, Simple and Clear to boost sales</span>
                  </div>
                </div>
              </div>
            </div>
            <p class="flow-text title">STEEMGIGS Category</p>
            <div class="col s12 row">
              <div class="input-field col s12 m6 l4">
                <select class="browser-default my-select category_select" @change="refreshSubCategory" v-model="newGigData.category">
                  <option value="" disabled selected>Select Category</option>
                  <option v-for="(category, index) in categories" :key="index" :value="category.name" v-text="category.name"></option>
                </select>
              </div>
              <div class="input-field col s12 m6 l4" v-show="newGigData.category">
                <select class="my-select browser-default subCategory_select" v-model="newGigData.subcategory">
                  <option value="" disabled selected>Select Subcategory</option>
                  <option v-for="(subcategory, index) in categories[selectedCategoryIndex].subcategories" :key="index" :value="subcategory" v-text="subcategory"></option>
                </select>
              </div>
              <div class="form-navs">
                <button @click.prevent="nextSection" class="right btn indigo waves-effect">Save and Proceed</button>
              </div>
            </div>
          </div>
        </form>
        <form class="card-panel row" v-if="currentSection === 1">
          <div class="container gigForm">
            <p class="flow-text title">Describe your STEEMGIG</p>
            <div class="input-field col s12">
              <span>
                <a href="//guides.github.com/features/mastering-markdown/"> Markdown</a> &amp; <a href="//developer.mozilla.org/en-US/docs/Learn/HTML/Cheatsheet">HTML Supported</a> <br>
              </span>
              <markdown-editor v-model="newGigData.description" :options="editorOptions" :upload="uploadConfig"></markdown-editor>
              <div class="tutorial_guide center-align">
                <div class="card">
                  <div class="card-content">
                    <span class="card-title">Describe your STEEMGIG</span>
                    <p>Be as detailed as possible so that potential buyers can understand what you offer and see whether it fits into their needs.</p>
                    <p>Set and Answer your FAQs</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col s12 row">
                <button @click.prevent="prevSection" class="btn indigo accent-2 waves-effect">back</button>
                <button class="right btn indigo waves-effect" @click.prevent="nextSection">Save and Proceed</button>
            </div>
          </div>
        </form>
        <form class="card-panel row" v-if="currentSection === 2">
          <div class="container gigForm">
            <p class="flow-text title">Pricing</p>
            <div class="input-field col s12">
              <small>Markdown &amp; HTML Supported</small>
              <markdown-editor v-model="newGigData.pricing" :options="editorOptions" :upload="uploadConfig"></markdown-editor>
              <div class="tutorial_guide center-align">
                <div class="card">
                  <div class="card-content">
                    <span class="card-title">Name your Package and describe the detail of your package</span>
                    <p>Are you willing to do revisions with your STEEMGIGS? If so, how many e.t.c, Gig Extras and Pricing</p>
                  </div>
                </div>
              </div>
            </div>
            <p class="flow-text title">Delivery</p>
            <div class="input-field col s12 m3 l3">
              <select class="browser-default my-select category_select" v-model="newGigData.hours">
                <option value="" disabled selected>Hours</option>
                <option v-for="(hour, index) in 24" :key="index" :value="hour">{{ hour }} hr(s)</option>
              </select>
            </div>
            <div class="input-field col s12 m3 l8">
              <select class="browser-default my-select category_select" v-model="newGigData.days">
                <option value="0">Less than a day</option>
                <option v-for="(day, index) in 30" :key="index" :value="day">{{ day }} day(s)</option>
              </select>
            </div>
            <div class="input-field col s12 m3 l3">
              <p class="flow-text title left col s12" style="margin-bottom: 1em">Price</p>
              <select class="browser-default my-select category_select" v-model="newGigData.currency">
                <option value="" disabled selected>currency</option>
                <option>STEEM</option>
                <option>SBD</option>
                <option>SP</option>
              </select>
            </div>
            <div class="input-field col s12 m3 l3 push-down">
              <input type="number" v-model="newGigData.price" class="price" placeholder="price">
            </div>
            <div class="col s12 row" style="margin-top: 3em;">
                <button @click.prevent="prevSection" class="btn indigo accent-2 waves-effect">back</button>
                <button class="right btn indigo waves-effect" @click.prevent="nextSection">Save and Proceed</button>
            </div>
          </div>
        </form>
        <form class="card-panel row" v-if="currentSection === 3">
          <div class="container gigForm">
            <p class="flow-text title">Requirements</p>
            <div class="input-field col s12">
              <span>
                <a href="//guides.github.com/features/mastering-markdown/"> Markdown</a> &amp; <a href="//developer.mozilla.org/en-US/docs/Learn/HTML/Cheatsheet">HTML Supported</a> <br>
              </span>
              <markdown-editor v-model="newGigData.requirements" :options="editorOptions" :upload="uploadConfig"></markdown-editor>
              <div class="tutorial_guide center-align">
                <div class="card">
                  <div class="card-content">
                    <span class="card-title"></span>
                    <p>Explain what you expect of your client to help you start rendering the service e.g submit files, images, video to edit, links etc</p>
                    <p>Tell them whether your requirments are optional or 'compulsory'</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col s12 row">
                <button @click.prevent="prevSection" class="btn indigo accent-2 waves-effect">back</button>
                <button class="right btn indigo waves-effect" @click.prevent="nextSection">Save and Proceed</button>
            </div>
          </div>
        </form>
        <form class="card-panel row" v-if="currentSection === 4">
          <div class="container gigForm">
            <p class="flow-text title">Portfolio</p>
            <div class="input-field col s12 row">
              <div class="col s12 m4 l3" v-for="(uploader, index) in totalPics" :key="index">
                <img-upload :id="index" />
              </div>
              <div class="col s12 m4 l3" v-if="totalPics < 4">
                <button @click.prevent="morePics" class="btn-floating indigo addPic">
                  <i class="icon ion-android-add"></i>
                </button>
              </div>
              <div class="tutorial_guide center-align">
                <div class="card">
                  <div class="card-content">
                    <span class="card-title"></span>
                    <p>Attach images of past works etc Plus a Video describing your #STEEMGIG or why people should avail your STEEMGIG.</p>
                    <p>Videos do better in helping you stand out from competition</p>
                    <p>Note: The first Image or Video on the list of your uploaded media is what will appear as the thumbnail of your STEEMGIG</p>
                  </div>
                </div>
              </div>
            </div>
            <p class="flow-text title">Reward</p>
            <div class="input-field col s12 m3 l3">
              <select class="browser-default my-select category_select" v-model="newGigData.reward">
                <option>100% STEEM POWER</option>
                <option>50% SBD 50% SP</option>
                <option>Declined</option>
              </select>
            </div>
            <div class="input-field col s12 m3 l4" style="margin-top: 0.5em">
              <p>
                <label>
                  <input class="filled-in" type="checkbox" v-model="newGigData.liked" />
                  <span>Like your post</span>
                </label>
              </p>
            </div>
            <div class="col s12 row">
                <button @click.prevent="prevSection" class="btn indigo accent-2 waves-effect">back</button>
                <button class="right btn indigo waves-effect" @click.prevent="nextSection">Save and Proceed</button>
            </div>
          </div>
        </form>
        <div class="row" v-if="currentSection === 5">
          <div class="col s12">
            <div class="card">
              <div class="card-content">
                <span class="card-title">#STEEMGIGS: I will {{ newGigData.title }}</span>
                <p><router-link :to="'/categories/' + this.newGigData.category">{{ this.newGigData.category }}</router-link> / <router-link :to="'/categories/' + this.newGigData.category + '/' + this.newGigData.subcategory">{{ this.newGigData.subcategory }}</router-link></p>
              </div>
              <div class="card-image">
                <carousel :navigationEnabled="false" :autoplay="true" :autoplayHoverPause="true" :perPage="1">
                  <slide v-for="(image, index) in newGigData.portfolio" :key="index">
                    <img :src="image" class="responsive-img" :alt="newGigData.title">
                  </slide>
                </carousel>
              </div>
              <div class="card-content">
                <vue-markdown :source="previewData" />
              </div>
            </div>
          </div>
          <div class="col s12 row">
            <button @click.prevent="prevSection" class="btn indigo accent-2 waves-effect">back</button>
            <button class="right btn indigo waves-effect" @click.prevent="submit">
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
import sc2 from '@/services/sc2'
import Page from '@/components/page'
import CatNav from '@/components/layout/catNav'
import ImgUpload from '@/components/snippets/imgUpload'
import { MarkdownEditor } from 'markdown-it-editor'
import VueMarkdown from 'vue-markdown'
import { Carousel, Slide } from 'vue-carousel'
import hljs from 'highlightjs'
import 'highlightjs/styles/github.css'

export default {
  components: {
    Page,
    CatNav,
    MarkdownEditor,
    VueMarkdown,
    Carousel,
    Slide,
    ImgUpload
  },
  data () {
    return {
      successText: '',
      errorText: '',
      isPosting: false,
      sections: ['Overview', 'Description', 'Pricing', 'Requirements', 'Portfolio', 'Publish'],
      currentSection: 0,
      totalPics: 1,
      newGigData: {
        title: '',
        category: '',
        subcategory: '',
        description: '',
        pricing: '',
        hours: 0,
        days: 0,
        currency: 'STEEM',
        portfolio: ['http://res.cloudinary.com/jalasem/image/upload/v1517535886/vkplxvcwbwjvst4ci2ts.png', 'http://res.cloudinary.com/jalasem/image/upload/v1517535926/o1vdfxm4ghduei9fr06t.png'],
        reward: '100% STEEM POWER',
        price: 0,
        liked: true
      },
      categories: [
        {
          'name': 'Graphics & Design', 'subcategories': ['logo design', 'business cards and stationery', 'illustration', 'cartoons and carricatures', 'flyers and posters', 'book covers and packaging', 'web and mobile design', 'social media design', 'banner ads', 'photoshop editing', '3D & 2D models', 'T-shirts', 'presentation design', 'infographics', 'vector tracing', 'invitations', 'other']
        },
        {
          'name': 'Digital marketing', 'subcategories': ['social media marketing', 'SEO', 'content marketing', 'video marketing', 'email marketing', 'search & display marketing', 'marketing strategy', 'web analysis', 'influencer marketing', 'local listings', 'domain research', 'e-commerce marketing', 'mobile advertising', 'nusic promotion', 'web traffic', 'other']
        },
        {
          'name': 'Writing and translation', 'subcategories': ['resumes and cover letters', 'proof reading and editing', 'translation', 'creative writing', 'business copywriting', 'research & summaries', 'articles & blog posts', 'press releases', 'transcription', 'legal writing', 'other']
        },
        {
          'name': 'Videos and animation', 'subcategories': ['whiteboard & animated explainers', 'intros & animated logos', 'promotional videos', 'editing and post production', 'lyric & music video', 'spokeperson videos', 'animated characters & modelling', 'short videos ads', 'live action explainers', 'other']
        },
        {
          'name': 'Music & Audio', 'subcategories': ['voice over', 'mixing & mastering', 'producers & composers', 'singer-songwriters', 'session musicians & singers', 'jingles and drops', 'sound effects', 'other']
        },
        {
          'name': 'Programming & tech', 'subcategories': ['wordpress', 'website builders & cms', 'web programming', 'e-commerce', 'mobile apps & web', 'desktop applications', 'support & IT', 'chatbots', 'data analysis & reports', 'convert files', 'databses', 'user testing', 'QA', 'other']
        },
        {
          'name': 'Business', 'subcategories': ['virtual assistant', 'market research', 'business plans', 'branding services', 'legal consulting', 'financial consulting', 'business tips', 'presentations', 'career advice', 'flyer distribution', 'other']
        },
        {
          'name': 'Untalented', 'subcategories': ['online lessons', 'arts and crafts', 'relationship advice', 'health, nutrition and fitness', 'astrology & readings', 'spiritual & healing', 'family & Genealogy', 'gaming', 'greeting cards & videos', 'your message on ...', 'viral videos', 'pranks & stunts', 'celebrity impersonators', 'collectibles', 'global culture', 'other']
        }
      ],
      editorOptions: {
        linkify: true,
        highlight (str, lang) { // you can add highlightjs plugin to highlight your code
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(lang, str).value
            } catch (__) {}
          }
          return ''
        }
      },
      uploadConfig: {
        name: 'file',
        accept: 'image/jpg,image/jpeg,image/png',
        url: 'https://steemgigsbackend-uqhxfldikh.now.sh/imgUpload'
      }
    }
  },
  methods: {
    switchTo (index) {
      this.currentSection = index
    },
    nextSection () {
      if (this.currentSection < this.sections.length) this.currentSection++
    },
    prevSection () {
      if (this.currentSection > 0) this.currentSection--
    },
    refreshSubCategory () {
      this.newGigData.subcategory = ''
    },
    morePics () {
      if (this.totalPics < 4) this.totalPics++
    },
    submit () {
      let that = this
      this.errorText = ''
      this.successText = ''
      this.isPosting = true
      this.isPosting = true
      let jsonMetadata = {
        app: 'steemgig',
        tags: ['steemgigs', this.slugify(this.newGigData.category), this.slugify(this.newGigData.subcategory), 'testing'],
        format: 'Markdown',
        timestamp: new Date().getTime(),
        price: this.newGigData.price,
        currency: this.newGigData.currency,
        authorPic: this.$store.state.profile.profileImage,
        generated: true
      }
      sc2.setAccessToken(this.$store.state.accessToken)
      let textifiedPics = '\n## Portfolio\n----\n'
      this.newGigData.portfolio.forEach(url => {
        textifiedPics += '![Potfolio](' + url + ')\n\n'
      })
      let body = this.previewData + textifiedPics + `
#### this post was posted on #STEEMGIGS
"where everyone has something to offer"
      `
      let permlink = this.slugify(this.newGigData.title)
      let username = this.$store.state.username
      let title = '#STEEMGIGS: I will ' + this.newGigData.title
      sc2.comment('', 'steemgigs', username, permlink, title, body, jsonMetadata, (err, res) => {
        console.log(err, res)
        that.isPosting = false
        if (err) {
          that.errorText = 'Error pushing post to steem, try again'
        } else {
          that.successText = 'Successfully pushed to steem!'
        }
      })
    }
  },
  computed: {
    selectedCategoryIndex () {
      let catIndex = 0
      this.categories.forEach((category, index) => {
        if (category.name === this.newGigData.category) catIndex = index
      })
      return catIndex
    },
    wordCount () {
      if (this.newGigData.title.length > 0) {
        return `${this.newGigData.title.length} / 90 Characters`
      } else {
        return `90 Characters`
      }
    },
    previewData () {
      return `## Description
----
${this.newGigData.description}
## Pricing
----
${this.newGigData.pricing}

#### Price: Starting at ${this.newGigData.price} ${this.newGigData.currency}
#### Delivery: ${this.newGigData.days} day(s) ${this.newGigData.hours} hour(s)
----
## Requirements
----
${this.newGigData.requirements}
      `
    }
  },
  mounted () {
    this.$eventBus.$on('img-uploaded', payload => {
      console.log(payload)
      this.newGigData.portfolio[payload.index] = payload.url
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
p.title {
  margin-left: 0.5em;
  margin-bottom: 0;
  margin-top: 0
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
    text-indent: 7.8em;
    font-size: 28px;
    padding: 0px 6px;
    min-height: 4.7em;
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
