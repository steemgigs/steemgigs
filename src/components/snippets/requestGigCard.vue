<template>
  <div class="card gig" tag="div">
    <div class="card-image">
      <router-link>
      </router-link>
    </div>
    <div class="card-content">
      <img v-if="profilePicUrl" :src="profilePicUrl" alt="" class="sellerPic">
      {{requestGigData.body}}
    </div>
    <div class="card-action">
      <a><i class="fa fa-thumbs-up" aria-hidden="true"></i></a>
      <a><i class="icon ion-chatbox-working" aria-hidden="true"></i></a>
      <a><i class="icon ion-ios-redo" aria-hidden="true"></i></a>
      <span class="right"></span>
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
  data () {
    return {
    }
  },
  props: {
    requestGigData: Object
  }
  // computed: {
  //   profilePicUrl () {
  //     if (this.gigData.json_metadata) {
  //       return this.gigData.json_metadata.authorPic
  //     } else return ''
  //   },
  //   task () {
  //     if (this.gigData.title) {
  //       return this.gigData.title.split('#STEEMGIGS: ')[1]
  //     } else return ''
  //   },
  //   taskLink () {
  //     return '/@' + this.sellerUsername + '/' + this.slugify(this.task)
  //   },
  //   price () {
  //     if (this.gigData.json_metadata) {
  //       return this.gigData.json_metadata.price
  //     }
  //   },
  //   currency () {
  //     if (this.gigData.json_metadata) {
  //       return this.gigData.json_metadata.currency
  //     }
  //   },
  //   sellerUsername () {
  //     return this.gigData.author
  //   },
  //   portfolio () {
  //     if (this.gigData.json_metadata) {
  //       return this.gigData.json_metadata.images
  //     }
  //   },
  //   comments () {
  //     return this.gigData.children
  //   },
  //   upvotes () {
  //     if (this.gigData.active_votes) {
  //       return this.gigData.active_votes.length
  //     }
  //   },
  //   payout () {
  //     if (this.gigData.pending_payout_value) {
  //       return '$' + this.gigData.pending_payout_value.amount
  //     } else {
  //       return '$' + (parseFloat(this.gigData.total_payout_value) + parseFloat(this.gigData.curator_payout_value))
  //     }
  //   },
  //   paymentInfo () {
  //     if ((new Date(this.gigData.cashout_time).getTime()) > (new Date().getTime())) {
  //       return `Will payout in ${Math.floor((new Date(this.gigData.cashout_time) - (new Date())) / (1000 * 60 * 60 * 24))} days`
  //     } else {
  //       return `Author Payout: ${'$' + this.gigData.total_payout_value}
  //       Curator Payout: ${'$' + this.gigData.curator_payout_value}`
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
$blue: #4757b2;
.card.gig {
  box-shadow: 0 3px 5px rgba($color: #000000, $alpha: .3);
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
