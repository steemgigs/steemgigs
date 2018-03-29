<template>
  <div class="card gig" tag="div">
    <div class="card-cont">
      <div class="card-content" v-if="meantFor === 'gigDetails'">
        <span class="card-title" v-text="title"></span>
      </div>
      <div class="card-image">
        <router-link :to="taskLink">
          <img v-if="portfolio.length < 1" :src="taskPicture || '/static/img/banner.jpeg'" :alt="task">
          <carousel v-if="portfolio.length > 0" :navigationEnabled="false" :autoplay="true" :perPage="1">
            <slide v-for="(image, i) in portfolio" :key="i">
              <img :src="image" class="responsive-img" :alt="task">
            </slide>
          </carousel>
        </router-link>
      </div>
      <div class="card-content">
        <img v-if="imgUrl || sellerImg" :src="sellerImg" alt="" class="sellerPic">
        <router-link v-if="meantFor === 'results'" class="sellerName" :to="'/@' + sellerUsername"> {{sellerUsername + ' (' + sellerRep + ') '}} </router-link>
        <router-link v-if="meantFor !== 'gigDetails'" class="task" :to="taskLink" v-text="title" />
        <p v-if="meantFor === 'gigDetails'" class="task" v-html="taskDetails"></p>
        <p class="price">
          <span v-if="price">
            <span v-if="type === 'steemgigs'">{{ 'Starting At ' + price + ' ' + currency }}</span>
            <span v-if="type === 'gigRequest'">{{ 'Max Budget: ' + price + ' ' + currency }}</span>
          </span>
          <span v-if="!price">FREE</span>
        </p>
      </div>
    </div>
    <gig-action :gigData="gigData" />
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import GigAction from '@/components/snippets/gigAction'
export default {
  components: {
    Carousel,
    Slide,
    GigAction
  },
  data () {
    return {
      taskDetails: {
        type: String
      },
      processing: false,
      taskPicture: '',
      imgUrl: '',
      repp: ''
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
        return this.gigData.title.split('#STEEMGIGS: I will ')[1] || this.gigData.title.split('#STEEMGIGS: ')[1]
      } else return ''
    },
    title () {
      if (this.gigData.title) {
        return this.gigData.title.split('#STEEMGIGS: ')[1]
      } else return ''
    },
    taskLink () {
      return '/@' + this.sellerUsername + '/' + this.gigData.permlink
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
    sellerImg () {
      return this.gigData.json_metadata.authorPic
    },
    sellerRep () {
      return this.gigData.rep
    },
    portfolio () {
      if (this.gigData.json_metadata.images) {
        return this.gigData.json_metadata.images
      } else return []
    }
  }
}
</script>

<style lang="scss" scoped>
$blue: #4757b2;
.card.gig {
  box-shadow: 0 3px 13px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  transition: all .2s ease-in;
  &:hover {
    box-shadow: 0 3px 30px rgba(0, 0, 0, 0.25);
  }
  cursor: pointer;
  .card-image {
    position: relative;
    object-fit: cover;
    max-height: 10em;
    overflow: hidden;
  }
  .card-cont {
    height: 23em;
    overflow: hidden;
  }
  .card-content {
    padding: 3em 1em 1em;
    position: relative;
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
