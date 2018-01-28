<template>
  <ul class="subnav center center-align">
    <li v-for="(category, index) in categories" :key="index">
      <router-link :to="'/categories/' + category.name">{{ category.name }}</router-link>
      <div class="dropdown white z-depth-1 drop">
        <ul>
          <li v-for="(subcategory, subIndex) in half1(category.subcategories)" :key="subIndex">
            <router-link :to="'/categories/' + category.name + '/' + subcategory">{{ subcategory }}</router-link>
          </li>
        </ul>
        <ul>
          <li v-for="(subcategory, subIndex) in half2(category.subcategories)" :key="subIndex">
            <router-link :to="'/categories/' + category.name + '/' + subcategory">{{ subcategory }}</router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      categories: [
        {
          'name': 'Graphics & Design', 'subcategories': ['logo design', 'business cards and stationery', 'illustration', 'cartoons and carricatures', 'flyers and posters', 'book covers and packaging', 'web and mobile design', 'social media design', 'banner ads', 'photoshop editing', '3D & 2D models', 'T-shirts', 'presentation design', 'infographics', 'vector tracing', 'invitations', 'other']
        },
        {
          'name': 'Digital marketing', 'subcategories': ['social media marketing', 'SEO', 'content marketing', 'video marketing', 'email marketing', 'search & display marketing', 'marketing strategy', 'web analysis', 'influencer marketing', 'local listings', 'domain research', 'e-commerce marketing', 'mobile advertising', 'nusic promotion', 'web traffic', 'other']
        },
        {
          'name': 'Writing and translation', 'subcategories': ['resumes and cover letters', 'proof reading and editing', 'translation', 'creative writing', 'business copywriting', 'research & summaries', 'articles & blog posts', 'press releases', 'transcription', 'legal writing', 'other']
        },
        {
          'name': 'Videos and animation', 'subcategories': ['whiteboard & animated explainers', 'intros & animated logos', 'promotional videos', 'editing and post production', 'lyric & music video', 'spokeperson videos', 'animated characters & modelling', 'short videos ads', 'live action explainers', 'other']
        },
        {
          'name': 'Music & Audio', 'subcategories': ['voice over', 'mixing & mastering', 'producers & composers', 'singer-songwriters', 'session musicians & singers', 'jingles and drops', 'sound effects', 'other']
        },
        {
          'name': 'Programming & tech', 'subcategories': ['wordpress', 'website builders & cms', 'web programming', 'e-commerce', 'mobile apps & web', 'desktop applications', 'support & IT', 'chatbots', 'data analysis & reports', 'convert files', 'databses', 'user testing', 'QA', 'other']
        },
        {
          'name': 'Business', 'subcategories': ['virtual assistant', 'market research', 'business plans', 'branding services', 'legal consulting', 'financial consulting', 'business tips', 'presentations', 'career advice', 'flyer distribution', 'other']
        },
        {
          'name': 'Untalented', 'subcategories': ['online lessons', 'arts and crafts', 'relationship advice', 'health, nutrition and fitness', 'astrology & readings', 'spiritual & healing', 'family & Genealogy', 'gaming', 'greeting cards & videos', 'your message on ...', 'viral videos', 'pranks & stunts', 'celebrity impersonators', 'collectibles', 'global culture', 'other']
        }
      ]
    }
  },
  methods: {
    half1 (arr) {
      return arr.slice(0, (Math.ceil(arr.length / 2)))
    },
    half2 (arr) {
      return arr.slice((Math.ceil(arr.length / 2)))
    }
  }
}
</script>

<style lang="scss" scoped>
.subnav {
  background: white;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #f8f8f8;
  top: 41px;
  position: fixed;
  width: 100%;
  z-index: 2;
  li {
    display: inline-block;
    a {
      padding: 11.5px 0.5em;
      line-height: 40px;
      color: black;
      font-weight: 500;
      position: relative;
      box-sizing: border-box;
      transition: all ease-in-out .3s;
      &:hover::after {
        width: 100%;
      }
      &::after {
        content: ' ';
        height: 2px;
        width: 0%;
        background: black;
        display: inline-block;
        position: absolute;
        left: 0;
        bottom: 0;
        transition: all ease-in-out .3s;
      }
    }
    .dropdown {
      display: none;
    }
    &:hover .dropdown {
      width: auto;
      opacity: 1;
      visibility: visible;
      // display: block;
      // z-index: 1;
      // max-width: 30em;
      // width: fit-content;
      // text-align: left;
      // position: fixed;
      background: #fff;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      position: absolute;
      z-index: 1;
      top: 100%;
      left: auto;
      right: auto;
      vertical-align: baseline;
      border: 1px #e5e5e5 solid;
      // box-shadow: 0 1px 3px #dddddd;
      padding: 10px 0;
      -webkit-transition: opacity .1s;
      transition: opacity .1s;
      -webkit-transition-delay: .2s;
      transition-delay: .2s;

      // &:last-child {
      //   right: 1em;
      // }

      ul {
        padding: 0 20px;
        li {
          display: block;
          text-align: left;
          width: max-content;
        }
      }

      ul:first-of-type {
        margin-right: 15px;
      }
    }
  }
}
</style>
