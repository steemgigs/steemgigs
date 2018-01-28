<template>
  <div class="card gig" tag="div">
    <div class="card-content" v-if="meantFor === 'gigDetails'">
      <span class="card-title" v-text="task"></span>
    </div>
    <div class="card-image">
      <router-link :to="taskLink">
        <img :src="taskPicture" :alt="task">
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
      <span class="right">{{ payout }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    meantFor: {
      type: String,
      default: 'results'
    },
    profilePicUrl: {
      type: String
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
      type: Number
    },
    currency: {
      type: String
    },
    upvotes: {
      type: Number,
      default: 0.0
    },
    comments: {
      type: Number,
      default: 0.0
    },
    payout: {
      type: String
    }
  },
  computed: {
    taskLink () {
      return '/@' + this.sellerUsername + '/' + this.slugify(this.task)
    }
  }
}
</script>

<style lang="scss" scoped>
$blue: #4757b2;
.card.gig {
  cursor: pointer;
  .card-content {
    padding: 1em;
    .sellerPic {
      border-radius: 50%;
      border: 1px solid $blue;
      width: 2.1em;
      height: 2.1em;
      margin-top: 0px;
      margin-left: 0em;
      display: inline-block;
    }
    .sellerName {
      position: absolute;
      left: 3.5em;
      color: black;
      margin-top: 0.2em;
      transition: all ease-in .3s;
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
