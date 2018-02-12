<template>
  <div class="card-action">
    <a @click="upvoteActive = !upvoteActive" v-tooltip="{ content: 'upvote', classes: ['tooltip'] }"><i class="fa fa-thumbs-up" aria-hidden="true"></i> {{ upvotes }}</a>
    <a v-tooltip="{ content: 'comment', classes: ['tooltip'] }"><i class="icon ion-chatbox-working" aria-hidden="true"></i> {{ comments }}</a>
    <a v-tooltip="{ content: 'resteem', classes: ['tooltip'] }"><i class="icon ion-ios-redo" aria-hidden="true"></i></a>
    <span class="right" v-tooltip="{ content: paymentInfo, classes: ['tooltip'] }">{{ payout }}</span>
    <div class="row pt-3 mb-0" v-if="upvoteActive">
      <div class="col s9">
       <slider-range v-model="upvoteRange" />
      </div>
      <div class="col offset-s1 s2">
        <a v-if="processing" v-tooltip="{content: 'please wait'}">
          <i class="fa fa-spinner fa-pulse"></i>
        </a>
        <a @click="upvote" v-tooltip="{ content: 'upvote', classes: ['tooltip'] }" class="upvote-btn" v-if="!processing">
          <i class="ion-chevron-up"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import sc2 from '@/services/sc2'
import SliderRange from 'vue-slider-component'
export default {
  components: {
    SliderRange
  },
  data () {
    return {
      taskDetails: {
        type: String
      },
      processing: false,
      taskPicture: '',
      upvoteActive: false,
      upvoteRange: 100
    }
  },
  props: {
    gigData: Object,
    type: {
      type: String,
      default: 'steemgigs'
    }
  },
  computed: {
    sellerUsername () {
      return this.gigData.author
    },
    comments () {
      return this.gigData.children
    },
    upvotes () {
      if (this.gigData.active_votes) {
        return this.gigData.active_votes.length
      }
    },
    payout () {
      if (this.gigData.pending_payout_value.amount) {
        return '$' + this.gigData.pending_payout_value.amount
      } else {
        return '$' + (parseFloat(this.gigData.total_payout_value.amount) + parseFloat(this.gigData.curator_payout_value.amount))
      }
    },
    paymentInfo () {
      if ((new Date(this.gigData.cashout_time).getTime()) > (new Date().getTime())) {
        return `Will payout in ${Math.floor((new Date(this.gigData.cashout_time) - (new Date())) / (1000 * 60 * 60 * 24))} days`
      } else {
        return `Author Payout: ${'$' + this.gigData.total_payout_value.amount}
        Curator Payout: ${'$' + this.gigData.curator_payout_value.amount}`
      }
    }
  },
  methods: {
    upvote () {
      this.processing = true
      sc2.setAccessToken(this.$store.state.accessToken)
      sc2.vote(this.$store.state.username, this.gigData.author, this.gigData.permlink, parseInt(this.upvoteRange) * 100, (err, res) => {
        this.processing = false
        console.log(err, res)
        if (!err) {
          this.gigData.active_votes.push({'new': 'vote'})
          console.log(res)
        } else {
          console.log('there was an error voting this\n', 'err:', err)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$blue: #4757b2;
  a.upvote-btn {
    display: inline-block;
    padding: 0px 4px;
    border: 1px solid gray;
    border-radius: 50%;
    font-size: .8rem;
    &.upvoted {
      border-radius: 1px solid $blue;
      i {
        color: $blue;
      }
    }
    i {
      color: gray;
    }
  }
.card.gig {
  cursor: pointer;
  .card-image {
    position: relative;
    min-height: 10em;
  }
  .card-content {
    padding: 3em 1em 1em;
    position: relative;
    min-height: 11em;
    .sellerPic {
      border-radius: 50%;
      border: 1px solid #4757b2;
      width: 2.1em;
      height: 2.1em;
      margin-top: 0px;
      margin-left: 0em;
      display: inline-block;
      position: absolute;
      top: 1em;
    }
    .task {
      font-weight: 600;
    }
    .price {
      margin-top: 0.5em;
      font-weight: 500;
    }
  }
  .card-action {
    padding: 1em;
    a:not(.btn):not(.btn-large):not(.btn-large):not(.btn-floating) {
      color: $blue;
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
</style>
