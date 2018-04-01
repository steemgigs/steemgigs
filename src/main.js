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
    'name': 'SurpassingGoogle',
    'description': '',
    'subcategories': [
      {
        'name': 'how-to',
        'description': 'Teach us step by step, in your own perspective "how to". Make sure it is specific to the category and sub-category you will be selecting later. Remember to insert images and videos where necessary'
      },
      {
        'name': 'DIY',
        'description': 'Do you have some DIY knowledge on a specific skill, craft or expertise? Why not create a post about it right now! Don\'t let this knowledge stay redundant. The world needs to hear it!'

      },
      {
        'name': 'TIL(Today I Learned)',
        'description': '"Don\'t let today emptily slip by!" Did you learn something today; anything? Can you explain it bit by bit using your own perspective? Share it with us, for the sake of "everyone".'
      },
      {
        'name': 'terry says',
        'description': 'Are you mentor-like? Have you climbed that ladder? Have you attained "breakthrough success" in a particular field, niche, expertise or industry? Kindly, tell you us about. "The world seeks this very knowledge!"'
      },
      {
        'name': 'teardrops',
        'description': 'Have you attained breakthrough in a specific niche, field or industry? Was it back-breaking? Did you pull through? Did you retire? Did you tire out? Share your teardrops (moments) with us, related to a specific niche, field or industry. This will inspire others and direct potential helpers you way.'
      },
      {
        'name': 'resolution',
        'description': '"Dreams are buildable but aren\'t that buildable in a day". @surpassinggoogle You will need to start with today, with a tiny but very specific resolution e.g "Today, i resolve to learn module 20 of Photoshop".Share your resolution with us now and tell us when you meet it or fail to meet it.'
      },
      {
        'name': 'steem secrets',
        'description': 'Have you considered intergrating "steem" (even if only in your mind\'s eye) into every field, niche or industry? Why not try it now, using your next SteemGigs post? "You just may create the next use-case for steem". Try it now!'
      },
      {
        'name': 'motivation & inspiration',
        'description': 'Yes, there is general "motivation" and there is general "inspiration". However, do you know how to create "specialized motivation or inspiration", related to a specific niche,field, expertise, industry etc? Why not share that with us or at least try to .'
      },
      {
        'name': 'tutorials',
        'description': 'On SteemGigs, there is room for "everyone" but not "everyone" is an expert yet. However, we want "everyone" to become a dream-builder (SteemGigger). Thus, kindly share '
      },
      {
        'name': 'un(dis)talented',
        'description': 'If we eliminate bum, average or smart; "we are genius". @surpassinggoogle Do you have limited confidence yet want to express yourself freely about any niche, field, expertise or industry etc? Relegate "reservations" when you are on SteemGigs. Just speak!'
      },
      {
        'name': 'life',
        'description': 'Many times, when it comes to attaining "real greatness", the only thing that was missing was "unadulterated INTEL from the school of life". @surpassinggoogle Share with us "life" knowledge, related to a specific field, niche, industry or expertise.'
      },
      {
        'name': 'rare intel',
        'description': 'Do you know something that isn\'t very common knowledge? Has it stayed redundant in your head? Kindly share it with us, for the sake of everyone. You just may reveal the ever-missing piece of someone\'s puzzle.'
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
    'description': `Want to offer a SteemGig but feel you are not an expert yet? The untalented-steemgigs category is for you! 
                    It allows you to still offer a service, while honing your skills into perfection. 
                    Clients may want to try your service out, even with the knowledge that you aren't an expert, thus, consider providing affordable rates to stir further relationships. 
                    Stay reputable and sincere and use opportunities as an avenue to evolve into an expert.`,
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
