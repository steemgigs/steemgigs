import Index from '@/pages/index'
import LoggedIn from '@/pages/access/loggedin'

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
