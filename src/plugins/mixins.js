export default {
  methods: {
    logout () {
      this.$store.commit('CLEAR_USER')
      this.$router.push('/')
    },
    stringify (obj) {
      return JSON.stringify(obj, null, 2)
    },
    slugify (word) {
      return word.replace(/\s+/g, '-').toLowerCase()
    }
  },
  mounted () {
  }
}
