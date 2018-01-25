export default {
  methods: {
    logout () {
      this.$store.commit('CLEAR_USER')
      this.$router.push('/')
    }
  },
  mounted () {
  }
}
