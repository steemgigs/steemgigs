import Index from '@/pages/index'
import LoggedIn from '@/pages/access/loggedIn'
import NewSteemGig from '@/pages/platform/newSteemgig'
import NewGigRequest from '@/pages/platform/newGigRequest'
import Profile from '@/pages/platform/profile'
import GigDetail from '@/pages/platform/gigDetail'

export default [
  {
    path: '/',
    name: 'STEEMGIGS | Home',
    component: Index
  },
  {
    path: '/complete',
    name: 'STEEMGIGS | Logged in',
    component: LoggedIn
  },
  {
    path: '/create_gig',
    name: 'STEEMGIGS | New Steemgig',
    component: NewSteemGig
  },
  {
    path: '/post_gig_request',
    name: 'STEEMGIGS | Post Gig Request',
    component: NewGigRequest
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
    path: '*',
    name: 'Not Found | bad Link',
    component: Index
  }
]
