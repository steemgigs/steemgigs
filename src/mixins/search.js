const search = {
  methods: {
    // Route a user the correct route based on their search type
    initSearch (searchType) {
      this.$store.commit('setSearchTerm', this.searchTerm)
      if (searchType === 'posts') {
        this.$router.push(`/search/posts/${this.searchTerm}`)
      } else {
        this.$router.push(`/search/users/${this.searchTerm}`)
      }
      this.searchTerm = ''
    }
  }
}

export default search
