<template>
  <page :pageClasses="['', '']">
    <cat-nav />
    <div class="container">
      <div class="col s12 m8 l9 row details">
          <div class="col s12 pagedescription">
            <p>This is a very important segment of SteemGigs. On SteemGigs, "everyone has something to offer". "Everyone" will eventually become a "dream-builder" (SteemGigger), building their dreams and those of others. To accomplish this, we create a bank, for "deposits & withdrawals" of all the bits & bytes that we will ever need to build any dream (however limitless).
We will vault all this knowledge in our bank, in the form of unadulterated excerpts from the brains, lives, experiences etc of "reputable great minds", sepcific to every niche, field, industry, expertise etc.
"By means of your incessant contributions, we will surpass Google (attain limitlessness), reshaping the worldwide web with the freshness of our awesomeness". @surpassinggoogle</p>
          </div>
          <div class="cardcontainer">
            <div class="col s2 m2 19 catCard" v-for="(cat,index) in category" :key="index">
            <router-link :to="'surpassinggoogle/' + slugify(cat.name)">{{ capitalize(cat.name) }}</router-link>
             <br />
              <p>{{cat.description}}</p>
            </div>
           </div>
      </div>
    </div>
  </page>
</template>

<script>
import sc2 from '@/services/sc2'
import Api from '@/services/api'
import Page from '@/components/page'
import CatNav from '@/components/layout/catNav'
import SurpassCard from '@/components/snippets/SurpassCatCard'
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
    'cat-card': SurpassCard,
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
      isPosting: false,
      category: this.categories[4].subcategories
    }
  },
  props: {
    CatData: Object,
    type: {
      type: String,
      default: 'steemgigs'
    }
  },
  mounted () {
    let {username, task} = this.$route.params
    this.fetchUserInfo(username)
    Api.fetchSinglePost(username, task, this.$store.state.username || '').then(response => {
      this.currentGig = response.data
      this.fetchComments()
      this.contentLoaded = true
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
        return '$' + this.currentGig.pending_payout_value
      } else {
        return '$' + (parseInt(this.currentGig.total_payout_value.split(' ')[0]) + parseInt(this.currentGig.curator_payout_value.split(' ')[0])).toFixed(2)
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
  .container {
    min-width: 90%;
  }
  .pagedescription {
    width: 100%;
    height: 200px;
    background-color: white;
  }
  .details {
    margin-top: 100px;

  }
  .catCard {
    display: inline-block;
    height: 300px;
    width: auto;
    background-color: white;
    margin: 10px;
  }
  .cardcontainer {
    padding-left: 10%;
  }
  .menu {
    height: 50px;
    a,.link,a *{
      cursor: pointer;
    }
  }
</style>
