<template>
  <div class="landing">
    <!-- Hero Section with Search -->
    <section class='hero-landing'>
      <el-row :gutter="1">
        <el-col class="hero-text fill-height flex-col" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <h1>Do The 'Dreaming', Leave 'The Building' To Us</h1>
          <p>Freelance services for your business, by reputable like-minds.</p>
          <el-input prefix-icon="el-icon-search" spellcheck="true" @keydown.enter.native="initSearch('posts')" size="medium" type="text" placeholder="Search SteemGigs" v-model="searchTerm" />
              <el-popover popper-class="search-options" v-model="showSearchOptions">
                <span @click="initSearch('posts')">Search Gig</span>
                <span @click="initSearch('users')">Search By User</span>
                </el-popover>
        </el-col>
        <el-col class="hero-img fill-height flex-col" :xs="1" :sm="1" :md="12" :lg="12" :xl="12">
          <img src="/static/img/landing/landing_1.svg" alt="">
        </el-col>
      </el-row>
    </section>
    <!-- Things you can do on SteemGigs -->
    <section class="about-landing">
      <el-row :gutter="25">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <h3>Things you can do on SteemGigs</h3>
          <p>Explore what is available on our platform below</p>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col class="about-item" v-for="(item, index) in aboutItems" :key="index" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <img :src="item.image" alt="Do Image">
          <h4>{{ item.title }}</h4>
          <p>{{ item.description }}</p>
        </el-col>
      </el-row>
    </section>
    <!-- Video Section -->
    <section class="video-landing">
      <el-row :gutter="15">
        <el-col class="video-col" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <youtube class="sg-video" video-id="xeLYLA6C2AE" player-width="100%" player-height="335"></youtube>
        </el-col>
      </el-row>
    </section>
    <!-- Stand out section -->
    <section class="stand-landing">
      <el-row :gutter="15">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <h3>How We Stand Out</h3>
          <p>You have successfully reached STEEMGIGS, a revolutionary freelance services marketplace & social network connected to a decentralized steem blockchain, with the power of Fiverr, Upwork & Freelancer combined. SteemGigs removes all barriers to entry
            in relation to 'building a dream', by implementing an 'untalented & community paradigm', in association with a token economy.
          </p>
          <p>Whether it is an innovation, vision, enterprise or business and it is yours, we consider it 'a dream' and it is about 'your dream' for us. As a result, we will go beyond just getting you the right freelance services. We want to play an active
            role in historical history as part of your noble dream.
          </p>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col class="stand-item" v-for="(item, index) in standItems" :key="index" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="stand-item-header">
            <i class="el-icon-check"></i>
            <h4>{{ item.title }}</h4>
          </div>
          <p>{{ item.description }}</p>
        </el-col>
      </el-row>
    </section>
    <!-- Core Aspects of SteemGigs -->
    <section class="core-landing">
      <el-row :gutter="15">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <h3>Core Aspects of SteemGigs</h3>
          <p>You have successfully reached STEEMGIGS, a revolutionary freelance services marketplace & social network connected to a decentralized steem blockchain, with the power of Fiverr, Upwork & Freelancer combined. SteemGigs removes all barriers to entry
            in relation to 'building a dream', by implementing an 'untalented & community paradigm', in association with a token economy.
          </p>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <carousel :dots="false" :loop="true" :drag="false" :responsive="{0:{items:1,nav:false},800:{items:2,nav:false},1200:{items:4,nav:false}}">
          <div class="core-card" v-for="(item, index) in coreItems" :key="index">
            <img :src="item.image" alt="Core Image">
            <div>
              <h5>{{ item.title }}</h5>
              <p> {{ item.description }}</p>
              <router-link to="/surpassing-google">
                <el-button type="secondary">Explore SteemGigs</el-button>
              </router-link>
            </div>
          </div>
        </carousel>
      </el-row>
    </section>
    <!-- Explore Marketplace -->
    <section class="explore-landing">
      <el-row :gutter="15">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <h3>Explore our SteemGigs marketplace</h3>
          <p>Are you ready to build your dream? Get inspired by exploring our various categories</p>
        </el-col>
      </el-row>
      <el-row class="explore-item-row" :gutter="15">
        <el-col class="explore-item" v-for="(item, index) in exploreItems" :key="index" :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
          <router-link :to="item.link">
            <img :src="item.image" alt="Explore Image">
            <h5>{{ item.title }}</h5>
          </router-link>
        </el-col>
      </el-row>
    </section>
    <!-- Get Started Grey -->
    <section class="get-started-grey">
      <el-row :gutter="15">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <h3>All your freelance service needs and more</h3>
          <p>Whether you’re a freelancer, need a freelancer or want to be a freelancer, we have you covered.</p>
          <router-link to="/steemgigs"><el-button type="primary" class="primary">Explore SteemGigs</el-button></router-link>
        </el-col>
      </el-row>
    </section>
    <!-- SurpassingGoogle -->
    <section class="surpassing-landing">
      <el-row :gutter="15">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <span class="surpassing-header">SurpassingGoogle</span>
          <span>The knowledge-bank of SteemGigs</span>
          <p>Every participant of our ecosystem will eventually become a 'dream-builder' (SteemGigger), building their dreams and those of others. To accomplish this, we have created a bank, for 'deposits & withdrawals' of all the bits & bytes that one
            will ever need to build any noble dream (however limitless).
          </p>
          <div>
             <router-link to="/categories/surpassinggoogle"><el-button type="primary" class="primary">Read the Knowledge Bank</el-button></router-link>
             <router-link to="/surpassing-google"><el-button type="secondary">Publish to the Knowledge Bank</el-button></router-link>
          </div>
        </el-col>
      </el-row>
    </section>
    <!-- Quote Section -->
    <section class="quote-landing">
      <el-row :gutter="50 ">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <youtube class="sg-video" video-id="N0WleFfFUtU" player-width="100%" player-height="335"></youtube>
        </el-col>
        <el-col class="quote-column" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <img class="quote-mark" src="/static/img/landing/quote-mark.svg" alt="quote-mark">
          <p class="quote-text">"Your noble dream is a SteemGig away"</p>
          <router-link to="/@eastmeal"><span class="quote-sig">@eastmeal</span></router-link>
        </el-col>
      </el-row>
    </section>
    <!-- BroPro Section -->
    <section class="bropro-landing">
      <el-row :gutter="50">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <span class="bropro-subtitle">Try SteemGigs</span>
          <span class="bropro-header">BROPRO</span>
          <p>Talent is generic. A 'brother talent'? Now, that's great. Find that ever missing peice of the puzzle with broPRO.</p>
          <el-button :disabled='true' type="secondary">Coming Soon</el-button>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <img src="/static/img/landing/bropro.svg" alt="BroPro Image">
        </el-col>
      </el-row>
    </section>
    <!-- Get Started Purple Section -->
    <section class="get-started-purple">
      <el-row :gutter="15">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <h3>Help someone build a dream today, offer a freelance service</h3>
          <p>Need inspiration? Check to see if there is an open custom request or micro task. SteemGigs is for everyone. </p>
          <router-link to="/steemgigs"><el-button>Explore SteemGigs</el-button></router-link>
        </el-col>
      </el-row>
    </section>
    <!-- Tutorials Section -->
    <section class="tutorial-landing">
      <el-row :gutter="15">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <h3>Tutorials (Coming Soon)</h3>
          <p>You have successfully reached STEEMGIGS, a revolutionary freelance services marketplace & social network connected to a decentralized steem blockchain, with the power of Fiverr, Upwork & Freelancer combined.
          </p>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <carousel :dots="false" :loop="true" :drag="false" :responsive="{0:{items:1,nav:false},800:{items:2,nav:false},1200:{items:4,nav:false}}">
          <div @click="alert('Tutorials Coming Soon')" class="tutorial-card" v-for="(item, index) in tutorialPlaceholders" :key="index">
            <img :src="item.image" alt="Tutorial Image">
            <div class="tutorial-details">
              <h4> {{ item.title }}</h4>
              <div class="author-row">
                <img :src="'https://steemitimages.com/u/' + item.author + '/avatar'" alt="Author Image">
                <span> {{ item.author }}</span>
              </div>
              <p> {{ item.description }}</p>
            </div>
          </div>
        </carousel>
      </el-row>
    </section>
    <sgfooter />
  </div>
