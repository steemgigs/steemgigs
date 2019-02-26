export default {
  methods: {
    logout () {
      this.$store.commit('CLEAR_USER')
      this.$router.push('/')
    },
    stringify (obj) {
      return JSON.stringify(obj, null, 2)
    },
    rep (value) {
      let rep = Math.log10(value)
      if (isNaN(rep)) rep = 0
      rep = Math.max(rep - 9, 0)
      rep = (rep * 9) + 25
      rep = parseInt(rep)
      return rep
    },
    htmlHide (content) {
      return `<div class="hide-on-steemgigs">${content}</div>`
    },
    // debounce: (fn, time) => {
    //   let timeout
    //   return function () {
    //     const functionCall = () => fn.apply(this, arguments)
    //     clearTimeout(timeout)
    //     timeout = setTimeout(functionCall, time)
    //   }
    // },
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
    replaceAt (string, index, replace) {
      return string.substring(0, index) + replace + string.substring(index + 1)
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
