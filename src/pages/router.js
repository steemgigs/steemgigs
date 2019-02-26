import Index from '@/pages/index'
import LoggedIn from '@/pages/access/loggedIn'
import Steemgigs from '@/pages/platform/steemgigs'
import Testimonials from '@/pages/platform/testimonials'
import GigRequests from '@/pages/platform/gigRequests'
import featured from '@/pages/platform/featured'
import Profile from '@/pages/platform/profile'
import GigDetail from '@/pages/platform/gigDetail'
import Categories from '@/pages/platform/category'
import SubCategories from '@/pages/platform/subcategory'
import SurpassingGoogle from '@/pages/platform/surpassinggoogle'
import Search from '@/pages/platform/search'
import Wallet from '@/pages/platform/wallet'
import Settings from '@/pages/platform/settings'
import Invite from '@/pages/platform/invite'
import Message from '@/pages/platform/message'
import Basket from '@/pages/platform/basket'
import Dashboard from '@/pages/platform/dashboard'
import faqs from '@/pages/platform/faqs'
import privacy from '@/pages/platform/privacy-policy'

// Editors

import NewSteemGig from '@/pages/platform/editors/steemgig'
import NewGigRequest from '@/pages/platform/editors/gigrequest'
import NewTestimonial from '@/pages/platform/editors/testimonial'
import NewSurpassingGig from '@/pages/platform/editors/surpassinggoogle'
import UntalentedEditor from '@/pages/platform/editors/untalented'

export default [
  {
    path: '/',
    name: 'STEEMGIGS | Home',
    component: Index
  },
  {
    path: '/categories/:category',
    name: 'STEEMGIGS | Categories',
    component: Categories
  },
  {
    path: '/categories/:category/:subcategory',
    name: 'STEEMGIGS | Subcategories',
    component: SubCategories
  },
  {
    path: '/faqs',
    name: 'STEEMGIGS | Frequently Asked Questions',
    component: faqs
  },
  {
    path: '/privacy',
    name: 'STEEMGIGS | Privacy Policy',
    component: privacy
  },
  {
    path: '/search/:query/',
    name: 'STEEMGIGS | Search',
    component: Search
  },
  {
    path: '/complete',
    name: 'STEEMGIGS | Logged in',
    component: LoggedIn
  },
  {
    path: '/testimonials',
    name: 'STEEMGIGS | Testimonials',
    component: Testimonials
  },
  {
    path: '/steemgigs',
    name: 'STEEMGIGS | gigs',
    component: Steemgigs
  },
  {
    path: '/requested_gigs',
    name: 'STEEMGIGS | Requested Gigs',
    component: GigRequests
  },
  {
    path: '/featured',
    name: 'STEEMGIGS | Featured',
    component: featured
  },
  {
    path: '/create_gig',
    name: 'STEEMGIGS | New Steemgig',
    component: NewSteemGig
  },
  {
    path: '/surpassinggoogle/:subcategory',
    name: 'STEEMGIGS | Create Surpassing Google Segment',
    component: NewSurpassingGig
  },
  {
    path: '/steemgigs_request',
    name: 'STEEMGIGS | Post Gig Request',
    component: NewGigRequest
  },
  {
    path: '/create_testimonial',
    name: 'STEEMGIGS | Post A Testimonial',
    component: NewTestimonial
  },
  {
    path: '/surpassing-google',
    name: 'STEEMGIGS | SurpassingGoogle',
    component: SurpassingGoogle
  },
  {
    path: '/untalented_editor',
    name: 'STEEMGIGS | Untalented Editor',
    component: UntalentedEditor
  },
  {
    path: '/@:username',
    name: 'STEEMGIGS | Profile',
    component: Profile
  },
  {
    path: '/@:username/:task',
    name: 'STEEMGIGS | Task Detail',
    component: GigDetail
  },
  {
    path: '/cart',
    name: 'STEEMGIGS | Basket',
    component: Basket
  },
  {
    path: '/wallet',
    name: 'STEEMGIGS | Wallet',
    component: Wallet
  },
  {
    path: '/dashboard',
    name: 'STEEMGIGS | Dashboard',
    component: Dashboard
  },
  {
    path: '/settings',
    name: 'STEEMGIGS | Settings',
    component: Settings
  },
  {
    path: '/invite',
    name: 'STEEMGIGS | Invite',
    component: Invite
  },
  {
    path: '/message',
    name: 'STEEMGIGS | Messages',
    component: Message
  },
  {
    path: '/steemgigs/@:username/:task',
    name: 'STEEMGIGS | Task Detail',
    component: GigDetail
  },
  {
    path: '*',
    name: 'Not Found | bad Link',
    component: Index
  }
]
