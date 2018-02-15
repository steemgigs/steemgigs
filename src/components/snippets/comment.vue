<template>
  <div class="comment py-3">
    <img :src="imgUrl" class="author-image">
    <p>
      <router-link class="username" :to="'/@' + commentFor.author" v-text="commentFor.author"></router-link><span>&nbsp;({{rep}})</span><span class="how-long">&nbsp;&nbsp; {{timeAgo}}</span>
    </p>
    <p class="post" v-html="commentFor.body"></p>
    <div class="menu mb-2">
      <a v-if="!unvoting" :class="!upvoted ? 'grey-text' : 'indigo-text'" @click="vote" v-tooltip="voteBtnTitle"><i class="fa fa-thumbs-up" aria-hidden="true"></i> {{ upvotes }}</a>
      <a v-if="unvoting" v-tooltip="{content: 'please wait'}">
        <i class="fa fa-spinner fa-pulse"></i>
      </a>&nbsp;
      <span v-tooltip="{ content: paymentInfo, classes: ['tooltip'] }">{{ payout }}</span>&nbsp; | &nbsp; <a @click="commentMode = !commentMode" class="reply">Reply</a>
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
    <div v-if="commentMode">
      <textarea rows="20" v-model="myComment" placeholder="Type your comment here, you can drag and drop images" ></textarea>
      <div class="row right-align">
        <div class="col s12 pt-2">
          <button @click.prevent="commentMode = false" class="btn indigo lighten-2 waves-effect">Cancel</button>
          <button class="btn indigo waves-effect" @click="postComment"><i class="fa fa-spinner fa-pulse" v-if="isPosting"></i> Post</button>
        </div>
      </div>
    </div>
    <v-comment v-for="(comment, index) in comments" :key="index" :thisComment="comment"/>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
import SliderRange from 'vue-slider-component'
import Api from '@/services/api'
import sc2 from '@/services/sc2'
import moment from 'moment'

