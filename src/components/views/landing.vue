<template>
  <div>
    <!-- Hero Section with Search -->
    <section>
      <el-main>
        <el-row :gutter="15">
          <el-col class="hero-text fill-height flex-col" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <h1>Do The 'Dreaming', Leave 'The Building' To Us</h1>
            <p>Freelance services for your business, by reputable like-minds.</p>
            <el-input v-model="searchString" placeholder="Search SteemGigs">
              <el-button class="primary" slot="append">Search</el-button>
            </el-input>
          </el-col>
          <el-col class="hero-img fill-height flex-col" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <img src="/static/img/landing_1.svg" alt="">
          </el-col>
        </el-row>
      </el-main>
    </section>
    <!-- Things you can do on SteemGigs -->
    <section>
      <el-main>
        <el-row :gutter="15">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <h2>Things you can do on SteemGigs</h2>
            <p>Explore what is available on our platform below</p>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col v-for="(item, index) in aboutItems" :key="index" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <img :src="item.image" alt="Do Image">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </el-col>
        </el-row>
      </el-main>
    </section>
    <!-- Video Section -->
    <section>
      <el-main>
        <el-row :gutter="15">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <youtube video-id="ECZeGSHPWZI" player-width="100%" player-height="auto"></youtube>
          </el-col>
        </el-row>
      </el-main>
    </section>
    <!-- Stand out section -->
    <section>
      <el-main>
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
          <el-col v-for="(item, index) in standItems" :key="index" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
          </el-col>
        </el-row>
      </el-main>
    </section>
    <!-- Core Aspects of SteemGigs -->
    <section>
      <el-main>
        <el-row :gutter="15">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <h2>Core Aspects of SteemGigs</h2>
            <p>You have successfully reached STEEMGIGS, a revolutionary freelance services marketplace & social network connected to a decentralized steem blockchain, with the power of Fiverr, Upwork & Freelancer combined. SteemGigs removes all barriers to
              entry in relation to 'building a dream', by implementing an 'untalented & community paradigm', in association with a token economy.
            </p>
          </el-col>
        </el-row>
      </el-main>
    </section>
    <!-- Explore Marketplace -->
    <section>
      <el-main>
        <el-row :gutter="15">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <h3>Explore our SteemGigs marketplace</h3>
            <p>Are you ready to build your dream? Get inspired by exploring our various categories</p>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col v-for="(item, index) in exploreItems" :key="index" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <img :src="item.image" alt="Explore Image">
            <h5>{{ item.title }}</h5>
          </el-col>
        </el-row>
      </el-main>
    </section>
    <!-- Get Started Grey -->
    <section>
      <el-main>
        <el-row :gutter="15">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <h3>All your freelance service needs and more</h3>
            <p>Whether you’re a freelancer, need a freelancer or want to be a freelancer, we have you covered.</p>
            <el-button type="primary" class="primary">Explore SteemGigs</el-button>
          </el-col>
        </el-row>
      </el-main>
    </section>
    <!-- SurpassingGoogle -->
    <section>
      <el-main>
        <el-row :gutter="15">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span>SurpassingGoogle</span>
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
      </el-main>
    </section>
    <!-- Quote Section -->
    <section>
      <el-main>
        <el-row :gutter="15">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <youtube video-id="ECZeGSHPWZI" player-width="100%" player-height="auto"></youtube>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim massa vel pretium hendrerit. Donec erat turpis, imperdiet tempus bibendum</p>
            <span>@tobias-g</span>
          </el-col>
        </el-row>
      </el-main>
    </section>
    <!-- BroPro Section -->
    <section>
      <el-main>
        <el-row :gutter="15">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <span>TRY STEEMGIGS</span>
            <span>BROPRO</span>
            <p>Talent is generic. A 'brother talent'? Now, that's great. Find that ever missing peice of the puzzle with broPRO.</p>
            <el-button type="secondary">Coming Soon</el-button>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <img src="" alt="BroPro Image">
          </el-col>
        </el-row>
      </el-main>
    </section>
    <!-- Get Started Purple Section -->
    <section>
      <el-main>
        <el-row :gutter="15">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <h3>Help someone build a dream today, offer a freelance service</h3>
            <p>Need inspiration? Check to see if there is an open custom request or micro task. SteemGigs is for everyone. </p>
            <el-button>Explore SteemGigs</el-button>
          </el-col>
        </el-row>
      </el-main>
    </section>
    <!-- Tutorials Section -->
    <section>
      <el-main>
        <el-row :gutter="15">
          <el-row :gutter="15">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <h2>Tutorials</h2>
              <p>You have successfully reached STEEMGIGS, a revolutionary freelance services marketplace & social network connected to a decentralized steem blockchain, with the power of Fiverr, Upwork & Freelancer combined.
              </p>
            </el-col>
          </el-row>
        </el-row>
      </el-main>
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
        image: '',
        title: 'Create A Gig',
        description: 'Whether you an expert or non-expert, you can offer a service in exchange for STEEM, STEEM Dollars, Steem Power or ‘for free’. SteemGigs has an un(dis)talented paradigm. This means that on SteemGigs, everyone has something to offer. '
      },
      {
        image: '',
        title: 'Locate A Gig',
        description: 'We maintain a repository of gigs (services) offered by ‘a community of reputable great minds’. We have a vibrant community, heartily seeking to help you ‘build your dream’. We don’t only offer you talents; we offer you a like-mind, a SteemGigger, a dream-builder, a brother. Visit https://steemgigs.org, to locate that special someone. '
      },
      {
        image: '',
        title: 'Create A Custom Request Or Microtask',
        description: '“Do the dreaming, leave ‘the building’ to us”. Where you can’t find the ‘exact gig’ that fits your need, you can create a ‘custom request’ or ‘a microtask request’ and we will actively seek out reputable great minds from our community who can help. '
      },
      {
        image: '',
        title: 'Create Content',
        description: 'On STEEMGIGS, content is queen. A core aspect of SteemGigs is our knowledge-bank, a repository of niche-based information borne out of experience. We welcome content-contributions for our users. This content ranks in the search engines and is published to the steem blockchain, before a large community.'
      },
      {
        image: '',
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
        image: '',
        link: ''
      },
      {
        title: 'Graphics & Design',
        image: '',
        link: ''
      },
      {
        title: 'Videos & Animation',
        image: '',
        link: ''
      },
      {
        title: 'Music',
        image: '',
        link: ''
      },
      {
        title: 'Business',
        image: '',
        link: ''
      },
      {
        title: 'Digital Marketing',
        image: '',
        link: ''
      },
      {
        title: 'Writing & Translation',
        image: '',
        link: ''
      },
      {
        title: 'Programming & Tech',
        image: '',
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
  .landing {
    background-color: white;
  }

  h1 {
    font-size: 42px;
    font-weight: bold;
    margin: 0;
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

  .hero-text {}

  .hero-img {}
</style>
