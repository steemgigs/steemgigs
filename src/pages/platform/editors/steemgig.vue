<template>
  <page :pageClasses="['new_steemgig__view', 'row']">
    <el-main>
    <div class="container" @keypress.tab="nextSection">
      <div class="col s12 m7 l9 row editor-container">
        <form v-if="currentSection === 0">
          <div class="container gigForm">
            <p class="flow-text title">Gig Title</p>
            <div class="input-field col s12">
              <span class="title-before">#STEEMGIGS: I will</span>
              <textarea @keypress.enter.prevent @keyup.enter="''" @input="search" v-model="newGigData.title" type="text" placeholder="do this (what you can do well) just the way they want it" row="2" maxlength="90" minlength="5" required>
              </textarea>
              <p class="word-count right" v-text="wordCount"></p>
              <div v-if="newGigData.title.length > 5" class="col s12 mb-2">
                <span class="simple-card">
                  <span v-if="duplicateTitle" class="green-text">You have already used this <router-link :to="`/@${$store.state.username}/${duplicateTitle.permlink}`" target="_blank">title</router-link>, you can still choose to proceed</span>
                  <span v-if="!duplicateTitle" class="green-text" v-text="validTitle" />
                </span>
              </div>
              <div class="tutorial_guide hide-on-small-only center-align">
                <div class="card">
                  <div class="card-content">
                    <span>Make your title short, describing exactly what service(s) you offer as this is the likeliest way to boost viewership, potential &amp; eventual sales</span>
                  </div>
                </div>
              </div>
            </div>
            <p class="flow-text title">STEEMGIGS Category</p>
            <div class="col s12 row">
              <div class="input-field col s12 m6 l4">
                <select class="browser-default my-select category_select" @change="refreshSubCategory" v-model="newGigData.category">
                  <option value="" disabled selected>Select Category</option>
                  <option v-if="category.name != 'SurpassingGoogle'" v-for="(category, index) in categories" :key="index" :value="category.name" v-text="category.name"></option>
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
                <el-button type="primary" @click.prevent="nextSection" class="primary right waves-effect">Save and Proceed</el-button>
              </div>
              <div class="tutorial_guide guide-2 hide-on-small-only">
                <div class="card">
                  <div class="card-content">
                    <p>Select the most accurately describing category and subcategory</p>
                    <p class="mb-3">Choose the best follow up tags</p>
                    <span>"This will enhance the visibility of your gigs on our website&rsquo;s search engine and on the steem blockchain".</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <form class=" row" v-if="currentSection === 1">
          <div class="container gigForm">
            <p class="flow-text title">Describe your STEEMGIG</p>
            <div class="input-field col s12">
              <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="newGigData.description" :upload="uploadConfig"></vue-editor>
              <div v-if="descError" class="col s12 my-3">
                <span class="simple-card">
                  <span class="red-text" v-text="descError" />
                </span>
              </div>
              <div class="tutorial_guide hide-on-small-only center-align">
                <div class="card">
                  <div class="card-content">
                    <span class="card-title">Describe your STEEMGIG</span>
                    <p>Be as expressive as possible as this is your chance to tell postential clients and steemians what you offer, why you gig is special and why they should give you opportunities etc.</p>
                    <p>Set up a viable list of potential FAQs and to try to answer each one.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col s12 row">
                <el-button class="secondary waves-effect" type="secondary" @click.prevent="prevSection">Back</el-button>
                <el-button class="primary right waves-effect" type="primary" @click.prevent="descNext = true; nextSection()">Save and Proceed</el-button>
            </div>
          </div>
        </form>
        <form class=" row" v-if="currentSection === 2">
          <div class="container gigForm">
            <p class="flow-text title">Pricing</p>
            <div class="input-field col s12">
              <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="newGigData.pricing" :upload="uploadConfig"></vue-editor>
              <div v-if="pricingError" class="col s12 my-3">
                <span class="simple-card">
                  <span class="red-text" v-text="pricingError" />
                </span>
              </div>
              <div class="tutorial_guide hide-on-small-only center-align">
                <div class="card">
                  <div class="card-content">
                    <p class="mb-2">Give your PACKAGE an appealing name.
                    <p class="mb-2">Describe what will be contained in your package for each price.</p>
                    <p class="mb-2">Tell us if you are willing to do revisions. If so, "how many revisions?"; "will it cost extra?" etc</p>
                    <p class="mb-2">Can you render more "speed of delivery", if offered extra payment?</p>
                    <p>Are there aspects of your GIG that you are will to offering lovingly for free etc?</p>
                  </div>
                </div>
              </div>
            </div>
            <p class="flow-text title">Delivery</p>
            <div class="input-field col s12 m3 l3">
              <select class="browser-default my-select category_select" v-model="newGigData.hours">
                <option value="0" disabled selected>Less than an hour</option>
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
                <el-button class="secondary waves-effect" type="secondary"  @click.prevent="prevSection">Back</el-button>
                <el-button class="primary right waves-effect" type="primary" @click.prevent="priceNext = true; nextSection()">Save and Proceed</el-button>
            </div>
          </div>
        </form>
        <form class=" row" v-if="currentSection === 3">
          <div class="container gigForm">
            <p class="flow-text title">Requirements</p>
            <div class="input-field col s12">
              <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="newGigData.requirements" :upload="uploadConfig"></vue-editor>
              <div v-if="requirementError" class="col s12 my-3">
                <span class="simple-card">
                  <span class="red-text" v-text="requirementError" />
                </span>
              </div>
              <div class="tutorial_guide hide-on-small-only center-align">
                <div class="card">
                  <div class="card-content">
                    <span class="card-title"></span>
                    <p class="mb-2">Explain what you would want your clients to provide you with, to help you start the GIG. e.g if your GIG is SEO-related, you may want them to drop "the URL of their website; If your GIG is "graphics-related", you may request images, GIFs etc to guide you during your creation; If your GIG is "video-editing", you may require them to drop you "video files" etc.</p>
                    <p>Tell them if your "requirements" are optional or compulsory.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col s12 row">
                <el-button type="secondary" @click.prevent="prevSection" class="secondary waves-effect">Back</el-button>
                <el-button type="primary"  class="primary right waves-effect" @click.prevent="reqNext = true; nextSection()">Save and Proceed</el-button>
            </div>
          </div>
        </form>
        <form class=" row" v-show="currentSection === 4">
          <dismissible-notice>
            <span>Please ensure all images are yours or give credit to source (URL) where required.<br>Remember that your posts appear on the steem blochain and are subject to curation. Please read style guide on right.</span>
          </dismissible-notice>
          <div class="container gigForm">
            <p class="flow-text title">Portfolio</p>
            <div class="input-field col s12 row">
              <div class="col s12 m4 l3 mb-3" v-for="(image, index) in newGigData.portfolio" :key="image.key">
                <img-upload :id="index" :img="image.url" />
              </div>
              <div class="col s12 m4 l3 mb-3" v-if="newGigData.portfolio.length < 8">
                <div class="add-box center center-align pt-5" @click.prevent="morePics">
                  <button class="btn-floating indigo">
                    <i class="icon ion-android-add"></i>
                  </button><br><br>
                  <span>Click to add more images</span>
                </div>
              </div>
              <div class="tutorial_guide hide-on-small-only center-align">
                <div class="card">
                  <div class="card-content">
                    <span class="card-title"></span>
                    <p class="mb-2">Attach images, videos, GIFs etc showcasing your past work. Add any additional media that describes your SteemGig or tells potential client what they can do to help you serve them better.</p>
                    <p class="mb-3">Consider attaching a video telling potential clients as well as steemians, why your service is outstanding.</p>
                    <span class="ml-1">Note: The first uploaded media is what will appear in the thumbnail of your SteemGig both here and on the steem blockchain.</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <p>Consider embedding a short video clip of you, telling potential clients why they should avail of your service. This improves your general reputation even on steemit, make your content richer and more worthy of curation etc. (Optional)</p>
              <div class="col input-field s6">
                <input v-model="newGigData.videoUrl" placeholder="Enter Video URL e.g. Youtube, Vimeo" />
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
            <div class="input-field col s12 m6 row">
              <div class="col s5">
                <p>
                  <label>
                    <input type="checkbox" :checked="newGigData.liked ? 'checked' : ''" v-model="newGigData.liked" />
                    <span>Like your post</span>
                  </label>
                </p>
              </div>
              <div class="col s7 mt-4">
                <slider-range v-if="newGigData.liked" :min="1" v-model="newGigData.upvoteRange" />
              </div>
            </div>
            <div v-if="portfolioError" class="col s12 my-3">
              <span class="simple-card">
                <span class="red-text" v-text="portfolioError" />
              </span>
            </div>
            <div class="col s12 row">
                <el-button type="secondary" @click.prevent="prevSection" class="secondary waves-effect">Back</el-button>
                <el-button type="primary" class="right primary waves-effect" @click.prevent="nextSection">Save and Proceed</el-button>
            </div>
          </div>
        </form>
        <div class="row" v-if="currentSection === 5">
          <div class="col s12 preview">
            <div class="card">
              <div class="card-content">
                <span class="card-title">#STEEMGIGS: I will {{ newGigData.title }}</span>
                <p><router-link :to="'/categories/' + this.newGigData.category">{{ this.newGigData.category }}</router-link> / <router-link :to="'/categories/' + this.newGigData.category + '/' + this.newGigData.subcategory">{{ this.newGigData.subcategory }}</router-link></p>
              </div>
              <div class="card-image">
                <carousel :navigationEnabled="false" :autoplay="true" :autoplayHoverPause="true" :perPage="1">
                  <slide v-for="(image, index) in portfolio" :key="index">
                    <img :src="image" class="responsive-img" :alt="newGigData.title">
                  </slide>
                </carousel>
              </div>
              <div class="card-content">
                <vue-markdown :source="previewData" />
              </div>
            </div>
            <div class="tutorial_guide hide-on-small-only">
              <div class="card">
                <div class="card-content">
                  <span class="card-title">How Nice?</span>
                  <p class="mt-1">Take a look at your Steemgigs Post to see if you have made errors</p>
                  <p class="mb-3">If error free, hit "publish", else, correct errors</p>
                  <span>Note: Your post will also appear on the Steem Blockchain</span>
                </div>
              </div>
            </div>
            <div v-if="errorr" class="simple-card ">
              <p v-if="!validTitle" class="red-text mt-1 mb-0" >Title must be at least 5 characters</p>
              <p v-if="descError" class="red-text mt-1 mb-0" v-text="descError" />
              <p v-if="pricingError" class="red-text mt-1 mb-0" v-text="pricingError" />
              <p v-if="requirementError" class="red-text mt-1 mb-0" v-text="requirementError" />
              <p v-if="portfolioError" class="red-text mt-1 mb-0" v-text="portfolioError" />
              <p v-if="subcatError" class="red-text mt-1 mb-0" v-text="subcatError" />
            </div>

          </div>
          <div class="col s12 row">
            <el-button type="secondary"  @click.prevent="prevSection" class="secondary waves-effect">Back</el-button>
            <el-button type="primary"  :disabled="errorr" class="right primary waves-effect" @click.prevent="submit">
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
import axios from '@/plugins/axios'
import Api from '@/services/api'
import Page from '@/components/page'
import CatNav from '@/components/layout/catNav'
import ImgUpload from '@/components/snippets/imgUpload'
import { MarkdownEditor } from 'markdown-it-editor'
import VueMarkdown from 'vue-markdown'
import { VueEditor } from 'vue2-editor'
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
      isPosting: false,
      sections: ['Overview', 'Description', 'Pricing', 'Requirements', 'Portfolio', 'Publish'],
      totalPics: 1,
      newGigData: this.$store.state.newPosts.steemgig,
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
          // this.portfolioImages.push(url)
          // this.newGigRequest.portfolio = this.portfolioImages
        })
        .catch((err) => {
          console.log(err)
        })
    },
    refreshSubCategory () {
      this.newGigData.subcategory = ''
    },
    getTags (entries) {
      this.userTags = entries
    },
    morePics () {
      if (this.newGigData.portfolio.length < 8) {
        this.newGigData.portfolio.push({url: '', key: Math.floor(Math.random() * 1000)})
      }
    },
    submit () {
      if (!this.errorr) {
        if (this.isPosting) return
        let that = this
        this.errorText = ''
        this.successText = ''
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
          images: this.portfolio,
          type: 'steemgigs_post',
          generated: true,
          videoUrl: this.newGigData.videoUrl
        }
        let textifiedPics = '\n<h2>Portfolio</h2>\n<hr />\n'
        this.portfolio.forEach(url => {
          textifiedPics += `<img src="${url}"> <br />`
        })
        let username = this.$store.state.username
        let permlink = this.slugify(this.newGigData.title)
        let steemGigsTag = `
  <i>this post was made on <a href="https://steemgigs.org/@${username}/${permlink}">STEEMGIGS Where everyone has something to offer</a></i>
        `
        let contentToHide = textifiedPics + steemGigsTag
        let hiddenContainer = this.htmlHide(contentToHide)
        let body = this.previewData + hiddenContainer

        const imagesFromBody = Util.getImagesFromBody(this.previewData)
        if (imagesFromBody.length) {
          jsonMetadata.images = jsonMetadata.images.concat(imagesFromBody)
        }

        let token = this.$store.state.accessToken
        let title = this.steemedTitle
        // if (this.duplicateTitle) {
        //   let splittedTitle = title.split(' ')
        //   let lastNumber = parseInt(splittedTitle[splittedTitle.length - 1])
        //   title = lastNumber ? title + ' ' + lastNumber++ : title + ' 1'
        // })
        if (this.duplicateTitle) {
          let modifiedTitle = this.newGigData.title + Math.floor(Math.random() * 1000)
          permlink = this.slugify(modifiedTitle)
          title = '#STEEMGIGS: I will ' + modifiedTitle
        }
        let liked = this.newGigData.liked
        let upvoteRange = this.newGigData.upvoteRange
        // username, permlink, title, body, jsonMetadata, token
        Api.post({username, permlink, title, body, liked, upvoteRange, jsonMetadata}, token).then((err, res) => {
          console.log('err', err, 'res', res)
          that.isPosting = false
          this.$notify({
            group: 'foo',
            title: 'Success',
            text: 'Successfully pushed to steem!',
            type: 'success'
          })
          that.successText = 'Successfully pushed to steem!'
          that.$store.commit('RESET_NEW_STEEMGIG')
        }).catch((e) => {
          console.log(e)
          that.isPosting = false
          this.$notify({
            group: 'foo',
            title: 'Error',
            text: 'Error pushing post to steem',
            type: 'error'
          })
          that.errorText = 'Error pushing post to steem'
        })
      }
    }
  },
  computed: {
    steemedTitle () {
      return '#STEEMGIGS: I will ' + this.newGigData.title
    },
    portfolio () {
      return this.newGigData.portfolio.filter(image => image.url).map(image => image.url)
    },
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
      const embedVideoUrl = Util.getEmbedVideoUrl(this.newGigData.videoUrl)
      const iframeVideo = embedVideoUrl ? `<h5 class="headline">Here Is A Video Showing Why You Should Avail Of My Gig!</h5><iframe src="${embedVideoUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>` : ''
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
${iframeVideo}
      `
    }
  },
  watch: {
    newGigData: {
      handler (val) { this.$store.commit('SET_NEW_STEEMGIG', val) },
      deep: true
    }
  },
  mounted () {
    this.$eventBus.$on('img-uploaded', payload => {
      console.log(payload)
      this.newGigData.portfolio[payload.index].url = payload.url
    })
    this.$eventBus.$on('delete-image-url', payload => {
      this.newGigData.portfolio.splice(payload, 1)
    })
  },
  deforeDestroy () {
    this.$eventBus.$off('img-uploaded')
    this.$eventBus.$off('delete-image-url')
  }
}
</script>

<style lang="scss" scoped>

</style>