export default {
  name: 'v-comment',
  components: {
    VueEditor,
    SliderRange
  },
  data () {
    return {
      commentFor: this.thisComment,
      commentMode: false,
      myComment: '',
      comments: [],
      voting: false,
      unvoting: false,
      taskPicture: '',
      upvoteActive: false,
      upvoteRange: 100,
      isPosting: false,
      imgUrl: '',
      rep: ''
    }
  },
  props: {
    thisComment: {
      type: Object,
      required: true
    }
  },
  methods: {
    async fetchComments () {
      try {
        let response = await Api.fetchComments({parent_author: this.commentFor.author, parent_permlink: this.commentFor.permlink})
        this.comments = response.data
      } catch (err) {
        console.log('error retrieving comments: \n error:', this.stringify(err))
      }
    },
    async fetchCommentInfo () {
      try {
        let result = await Api.fetchCommentInfo(this.commentFor.author)
        this.imgUrl = result.data.profileImage
        this.rep = result.data.rep
      } catch (err) {
        return 'error retrieving comments: \n error:'
      }
    },
    async fetchThisComment () {
      try {
        let response = await Api.fetchSingleComment({author: this.commentFor.author, permlink: this.commentFor.permlink})
        this.commentFor = response.data
        console.log('post fetched', response.data)
      } catch (err) {
        console.log(err)
      }
    },
    postComment () {
      let now = new Date().toISOString().replace(/-/g, '').replace(/:/g, '').replace(/\./g, '').replace(/Z/, 'z').replace(/T/, 't')
      this.isPosting = true
      let that = this
      let permlink = `re-${this.commentFor.author}-${this.commentFor.permlink}-${now}`
      sc2.comment(this.commentFor.author, this.commentFor.permlink, this.$store.state.username, permlink, '', this.myComment, {generated: true}, (err, res) => {
        console.log(err, res)
        that.isPosting = false
        that.commentMode = false
        let commentObject = {
          '_id': '5a8497b24938f68db8de0102',
          'abs_rshares': 971952359,
          'active_votes': [],
          'allow_curation_rewards': true,
          'allow_replies': true,
          'allow_votes': true,
          'author': that.$store.state.username,
          'author_rewards': 0,
          'beneficiaries': [],
          'body': that.myComment,
          'body_length': 0,
          'cashout_time': '2018-02-21T20:08:00.000Z',
          'category': 'steemgigs',
          'children': 0,
          'children_abs_rshares': 0,
          'community': '',
          'created': new Date(),
          'curator_payout_value': {
            'amount': 0,
            'asset': 'SBD'
          },
          'depth': 6,
          'id': 32680753,
          'json_metadata': {
            'generated': true,
            'tags': [],
            'users': []
          },
          'last_payout': '1970-01-01T00:00:00.000Z',
          'last_update': '2018-02-14T20:08:00.000Z',
          'max_accepted_payout': {
            'amount': 1000000,
            'asset': 'SBD'
          },
          'max_cashout_time': '1969-12-31T23:59:59.000Z',
          'net_rshares': 366020034,
          'net_votes': 1,
          'parent_author': that.commentFor.author,
          'parent_permlink': that.commentFor.permlink,
          'patched': false,
          'pending_payout_value': {
            'amount': 0,
            'asset': 'SBD'
          },
          'percent_steem_dollars': 10000,
          'permlink': permlink,
          'promoted': {
            'amount': 0,
            'asset': 'SBD'
          },
          'reblogged_by': [],
          'replies': [],
          'reward_weight': 10000,
          'root_comment': 29989383,
          'root_identifier': that.commentFor.root_identifier,
          'root_title': that.commentFor.root_title,
          'tags': [],
          'title': '',
          'total_payout_value': {
            'amount': 0,
            'asset': 'SBD'
          },
          'total_pending_payout_value': {
            'amount': 0,
            'asset': 'STEEM'
          },
          'total_vote_weight': 0,
          'updatedAt': '2018-02-15T11:31:41.024Z',
          'vote_rshares': 605932325
        }
        that.comments.push(commentObject)
        that.myComment = ''
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
      sc2.vote(this.$store.state.username, this.commentFor.author, this.commentFor.permlink, parseInt(this.upvoteRange) * 100, (err, res) => {
        this.voting = false
        if (!err) {
          // this.fetchThisComment()
          this.upvoteActive = false
          this.commentFor.active_votes.push({voter: this.$store.state.username, weight: parseInt(this.upvoteRange)})
          console.log(res)
        } else {
          console.log('there was an error voting this\n', 'err:', err)
        }
      })
    },
    downvote () {
      this.unvoting = true
      sc2.setAccessToken(this.$store.state.accessToken)
      sc2.vote(this.$store.state.username, this.commentFor.author, this.commentFor.permlink, 0, (err, res) => {
        this.unvoting = false
        console.log(err, res)
        if (!err) {
          this.commentFor.active_votes = this.commentFor.active_votes.filter((x) => x.voter !== this.$store.state.username)
          console.log(res)
        } else {
          console.log('there was an error unvoting this\n', 'err:', err)
        }
      })
    }
  },
  computed: {
    sellerUsername () {
      return this.commentFor.author
    },
    genuineVoters () {
      if (this.commentFor.active_votes) {
        return this.commentFor.active_votes.filter((x) => x.weight !== 0)
      } else {
        return []
      }
    },
    upvotes () {
      return this.genuineVoters.length
    },
    payout () {
      if (this.commentFor.pending_payout_value.amount) {
        return '$' + parseFloat(this.commentFor.pending_payout_value.amount)
      } else {
        return '$' + (parseFloat(this.commentFor.total_payout_value.amount) + parseFloat(this.commentFor.curator_payout_value.amount))
      }
    },
    paymentInfo () {
      if ((new Date(this.commentFor.cashout_time).getTime()) > (new Date().getTime())) {
        return `Will payout in ${Math.floor((new Date(this.commentFor.cashout_time) - (new Date())) / (1000 * 60 * 60 * 24))} days`
      } else {
        return `Author Payout: ${'$' + this.commentFor.total_payout_value.amount}
        Curator Payout: ${'$' + this.commentFor.curator_payout_value.amount}`
      }
    },
    myVote () {
      if (this.commentFor.active_votes) {
        return this.commentFor.active_votes.filter((x) => x.voter === this.$store.state.username)
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
    timeAgo () {
      return moment(this.commentFor.created, 'YYYYMMDD').startOf('hour').fromNow()
    }
  },
  watch: {
  },
  mounted () {
    this.fetchComments()
    this.fetchCommentInfo()
  }
}
</script>
<style lang="scss" scoped>
  $blue: #4757b2;
.comment {
  position: relative;
  padding-left: 65px;
  margin: 10px auto;
  a,.link,a *{
    cursor: pointer;
  }
  .username {
    font-weight: 700;
    color: darkslategray;
  }
  .how-long {
    color: gray;
    font-weight: 400;
  }
  .post {
    color: rgb(51, 51, 51);
  }
  .reply {
    color: #939edc
  }
  img.author-image {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    background: indigo;
    position: absolute;
    left: 0;
    top: 15px;
  }
  .vote-slider {
    max-width: 300px;
  }
  a.upvote-btn {
    display: inline-block;
    padding: 0px 4px;
    border: 1px solid gray;
    border-radius: 50%;
    font-size: .8rem;
    &.upvoted {
      border-radius: 1px solid $blue;
      background-color: $blue;
      i {
        color: white;
      }
    }
    i {
      color: gray;
    }
  }
  .ql-editor {
    min-height: 80px;
  }
}
</style>
