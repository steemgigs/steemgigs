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
          <li><a href="#" @click="searchActive = true" class="search-icon inline-block"><i class="ion-ios-search-strong x2"></i></a></li>
        </ul>
      </div>
    </nav>
    <div v-if="searchActive" class="searchBox">
      <span class="close" @click="searchActive = false">
        <i class="icon ion-close-round white-text"></i>
      </span>
      <div class="queryBox">
        <span class="left searchIcon">
          <i class="icon ion-ios-search-strong white-text"></i>
        </span>
        <input v-model="searchTerm" placeholder="type to start searching..." type="text" @input="search" class="search-panel">
        <p class="right-align hint-text amber-text text-lighten-5">Hit ENTER to search or ESC to close</p>
      </div>
      <div class="results row">
        <div class="col s12 m6" v-for="(result, i) in 10" :key="i">
          <div class="result">
            <p class="title">I will sleep on the floor for 3 STEEM</p>
            <p class="description">by @jalasem in Web Programming / Web Design</p>
            <span class="price">3 STEEM</span>
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
  </div>
</template>

<script>
import Api from '@/services/api'
export default {
  data () {
    return {
      user: '',
      metadata: '',
      searchActive: false,
      searchResults: [],
      searchTerm: '',
      isSearching: false
    }
  },
  methods: {
    search () {
      this.debounce(() => {
        this.isSearching = true
        Api.search(this.searchTerm).then(result => {
          this.isSearching = false
          this.searchResults = result.data
          console.log(this.searchResults)
        }).catch(e => {
          this.isSearching = false
          this.errorText = 'there was an error with search'
          console.log('error:', e)
        })
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
$blue:#4757b2;

.navbar-fixed {
  margin-bottom: -1.5em;
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
        margin: 1em;
        .title {
          font-size: 1.7em;
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
