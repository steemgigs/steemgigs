<template>
  <div class="landing white">
    <div class="main center-align grey-text z-depth-3 text-lighten-4">
      <img class="bg" src="static/img/black-expert.jpeg" alt="">
      <h1>Everyone Has Something To Offer</h1>
      <p>Do the dreaming; leave 'the building' to us.</p>
      <div class="input-container row">
        <input type="text" @keyup.enter="openSearch" v-model="searchString" class="browser-default my-input">
       <button @click.stop="search()" class="btn-large white-text light-blue darken-4">Search</button>
      </div>
      <p class="link">Hi Beautiful, <a href="#">see for yourself</a></p>
    </div>
    <section class="center cat-showcase py-5">
      <div class="container">
        <h2 class="mb-1">Explore SteemGigs</h2>
        <p class="mb-5 grey-text">Our existing categories are sure to inspire you</p>
        <div class="row pt-5">
          <div v-for="(category, index) in categories" :key="index" class="col s6 m4 l3">
          <a :href="category.url">
            <div class="category">
              <i :class="category.icon" class="icon cat-icon"></i>
              <h6 class="cat-title">{{category.title}}</h6>
              <span class="cat-description">{{category.description}}</span>
            </div>
            </a>
          </div>
        </div>
      </div>
    </section>
    <section class="sm-banner">
      <div class="row">
        <div class="col m8 grey-text text-lighten-2">
          <h3>We Made SteemGigs Just For You</h3>
          <p>You have successfully connected to SteemGigs, the first freelancing services marketplace &amp; social network on a decentralized steem blockchain with the power of Fiverr, Upwork &amp; Freelancer combined.
          We will passionately &amp; proactively help you bring your innovation, dreams, vision, enterprise etc into full-blown life.</p>
          <p>
          On SteemGigs, 'everyone has something to offer'!
          <br>So, do you want to offer a service in exchange for Steem/Steem Dollars/Steem Power or are you in need of someone to help you accomplish a service e.g build a dream?
          We have you covered. </p>
        </div>
        <div class="col m4">
          <img class="responsive-img z-depth-5" src="/static/img/agreement.jpeg" alt="">
        </div>
      </div>
    </section>
    <section class="reviews center blue-grey lighten-5 py-5">
      <h2 class="mb-1">Take the first step</h2>
      <p class="mb-5 grey-text">Whatever your dreams are, here are a few places to get you started:</p>
      <!-- <div class="container">
        <div class="row">
          <div class="col m5 white">
            <p class="title">SteemGigs is awesome</p>
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
            <h4 class="mb-1 grey-text text-lighten-2">Your Dream</h4>
            <p class="mb-5 grey-text">Put us to testimonial good use. Simply dream BIG, then tell us what you want. <br>On SteemGigs, 'everyone has something to offer'.</p>
          </div>
          <div class="col m4">
            <h4 class="mb-1 grey-text text-lighten-2">Your Specifications</h4>
            <p class="mb-5 grey-text">It's your dream, so we will passionately follow your lead. <br>On SteemGigs, 'every talent/un(dis)talent is also a reputable great mind'.</p>
          </div>
          <div class="col m4">
            <h4 class="mb-1 grey-text text-lighten-2">Our Passion</h4>
            <p class="mb-5 grey-text">In an ecosystem where 'everyone has something to offer', dreams can equal reality. <br>Bringing your dreams into reality is our passion, for if 'going to the moon' happened, your dreams are attainable.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="py-5 blue-grey lighten-5">
      <div class="container">
        <div class="row hide">
          <div class="col m5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia corrupti, est ea beatae unde temporibus reprehenderit, quos magni deserunt praesentium dolorem similique accusantium, odio architecto eveniet molestias eius id perferendis.</div>
          <div class="col m7"></div>
        </div>
      </div>
    </section>
    <footer class="page-footer z-depth-2">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="indigo-text">SteemGigs</h5>
                <p class="">SteemGigs incentivizes you to build your dreams, by rewarding SteemGiggers for passionately striving to assist you.
                <br>SteemGigs is built using the decentralized &amp; open-source 'steem blockchain protocol', where every transaction is public. This, eliminates the need for third-party merchants &amp; incentivizing talents/un(dis)talents who assist you to stay 'reputable', Besides, as a result of the steem blockchain, you can more convenient &amp; direct options when paying for GIGs.
                <br>Imagine paying for your next GIG using a simple 'upvote' or 'like' action.</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="indigo-text">Our categories</h5>
                <ul>
                  <li v-for="(category, i) in categories" :key="i"><a class="" :href="category.url">{{category.title}}</a></li>
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
        title: 'Fun & Lifestyle',
        icon: 'ion-android-bicycle',
        description: 'Our talents are reputable great minds',
        url: '/categories/fun-lifestyle'

      },
      {
        title: 'Graphics & Design',
        icon: 'ion-paintbrush',
        description: 'Our talents are reputable great minds',
        url: '/categories/graphics-design'
      },
      {
        title: 'Digital Marketing',
        icon: 'ion-arrow-graph-up-left',
        description: 'Our talents are reputable great minds',
        url: '/categories/digital-marketing'
      },
      {
        title: 'Writing and translation',
        icon: 'ion-edit',
        description: 'Our talents are reputable great minds',
        url: '/categories/writing-and-translation'
      },
      {
        title: 'Videos and animation',
        icon: 'ion-videocamera',
        description: 'Our talents are reputable great minds',
        url: '/categories/videos-and-animation'
      },
      {
        title: 'Music & Audio',
        icon: 'ion-ios-musical-note',
        description: 'Our talents are reputable great minds',
        url: '/categories/music-audio'
      },
      {
        title: 'Programming & tech',
        icon: 'ion-android-laptop',
        description: 'Our talents are reputable great minds',
        url: '/categories/programming-tech'
      },
      {
        title: 'Business',
        icon: 'ion-stats-bars',
        description: 'Our talents are reputable great minds',
        url: '/categories/business'
      }],
      sliders: [
        {
          url: '/static/img/steemslide7.jpeg',
          header: 'All your logo designs',
          small: 'Our talents are reputable great minds'
        },
        {
          url: '/static/img/steemslide8.jpeg',
          header: 'Hand crafts and similar',
          small: 'Our talents are reputable great minds'
        },
        {
          url: '/static/img/steemslide2.jpeg',
          header: 'We can act out your scripts',
          small: 'Our talents are reputable great minds'
        },
        {
          url: '/static/img/steemslide3.jpeg',
          header: 'We will give your images limelight',
          small: 'Our talents are reputable great minds'
        },
        {
          url: '/static/img/steemslide4.jpeg',
          header: 'We will write your code',
          small: 'Our talents are reputable great minds'
        },
        {
          url: '/static/img/agreement.jpeg',
          header: "Let's Get Your Steemit Posts To Trend.",
          small: 'Our talents are reputable great minds'
        },
        {
          url: '/static/img/steemslide7.jpeg',
          header: 'All your logo designs',
          small: 'Our talents are reputable great minds'
        },
        {
          url: '/static/img/time.jpeg',
          header: 'Let Us Render Some Virtual Assistance.',
          small: 'Our talents are reputable great minds'
        },
        {
          url: '/static/img/steemslide7.jpeg',
          header: 'All your logo designs',
          small: 'Our talents are reputable great minds'
        },
        {
          url: '/static/img/steemslide8.jpeg',
          header: 'Hand crafts and similar',
          small: 'Our talents are reputable great minds'
        },
        {
          url: '/static/img/steemslide2.jpeg',
          header: 'Do something awesome',
          small: 'Our talents are reputable great minds'
        },
        {
          url: '/static/img/steemslide3.jpeg',
          header: 'Do something awesome',
          small: 'Our talents are reputable great minds'
        },
        {
          url: '/static/img/steemslide4.jpeg',
          header: 'Do something awesome',
          small: 'Our talents are reputable great minds'
        },
        {
          url: '/static/img/agreement.jpeg',
          header: 'Do something awesome',
          small: 'Our talents are reputable great minds'
        },
        {
          url: '/static/img/time.jpeg',
          header: 'Do something awesome',
          small: 'Our talents are reputable great minds'
        },
        {
          url: '/static/img/steemslide7.jpeg',
          header: 'All your logo designs',
          small: 'Our talents are reputable great minds'
        }
      ]
    }
  },
  methods: {
    search () {
      this.$router.push(`search/${this.searchString}`)
    }
  }
}
</script>
<style lang="scss">
  .landing {
    width: 100vw;
    overflow: auto;
    height: calc(100vh - 20px);
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
      background: linear-gradient(to bottom right,#6361D0,#393953);
      h4 {
        font-weight: 600;
      }
    }
    .sm-banner {
      background: linear-gradient(to bottom right,#6361D0,#393953);
      padding: 50px;
      h3 {
        font-size: 2.5rem;
        color: white
      }
    }
    .page-footer {
      background-color: #eee;
      a, p {
        color: #6361D0;
      }
    }
  }
</style>
