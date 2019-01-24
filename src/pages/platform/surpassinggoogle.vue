<template>
  <page :pageClasses="['', '']">
    <cat-nav />
    <el-main>
    <div class="container">
      <div class="col s12 row details">
          <div class="col s12">
            <h3 class="center">SurpassingGoogle</h3>
            <h5 class="center">This is a very important segment of SteemGigs. On SteemGigs, "everyone has something to offer". Everyone participant of our ecosystem will eventually become a 'dream-builder' (SteemGigger), building their dreams and those of others. To accomplish this, we have created a bank, for 'deposits & withdrawals' of all the bits & bytes that one will ever need to build any noble dream (however limitless). <br>
We will vault all this knowledge in our bank, in the form of unadulterated excerpts from the brains, lives, experiences etc of 'reputable great minds', specific to every niche, field, industry, expertise etc.
<i>By means of your incessant contributions, we will surpass Google (attain limitlessness), reshaping the worldwide web with the freshness of our awesomeness</i>.<b>@surpassinggoogle</b></h5>
          </div>
          <div class="col s12 m6 l4" v-for="(cat,index) in category" :key="index">
            <div class="surpassing-card">
              <div class="card-content">
                <h3>{{ capitalize(cat.name) }}</h3>
                <p>{{cat.description}}</p>
              </div>
              <router-link :to="'surpassinggoogle/' + slugify(cat.name)"><el-button class="surpass-card-button secondary" type="secondary">Submit a Post</el-button></router-link>
            </div>
          </div>
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
import { VueEditor } from 'vue2-editor'
import VComment from '@/components/snippets/comment'
import { Carousel, Slide } from 'vue-carousel'
import SliderRange from 'vue-slider-component'
import ProfileCard from '@/components/layout/profileCard'
import LoadingPlaceholder from '@/components/widgets/gigLoading'
export default {
  components: {
    Page,
    CatNav,
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
  .pagedescription {
    width: 100%;
    height: 200px;
    background-color: white;
  }
  .links {
    text-decoration: underline;
    font-size: large;
    font-weight: bold;
  }
  .catCard {
    display: inline-block;
    height: 350px;
    width: auto;
    background-color: white;
    margin: 10px;
  }
  .cardcontainer {
    padding-left: 0%;
  }
  .menu {
    height: 50px;
    a,.link,a *{
      cursor: pointer;
    }
  }
  .catCard {
    margin-bottom: 1.5rem;
    .card-content {
      min-height: 19rem;
    }
  }

  .surpassing-card {
    box-shadow: 0 3px 13px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    text-align: center;
    background: white;
    padding: 20px;
    min-height: 325px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .surpass-card-button {
    display: block;
    margin: 0 auto;
  }
</style>