</template>

<script>
import sgfooter from '@/components/layout/footer'
import carousel from 'vue-owl-carousel'
import search from '@/mixins/search.js'

export default {
  name: 'landing-page',
  mixins: [search],
  components: {
    sgfooter,
    carousel
  },
  data () {
    return {
      searchTerm: '',
      aboutItems: [{
        image: '/static/img/landing/create_gig.svg',
        title: 'Create A Gig',
        description: 'Whether you an expert or non-expert, you can offer a service in exchange for STEEM, STEEM Dollars, Steem Power or ‘for free’. SteemGigs has an un(dis)talented paradigm. This means that on SteemGigs, everyone has something to offer. '
      },
      {
        image: '/static/img/landing/locate.svg',
        title: 'Locate A Gig',
        description: 'We maintain a repository of gigs (services) offered by ‘a community of reputable great minds’. We have a vibrant community, heartily seeking to help you ‘build your dream’. We don’t only offer you talents; we offer you a like-mind, a SteemGigger, a dream-builder, a brother. Visit https://steemgigs.org, to locate that special someone. '
      },
      {
        image: '/static/img/landing/custom.svg',
        title: 'Create A Custom Request Or Microtask',
        description: '“Do the dreaming, leave ‘the building’ to us”. Where you can’t find the ‘exact gig’ that fits your need, you can create a ‘custom request’ or ‘a microtask request’ and we will actively seek out reputable great minds from our community who can help. '
      },
      {
        image: '/static/img/landing/create.svg',
        title: 'Create Content',
        description: 'On STEEMGIGS, content is queen. A core aspect of SteemGigs is our knowledge-bank, a repository of niche-based information borne out of experience. We welcome content-contributions for our users. This content ranks in the search engines and is published to the steem blockchain, before a large community.'
      },
      {
        image: '/static/img/landing/curate.svg',
        title: 'Curate And Interact',
        description: 'On SteemGigs, everyone has something to offer. You can also visit SteemGigs for the sole reason of interacting with its community. One way of doing so is by curating content. This means that you can find posts to read, like (upvote), leave comments on etc right there on https://steemgigs.org '
      }
      ],
      standItems: [{
        title: 'Token Economy',
        description: 'We have a token economy that allows users to earn for their content, in addition to ‘services rendered’. (This applies to both clients and freelancers). '
      },
      {
        title: 'Harvest unbelievable talent',
        description: 'If you are a client, you get more than a freelancer. You get a like-mind, a reputable great mind, a dream-builder and brother.'
      },
      {
        title: 'No Censorship',
        description: 'No third-parties merchants and its associated fees & no censorship. (meaning your gigs can’t be deleted). '
      },
      {
        title: 'Invest & Earn',
        description: 'You can have a stake in the company by virtue of the teardrops SMT.'
      },
      {
        title: 'Knowledge',
        description: 'We have a knowledge-bank, that maintains a repository of expert-knowledge, borne out of real-life experiences.'
      },
      {
        title: 'Certified Users',
        description: 'Certified users can earn UI-perks and other exclusive benefits'
      }
      ],
      exploreItems: [{
        title: 'Fun & Lifestyle',
        image: '/static/img/landing/fun.svg',
        link: '/categories/fun-lifestyle'
      },
      {
        title: 'Graphics & Design',
        image: '/static/img/landing/design.svg',
        link: '/categories/graphics-design'
      },
      {
        title: 'Videos & Animation',
        image: '/static/img/landing/video.svg',
        link: '/categories/videos-and-animation'
      },
      {
        title: 'Music',
        image: '/static/img/landing/music.svg',
        link: '/categories/music-audio'
      },
      {
        title: 'Business',
        image: '/static/img/landing/business.svg',
        link: '/categories/business'
      },
      {
        title: 'Digital Marketing',
        image: '/static/img/landing/trend.svg',
        link: '/categories/digital-marketing'
      },
      {
        title: 'Writing & Translation',
        image: '/static/img/landing/writing.svg',
        link: '/categories/writing-and-translation'
      },
      {
        title: 'Programming & Tech',
        image: '/static/img/landing/programming.svg',
        link: '/categories/programming-tech'
      }
      ],
      coreItems: [{
        image: '/static/img/landing/dream.jpg',
        title: 'Be A Dream Builder',
        description: 'Sell and offer your freelance services to the community'
      },
      {
        image: '/static/img/landing/dream2.jpg',
        title: 'Build a dream',
        description: 'Avail of a gig, else, create a custom request'
      },
      {
        image: '/static/img/landing/reach.jpg',
        title: 'Become a Dream Builder',
        description: 'Contribute knowledge to our knowledge bank, or read from it'
      },
      {
        image: '/static/img/landing/praise.jpg',
        title: 'A dream builder is reputable',
        description: 'Did your freelancer treat you amazingly, tell the world'
      },
      {
        image: '/static/img/landing/inspire.jpg',
        title: 'Inspire reputable dream builders',
        description: 'Seek out avenues to inspire SteemGiggers'
      }
      ],
      tutorialPlaceholders: [{
        title: 'Getting Started with SteemGigs',
        image: '/static/img/landing/go.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim massa vel pretium hendrerit. Donec erat turpis, imperdiet tempus bibendum',
        author: 'surpassinggoogle'
      },
      {
        title: 'How to create the perfect gigs',
        image: '/static/img/landing/book.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim massa vel pretium hendrerit. Donec erat turpis, imperdiet tempus bibendum',
        author: 'surpassinggoogle'
      },
      {
        title: 'Learn from the successes of others',
        image: '/static/img/landing/class.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim massa vel pretium hendrerit. Donec erat turpis, imperdiet tempus bibendum',
        author: 'surpassinggoogle'
      },
      {
        title: 'Share your skills with the world',
        image: '/static/img/landing/teach.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim massa vel pretium hendrerit. Donec erat turpis, imperdiet tempus bibendum',
        author: 'surpassinggoogle'
      }
      ]
    }
  },
  computed: {
    // Used to indicate if the search popover should show
    showSearchOptions () {
      if (this.searchTerm.length !== 0) {
        return true
      }
    }
  }
}
</script>

