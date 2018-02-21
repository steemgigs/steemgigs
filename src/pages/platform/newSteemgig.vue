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
                  <option v-for="(subcategory, index) in categories[selectedCategoryIndex].subcategories" :key="index" :value="subcategory.name" v-text="subcategory.name"></option>
                </select>
              </div>
              <div class="col input-field s12">
                <input-tag limit="3" :read-only="true" :tags="defaultTags" />
                <input-tag limit="2" class="editable" placeholder="add tags" @update:tags="getTags" :tags="userTags" />
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
              <vue-editor v-model="newGigData.description" :upload="uploadConfig"></vue-editor>
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
              <vue-editor v-model="newGigData.pricing" :upload="uploadConfig"></vue-editor>
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
              <vue-editor v-model="newGigData.requirements" :upload="uploadConfig"></vue-editor>
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
import Api from '@/services/api'
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
    InputTag,
    ImgUpload,
    VueEditor
  },
  data () {
    return {
      successText: '',
      errorText: '',
      isPosting: false,
      sections: ['Overview', 'Description', 'Pricing', 'Requirements', 'Portfolio', 'Publish'],
      currentSection: 0,
      totalPics: 1,
      userTags: [],
      newGigData: {
        title: '',
        category: '',
        subcategory: '',
        description: '',
        requirements: '',
        pricing: '',
        hours: 0,
        days: 0,
        currency: 'STEEM',
        portfolio: [],
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
        url: this.$imgUploadURL
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
    getTags (entries) {
      this.userTags = entries
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
        users: ['steemgigs', this.$store.state.username],
        tags: [...this.userTags, ...this.defaultTags],
        format: 'Markdown',
        timestamp: new Date().getTime(),
        price: this.newGigData.price,
        currency: this.newGigData.currency,
        authorPic: this.$store.state.profile.profileImage,
        category: this.slugify(this.newGigData.category),
        subcategory: this.slugify(this.newGigData.subcategory),
        images: this.newGigData.portfolio,
        type: 'steemgigs_post',
        generated: true
      }
      let textifiedPics = '\n<h2>Portfolio</h2>\n<hr />\n'
      this.newGigData.portfolio.forEach(url => {
        textifiedPics += '![Potfolio](' + url + ')\n\n'
      })
      let username = this.$store.state.username
      let permlink = this.slugify(this.newGigData.title)
      let body = this.previewData + textifiedPics + `
<i>this post was made on <a href="https://steemgigs.org/@${username}/${permlink}">STEEMGIGS Where everyone has something to offer</a></i>
      `
      let token = this.$store.state.accessToken
      let title = '#STEEMGIGS: I will ' + this.newGigData.title
      // username, permlink, title, body, jsonMetadata, token
      Api.post({username, permlink, title, body, jsonMetadata}, token).then((err, res) => {
        console.log(err, res)
        that.isPosting = false
        that.successText = 'Successfully pushed to steem!'
      }).catch((e) => {
        that.isPosting = false
        that.errorText = 'Error pushing post to steem, try again'
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
    defaultTags () {
      return ['steemgigs', this.slugify(this.newGigData.category), this.slugify(this.newGigData.subcategory)]
    },
    wordCount () {
      if (this.newGigData.title.length > 0) {
        return `${this.newGigData.title.length} / 90 Characters`
      } else {
        return `90 Characters`
      }
    },
    previewData () {
      return `
<h2 class="headline">Description</h2>
<hr />
${this.newGigData.description}
<h2 class="headline">Pricing</h2>
<hr />
${this.newGigData.pricing}

<h5>Price: Starting at ${this.newGigData.price} ${this.newGigData.currency}</h5>
<h5>Delivery: ${this.newGigData.days} day(s) ${this.newGigData.hours} hour(s)</h5>
<hr />
<h2 class="headline">Requirements</h2>
<hr />
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
