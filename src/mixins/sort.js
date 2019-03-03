const sort = {
  computed: {
    sortedResults: function () {
      let order = ''
      let sortType = ''
      if (this.selectedOrder === 'newest' || this.selectedOrder === 'price_high') {
        order = 'desc'
      } else {
        order = 'asc'
      }
      if (this.selectedOrder === 'price_low' || this.selectedOrder === 'price_high') {
        sortType = 'price'
      } else {
        sortType = '_id'
      }
      return _.orderBy(this.searchResults, sortType, order)
    }
  }
}

export default sort
