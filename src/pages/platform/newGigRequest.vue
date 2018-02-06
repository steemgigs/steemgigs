<template>
  <page :pageClasses="['post_new_steemgig__view', 'row']">
    <ul class="sections center">
      <li v-for="(section, index) in sections" :key="index"><a v-text="section" :class="{active: index === currentSection}" @click="switchTo(index)"></a></li>
    </ul>
    <div class="container" @keypress.tab="nextSection">
      <div class="col s12 m7 l9 row" >
        <form class="card-panel row" v-if="currentSection === 0">
          <div class="container gigForm">
            <!-- <p class="sub-title">Oh you didn't find your gig! Post a custom request below</p> -->
            <div class="mx-2">
              <p class="flow-text title">Gig Title</p>
              <div class="input-field col s12">
            </div>
              <textarea @keypress.enter.prevent @keyup.enter="''" v-model="newGigRequest.title" type="text" placeholder="Give a title to this gig" row="2" maxlength="90" minlength="5" required>
              </textarea>
              <p class="word-count right" v-text="wordCount"></p>
              <div class="tutorial_guide center-align">
                <div class="card">
                  <div class="card-content">
                    <span class="card-title">Make your Title Short, Simple and Clear to understand</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="input-field col s12">
              <vue-editor v-model="newGigRequest.description" placeholder="Enter a detailed description for the gig" :upload="uploadConfig"></vue-editor>
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
                    <option v-for="(category, index) in categories" :key="index" :value="category.name" v-text="category.name"></option>
                  </select>
                </div>
                <div class="input-field col s12 m6 l4" v-show="newGigRequest.category">
                  <select class="my-select browser-default subCategory_select" v-model="newGigRequest.subcategory">
                    <option value="" disabled selected>Select Subcategory</option>
                    <option v-for="(subcategory, index) in categories[selectedCategoryIndex].subcategories" :key="index" :value="subcategory" v-text="subcategory"></option>
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
          <div class="col s12">
            <div class="card">
              <div class="card-content">
                <span class="card-title"> {{ steemedTitle }}</span>
                <p><router-link :to="'/categories/' + this.newGigRequest.category">{{ this.newGigRequest.category }}</router-link> / <router-link :to="'/categories/' + this.newGigRequest.category + '/' + this.newGigRequest.subcategory">{{ this.newGigRequest.subcategory }}</router-link></p>
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
import { VueEditor } from 'vue2-editor'
import { Carousel, Slide } from 'vue-carousel'
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
    InputTag
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
      newGigRequest: {
        title: '',
        category: '',
        subcategory: '',
        description: '',
        hours: 0,
        days: 0,
        currency: 'STEEM',
        images: [],
        reward: '100% STEEM POWER',
        price: 0,
        liked: true
      },
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['image', 'code-block']
      ],
      uploadConfig: {
        name: 'file',
        accept: 'image/jpg,image/jpeg,image/png',
        url: 'https://steemgigsbackend-cogtczuyko.now.sh/imgUpload'
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
      ]
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
      this.newGigRequest.subcategory = ''
    },
    morePics () {
      if (this.totalPics < 4) this.totalPics++
    },
    getTags (entries) {
      this.userTags = entries
    },
    submit () {
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
      sc2.setAccessToken(this.$store.state.accessToken)
      // let textifiedPics = '\n## Portfolio\n----\n'
      // this.newGigRequest.portfolio.forEach(url => {
      //   textifiedPics += '![Potfolio](' + url + ')\n\n'
      // })
      // let body = this.previewData + textifiedPics + `
      let body = this.previewData + `
#### this post was made on #STEEMGIGS
"where everyone has something to offer"
      `
      let permlink = this.slugify(this.newGigRequest.title)
      let username = this.$store.state.username
      let title = this.steemedTitle
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
      return `##### Description
----
${this.newGigRequest.description}

##### Maximum Budget: ${this.newGigRequest.price} ${this.newGigRequest.currency}

##### Delivery: ${this.newGigRequest.days} day(s) ${this.newGigRequest.hours} hour(s)
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