<style lang="scss">
  .landing {
    background-color: white;
    overflow: auto;
    height: calc(100vh - 40px);
    section {
      padding: 50px 100px;
    }
    img {
      object-fit: initial;
    }
  }

  .el-button-group .el-button--primary:first-child {
    border: 0;
    &:hover {
      border: 0;
    }
  }

  @media only screen and (max-width: 600px) {
    .landing {
      section {
        padding: 50px 30px;
      }
      .hero-img {
        display: none;
      }
    }
}

  // Hero section within landing page
  .hero-landing {
    background-color: white;
    h1 {
      color: #6361D0;
    }
    img {
      padding: 60px;
      display: flex;
    }
    .el-input-group__append {
      background-color: #6361D0 !important;
           }
    button {
      color: white !important;
    }

  .search-options {
    padding: 0 !important;
    width: 100%;
    margin-top: 10px;
    position: inherit;
    span {
      display: block;
      color: #3f51b5;
      cursor: pointer;
      word-break: break-all;
      padding: 10px;
      &:hover {
        background-color: #ecf5ff;
      }
    }
  }
  }

  // About section within landing page
  .about-landing {
    background-color: #eaeaea;
    text-align: center;
    h4,
    h2,
    h3 {
      margin: 0;
    }
    .about-item {
      min-height: 420px;
      img {
        width: 65%;
        min-width: 200px;
      }
    }
  }

  // Core section within landing page
  .core-landing {
    background: linear-gradient(0deg, white 50%, #eaeaea 50%);
    .core-card {
      margin: 0px 10px;
      text-align: center;
      border: 1px solid whitesmoke;
      img {
        height: 150px;
      }
      h5 {
        margin: 0;
        color: #181566;
      }
      div {
        padding: 20px;
      }
    }
  }

  // Video Section within landing
  .video-landing {
    background: linear-gradient(0deg, white 50%, #eaeaea 50%);
    padding: 0 !important;
    .video-col {
      display: flex;
      justify-content: center;
    }
    .sg-video {
      width: 50%;
      min-width: 350px;
    }
  }

  // Stand out section within landing
  .stand-landing {
    .stand-item {
      min-height: 105px;
      p {
        margin-left: 30px;
      }
      .stand-item-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #181566;
        h4 {
          margin: 0;
        }
        i {
          margin-right: 10px;
          color: #6361D0;
          font-weight: bold;
          font-size: 18px;
        }
      }
    }
  }

  // Quote section within landing page
  .quote-landing {
    background-color: #eaeaea;
    .el-row {
      align-items: center;
    }
    .quote-text {
      font-size: 20px;
    }
    .quote-mark {
      height: 35px;
    }
    .quote-sig {
      font-family: 'Dancing Script', cursive;
      font-size: 25px;
      font-weight: bold;
    }
    .quote-column {
      padding-left: 25px;
      padding-right: 25px;
      display: flex;
      flex-direction: column;
      align-items: baseline;
      height: 350px;
      justify-content: center;
    }
  }

  // Explore section within SteemGigs
  .explore-landing {
    text-align: center;
    .explore-item-row {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      height: fit-content;
      align-items: center;
      .explore-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 75p
        a {
              align-items: center;
    display: inherit;
    flex-direction: column;
}
        h5 {
          margin-top: 10px;
          color: #181566;
        }
      }
    }
  }

  // Bropro section within landing page
  .bropro-landing {
    display: flex;
    align-items: center;
    .el-row {
      display: flex;
      align-items: center;
    }
    .bropro-subtitle {
      text-transform: uppercase;
      font-weight: bold;
      color: #181566;
      margin-bottom: -25px;
      display: block;
    }
    img {
      width: 100%;
    }
    .bropro-header {
      font-family: 'Roboto Slab', serif;
      display: flex;
      font-size: 80px;
      color: #6361D0;
    }
  }

  // Get Started grey section within landing
  .get-started-grey {
    background-color: #f7f7f7;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    text-align: center;
  }

  // Surpassing Google section within landing page
  .surpassing-landing {
    text-align: center;
    .surpassing-header {
      font-family: 'Dancing Script', cursive;
      color: #6361D0;
      display: block;
      font-size: 40px;
      font-weight: bold;
    }
    .el-col {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    p {
      max-width: 600px;
    }
    button {
      margin-bottom: 10px;
      &:first-child {
        margin-right: 5px;
      }
    }
  }

  // Get Started Purple section within landing
  .get-started-purple {
    background-color: #6361d0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.09'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    color: white;
    text-align: center;
    h3 {
      color: white !important;
    }
    button {
      color: white;
      border: 1px solid white;
      background: 0;
    }
    button:hover {
      color: white;
      border: 1px solid white;
      background: 0;
      opacity: 0.8;
    }
  }

  // Tutorial section within landing page
  .tutorial-landing {
    h3,
    p {
      text-align: center;
    }
    .tutorial-card {
      background: white;
      display: flex;
      flex-direction: column;
      width: auto;
      margin: 0px 10px;
      border: 1px solid whitesmoke;
      border-radius: 5px;
      img {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
      .tutorial-details {
        padding: 15px;
        p {
          text-align: left;
        }
        h4 {
          margin: 0 0 10px 0;
        }
        .author-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          img {
            width: 25px;
            height: 25px;
            margin-right: 10px;
          }
          span {
            font-weight: bold;
            color: #1E2F4F;
            font-size: 13px;
          }
        }
      }
    }
  }

  // Shared
  .sg-video {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 3px 3px #bfbfbf0f;
    width: 100%;
  }

  .fill-height {
    height: 100%;
    height: -moz-available;
    /* WebKit-based browsers will ignore this. */
    height: -webkit-fill-available;
    /* Mozilla-based browsers will ignore this. */
    height: fill-available;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
