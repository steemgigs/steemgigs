<template>
  <div class="landing">
    <!-- Hero Section with Search -->
    <section class='hero-landing'>
        <el-row :gutter="15">
          <el-col class="hero-text fill-height flex-col" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <h1>Do The 'Dreaming', Leave 'The Building' To Us</h1>
            <p>Freelance services for your business, by reputable like-minds.</p>
            <el-input v-model="searchString" placeholder="Search SteemGigs">
              <el-button class="primary" slot="append">Search</el-button>
            </el-input>
          </el-col>
          <el-col class="hero-img fill-height flex-col" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <img src="/static/img/landing/landing_1.svg" alt="">
          </el-col>
        </el-row>
    </section>
    <!-- Things you can do on SteemGigs -->
    <section class="about-landing">
        <el-row :gutter="15">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <h2>Things you can do on SteemGigs</h2>
            <p>Explore what is available on our platform below</p>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col class="about-item" v-for="(item, index) in aboutItems" :key="index" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <img :src="item.image" alt="Do Image">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </el-col>
        </el-row>
    </section>
    <!-- Video Section -->
    <section class="video-landing">
        <el-row :gutter="15">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <youtube video-id="ECZeGSHPWZI" player-width="100%" player-height="auto"></youtube>
          </el-col>
        </el-row>
    </section>
    <!-- Stand out section -->
    <section class="stand-landing">
        <el-row :gutter="15">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <h2>How We Stand Out</h2>
            <p>You have successfully reached STEEMGIGS, a revolutionary freelance services marketplace & social network connected to a decentralized steem blockchain, with the power of Fiverr, Upwork & Freelancer combined. SteemGigs removes all barriers to
              entry in relation to 'building a dream', by implementing an 'untalented & community paradigm', in association with a token economy.
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
            <h2>Core Aspects of SteemGigs</h2>
            <p>You have successfully reached STEEMGIGS, a revolutionary freelance services marketplace & social network connected to a decentralized steem blockchain, with the power of Fiverr, Upwork & Freelancer combined. SteemGigs removes all barriers to
              entry in relation to 'building a dream', by implementing an 'untalented & community paradigm', in association with a token economy.
            </p>
          </el-col>
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
          <el-col class="explore-item" v-for="(item, index) in exploreItems" :key="index" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <img :src="item.image" alt="Explore Image">
            <h5>{{ item.title }}</h5>
          </el-col>
        </el-row>
    </section>
    <!-- Get Started Grey -->
    <section class="get-started-grey">
        <el-row :gutter="15">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <h3>All your freelance service needs and more</h3>
            <p>Whether you’re a freelancer, need a freelancer or want to be a freelancer, we have you covered.</p>
            <el-button type="primary" class="primary">Explore SteemGigs</el-button>
          </el-col>
        </el-row>
    </section>
    <!-- SurpassingGoogle -->
    <section class="surpassing-landing">
        <el-row :gutter="15">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="surpassing-header">SurpassingGoogle</span>
            <span>The knowledge-bank of SteemGigs</span>
            <p>Everyone participant of our ecosystem will eventually become a 'dream-builder' (SteemGigger), building their dreams and those of others. To accomplish this, we have created a bank, for 'deposits & withdrawals' of all the bits & bytes that one
              will ever need to build any noble dream (however limitless). We will vault all this knowledge in our bank, in the form of unadulterated excerpts from the brains, lives, experiences of 'reputable great minds', specific to every niche, field,
              industry, expertise etc. By means of your incessant contributions, we will surpass Google (attain limitlessness), reshaping the worldwide web with the freshness of our awesomeness.
            </p>
            <div>
              <el-button type="primary" class="primary">Read the Knowledge Bank</el-button>
              <el-button type="secondary">Publish to the Knowledge Bank</el-button>
            </div>
          </el-col>
        </el-row>
    </section>
    <!-- Quote Section -->
    <section class="quote-landing">
        <el-row :gutter="15">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <youtube video-id="ECZeGSHPWZI" player-width="100%" player-height="auto"></youtube>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim massa vel pretium hendrerit. Donec erat turpis, imperdiet tempus bibendum</p>
            <span>@tobias-g</span>
          </el-col>
        </el-row>
    </section>
    <!-- BroPro Section -->
    <section class="bropro-landing">
        <el-row :gutter="15">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <span>TRY STEEMGIGS</span>
            <span class="bropro-header">BROPRO</span>
            <p>Talent is generic. A 'brother talent'? Now, that's great. Find that ever missing peice of the puzzle with broPRO.</p>
            <el-button type="secondary">Coming Soon</el-button>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
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
            <el-button>Explore SteemGigs</el-button>
          </el-col>
        </el-row>
    </section>
    <!-- Tutorials Section -->
    <section class="tutorial-landing">
        <el-row :gutter="15">
          <el-row :gutter="15">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <h2>Tutorials</h2>
              <p>You have successfully reached STEEMGIGS, a revolutionary freelance services marketplace & social network connected to a decentralized steem blockchain, with the power of Fiverr, Upwork & Freelancer combined.
              </p>
            </el-col>
          </el-row>
        </el-row>
    </section>
  </div>
