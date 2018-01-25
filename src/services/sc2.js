import sc2 from 'sc2-sdk'

/*
baseURL: 'https://v2.steemconnect.com',
app: 'steemgig.app',
callbackURL: 'http://localhost:8000/complete',
scope: ['vote', 'comment', 'follow', 'reblog', 'post']
*/

const sc = sc2.Initialize({
  baseURL: 'https://v2.steemconnect.com',
  app: 'steemgig.app',
  callbackURL: 'http://localhost:8080/complete',
  scope: ['vote', 'comment', 'comment_options', 'comment_delete', 'post', 'custom_json', 'login']
})

export default sc
