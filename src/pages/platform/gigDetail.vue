<template>
  <page :pageClasses="['profile__view', 'row']">
    <cat-nav />
    <el-main>
    <div class="container gig-detail">
      <div class="col s12 m8 l8 row">
        <ul class="tabs hide">
          <li class="tab col s3"><a class="waves-effect" :class="{active: currentView === 'active_gigs'}" @click="changeView('active_gigs')">DETAILS</a></li>
          <li class="tab col s3"><a class="waves-effect" :class="{active: currentView === 'inactive_gigs'}" @click="changeView('inactive_gigs')">REVIEWS</a></li>
        </ul>
        <div>
          <div class="post-container">
            <div v-if="contentLoaded" class="card-content">
              <h3>{{ title }}</h3>
                <p v-if="currentGig.json_metadata.category"><router-link :to="'/categories/' + currentGig.json_metadata.category">{{ currentGig.json_metadata.category }}</router-link> / <router-link :to="'/categories/' + currentGig.json_metadata.category + '/' + currentGig.json_metadata.subcategory">{{ currentGig.json_metadata.subcategory }}</router-link></p>
            </div>
            <div class="card-image">
              <carousel id="gig-image" v-if="portfolio.length > 0" :navigationEnabled="false" :autoplay="true" :perPage="1">
                <slide v-for="(image, index) in portfolio" :key="index">
                  <img :src="image" :alt="currentGig.title">
                </slide>
              </carousel>
            </div>
            <div class="card-content">
              <loading-placeholder v-if="!contentLoaded" />
              <div v-html="adjustedBody"></div>
              <div>
                <div v-if="contentLoaded" class="detail-action">
                  <div><a v-if="!unvoting" :class="!upvoted ? 'grey-text' : 'indigo-text'" @click="vote" v-tooltip="voteBtnTitle"><i class="fa fa-thumbs-up" aria-hidden="true"></i> {{ upvotes }}</a>
                  <a v-if="unvoting" v-tooltip="{content: 'please wait'}">
                    <i class="fa fa-spinner fa-pulse"></i>
                  </a>&nbsp;&nbsp;
                  <a v-if="currentGig.views" class="indigo-text" v-tooltip="'Number of views'"><i class="ion-eye"></i> {{ currentGig.views.length +'&nbsp;&nbsp;&nbsp;'}}</a>
                  <span v-tooltip="{ content: paymentInfo, classes: ['tooltip'] }">${{ payout.toString().slice(0, 4) }}</span></div>
                  <a @click="launchComment()" class="reply"><el-button type="secondary" class="secondary">Reply</el-button></a>
                  <div class="vote-slider py-3" v-if="upvoteActive">
                    <div class="col s9">
                      <slider-range :min="1" v-model="upvoteRange" />
                    </div>
                    <div class="col offset-s1 s2">
                      <a v-if="voting" v-tooltip="{content: 'please wait'}">
                        <i class="fa fa-spinner fa-pulse"></i>
                      </a>
                      <a @click="upvote" v-tooltip="voteBtnTitle" class="upvote-btn" :class="upvoted ? 'upvoted' : ''" v-if="!voting">
                        <i class="ion-chevron-up"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <share-options :title="title" :tags="tags.slice(0,3)" />
         <div class="comment-panel">
           <div v-if="commentMode">
                <vue-editor :editorToolbar="[]" v-model="myComment" class="comment-box" placeholder="Type comment here, you can drag and drop images" ></vue-editor>
                <div class="row right-align">
                  <div class="col s12 pt-2">
                    <el-button type="secondary" @click.prevent="commentMode = false" class="secondary waves-effect">Cancel</el-button>
                    <el-button type="primary" class="primary waves-effect" @click="postComment"><i class="fa fa-spinner fa-pulse" v-if="isPosting"></i>Post</el-button>
                  </div>
                </div>
              </div>
              <v-comment v-for="(comment, index) in comments" :thisComment="comment" :key="index" />
         </div>
        </div>
      </div>
       <div class="col s12 m4 l4">
        <div v-if="!profileLoaded" class="card-panel">
          <content-placeholders>
            <content-placeholders-img />
            <content-placeholders-text :lines="10" />
          </content-placeholders>
        </div>
        <profile-card v-if="profileLoaded" :profilepage="false" :profile="profile"></profile-card>
      </div>
    </div>
    </el-main>
  </page>
</template>