</template>

<script>
export default {
  name: 'landing-page',
  data () {
    return {
      searchString: '',
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
        link: ''
      },
      {
        title: 'Graphics & Design',
        image: '/static/img/landing/design.svg',
        link: ''
      },
      {
        title: 'Videos & Animation',
        image: '/static/img/landing/video.svg',
        link: ''
      },
      {
        title: 'Music',
        image: '/static/img/landing/music.svg',
        link: ''
      },
      {
        title: 'Business',
        image: '/static/img/landing/business.svg',
        link: ''
      },
      {
        title: 'Digital Marketing',
        image: '/static/img/landing/trend.svg',
        link: ''
      },
      {
        title: 'Writing & Translation',
        image: '/static/img/landing/writing.svg',
        link: ''
      },
      {
        title: 'Programming & Tech',
        image: '/static/img/landing/programming.svg',
        link: ''
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
@import url('https://fonts.googleapis.com/css?family=Dancing+Script|Roboto+Slab|Roboto:500|Ubuntu:300');
  .landing {
    background-color: white;
  }

  h1, h2, h3, h4, h5 {
    font-family: 'Roboto', sans-serif;
    margin: 0;
  }

  h1 {
    font-size: 42px;
    font-weight: bold;
    margin: 0;
  }

  h2 {
    color: #181566;
  }

  h3 {

  }

  h4 {

  }

  h5 {

  }

  p {
    font-family: 'Ubuntu', sans-serif;
  }

  .surpassing-header {
    font-family: 'Dancing Script', cursive;
    color: #6361D0;
    display: block;
    font-size: 40px;
  }

  .bropro-header {
    font-family: 'Roboto Slab', serif;
    display: flex;
    font-size: 40px;
    color: #6361D0;
  }

  .fill-height {
    height: 100%;
    height: -moz-available;
    /* WebKit-based browsers will ignore this. */
    height: -webkit-fill-available;
    /* Mozilla-based browsers will ignore this. */
    height: fill-available;
  }

  .landing section {
    padding: 50px 150px;
  }

  .landing img {
    object-fit: initial;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .hero-text {}

  .hero-img {}

  .hero-landing {
    background-color: white;
  }

  .about-landing {
    background-color: #F8F8F8;
    text-align: center;
  }

  .video-landing {
    background: linear-gradient(0deg, white 50%,#F8F8F8 50%);
  }

  .stand-landing {

  }

  .core-landing {
    background-color: #F8F8F8;
  }

  .get-started-grey {
    background-color: #F8F8F8;
    text-align: center;
  }

  .quote-landing {
    background-color: #F8F8F8;
  }

  .get-started-purple {
    background-color: #6361D0;
    color: white;
    text-align: center;
  }

  .tutorial-landing {
        text-align: center;
  }

  // About section within landing page

  .about-item {
    min-height: 500px;
    img {
      width: 100%;
    }
  }

  // Stand out section within landing

  .stand-landing {
    .stand-item {
      min-height: 100px;
      p {
        margin-left: 30px;
      }
    .stand-item-header{
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #181566;
      i {
        margin-right: 10px;
        color: #6361D0;
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
}

// Explore section within SteemGigs

.explore-landing {
  text-align: center;
  .explore-item-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 300px;
    align-items: center;
  .explore-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    h5 {
      margin-top: 10px;
    }
  }
  }
}

  // Bropro section within landing page

  .bropro-landing {
    img {
      width: 100%;
    }
  }
</style>
