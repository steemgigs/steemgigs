<template>
  <div class="card gig" tag="div">
    <div class="card-content" v-if="meantFor === 'gigDetails'">
      <span class="card-title" v-text="task"></span>
    </div>
    <div class="card-image">
      <router-link :to="taskLink">
        <img v-if="portfolio.length < 1" src="/static/img/banner.jpeg" :alt="task">
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
        <span v-if="price">Starting at {{ price }} {{ currency }}</span>
        <span v-if="!price">FREE</span>
      </p>
    </div>
    <div class="card-action">
      <a><i class="fa fa-thumbs-up" aria-hidden="true"></i> {{ upvotes }}</a>
      <a><i class="icon ion-chatbox-working" aria-hidden="true"></i> {{ comments }}</a>
      <a><i class="icon ion-ios-redo" aria-hidden="true"></i></a>
      <span class="right" v-tooltip="{ content: paymentInfo, classes: ['tooltip'] }">{{ payout }}</span>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
export default {
  components: {
    Carousel,
    Slide
  },
  props: {
    meantFor: {
      type: String,
      default: 'results'
    },
    task: {
      type: String
    },
    taskDetails: {
      type: String
    },
    sellerUsername: {
      type: String
    },
    taskPicture: {
      type: String
    },
    price: {
      type: String
    },
    currency: {
      type: String
    },
    gigData: Object
  },
  computed: {
    profilePicUrl () {
      return this.gigData.json_metadata.authorPic
    },
    taskLink () {
      return '/@' + this.sellerUsername + '/' + this.slugify(this.task)
    },
    portfolio () {
      return this.gigData.json_metadata.images
    },
    comments () {
      return this.gigData.children
    },
    upvotes () {
      return this.gigData.active_votes.length
    },
    payout () {
      return `${'$' + (this.gigData.pending_payout_value.amount || (parseFloat(this.gigData.total_payout_value) + parseFloat(this.gigData.curator_payout_value)))}`
    },
    paymentInfo () {
      if ((new Date(this.gigData.cashout_time).getTime()) > (new Date().getTime())) {
        return `Will payout in ${Math.floor((new Date(this.gigData.cashout_time) - (new Date())) / (1000 * 60 * 60 * 24))} days`
      } else {
        return `Author Payout: ${'$' + this.gigData.total_payout_value}
        Curator Payout: ${'$' + this.gigData.curator_payout_value}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$blue: #4757b2;
.card.gig {
  cursor: pointer;
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
