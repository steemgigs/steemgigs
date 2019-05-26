import steem from 'steem'

steem.api.setOptions({
  url: 'https://api.steemit.com'
})

export default {
  isFollower (username) {
    return new Promise((resolve, reject) => {
      steem.api.getFollowers('steemgigs', username, 'blog', 1, (err, result) => {
        if (err == null) {
          resolve(Array.isArray(result) && result.length > 0 && result[0].follower === username)
        } else {
          reject(err)
        }
      })
    })
  }
}
