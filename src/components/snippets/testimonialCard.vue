<template>
  <div class="testimonial-card center card">
    <div class="card-content">
      <img :src="userImage" class="userImage" alt="">
      <div class="content">
        <h3>{{subject}}</h3>
        <router-link class="username" :to="'/@' + username" v-text="username"></router-link>
        <p>{{body}}</p>
      </div>
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
import sc2 from '@/services/sc2'

export default {
  props: {
    testimonial: Object
  },
  data () {
    return {
      processing: false
    }
  },
  computed: {
    userImage () {
      return this.testimonial.json_metadata.authorPic
    },
    subject () {
      if (this.testimonial.title) {
        return this.testimonial.title.split('#STEEMGIGS ')[1]
      } else return ''
    },
    body () {
      return this.testimonial.body
    },
    username () {
      return '@' + this.testimonial.author
    },
    comments () {
      return this.testimonial.children
    },
    upvotes () {
      if (this.testimonial.active_votes) {
        return this.testimonial.active_votes.length
      }
    },
    payout () {
      if (this.testimonial.pending_payout_value) {
        return '$' + this.testimonial.pending_payout_value.amount
      } else {
        return '$' + (parseFloat(this.testimonial.total_payout_value) + parseFloat(this.testimonial.curator_payout_value))
      }
    },
    paymentInfo () {
      if ((new Date(this.testimonial.cashout_time).getTime()) > (new Date().getTime())) {
        return `Will payout in ${Math.floor((new Date(this.testimonial.cashout_time) - (new Date())) / (1000 * 60 * 60 * 24))} days`
      } else {
        return `Author Payout: ${'$' + this.testimonial.total_payout_value}
        Curator Payout: ${'$' + this.testimonial.curator_payout_value}`
      }
    }
  },
  methods: {
    upvote () {
      this.processing = true
      sc2.setAccessToken(this.$store.state.accessToken)
      sc2.vote(this.$store.state.username, this.testimonial.author, this.testimonial.permlink, 10000, (err, res) => {
        this.processing = false
        console.log(err, res)
        if (!err) {
          this.testimonial.active_votes.push({'new': 'vote'})
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
  .testimonial-card {
    box-shadow: 0 3px 20px rgba($color: #000000, $alpha: .25);
    border-radius: 5px;
    img.userImage {
      height: 80px;
      width: 80px;
      border-radius: 50%;
      margin: auto;
      cursor: pointer;
    }
    h3 {
      font-size: 1.4rem;
      color: gray;
      margin: 7px auto;

    }
    .username {
      color: rgb(120, 79, 149);
      font-size: .9rem;
    }
    p {
      font-size: 1.2rem;
      color: #0c0b0b;
    }
  }
</style>
