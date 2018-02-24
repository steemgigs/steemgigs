import sc2 from 'sc2-sdk'

const sc = sc2.Initialize({
  baseURL: 'https://steemconnect.com',
  app: 'steemgigs.app',
  callbackURL: 'https://steemgigs.org/complete',
  scope: ['login', 'vote', 'comment', 'comment_delete', 'comment_options', 'custom_json']
})

export default sc
