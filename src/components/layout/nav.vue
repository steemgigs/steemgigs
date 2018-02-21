 <template>
  <div class="navbar-fixed">
    <nav class="white"  :class="searchActive ? 'search-active': ''">
      <div class="nav-wrapper container">
        <router-link to="/" class="brand-logo left">STEEMGIGS<sub>alpha</sub></router-link>
        <ul class="right notIn" v-if="!$store.state.accessToken">
          <li><a href="https://signup.steemit.com" rel="noopener noreferrer" target="_blank">Sign up</a></li>
          <li><a :href="loginURL">Log in</a></li>
        </ul>
        <ul class="right shrink" v-if="$store.state.accessToken">
          <li>
            <router-link to="/message"><i class="icon ion-android-chat x2"></i></router-link>
          </li>
          <li>
            <router-link to="/dashboard"><i class="icon ion-speedometer x2"></i></router-link>
          </li>
          <li>
            <router-link to="/cart" ><i class="icon ion-bag x2"></i></router-link>
          </li>
          <li>
            <router-link class="btn indigo white-text" to="/create_gig"><i class="icon left ion-plus-round"></i>Create</router-link>
          </li>
          <li>
            <a><img class="profile_pic" :src="$store.state.profile.profileImage" alt=""></a>
            <ul class="white z-depth-1">
              <li><router-link class="waves-effect" :to="'/@' + $store.state.username" v-text="$store.state.username"></router-link></li>
              <li><router-link class="waves-effect" to="/wallet">Wallet - {{ $store.state.profile.balance }}</router-link></li>
              <li><router-link class="waves-effect" to="/settings">Settings</router-link></li>
              <li><router-link class="waves-effect red-text" to="/invite">Invite friends</router-link></li>
              <li><router-link class="waves-effect" to="/help">Help</router-link></li>
              <li><a @click.prevent="logout()">logout</a></li>
            </ul>
          </li>
        </ul>
        <ul class="right stretch">
          <li><a href="#" @click="openSearch" class="search-icon inline-block"><i class="ion-ios-search-strong x2"></i></a></li>
        </ul>
      </div>
    </nav>
    <search-box />
  </div>
</template>

<script>
import SearchBox from '@/components/layout/searchBox'
export default {
  components: {
    SearchBox
  },
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
  methods: {
    openSearch () {
      this.$eventBus.$emit('open-search')
    }
  }
  // methods: {
  //   search: debounce(function () {
  //     this.isSearching = true
  //     let searchTerm = this.searchTerm
  //     console.log('searc term:', searchTerm)
  //     Api.search(searchTerm).then(result => {
  //       this.isSearching = false
  //       this.searchResults = result.data
  //       console.log(this.searchResults)
  //     }).catch(e => {
  //       this.isSearching = false
  //       this.errorText = 'there was an error with search'
  //       console.log('error:', e)
  //     })
  //   }, 1000),
  //   closeSearch (cb) {
  //     this.searchTerm = ''
  //     this.searchResults = []
  //     cb()
  //   },
  //   goto (where) {
  //     this.closeSearch(this.$router.push(where))
  //     // this.$router.push(where)
  //   }
  // },
  // computed: {
  //   currentResults () {
  //     let perpage = 0
  //     this.searchResults.length > 50 ? perpage = 20 : perpage = 10
  //     let start = ((this.currentSearchPage - 1) * perpage) + 1
  //     let end = this.currentSearchPage * perpage
  //     console.log('start:', start, 'end:', end, 'of =>', this.searchResults.length)
  //     if (end >= this.searchResults.length) {
  //       let feed = this.searchResults.slice((start - 1), (end - 1))
  //       console.log('feed:', feed)
  //       return feed
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
$blue:#4757b2;

.navbar-fixed {
  margin-bottom: -1.5em;
}

nav a.brand-logo, nav li a, nav a {
  color: $blue;
}

nav {
  box-shadow: 0 0;
  border-bottom: 0px solid #e9e7e7;
  .search-icon {
    position: absolute;
    right: 0;
  }
  .search-panel {
    // width: 0;
    // overflow: hidden;
    // transition: all .7s ease-in;
    // border-radius: 50px;
    // border: none;
    // background: rgb(238, 238, 238);
    // display: inline-block;
    // transform: translateY(-2.3px);
    &:focus {
      outline: 0 solid;
      border: 1px solid rgb(203, 135, 252);
    }
  }
  &.search-active {
    .search-panel {
      width: 300px;
      padding: 7px 15px;
    }
    .search-dropdown {
      display: block !important;
      margin-top: 58px;
      margin-left: 50px;
      color: #333;
      background: #eeeeef;
      text-align: center;
      padding: 2px 25px;
      border-radius: 3px;
      box-shadow: 0 3px 9px rgba(223, 223, 223, 0.2);
      li {
        float: none;
        cursor: pointer;
        transition: color .3s ease;
        &:hover {
          color: #4757b2;
        }
      }
    }
    // .shrink {
    //   width: 0;
    // }
  }
  .nav-wrapper {
    &.container {
      min-width: 90%;
      a.brand-logo {
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 1px;

        sub {
          margin-left: 2px;
          color: #99aab5;
          font-size: 59%;
          bottom: 0;
        }
      }
      ul.notIn {
        li a {
          &:hover::after {
              width: 100%;
            }
            &::after {
              content: ' ';
              height: 2px;
              width: 0%;
              background: #4757b2;
              display: inline-block;
              position: absolute;
              left: 0;
              bottom: 0;
              transition: all ease-in-out .3s;
            }
        }
      }
      ul {
        li {
          position: relative;
          a {
            font-weight: bold;
            line-height: 57px;
            transition: all ease-in-out .3s;
            position: relative;
            &.btn {
              line-height: 35px;
              font-size: 1.2em;
              padding: 0 1em;
              i.icon {
                line-height: 38px;
                margin-right: 0.5em;
              }
            }
            img.profile_pic {
              border-radius: 50%;
              border: 1px solid #4757b2;
              width: 2.7em;
              height: 2.7em;
              margin-top: 7px;
              // background: grey;
              margin-left: -0.5em;
              display: inline-block;
            }
          }
          ul {
            display: none;
          }
          &:hover ul {
            padding-top: 0.3em;
            padding-bottom: 0.3em;
            display: block;
            position: absolute;
            top: 55px;
            width: 160px;
            right: -4em;
            transform: translateX(-7px);
            li {
              a {
                padding: 0 1em;
                line-height: 25px;
                display: block;
                min-width: 8em;
                font-size: 0.9em;
              }
            }
          }
        }
      }

      a.brand-logo, li a, a {
        color: $blue;
        &:hover {
          background: transparent;
        }
      }
    }
  }
}

@media only screen and (min-width: 601px) {
  nav, nav .nav-wrapper i, nav a.sidenav-trigger, nav a.sidenav-trigger i {
    height: 56px;
    line-height: 56px;
  }
}
</style>
