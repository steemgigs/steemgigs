<template>
  <page :pageClasses="['profile__view', 'row']">
    <cat-nav />
    <div class="container">
      <div class="col s12 m8 l9 row">
        <ul class="tabs hide">
          <li class="tab col s3"><a class="waves-effect" :class="{active: currentView === 'active_gigs'}" @click="changeView('active_gigs')">DETAILS</a></li>
          <li class="tab col s3"><a class="waves-effect" :class="{active: currentView === 'inactive_gigs'}" @click="changeView('inactive_gigs')">REVIEWS</a></li>
        </ul>
        <div class="col s12">
          <div class="card">
            <div class="card-content">
              <span class="card-title">{{ title }}</span>
            </div>
            <div class="card-image">
              <carousel v-if="portfolio.length > 0" :navigationEnabled="false" :autoplay="true" :perPage="1">
                <slide v-for="(image, index) in portfolio" :key="index">
                  <img :src="image" class="responsive-img" :alt="currentGig.title">
                </slide>
              </carousel>
            </div>
            <div class="card-content">
              <loading-placeholder v-if="!contentLoaded" />
              <div v-html="currentGig.body"></div>
              <hr class="my-4">
              <div class="menu row mb-2">
                <div class="col m3 offset-m9">
                  <a v-if="!unvoting" :class="!upvoted ? 'grey-text' : 'indigo-text'" @click="vote" v-tooltip="voteBtnTitle"><i class="fa fa-thumbs-up" aria-hidden="true"></i> {{ upvotes }}</a>
                  <a v-if="unvoting" v-tooltip="{content: 'please wait'}">
                    <i class="fa fa-spinner fa-pulse"></i>
                  </a>&nbsp;
                  <span v-tooltip="{ content: 'paymentInfo', classes: ['tooltip'] }">44</span>&nbsp; | &nbsp; <a @click="commentMode = !commentMode" class="link">Reply</a>
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
        <div class="card-panel profileOwner">
          <content-placeholders v-if="!profileLoaded">
            <content-placeholders-img />
            <content-placeholders-text :lines="10" />
          </content-placeholders>
          <span class="editProfile waves-effect" v-if="$store.state.username === profileData.account">
            <i class="icon ion-android-create"></i>
          </span>
          <label class="profilePic" for="profile_image">
            <input type="file" accept="image/png,image/jpeg" class="hide" id="profile_image">
            <img :src="profile.profile_image" class="user-pict-img" :alt="profileData.account" width="150" height="150">
          </label>
          <span class="username" v-text="profile.name"></span>
          <span class="expertise">Experienced Web Developer</span>
          <span class="ratings">
            <i class="icon ion-ios-star amber-text" v-for="(star, index) in 5" :key="index"></i> 5.0 (2 reviews)
          </span>
          <p class="location"><i class="icon ion-android-pin"></i> From <span class="right" v-text="profile.location"></span></p>
          <p class="member_since"> <i class="icon ion-android-person"></i> Member since <span class="right" v-text="since"></span></p>
          <p class="member_since"> <i class="icon ion-ios-briefcase"></i> Last delivery <span class="right" v-text="ago"></span></p>
          <p>
            <i class="icon ion-android-plane"></i>
            Vacation mode
            <span class="right">
              <div class="switch" v-if="$store.state.username === profileData.account">
                <label>
                  <input type="checkbox" v-model="vacation_mode" :disabled="$store.state.username !== profileData.account">
                  <span class="lever"></span>
                </label>
              </div>
            </span>
          </p>
          <hr>
          <div class="moreProfileInfo">
            <span class="card-title">Description</span>
            <p v-text="profile.about"></p>
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
import GigCard from '@/components/snippets/gigCard'
import { VueEditor } from 'vue2-editor'
import VComment from '@/components/snippets/comment'
import sc2 from '@/services/sc2'
import { Carousel, Slide } from 'vue-carousel'
import moment from 'moment'
import SliderRange from 'vue-slider-component'
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
    LoadingPlaceholder
  },
  data () {
    return {
      contentLoaded: false,
      profileLoaded: false,
      profile: {},
      profileData: {},
      currentGig: {
        title: '',
        json_metadata: {
          images: []
        }
      },
      vacation_mode: false,
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
      return this.currentGig.json_metadata.images
    },
    since () {
      return moment(this.profileData.created).format('MMMM YYYY')
    },
    ago () {
      return moment(this.profileData.last_post).fromNow()
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
    // payout () {
    //   if (this.currentGig.pending_payout_value.amount) {
    //     return '$' + this.currentGig.pending_payout_value.amount
    //   } else {
    //     return '$' + (parseFloat(this.currentGig.total_payout_value.amount) + parseFloat(this.currentGig.curator_payout_value.amount))
    //   }
    // },
    // paymentInfo () {
    //   if ((new Date(this.currentGig.cashout_time).getTime()) > (new Date().getTime())) {
    //     return `Will payout in ${Math.floor((new Date(this.currentGig.cashout_time) - (new Date())) / (1000 * 60 * 60 * 24))} days`
    //   } else {
    //     return `Author Payout: ${'$' + this.currentGig.total_payout_value.amount}
    //     Curator Payout: ${'$' + this.currentGig.curator_payout_value.amount}`
    //   }
    // },
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
        this.profileData = response.data
        this.profile = this.profileData.profile
        this.profileLoaded = true
        console.log(this.profileData)
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
        let response = await Api.fetchComments({parent_author: this.currentGig.author, parent_permlink: this.currentGig.permlink})
        this.comments = response.data
        console.log(this.comments)
      } catch (err) {
        console.log('error retrieving comments: \n error:', this.stringify(err))
      }
    },
    postComment () {
      let now = new Date().toISOString().replace(/-/g, '').replace(/:/g, '').replace(/\./g, '').replace(/Z/, 'z').replace(/T/, 't')
      this.isPosting = true
      let that = this
      let permlink = `re-${this.currentGig.author}-${this.currentGig.permlink}-${now}`
      console.log(permlink)
      sc2.comment(this.currentGig.author, this.currentGig.permlink, this.$store.state.username, permlink, '', this.myComment, {generated: true}, (err, res) => {
        console.log(err, res)
        that.isPosting = false
        if (!err) this.fetchComments()
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
          console.log('there was an error voting this\n', 'err:', err)
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
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
  h2.headline {
    color: rgb(160, 158, 158);
    font-size: 2.5;
  }
  .profileOwner {
    position: relative;
    .profilePic {
      cursor: pointer;
      float: none;
      display: block;
      position: relative;
      margin: 0 auto 15px;
      border-radius: 0;
      object-fit: cover;
      overflow: visible;
      box-sizing: border-box;
      width: 150px;
      height: 150px;
      &::before {
        background: rgba(0,0,0,.65);
        content: "\F030";
        font: 30px/150px FontAwesome;
        color: #fff;
        border-radius: 50%;
        position: absolute;
        z-index: 3;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        text-align: center;
      }
      img.user-pict-img {
        border-radius: 50%;
        width: 150px;
        height: 150px;
        display: block;
      }
    }
    span {
      display: block;
      text-align: center;
      &.username {
        font-weight: 600;
      }
      &.editProfile {
        cursor: pointer;
        display: inline-block;
        position: absolute;
        border-radius: 50%;
        padding: 0 0.5em;
        top: 1em;
        right: 0.5em;
        i.icon {
          font-size: 1.5em;
        }
      }
    }
    p {
      i.icon {
        margin-right: 0.5em;
      }
      span.right {
        font-weight: 600;
        .switch {
          margin-top: 0.2em;
        }
      }
    }
  }
  .moreProfileInfo {
    .card-title {
      font-size: 1.2em;
      font-weight: 600;
      &:first-child {
        font-size: 1.2em;
        margin-top: 1em;
        margin-bottom: -0.6em;
        text-align: left;
      }
      &:not(:first-child) {
        margin-top: 1em;
      }
    }
    ul {
      margin-top: 0;
    }
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
