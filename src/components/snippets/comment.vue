<template>
  <div class="comment py-3">
    <img :src="sellerImg" class="author-image">
    <p>
      <router-link class="username" :to="'/@' + commentFor.author" v-text="commentFor.author"></router-link><span>&nbsp;({{sellerRep}})</span><span class="how-long">&nbsp;&nbsp; {{timeAgo}}</span>
    </p>
    <vue-markdown>{{commentFor.body}}</vue-markdown>
    <div  v-if="commentFor.allow_replies" class="menu mb-2">
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
          <el-button type="primary" class="primary waves-effect" @click="postComment"><i class="fa fa-spinner fa-pulse" v-if="isPosting"></i>Post</el-button>
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
import VueMarkdown from 'vue-markdown'

export default {
  name: 'v-comment',
  components: {
    VueEditor,
    SliderRange,
    VueMarkdown
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
      timeAgo: ''
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
        let response = await Api.fetchComments(this.commentFor.author, this.commentFor.permlink)
        this.comments = response.data
      } catch (err) {
        console.log('error retrieving comments: \n error:', this.stringify(err))
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
      this.isPosting = true
      Api.comment({parentAuthor: this.commentFor.author, parentPermlink: this.commentFor.permlink, username: this.$store.state.username, body: this.myComment}, this.$store.state.accessToken).then((result) => {
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
      sc2.vote(this.$store.state.username, this.commentFor.author, this.commentFor.permlink, parseInt(this.upvoteRange) * 100, (err, res) => {
        this.voting = false
        if (!err) {
          this.upvoteActive = false
          this.commentFor.active_votes.push({voter: this.$store.state.username, weight: parseInt(this.upvoteRange)})
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
      sc2.vote(this.$store.state.username, this.commentFor.author, this.commentFor.permlink, 0, (err, res) => {
        this.unvoting = false
        console.log(err, res)
        if (!err) {
          this.commentFor.active_votes = this.commentFor.active_votes.filter((x) => x.voter !== this.$store.state.username)
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
    getTimeAgo () {
      let milSecAgo = new Date() - new Date(this.commentFor.created)
      let second = 1000
      let minute = 1000 * 60
      let hour = 1000 * 60 * 60
      let day = 1000 * 60 * 60 * 24
      let month = 1000 * 60 * 60 * 24 * 30
      let year = 1000 * 60 * 60 * 24 * 365
      if ((milSecAgo) < minute) {
        if (Math.floor((milSecAgo) / second) < 2) {
          this.timeAgo = `${Math.floor((milSecAgo) / second)} second ago`
        } else {
          this.timeAgo = `${Math.floor((milSecAgo) / second)} seconds ago`
        }
      } else if ((milSecAgo) < hour) {
        if (Math.floor((milSecAgo) / minute) < 2) {
          this.timeAgo = `${Math.floor((milSecAgo) / minute)} minute ago`
        } else {
          this.timeAgo = `${Math.floor((milSecAgo) / minute)} minutes ago`
        }
      } else if ((milSecAgo) < day) {
        if (Math.floor((milSecAgo) / hour) < 2) {
          this.timeAgo = `${Math.floor((milSecAgo) / hour)} hour ago`
        } else {
          this.timeAgo = `${Math.floor((milSecAgo) / hour)} hours ago`
        }
      } else if ((milSecAgo) < 2 * day) {
        this.timeAgo = `yesterday`
      } else if ((milSecAgo) > 2 * day) {
        this.timeAgo = `${Math.floor((milSecAgo) / day)} days ago`
      } else if ((milSecAgo) > month) {
        if (Math.floor((milSecAgo) / month) < 2) {
          this.timeAgo = `${Math.floor((milSecAgo) / month)} month ago`
        } else {
          this.timeAgo = `${Math.floor((milSecAgo) / month)} months ago`
        }
      } else if ((milSecAgo) > year) {
        if (Math.floor((milSecAgo) / year) < 2) {
          this.timeAgo = `${Math.floor((milSecAgo) / year)} year ago`
        } else {
          this.timeAgo = `${Math.floor((milSecAgo) / year)} years ago`
        }
      }
      return milSecAgo
    }
  },
  computed: {
    sellerUsername () {
      return this.commentFor.author
    },
    sellerImg () {
      return `https://steemitimages.com/u/${this.commentFor.author}/avatar`
    },
    sellerRep () {
      return this.commentFor.rep
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
      if (this.commentFor.pending_payout_value) {
        return '$' + parseFloat(this.commentFor.pending_payout_value)
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
    }
  },
  watch: {
  },
  mounted () {
    this.fetchComments()
    console.log(this.getTimeAgo())
    setInterval(() => { this.getTimeAgo() }, 10000)
  }
}
</script>
<style lang="scss" scoped>
  $blue: #6361D0;
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