<script>
import sc2 from '@/services/sc2'
import Api from '@/services/api'
import Page from '@/components/page'
import CatNav from '@/components/layout/catNav'
import GigCard from '@/components/snippets/gigCard'
import { VueEditor } from 'vue2-editor'
import VComment from '@/components/snippets/comment'
import { Carousel, Slide } from 'vue-carousel'
import SliderRange from 'vue-slider-component'
import ProfileCard from '@/components/layout/profileCard'
import LoadingPlaceholder from '@/components/widgets/gigLoading'
import shareOptions from '@/components/snippets/share-options'
import moment from 'moment'
import userStatus from '@/mixins/status.js'
import form from '@/mixins/form.js'

export default {
  mixins: [userStatus, form],
  components: {
    Page,
    CatNav,
    GigCard,
    Carousel,
    Slide,
    VueEditor,
    VComment,
    SliderRange,
    LoadingPlaceholder,
    ProfileCard,
    shareOptions
  },
  data () {
    return {
      contentLoaded: false,
      profileLoaded: false,
      profile: {
        profile: {}
      },
      currentGig: {
        title: '',
        json_metadata: {
          images: []
        },
        body: ''
      },
      currentView: 'active_gigs',
      myComment: '',
      comments: [],
      commentMode: false,
      voting: false,
      unvoting: false,
      taskPicture: '',
      upvoteActive: false,
      upvoteRange: 100,
      isPosting: false
    }
  },
  watch: {
    'myComment': {
      handler: function () {
        this.saveDraft(this.currentGig.author + '/' + this.currentGig.permlink, this.myComment)
      }
    }
  },
  mounted () {
    let {username, task} = this.$route.params
    this.fetchUserInfo(username)
    Api.fetchSinglePost(username, task, this.$store.state.username || '').then(response => {
      this.currentGig = response.data
      this.fetchComments()
      this.contentLoaded = true
      const draft = this.getDrafts(this.currentGig.author + '/' + this.currentGig.permlink)
      if (draft) {
        this.myComment = draft
      }
    }).catch(err => {
      console.log(err)
    })
  },
  computed: {
    title () {
      return this.desteemgify(this.currentGig.title)
    },
    portfolio () {
      if (this.currentGig.json_metadata.images) {
        return this.currentGig.json_metadata.images.filter(Boolean)
      } else {
        return []
      }
    },
    adjustedBody () {
      return this.currentGig.body.replace(/<[^/>][^>]*><\/[^>]+>/igm, '')
    },
    sellerUsername () {
      return this.currentGig.author
    },
    genuineVoters () {
      if (this.currentGig.active_votes) {
        return this.currentGig.active_votes.filter((x) => x.weight !== 0)
      } else {
        return []
      }
    },
    upvotes () {
      return this.genuineVoters.length
    },
    payout () {
      let postCreationDate = moment(this.currentGig.created)._d
      let currentDate = moment()._d
      let timesince = moment(currentDate).diff(postCreationDate, 'minutes')
      // If post is greater than 7 days
      if (timesince > 10080) {
        return parseFloat(this.currentGig.curator_payout_value) + parseFloat(this.currentGig.total_payout_value)
      } else {
        return this.currentGig.pending_payout_value
      }
    },
    paymentInfo () {
      if ((new Date(this.currentGig.cashout_time).getTime()) > (new Date().getTime())) {
        return `Will payout in ${Math.floor((new Date(this.currentGig.cashout_time) - (new Date())) / (1000 * 60 * 60 * 24))} days`
      } else {
        return `Author Payout: ${'$' + this.currentGig.total_payout_value}
        Curator Payout: ${'$' + this.currentGig.curator_payout_value}`
      }
    },
    myVote () {
      if (this.currentGig.active_votes) {
        return this.currentGig.active_votes.filter((x) => x.voter === this.$store.state.username)
      } else {
        return []
      }
    },
    upvoted () {
      if (this.myVote.length > 0) {
        let status = false
        this.myVote.forEach(element => {
          status = status || element.weight > 0
        })
        return status
      } else {
        return false
      }
    },
    voteBtnTitle () {
      if (this.upvoted) {
        return { content: 'unvote', classes: ['tooltip'] }
      } else {
        return { content: 'upvote', classes: ['tooltip'] }
      }
    },
    tags () {
      return this.currentGig.json_metadata.tags
    }
  },
  methods: {
    launchComment () {
      if (this.userLoggedIn()) {
        this.commentMode = true
      }
    },
    async fetchUserInfo (username) {
      try {
        let response = await Api.fetchUserData(username)
        this.profile = response.data
        this.profileLoaded = true
      } catch (err) {
        console.log('error retrieving user info: \n error:', this.stringify(err))
      }
    },
    changeView (view) {
      this.currentView = view
    },
    async fetchComments () {
      this.comments = ''
      try {
        let response = await Api.fetchComments(this.currentGig.author, this.currentGig.permlink)
        this.comments = response.data
      } catch (err) {
        console.log('error retrieving comments: \n error:', this.stringify(err))
      }
    },
    postComment () {
      this.isPosting = true
      Api.comment({parentAuthor: this.currentGig.author, parentPermlink: this.currentGig.permlink, username: this.$store.state.username, body: this.myComment}, this.$store.state.accessToken).then((result) => {
        this.isPosting = false
        this.commentMode = false
        this.comments = result.data
        this.myComment = ''
        this.fetchComments()
      }).catch((e) => {
        this.isPosting = false
        console.log(e)
      })
    },
    vote () {
      if (this.upvoted) {
        this.downvote()
      } else {
        this.upvoteActive = !this.upvoteActive
      }
    },
    upvote () {
      this.voting = true
      console.log('upvoting')
      sc2.setAccessToken(this.$store.state.accessToken)
      sc2.vote(this.$store.state.username, this.currentGig.author, this.currentGig.permlink, parseInt(this.upvoteRange) * 100, (err, res) => {
        this.voting = false
        if (!err) {
          this.upvoteActive = false
          this.currentGig.active_votes.push({voter: this.$store.state.username, weight: parseInt(this.upvoteRange)})
          console.log(res)
        } else {
          this.$notify({
            group: 'foo',
            title: 'Error voting',
            text: 'You have exceeded maximum vote toggles for this post',
            type: 'error'
          })
        }
      })
    },
    downvote () {
      this.unvoting = true
      sc2.setAccessToken(this.$store.state.accessToken)
      sc2.vote(this.$store.state.username, this.currentGig.author, this.currentGig.permlink, 0, (err, res) => {
        this.unvoting = false
        console.log(err, res)
        if (!err) {
          this.currentGig.active_votes = this.currentGig.active_votes.filter((x) => x.voter !== this.$store.state.username)
          console.log(res)
        } else {
          console.log('there was an error unvoting this\n', 'err:', err)
          this.$notify({
            group: 'foo',
            title: 'Error voting',
            text: 'You have exceeded maximum vote toggles for this post',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  max-width: 100% !important;
}
.post-container {
  background: white;
  padding: 20px;
  box-shadow: 0 3px 13px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

  .card-image img {
   width: 100%;
   border-radius: 10px;
   max-height: 350px;
  }
  .detail-action {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .vote-slider {
    max-width: 300px;
  }
  .container {
    min-width: 90%;
  }
  .menu {
    height: 50px;
    a,.link,a *{
      cursor: pointer;
    }
  }
  .tabs {
    width: 100%;
    float: left;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    a {
      color: rgb(63, 78, 188);
      font-size: 1.1em;
      cursor: pointer;
      transition: all ease-in-out .3s;
      &:hover {
        color: rgb(63, 80, 198);
      }
      &.active {
        border-bottom: 2px rgb(63, 78, 188);
        color: rgb(63, 80, 198);
        position: relative;
        &:after {
          content: ' ';
          width: 100%;
          position: absolute;
          bottom: 0;
          height: 2px;
          left: 0;
          background: rgb(63, 78, 188);
        }
      }
    }
  }

  .headline {
    background: 0;
  }
  .inactiveGigs {
    .card {
      opacity: 0.6;
    }
  }

  // Post specific header & text styling, overrides steemgigs.scss

  .gig-detail .post-container h1, h2, h3, h4, h5 {
  margin: 15px 0;
}

.gig-detail .post-container h1 {
  font-size: 2em;
}

.gig-detail .post-container h2 {
  font-size: 1.5em;
}

.gig-detail .post-container h3 {
  font-size: 1.25em;
  margin-top: 0;

}

.gig-detail .post-container h4 {
  font-size: 1em;
}

.gig-detail .post-container h5 {
  color: 0.9em;
}

.gig-detail .post-container p {
  font-size: 14px;
}

.gig-detail .post-container span {
  font-size: 14px;
}

.comment-panel {
  margin-top: 20px;
}

.comment-box {
  background: white;
  border-radius: 10px;
}

.ql-toolbar.ql-snow {
  border: 0 !important;
}

#gig-image {
  width: 75%;
  display: block;
  margin: auto;
}

</style>
