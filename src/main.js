// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import mixins from '@/plugins/mixins'
import Notifications from 'vue-notification'
import VTooltip from 'v-tooltip'
import VueContentPlaceholders from 'vue-content-placeholders'
import Vuex from 'vuex'

require('./assets/steemgigs.scss')

Vue.prototype.categories = [
  {
    'name': 'Graphics & Design',
    'description': "Wouldn't want a logo that pinpointly represents You, your story, legacy, vision or brand? Let a steemgigger help!",
    'subcategories': [
      {
        'name': 'logo design',
        'description': ''
      },
      {
        'name': 'business cards and stationery',
        'description': 'Slay every meeting with a remarkable first impression. Let us help you create custom business card & stationery designs'
      },
      {
        'name': 'illustration',
        'description': 'Envision your vision. Let\'s help you make custom digital & hand-drawn illustrations'
      },
      {
        'name': 'cartoons and carricatures',
        'description': 'Get fictional. Go unpredictable! Let\'s us wow you with a cartoon portrait or caricature'
      },
      {
        'name': 'flyers and posters',
        'description': 'Capture Every Attention. Let\'s us make your Flyers & Brochure designs remarkable.'
      },
      {
        'name': 'book covers and packaging',
        'description': 'Let us transform your books etc into legendary best sellers with stunning book covers & packaging designs.'
      },
      {
        'name': 'web and mobile design',
        'description': 'Do you want amplify online presence? We will passionately help you build custom designs for your websites, apps & icons etc'
      },
      {
        'name': 'social media design',
        'description': 'Make your social media a class act. Let\'s us create your custom-designed skins, avatars & more.'
      },
      {
        'name': 'banner ads',
        'description': 'Promote everything to the moon with irresistable Banner ADs. We will help!'
      },
      {
        'name': 'photoshop editing',
        'description': 'Need just the perfect image? Find photoshop experts for each need.'
      },
      {
        'name': '3D & 2D models',
        'description': 'Take action. Bring your product to life. Let us help you start building your product visualization, 3D & more.'
      },
      {
        'name': 'T-shirts',
        'description': 'Hit every nook and cranny with stunning custom-design T-shirts & merchandise. We can help.'
      },
      {
        'name': 'presentation design',
        'description': 'Educate; Capture hearts and minds with memorable, custom-designed PowerPoint or Keynote presentations.'
      },
      {
        'name': 'infographics',
        'description': 'Beautify data with passionate help from our expert inforgraphic designers.'
      },
      {
        'name': 'vector tracing',
        'description': ''
      },
      {
        'name': 'invitations',
        'description': ''
      },
      {
        'name': 'other',
        'description': ''
      }
    ]
  },
  {
    'name': 'Digital marketing',
    'description': 'Make the growth of your brand more organic. We will help you with all your digital marketing services',
    'subcategories': [
      {
        'name': 'social media marketing',
        'description': ''
      },
      {
        'name': 'SEO',
        'description': ''
      },
      {
        'name': 'content marketing',
        'description': ''
      },
      {
        'name': 'video marketing',
        'description': ''
      },
      {
        'name': 'email marketing',
        'description': ''
      },
      {
        'name': 'search & display marketing',
        'description': ''
      },
      {
        'name': 'marketing strategy',
        'description': ''
      },
      {
        'name': 'web analysis',
        'description': ''
      },
      {
        'name': 'influencer marketing',
        'description': ''
      },
      {
        'name': 'local listings',
        'description': ''
      },
      {
        'name': 'domain research',
        'description': ''
      },
      {
        'name': 'e-commerce marketing',
        'description': ''
      },
      {
        'name': 'mobile advertising',
        'description': ''
      },
      {
        'name': 'music promotion',
        'description': ''
      },
      {
        'name': 'web traffic',
        'description': ''
      },
      {
        'name': 'other',
        'description': ''
      }
    ]
  },
  {
    'name': 'Writing and translation',
    'description': "You have the words, let's pen it right. Try a steemgigger now for your copy, translation & editorial work",
    'subcategories': [
      {
        'name': 'resumes and cover letters',
        'description': ''
      },
      {
        'name': 'proof reading and editing',
        'description': ''
      },
      {
        'name': 'translation',
        'description': ''
      },
      {
        'name': 'creative writing',
        'description': ''
      },
      {
        'name': 'business copywriting',
        'description': ''
      },
      {
        'name': 'research & summaries',
        'description': ''
      },
      {
        'name': 'articles & blog posts',
        'description': ''
      },
      {
        'name': 'press releases',
        'description': ''
      },
      {
        'name': 'transcription',
        'description': ''
      },
      {
        'name': 'legal writing',
        'description': ''
      },
      {
        'name': 'other',
        'description': ''
      }
    ]
  },
  {
    'name': 'Videos and animation',
    'description': "You have the words, let's pen it right. Try a steemgigger now for your copy, translation & editorial work",
    'subcategories': [
      {
        'name': 'whiteboard & animated explainers',
        'description': ''
      },
      {
        'name': 'intros & animated logos',
        'description': ''
      },
      {
        'name': 'promotional videos',
        'description': ''
      },
      {
        'name': 'editing and post production',
        'description': ''
      },
      {
        'name': 'lyric & music video',
        'description': ''
      },
      {
        'name': 'spokeperson videos',
        'description': ''
      },
      {
        'name': 'animated characters & modelling',
        'description': ''
      },
      {
        'name': 'short videos ads',
        'description': ''
      },
      {
        'name': 'live action explainers',
        'description': ''
      },
      {
        'name': 'other',
        'description': ''
      }
    ]
  },
  {
    'name': 'Music & Audio',
    'description': '',
    'subcategories': [
      {
        'name': 'voice over',
        'description': ''
      },
      {
        'name': 'mixing & mastering',
        'description': ''
      },
      {
        'name': 'producers & composers',
        'description': ''
      },
      {
        'name': 'singer-songwriters',
        'description': ''
      },
      {
        'name': 'session musicians & singers',
        'description': ''
      },
      {
        'name': 'jingles and drops',
        'description': ''
      },
      {
        'name': 'sound effects',
        'description': ''
      },
      {
        'name': 'other',
        'description': ''
      }
    ]
  },
  {
    'name': 'Programming & tech',
    'description': '',
    'subcategories': [
      {
        'name': 'wordpress',
        'description': ''
      },
      {
        'name': 'website builders & cms',
        'description': ''
      },
      {
        'name': 'web programming',
        'description': ''
      },
      {
        'name': 'e-commerce',
        'description': ''
      },
      {
        'name': 'mobile apps & web',
        'description': ''
      },
      {
        'name': 'desktop applications',
        'description': ''
      },
      {
        'name': 'support & IT',
        'description': ''
      },
      {
        'name': 'chatbots',
        'description': ''
      },
      {
        'name': 'data analysis & reports',
        'description': ''
      },
      {
        'name': 'convert files',
        'description': ''
      },
      {
        'name': 'databses',
        'description': ''
      },
      {
        'name': 'user testing',
        'description': ''
      },
      {
        'name': 'QA',
        'description': ''
      },
      {
        'name': 'other',
        'description': ''
      }
    ]
  },
  {
    'name': 'Business',
    'description': 'Slay every meeting with a remarkable first impression. Let us help you create custom business card & stationery designs',
    'subcategories': [
      {
        'name': 'virtual assistant',
        'description': ''
      },
      {
        'name': 'market research',
        'description': ''
      },
      {
        'name': 'business plans',
        'description': ''
      },
      {
        'name': 'branding services',
        'description': ''
      },
      {
        'name': 'legal consulting',
        'description': ''
      },
      {
        'name': 'financial consulting',
        'description': ''
      },
      {
        'name': 'business tips',
        'description': ''
      },
      {
        'name': 'presentations',
        'description': ''
      },
      {
        'name': 'career advice',
        'description': ''
      },
      {
        'name': 'flyer distribution',
        'description': ''
      },
      {
        'name': 'other',
        'description': ''
      }
    ]
  },
  {
    'name': 'Fun & Lifestyle',
    'description': '',
    'subcategories': [
      {
        'name': 'online lessons',
        'description': ''
      },
      {
        'name': 'arts and crafts',
        'description': ''
      },
      {
        'name': 'relationship advice',
        'description': ''
      },
      {
        'name': 'health, nutrition and fitness',
        'description': ''
      },
      {
        'name': 'astrology & readings',
        'description': ''
      },
      {
        'name': 'spiritual & healing',
        'description': ''
      },
      {
        'name': 'family & Genealogy',
        'description': ''
      },
      {
        'name': 'gaming',
        'description': ''
      },
      {
        'name': 'greeting cards & videos',
        'description': ''
      },
      {
        'name': 'your message on ...',
        'description': ''
      },
      {
        'name': 'viral videos',
        'description': ''
      },
      {
        'name': 'pranks & stunts',
        'description': ''
      },
      {
        'name': 'celebrity impersonators',
        'description': ''
      },
      {
        'name': 'collectibles',
        'description': ''
      },
      {
        'name': 'global culture',
        'description': ''
      },
      {
        'name': 'other',
        'description': ''
      }
    ]
  },
  {
    'name': 'Untalented-Steemgigs',
    'description': '',
    'subcategories': [
      {
        'name': 'Photoshop editing',
        'description': ''
      },
      {
        'name': 'Cartoons & Carricatures',
        'description': ''
      },
      {
        'name': 'Flyers And Posters',
        'description': ''
      },
      {
        'name': 'Presentation Design',
        'description': ''
      },
      {
        'name': 'T-shirts',
        'description': ''
      },
      {
        'name': 'Creative Writing',
        'description': ''
      },
      {
        'name': 'Proof Reading And Editing',
        'description': ''
      },
      {
        'name': 'Contests',
        'description': ''
      },
      {
        'name': 'Transcription',
        'description': ''
      },
      {
        'name': 'Translation',
        'description': ''
      },
      {
        'name': 'Intro & Animated Logos',
        'description': ''
      },
      {
        'name': 'Lyric & Music Video',
        'description': ''
      },
      {
        'name': 'Promotional Videos',
        'description': ''
      },
      {
        'name': 'Short Video ADs',
        'description': ''
      },
      {
        'name': 'Singer Song-writers',
        'description': ''
      },
      {
        'name': 'Voice over',
        'description': ''
      },
      {
        'name': 'Jingles And Drops',
        'description': ''
      },
      {
        'name': 'Wordpress',
        'description': ''
      },
      {
        'name': 'Convert Files',
        'description': ''
      },
      {
        'name': 'Virtual Assistant',
        'description': ''
      },
      {
        'name': 'Flyer Distribution',
        'description': ''
      },
      {
        'name': 'Arts And Crafts',
        'description': ''
      },
      {
        'name': 'Relationship Advice',
        'description': ''
      },
      {
        'name': 'Your Message on...',
        'description': ''
      },
      {
        'name': 'Pranks & Stunts',
        'description': ''
      },
      {
        'name': 'Celebrity Impersonators',
        'description': ''
      },
      {
        'name': 'Steem Graphics',
        'description': ''
      },
      {
        'name': 'Steem Tutors',
        'description': ''
      }
    ]
  },
  {
    'name': 'Steem & Steemit',
    'description': '',
    'subcategories': [
      {
        'name': 'Steem projects',
        'description': ''
      },
      {
        'name': 'Curation projects',
        'description': ''
      },
      {
        'name': 'Steem tutors',
        'description': ''
      },
      {
        'name': 'Steem Graphics',
        'description': ''
      },
      {
        'name': 'Steem Coders',
        'description': ''
      },
      {
        'name': 'Steem Veterans',
        'description': ''
      },
      {
        'name': 'Witness services',
        'description': ''
      },
      {
        'name': 'Steem Writers',
        'description': ''
      }
    ]
  }
]

Vue.prototype.$imgUploadURL = 'https://server.steemgigs.org/imgUpload'
Vue.prototype.placeholderImg = 'https://via.placeholder.com/100x100'
Vue.config.productionTip = false
Vue.prototype.$eventBus = new Vue()
Vue.use(Vuex)
Vue.mixin(mixins)
Vue.use(Notifications)
Vue.use(VTooltip)
Vue.use(VueContentPlaceholders)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
