<template>
  <div class="landing white">
    <div class="main center-align grey-text z-depth-3 text-lighten-4">
      <img class="bg" src="static/img/black-expert.jpeg" alt="">
      <h1>Everyone has something to offer</h1>
      <p>Do the dreaming, leave the building to us</p>
      <div class="input-container row">
        <input type="text" @keyup.enter="openSearch" v-model="searchString" class="browser-default my-input">
        <button @click.stop="openSearch" class="btn-large white-text light-blue darken-4">Search</button>
      </div>
      <p class="link">Hi Beautiful, <a href="#">see for yourself</a></p>
    </div>
    <section class="center cat-showcase py-5">
      <div class="container">
        <h2 class="mb-1">Explore SteemGigs</h2>
        <p class="mb-5 grey-text">Our existing categories are sure to inspire you</p>
        <div class="row pt-5">
          <div v-for="(category, index) in categories" :key="index" class="col s6 m4 l3">
            <div class="category">
              <i :class="category.icon" class="icon cat-icon"></i>
              <h6 class="cat-title">{{category.title}}</h6>
              <span class="cat-description">{{category.description}}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="sm-banner">
      <div class="row">
        <div class="col m8 grey-text text-lighten-2">
          <h3>We made Steem Gigs for you</h3>
          <p>You have successfully connected to SteemGigs, the first freelancing social network on a decentralized steem blockchain with the power of Fiverr, Upwork &amp; Freelancer combined.
          We will passionately &amp; proactively help you bring your innovation, dreams, vision, enterprise etc into full-blown life.</p>
          <p>
          In our space, "everyone has something to offer"!<br>
          So do you want to offer a service in exchange for Steem/Steem Dollars/Steem Power or are you in need of someone to help you accomplish a service e.g build a dream?
          We will gladly help! </p>
        </div>
        <div class="col m4">
          <img class="responsive-img z-depth-5" src="/static/img/agreement.jpeg" alt="">
        </div>
      </div>
    </section>
    <section class="reviews center blue-grey lighten-5 py-5">
      <h2 class="mb-1">Take the first step</h2>
      <p class="mb-5 grey-text">Whatever your dreams are, here's a few places to get started</p>
      <!-- <div class="container">
        <div class="row">
          <div class="col m5 white">
            <p class="title">Steem Gigs is awesome</p>
          </div>
          <div class="col m7"></div>
        </div>
      </div> -->
      <div class="slide-container">
        <carousel class="m-md-5" :autoplay="true" navigationNextLabel="<i class='navicon indigo-text ion-chevron-right'></i>" navigationPrevLabel="<i class='navicon indigo-text ion-chevron-left'></i>" :navigationEnabled="true" :perPage="1" :perPageCustom="[[768, 3], [1024, 4]]">
          <slide v-for="(slider, i) in sliders" :key="i">
            <div class="slide mx-3 my-5 px-3 left-align" :style="{'background': 'linear-gradient(150deg, #1c1c1ce0, transparent), url('+ slider.url +') no-repeat center', 'background-size': 'cover' }">
              <h5 class="head">{{slider.header}}</h5>
              <p>{{slider.small}}</p>
            </div>
          </slide>
        </carousel>
      </div>
    </section>
    <section class="trio py-5">
      <div class="container center py-5">
        <div class="row">
          <div class="col m4">
            <h4 class="mb-1 grey-text text-lighten-2">Your Terms</h4>
            <p class="mb-5 grey-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur repudiandae quo doloremque, est eligendi amet veritatis ex dolorum sed.</p>
          </div>
          <div class="col m4">
            <h4 class="mb-1 grey-text text-lighten-2">Your Timeline</h4>
            <p class="mb-5 grey-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur repudiandae quo doloremque, est eligendi amet veritatis ex dolorum sed.</p>
          </div>
          <div class="col m4">
            <h4 class="mb-1 grey-text text-lighten-2">Your Safety</h4>
            <p class="mb-5 grey-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur repudiandae quo doloremque, est eligendi amet veritatis ex dolorum sed.</p>
          </div>
        </div>
      </div>
    </section>
    <footer class="page-footer z-depth-2">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="indigo-text">SteemGigs</h5>
                <p class="">Here, everyone has something to offer<br />Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit harum perferendis quaerat inventore ipsa, quasi, quibusdam corporis labore, temporibus dolore voluptas voluptate vero. Iure esse, deleniti nesciunt sequi quibusdam laborum.</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="indigo-text">Our categories</h5>
                <ul>
                  <li v-for="(category, i) in categories" :key="i"><a class="" href="#!">{{category.title}}</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container indigo-text">
            &copy; {{new Date().getFullYear()}} STEEMGIGS
            </div>
          </div>
        </footer>
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
      searchString: '',
      categories: [{
        title: 'Nature & Tourism',
        icon: 'ion-compass',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil explicabo excepturi vitae'
      },
      {
        title: 'Graphics & Design',
        icon: 'ion-paintbrush',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil explicabo excepturi vitae'
      },
      {
        title: 'Digital Marketing',
        icon: 'ion-arrow-graph-up-left',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil explicabo excepturi vitae'
      },
      {
        title: 'Writing and translation',
        icon: 'ion-edit',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil explicabo excepturi vitae'
      },
      {
        title: 'Videos and animation',
        icon: 'ion-videocamera',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil explicabo excepturi vitae'
      },
      {
        title: 'Music & Audio',
        icon: 'ion-ios-musical-note',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil explicabo excepturi vitae'
      },
      {
        title: 'Programming & tech',
        icon: 'ion-android-laptop',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil explicabo excepturi vitae'
      },
      {
        title: 'Business',
        icon: 'ion-stats-bars',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil explicabo excepturi vitae'
      }],
      sliders: [
        {
          url: '/static/img/steemslide7.jpeg',
          header: 'All your logo designs',
          small: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit'
        },
        {
          url: '/static/img/steemslide8.jpeg',
          header: 'Hand crafts and similar',
          small: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit'
        },
        {
          url: '/static/img/steemslide2.jpeg',
          header: 'Do something awesome',
          small: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit'
        },
        {
          url: '/static/img/steemslide3.jpeg',
          header: 'Do something awesome',
          small: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit'
        },
        {
          url: '/static/img/steemslide4.jpeg',
          header: 'Do something awesome',
          small: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit'
        },
        {
          url: '/static/img/agreement.jpeg',
          header: 'Do something awesome',
          small: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit'
        },
        {
          url: '/static/img/steemslide7.jpeg',
          header: 'All your logo designs',
          small: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit'
        },
        {
          url: '/static/img/time.jpeg',
          header: 'Do something awesome',
          small: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit'
        },
        {
          url: '/static/img/steemslide7.jpeg',
          header: 'All your logo designs',
          small: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit'
        },
        {
          url: '/static/img/steemslide8.jpeg',
          header: 'Hand crafts and similar',
          small: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit'
        },
        {
          url: '/static/img/steemslide2.jpeg',
          header: 'Do something awesome',
          small: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit'
        },
        {
          url: '/static/img/steemslide3.jpeg',
          header: 'Do something awesome',
          small: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit'
        },
        {
          url: '/static/img/steemslide4.jpeg',
          header: 'Do something awesome',
          small: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit'
        },
        {
          url: '/static/img/agreement.jpeg',
          header: 'Do something awesome',
          small: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit'
        },
        {
          url: '/static/img/time.jpeg',
          header: 'Do something awesome',
          small: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit'
        },
        {
          url: '/static/img/steemslide7.jpeg',
          header: 'All your logo designs',
          small: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit'
        }
      ]
    }
  },
  methods: {
    openSearch () {
      this.$eventBus.$emit('open-search', this.searchString)
    }
  }
}
</script>
<style lang="scss">
  .landing {
    a {
      color: #01579b;
    }
    p {
      font-size: 1.2rem;
      &.link {
        margin-top: 5rem
      }
    }
    h2 {
      font-size: 2.5rem;
      font-weight: 600;
      color: #474747;
    }
    .main {
      position: relative;
      padding-top: 15vh;
      padding-bottom: 15vh;
      .input-container button{
        margin-top: -3.6px;
      }
      img.bg{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          filter: brightness(78%);
      }
      * {
        position: relative;
        z-index: 1;
      }
      input.my-input {
        padding: 16px 15px;
        min-width: 300px;
        margin-top: 15px;
      }
    }
    .navicon {
      font-size: 1.7em;
    }
    .slide {
      height: 400px;
      box-shadow: 0 6px 24px 0 rgba(0, 0, 0, 0.4);
      border-radius: 5px;
      position: relative;
      padding: 15px 10px;
      h5 {
        color: #ededed;
        margin: 10px 0;
      }
      p {
        color: #c8c8c8;
        font-size: 1em;
        margin: 5px 0;
      }
    }
    .cat-showcase {
      .category {
        min-height: 230px;
        cursor: pointer;
        .cat-title {
          transition: transform .2s ease-in;
        }
        &:hover {
          .cat-title {
            transform: translateY(-5px);
          }
          .cat-description {
            height: 100%;
            opacity: 1;
            transform: translateY(0);
          }
        }
        i.cat-icon {
          font-size: 3.5rem;
          color: rgba(1, 87, 155, .83);
        }
        h6.cat-title {
          font-size: 1.5rem
        }
        span.cat-description {
          color: #949494;
          height: 0;
          @media (min-width: 768px) {
            opacity: 0;
          }
          transform: translateY(10px);
          transition: all .5s ease-in-out;
        }
      }
    }
    .trio {
      background: linear-gradient(to bottom right,#4757b2,#393953);
      h4 {
        font-weight: 600;
      }
    }
    .sm-banner {
      background: linear-gradient(to bottom right,#4757b2,#393953);
      padding: 50px;
      h3 {
        font-size: 2.5rem;
        color: white
      }
    }
    .page-footer {
      background-color: #eee;
      a, p {
        color: #3f51b5;
      }
    }
  }
</style>
