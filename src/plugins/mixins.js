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
      // return word.replace(/\s+/g, '-').toLowerCase()
      // eslint-disable-next-line
      return word.toString().trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '')
    },
    capitalize (str) {
      let formatted = []
      str.split(' ').forEach(i => {
        formatted.push(i[0].toUpperCase() + i.substr(1))
      })
      return formatted.join(' ')
    },
    desteemgify (word) {
      return word.split('#STEEMGIGS: ')[1]
    },
    extractBody (data) {
      return data.split(`## Portfolio
----`)[0]
    },
    extractPortfolio (data) {
      let portfolio = []
      let test = data.split(`## Portfolio
      ----`)[1].split(`![Potfolio](`)
      test.forEach(testCase => {
        if (testCase.startsWith('http')) portfolio.push(testCase)
      })
      return portfolio
    },
    monthFromArray (index) {
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return months[index]
    }
  }
}
