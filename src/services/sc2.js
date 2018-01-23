import sc2 from 'sc2-sdk'

const sc = sc2.Initialize({
  app: 'CLIENTID',
  baseURL: 'BASE_URL',
  callbackURL: 'CALLBAC_URL'
})

export default sc
