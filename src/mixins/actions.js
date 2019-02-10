import sc2 from '@/services/sc2'

var actions = {
  methods: {
    reblog (post) {
      if (this.userLoggedIn()) {
        this.rsspinning = true
        this.resteeming = false
        this.resteem = false
        sc2.setAccessToken(this.$store.state.accessToken)
        sc2.reblog(this.$store.state.username, post.author, post.permlink, (err, res) => {
          if (!err) {
            this.resteem = true
            this.resteeming = true
            this.rsspinning = false
            this.$notify({
              title: 'Success',
              message: 'Post Resteem Successfully',
              type: 'success'
            })
          } else {
            this.resteeming = true
            this.resteem = false
            this.rsspinning = false
            this.$notify.error({
              title: 'Error',
              message: 'There was an error resteeming that post.'
            })
          }
        })
      }
    }
  }
}

export default actions
