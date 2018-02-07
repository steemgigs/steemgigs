<template>
  <div class="card gig" tag="div">
    <div class="card-content" v-if="meantFor === 'gigDetails'">
      <span class="card-title" v-text="task"></span>
    </div>
    <div class="card-image">
      <router-link :to="taskLink">
        <img v-if="portfolio.length < 1" :src="taskPicture || '/static/img/banner.jpeg'" :alt="task">
        <carousel v-if="portfolio.length > 0" :navigationEnabled="false" :autoplay="true" :perPage="1">
          <slide v-for="(image, index) in portfolio" :key="index">
            <img :src="image" class="responsive-img" :alt="task">
          </slide>
        </carousel>
      </router-link>
    </div>
    <div class="card-content">
      <img v-if="profilePicUrl" :src="profilePicUrl" alt="" class="sellerPic">
      <router-link v-if="meantFor === 'results'" class="sellerName" :to="'/@' + sellerUsername" v-text="sellerUsername"></router-link>
      <router-link v-if="meantFor !== 'gigDetails'" class="task" :to="taskLink" tag="p" v-text="task" />
      <p v-if="meantFor === 'gigDetails'" class="task" v-html="taskDetails"></p>
      <p class="price">
        <span v-if="price">
          <span v-if="type === 'steemgigs'">{{ 'Starting At ' + price + currency }}</span>
          <span v-if="type === 'gigRequest'">{{ 'Max Budget: ' + price + currency }}</span>
        </span>
        <span v-if="!price">FREE</span>
      </p>
    </div>
    <div class="card-action">
      <a v-if="processing" v-tooltip="{content: 'please wait'}">
        <i class="fa fa-spinner fa-pulse"></i>
      </a>
      <a @click="upvote" v-tooltip="{ content: 'upvote', classes: ['tooltip'] }"><i class="fa fa-thumbs-up" aria-hidden="true"></i> {{ upvotes }}</a>
      <a v-tooltip="{ content: 'comment', classes: ['tooltip'] }"><i class="icon ion-chatbox-working" aria-hidden="true"></i> {{ comments }}</a>
      <a v-tooltip="{ content: 'resteem', classes: ['tooltip'] }"><i class="icon ion-ios-redo" aria-hidden="true"></i></a>
      <span class="right" v-tooltip="{ content: paymentInfo, classes: ['tooltip'] }">{{ payout }}</span>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import sc2 from '@/services/sc2'
export default {
  components: {
    Carousel,
    Slide
  },
  data () {
    return {
      taskDetails: {
        type: String
      },
      processing: false,
      taskPicture: ''
    }
  },
  props: {
    meantFor: {
      type: String,
      default: 'results'
    },
    gigData: Object,
    type: {
      type: String,
      default: 'steemgigs'
    }
  },
  computed: {
    profilePicUrl () {
      if (this.gigData.json_metadata) {
        return this.gigData.json_metadata.authorPic
      } else return ''
    },
    task () {
      if (this.gigData.title) {
        return this.gigData.title.split('#STEEMGIGS: ')[1]
      } else return ''
    },
    taskLink () {
      return '/@' + this.sellerUsername + '/' + this.slugify(this.task)
    },
    price () {
      if (this.gigData.json_metadata) {
        return this.gigData.json_metadata.price
      }
    },
    currency () {
      if (this.gigData.json_metadata) {
        return this.gigData.json_metadata.currency
      }
    },
    sellerUsername () {
      return this.gigData.author
    },
    portfolio () {
      if (this.gigData.json_metadata.images) {
        return this.gigData.json_metadata.images
      } else return []
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
      if (this.gigData.pending_payout_value) {
        return '$' + this.gigData.pending_payout_value.amount
      } else {
        return '$' + (parseFloat(this.gigData.total_payout_value) + parseFloat(this.gigData.curator_payout_value))
      }
    },
    paymentInfo () {
      if ((new Date(this.gigData.cashout_time).getTime()) > (new Date().getTime())) {
        return `Will payout in ${Math.floor((new Date(this.gigData.cashout_time) - (new Date())) / (1000 * 60 * 60 * 24))} days`
      } else {
        return `Author Payout: ${'$' + this.gigData.total_payout_value}
        Curator Payout: ${'$' + this.gigData.curator_payout_value}`
      }
    }
  },
  methods: {
    upvote () {
      this.processing = true
      sc2.setAccessToken(this.$store.state.accessToken)
      sc2.vote(this.$store.state.username, this.gigData.author, this.gigData.permlink, 10000, (err, res) => {
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
    .sellerName {
      position: absolute;
      left: 3.5em;
      color: black;
      margin-top: 0.2em;
      transition: all ease-in .3s;
      top: 1em;
      &:hover {
        text-decoration: underline;
      }
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
