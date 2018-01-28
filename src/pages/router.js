import Index from '@/pages/index'
import LoggedIn from '@/pages/access/loggedIn'
import NewSteemGig from '@/pages/platform/newSteemgig'
import Profile from '@/pages/platform/profile'

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
    path: '/@:username',
    name: 'STEEMGIGS | Profile',
    component: Profile
  },
  {
    path: '*',
    name: 'Not Found | bad Link',
    component: Index
  }
]
