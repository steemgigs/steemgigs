<template>
  <div @click.stop v-if="searchActive" class="searchBox">
    <span class="close" @click="searchActive = false">
      <i class="icon ion-close-round white-text"></i>
    </span>
    <div class="queryBox">
      <span class="left searchIcon">
        <i class="icon ion-ios-search-strong white-text"></i>
      </span>
      <input v-model="searchTerm" placeholder="type to start searching..." type="text" @input="search" class="search-panel">
      <p class="right-align hint-text amber-text text-lighten-5">
        <i class="fa fa-spinner fa-pulse search-loader" v-if="isSearching" /> Hit ENTER to search or ESC to close</p>
    </div>
    <div class="results row">
      <div v-if="currentResults" class="col s12 m6" v-for="(result, i) in currentResults" :key="i">
        <div class="result" :to="'/@' + result.author + '/' + result.permlink">
          <p @click="goto('/@' + result.author + '/' + result.permlink)" class="title">{{desteemgify(result.title)}}</p>
          <p class="description">by @{{result.author}} in {{result.category}} / {{result.subcategory}}</p>
          <span class="price">
            <span v-if="Number(result.price)">
              <u>{{result.price}} {{result.currency}}</u>
            </span>
            <span v-else><u>Free</u></span>
          </span>
        </div>
      </div>
    </div>
    <div class="more">
      <ul class="pagination">
        <span>More results</span>
        <li class="disabled"><a href="#!"><i class="icon ion-ios-arrow-left"></i></a></li>
        <li class="active"><a href="#!">1</a></li>
        <li class="waves-effect"><a href="#!">2</a></li>
        <li class="waves-effect"><a href="#!">3</a></li>
        <li class="waves-effect"><a href="#!">4</a></li>
        <li class="waves-effect"><a href="#!">5</a></li>
        <li class="waves-effect"><a href="#!"><i class="icon ion-ios-arrow-right"></i></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Api from '@/services/api'
import debounce from '@/plugins/debounce'

export default {
  data () {
    return {
      user: '',
      metadata: '',
      searchActive: false,
      searchResults: [],
      currentSearchPage: 1,
      searchTerm: '',
      isSearching: false
    }
  },
  mounted () {
    this.$eventBus.$on('open-search', () => {
      this.searchActive = true
    })
    this.$eventBus.$on('close-search', () => {
      this.searchActive = false
    })
  },
  methods: {
    search: debounce(function () {
      this.isSearching = true
      let searchTerm = this.searchTerm
      console.log('searc term:', searchTerm)
      Api.search(searchTerm).then(result => {
        this.isSearching = false
        this.searchResults = result.data
        console.log(this.searchResults)
      }).catch(e => {
        this.isSearching = false
        this.errorText = 'there was an error with search'
        console.log('error:', e)
      })
    }, 1000),
    closeSearch (cb) {
      this.searchTerm = ''
      this.searchResults = []
      this.searchActive = false
      cb()
    },
    goto (where) {
      this.closeSearch(this.$router.push(where))
      // this.$router.push(where)
    }
  },
  computed: {
    currentResults () {
      let perpage = 0
      this.searchResults.length > 50 ? perpage = 20 : perpage = 10
      let start = ((this.currentSearchPage - 1) * perpage) + 1
      let end = this.currentSearchPage * perpage
      console.log('start:', start, 'end:', end, 'of =>', this.searchResults.length)
      if (end >= this.searchResults.length) {
        let feed = this.searchResults.slice((start - 1), (end - 1))
        console.log('feed:', feed)
        return feed
      }
    }
  },
  beforeDestroy () {
    this.$eventBus.$off('open-search')
    this.$eventBus.$off('close-search')
  }
}
</script>

<style lang="scss" scoped>
.search-loader {
  display: inline-block;
  margin: 0 6vw;
  font-size: 1.5rem;
}
.searchBox {
  width: 90vw;
  height: 95vh;
  top: 2vh;
  background: rgb(96, 125, 139);
  position: fixed;
  left: 5vw;
  span.close {
    position: fixed;
    cursor: pointer;
    z-index: 20;
    top: 1.5em;
    right: 6.5vw;
    i.icon {
      font-size: 2em;
    }
  }
  .queryBox {
    width: fit-content;
    margin: 2em auto;
    text-align: center;
    .searchIcon {
      cursor: pointer;
      i.icon {
        font-size: 3em;
        position: absolute;
        margin-left: -0.5em;
      }
    }
    input[type="text"] {
      font-size: 3em;
      padding-left: 0.5em;
      padding-right: 0.5em;
      border-bottom: 2px solid rgb(247, 247, 247);
      font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
      width: 100%;
      color: rgb(247, 247, 247);
      text-align: center;
      max-width: 20em;
      &+.hint-text {
        margin-top: 0;
      }
    }
  }
  .results {
    height: 62vh;
    overflow-y: auto;
    .result {
      background: rgb(255, 255, 255);
      box-sizing: border-box;
      position: relative;
      padding: 1px 1em;
      min-height: 8em;
      margin: 1em;
      .title {
        font-size: 1.7em;
        cursor: pointer;
        line-height: 100%;
        margin-top: 0.7em;
        max-width: 35.5vw;
      }
      .description {
        margin-top: -1em;
      }
      .price {
        float: right;
        font-size: 1.5em;
        top: 1.3em;
        position: absolute;
        right: 0.5em;
        color: rgb(55, 71, 79)
      }
    }
  }
  .more {
    padding: 0 2em 0 1em;
    color: rgb(255, 255, 255);
    text-align: right;
    .pagination {
      margin-top: -0.5em;
      &>span:first-child {
        display: inline-block;
        margin-top: 0.2em;
        margin-right: 0.5em;
        font-size: 1.1em;
      }
      li {
        a {
          color: #f7f7f7;
        }
      }
      li.active {
        background-color: #f7f7f7;
        a {
          color: black;
        }
      }
    }
  }
}
</style>
