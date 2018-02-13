<template>
  <div class="comment py-3">
    <img src="https://avatars2.githubusercontent.com/u/7319749?s=400&v=4" class="author-image">
    <p>
      <span class="username">{{commentFor.author}}</span><span>&nbsp;(50)</span><span class="how-long">&nbsp;&nbsp; yesterday</span>
    </p>
    <p class="post" v-html="commentFor.body"></p>
    <div class="menu mb-2">
      <a v-if="!unvoting" :class="!upvoted ? 'grey-text' : 'indigo-text'" @click="vote" v-tooltip="voteBtnTitle"><i class="fa fa-thumbs-up" aria-hidden="true"></i> {{ upvotes }}</a>
      <a v-if="unvoting" v-tooltip="{content: 'please wait'}">
        <i class="fa fa-spinner fa-pulse"></i>
      </a>&nbsp;
      <span class="payout">$0.00</span>&nbsp; | &nbsp; <a @click="commentMode = !commentMode" class="reply">Reply</a>
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
      <vue-editor v-model="myComment" placeholder="Type your comment here, you can drag and drop images" ></vue-editor>
      <div class="row right-align">
        <div class="col s12 pt-2">
          <button @click.prevent="commentMode = false" class="btn indigo lighten-2 waves-effect">Cancel</button>
          <button class="btn indigo waves-effect" @click="postComment"><i class="fa fa-spinner fa-pulse" v-if="isPosting"></i> Post</button>
        </div>
      </div>
    </div>
    <v-comment v-for="(comment, index) in comments" :key="index" :commentFor="comment"/>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
import SliderRange from 'vue-slider-component'
import Api from '@/services/api'
import sc2 from '@/services/sc2'

export default {
  name: 'v-comment',
  components: {
    VueEditor,
    SliderRange
  },
  data () {
    return {
      commentMode: false,
      myComment: '',
      comments: [],
      voting: false,
      unvoting: false,
      taskPicture: '',
      upvoteActive: false,
      upvoteRange: 100,
      isPosting: false
    }
  },
  props: {
    commentFor: {
      type: Object,
      required: true
    }
  },
  methods: {
    async fetchComments () {
      try {
        let response = await Api.fetchComments({parent_author: this.commentFor.author, parent_permlink: this.commentFor.permlink})
        this.comments = response.data
        console.log(this.comments)
      } catch (err) {
        console.log('error retrieving comments: \n error:', this.stringify(err))
      }
    },
    async fetchCommentImg () {
      try {
        let result = await Api.fetchCommentImg(this.commentFor.author).data
        console.log(result)
      } catch (err) {
        return 'error retrieving comments: \n error:'
      }
    },
    postComment () {
      let now = new Date().toISOString().replace(/-/g, '').replace(/:/g, '').replace(/\./g, '').replace(/Z/, 'z').replace(/T/, 't')
      this.isPosting = true
      let that = this
      let permlink = `re-${this.commentFor.author}-${this.commentFor.permlink}-${now}`
      console.log(this.myComment)
      sc2.comment(this.commentFor.author, this.commentFor.permlink, this.$store.state.username, permlink, '', this.myComment, {generated: true}, (err, res) => {
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
      sc2.setAccessToken(this.$store.state.accessToken)
      sc2.vote(this.$store.state.username, this.commentFor.author, this.commentFor.permlink, parseInt(this.upvoteRange) * 100, (err, res) => {
        this.voting = false
        console.log(err, res)
        if (!err) {
          this.fetchComments()
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
          this.fetchComments()
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
        return '$' + this.commentFor.pending_payout_value.amount
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
      return this.myVote.length > 0
    },
    voteBtnTitle () {
      if (this.upvoted) {
        return { content: 'unvote', classes: ['tooltip'] }
      } else {
        return { content: 'upvote', classes: ['tooltip'] }
      }
    },
    imgUrl () {
      // return this.fetchCommentImg()
      return ''
    }
  },
  watch: {
  },
  mounted () {
    this.fetchComments()
  }
}
</script>
<style lang="scss" scoped>
  $blue: #4757b2;
.comment {
  position: relative;
  padding-left: 80px;
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
    height: 60px;
    width: 60px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    background: indigo;
    position: absolute;
    left: 0;
    top: 25px;
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
