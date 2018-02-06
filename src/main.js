// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import mixins from '@/plugins/mixins'
import Notifications from 'vue-notification'
import VTooltip from 'v-tooltip'
import Vuex from 'vuex'

require('./assets/steemgigs.scss')

Vue.prototype.categories = [
  {
    name: 'Graphics & Design',
    description: 'Fantastic Category lorem ipsum dolor sit amet jTem boucoup merci',
    subcategories: ['logo design', 'business cards and stationery', 'illustration', 'cartoons and carricatures', 'flyers and posters', 'book covers and packaging', 'web and mobile design', 'social media design', 'banner ads', 'photoshop editing', '3D & 2D models', 'T-shirts', 'presentation design', 'infographics', 'vector tracing', 'invitations', 'other']
  },
  {
    name: 'Digital marketing',
    description: 'Fantastic Category lorem ipsum dolor sit amet jTem boucoup merci',
    subcategories: ['social media marketing', 'SEO', 'content marketing', 'video marketing', 'email marketing', 'search & display marketing', 'marketing strategy', 'web analysis', 'influencer marketing', 'local listings', 'domain research', 'e-commerce marketing', 'mobile advertising', 'music promotion', 'web traffic', 'other']
  },
  {
    name: 'Writing and translation',
    description: 'Fantastic Category lorem ipsum dolor sit amet jTem boucoup merci',
    subcategories: ['resumes and cover letters', 'proof reading and editing', 'translation', 'creative writing', 'business copywriting', 'research & summaries', 'articles & blog posts', 'press releases', 'transcription', 'legal writing', 'other']
  },
  {
    name: 'Videos and animation',
    description: 'Fantastic Category lorem ipsum dolor sit amet jTem boucoup merci',
    subcategories: ['whiteboard & animated explainers', 'intros & animated logos', 'promotional videos', 'editing and post production', 'lyric & music video', 'spokeperson videos', 'animated characters & modelling', 'short videos ads', 'live action explainers', 'other']
  },
  {
    name: 'Music & Audio',
    description: 'Fantastic Category lorem ipsum dolor sit amet jTem boucoup merci',
    subcategories: ['voice over', 'mixing & mastering', 'producers & composers', 'singer-songwriters', 'session musicians & singers', 'jingles and drops', 'sound effects', 'other']
  },
  {
    name: 'Programming & tech',
    description: 'Fantastic Category lorem ipsum dolor sit amet jTem boucoup merci',
    subcategories: ['wordpress', 'website builders & cms', 'web programming', 'e-commerce', 'mobile apps & web', 'desktop applications', 'support & IT', 'chatbots', 'data analysis & reports', 'convert files', 'databses', 'user testing', 'QA', 'other']
  },
  {
    name: 'Business',
    description: 'Fantastic Category lorem ipsum dolor sit amet jTem boucoup merci',
    subcategories: ['virtual assistant', 'market research', 'business plans', 'branding services', 'legal consulting', 'financial consulting', 'business tips', 'presentations', 'career advice', 'flyer distribution', 'other']
  },
  {
    name: '#Untalented',
    description: 'Fantastic Category lorem ipsum dolor sit amet jTem boucoup merci',
    subcategories: ['online lessons', 'arts and crafts', 'relationship advice', 'health, nutrition and fitness', 'astrology & readings', 'spiritual & healing', 'family & Genealogy', 'gaming', 'greeting cards & videos', 'your message on ...', 'viral videos', 'pranks & stunts', 'celebrity impersonators', 'collectibles', 'global culture', 'other']
  },
  {
    name: 'Steem & Steemit',
    description: 'Fantastic Category lorem ipsum dolor sit amet jTem boucoup merci',
    subcategories: ['Steem projects', 'Curation projects', 'Steem tutors', 'Steem Graphics', 'Steem Coders', 'Steem Coders', 'Steem Veterans', 'Witness services', 'Steem Writers']
  }
]

Vue.config.productionTip = false
Vue.prototype.$eventBus = new Vue()
Vue.use(Vuex)
Vue.mixin(mixins)
Vue.use(Notifications)
Vue.use(VTooltip)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
