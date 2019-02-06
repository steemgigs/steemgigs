import sc2 from '@/services/sc2'

const status = {
  methods: {
    userLoggedIn () {
    // If no user is signed into the application, a message box will be provided to indicate that certain functions aren't available
      if (!this.$store.state.username) {
        this.$alert('You need to be signed in to access this feature', 'Please sign in via SteemConnect', {
          confirmButtonText: 'Sign In',
          callback: action => {
            if (action !== 'cancel') {
              window.location.href = sc2.getLoginURL()
            }
          }
        })
        return false
      } else {
        return true
      }
    }
  }
}

export default status
