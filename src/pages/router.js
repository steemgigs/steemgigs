import Index from '@/pages/index'
import LoggedIn from '@/pages/access/loggedIn'

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
    path: '*',
    name: 'Not Found | bad Link',
    component: Index
  }
]
