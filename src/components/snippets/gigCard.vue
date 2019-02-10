<template>
  <div class="card gig" tag="div">
    <div class="card-cont">
      <div class="card-content" v-if="meantFor === 'gigDetails'">
        <span class="card-title" v-text="title"></span>
      </div>
      <div class="card-image">
        <router-link :to="taskLink">
          <img v-if="portfolio.length < 1" :src="taskPicture || '/static/img/placeholder.png'" :alt="task">
          <carousel v-if="portfolio.length > 0" :navigationEnabled="false" :autoplay="true" :perPage="1">
            <slide v-for="(image, i) in portfolio" :key="i">
              <img :src="image" class="responsive-img" :alt="task">
            </slide>
          </carousel>
        </router-link>
      </div>
      <div class="card-content">
       <div class="seller-details"> <img v-if="imgUrl || sellerImg" :src="sellerImg" alt="" class="sellerPic"> <router-link class="sellerName" :to="'/@' + sellerUsername"> {{ sellerUsername }}</router-link><span v-if="sellerRep" class="user-rep">{{ sellerRep }}</span></div>
        <router-link v-line-clamp:20="2" v-if="meantFor !== 'gigDetails'" class="task" :to="taskLink" v-text="title" />
        <p  v-if="meantFor === 'gigDetails'" class="task" v-html="taskDetails"></p>
        <p class="price">
          <span v-if="price">
            <span v-if="type === 'steemgigs'">{{ 'Starting At ' + price + ' ' + currency }}</span>
            <span v-if="type === 'gigRequest'">{{ 'Max Budget: ' + price + ' ' + currency }}</span>
            <span v-if="type === 'surpassinggoogle'">{{ 'Price: ' + 'FREE' }}</span>
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
      return '/steemgigs/@' + this.sellerUsername + '/' + this.gigData.permlink
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
      return `https://steemitimages.com/u/${this.gigData.author}/avatar`
    },
    sellerRep () {
      return this.gigData.rep
    },
    portfolio () {
      if ('json_metadata' in this.gigData) {
        if (this.gigData.json_metadata.images) {
          return this.gigData.json_metadata.images.filter(Boolean)
        } else return []
      } else return []
    }
  }
}
</script>

<style lang="scss" scoped>
$blue: #6361D0;
.card.gig {
  box-shadow: 0 3px 13px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  transition: all .2s ease-in;
  &:hover {
    box-shadow: 0 3px 30px rgba(0, 0, 0, 0.15);
  }
  cursor: pointer;
  .card-image {
    position: relative;
    object-fit: cover;
    max-height: 10em;
    overflow: hidden;
    padding: 10px;
  }
  .card-cont {
    height: 20em;
    overflow: hidden;
  }
  .card-content {
    .sellerPic {
      border-radius: 50%;
      border: 1px solid #6361D0;
      width: 35px;
      height: 35px;
      display: inline-block;
    }
    .sellerName {
      color: black;
      margin: 0 0.5rem;
      transition: all ease-in .3s;
      font-size: 13px;
      font-weight: bold;
      &:hover {
        text-decoration: underline;
      }
    }
    .task {
      font-size: 13px;
      color: black;
      overflow: hidden;
      word-break: break-word;
    }
    .price {
      margin-top: 0.5em;
      font-weight: 500;
      font-size: 13px;
      font-style: italic;
    }
  }
  .card-action {
    padding: 1em;
    a:not(.btn):not(.btn-large):not(.btn-large):not(.btn-floating) {
      color: $blue;
      margin-right: 10px;
      cursor: pointer;
    }
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

    .user-rep {
      background: #6361D0;
    padding: 2px 6px;
    color: white;
    border-radius: 5px;
    font-weight: bold;
    font-size: 13px;
    border: 1px solid #6361D0;
  }

  .seller-details {
    margin: 0.5em 0;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

}
</style>
