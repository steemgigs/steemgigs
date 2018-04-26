import sc2 from 'sc2-sdk'

const sc = sc2.Initialize({
  baseURL: 'https://v2.steemconnect.com',
  app: 'steemgigs.app',
  // app: 'steemgig.app',
  callbackURL: 'https://steemgigs.org/complete',
  // callbackURL: 'http://localhost:8080/complete',
  // scope: ['login', 'vote', 'comment', 'comment_delete', 'comment_options', 'custom_json', 'claim_reward_balance'] // wrong
  scope: ['vote', 'comment', 'delete_comment', 'comment_options', 'custom_json', 'claim_reward_balance', 'login', 'offline'] //right (fixed!)
})

export default sc
