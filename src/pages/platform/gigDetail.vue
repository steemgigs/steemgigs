<template>
  <page :pageClasses="['profile__view', 'row']">
    <cat-nav />
    <div class="container gig-detail">
      <div class="col s12 m8 l9 row">
        <ul class="tabs hide">
          <li class="tab col s3"><a class="waves-effect" :class="{active: currentView === 'active_gigs'}" @click="changeView('active_gigs')">DETAILS</a></li>
          <li class="tab col s3"><a class="waves-effect" :class="{active: currentView === 'inactive_gigs'}" @click="changeView('inactive_gigs')">REVIEWS</a></li>
        </ul>
        <div class="col s12">
          <div class="card">
            <div v-if="contentLoaded" class="card-content">
              <span class="card-title">{{ title }}</span>
                <p v-if="currentGig.json_metadata.category"><router-link :to="'/categories/' + currentGig.json_metadata.category">{{ currentGig.json_metadata.category }}</router-link> / <router-link :to="'/categories/' + currentGig.json_metadata.category + '/' + currentGig.json_metadata.subcategory">{{ currentGig.json_metadata.subcategory }}</router-link></p>
            </div>
            <div class="card-image z-depth-1">
              <carousel v-if="portfolio.length > 0" :navigationEnabled="false" :autoplay="true" :perPage="1">
                <slide v-for="(image, index) in portfolio" :key="index">
                  <img :src="image" :alt="currentGig.title">
                </slide>
              </carousel>
            </div>
            <div class="card-content">
              <loading-placeholder v-if="!contentLoaded" />
              <div v-html="currentGig.body"></div>
              <div class="menu row mb-2">
                <div v-if="contentLoaded" class="col detail-action m3 offset-m9">
                  <a v-if="!unvoting" :class="!upvoted ? 'grey-text' : 'indigo-text'" @click="vote" v-tooltip="voteBtnTitle"><i class="fa fa-thumbs-up" aria-hidden="true"></i> {{ upvotes }}</a>
                  <a v-if="unvoting" v-tooltip="{content: 'please wait'}">
                    <i class="fa fa-spinner fa-pulse"></i>
                  </a>&nbsp;
                  <span v-tooltip="{ content: paymentInfo, classes: ['tooltip'] }">{{payout}}</span>&nbsp; | &nbsp; <a @click="commentMode = !commentMode" class="reply">Reply</a>
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
              <div v-if="commentMode">
                <vue-editor :editorToolbar="[]" v-model="myComment" placeholder="Type comment here, you can drag and drop images" ></vue-editor>
                <div class="row right-align">
                  <div class="col s12 pt-2">
                    <button @click.prevent="commentMode = false" class="btn indigo lighten-2 waves-effect">Cancel</button>
                    <button class="btn indigo waves-effect" @click="postComment"><i class="fa fa-spinner fa-pulse" v-if="isPosting"></i> Post</button>
                  </div>
                </div>
              </div>
              <v-comment v-for="(comment, index) in comments" :thisComment="comment" :key="index" />
            </div>
          </div>
        </div>
      </div>
       <div class="col s12 m4 l3">
        <div v-if="!profileLoaded" class="card-panel">
          <content-placeholders>
            <content-placeholders-img />
            <content-placeholders-text :lines="10" />
          </content-placeholders>
        </div>
        <profile-card v-if="profileLoaded" :profilepage="false" :profile="profile"></profile-card>
      </div>
    </div>
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
// import steem from 'steem'
export default {
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
    ProfileCard
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
        pending_payout_value: {
          amount: 0
        },
        total_payout_value: {
          amount: 0
        },
        curator_payout_value: {
          amount: 0
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
  mounted () {
    let {username, task} = this.$route.params
    this.fetchUserInfo(username)
    Api.fetchSinglePost(username, task).then(response => {
      this.contentLoaded = true
      this.currentGig = response.data
      this.fetchComments()
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
        return this.currentGig.json_metadata.images
      } else {
        return []
      }
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
      if (this.currentGig.pending_payout_value) {
        return '$' + parseFloat(this.currentGig.pending_payout_value)
      } else {
        return '$' + (parseFloat(this.currentGig.total_payout_value.amount) + parseFloat(this.currentGig.curator_payout_value.amount))
      }
    },
    paymentInfo () {
      if ((new Date(this.currentGig.cashout_time).getTime()) > (new Date().getTime())) {
        return `Will payout in ${Math.floor((new Date(this.currentGig.cashout_time) - (new Date())) / (1000 * 60 * 60 * 24))} days`
      } else {
        return `Author Payout: ${'$' + this.currentGig.total_payout_value.amount}
        Curator Payout: ${'$' + this.currentGig.curator_payout_value.amount}`
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
    }
  },
  methods: {
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
      console.log('Fetching comments')
      try {
        let response = await Api.fetchComments(this.currentGig.author, this.currentGig.permlink)
        this.comments = response.data
        console.log(this.comments)
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
          // this.fetchThisComment()
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
  .card-image img {
    height: 30em;
  }
  .detail-action {
    box-shadow: 0 4px 17px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    background-color: aliceblue;
    padding: 10px;
    .reply {
      color: #4d5db6
    }
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
  .card-title {
    font-size: 1.7em;
    font-weight: 600;
  }
  .tabs {
    width: 100%;
    float: left;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    a {
      color: rgb(63, 78, 188);
      font-weight: 600;
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
  .inactiveGigs {
    .card {
      opacity: 0.6;
    }
  }
</style>
