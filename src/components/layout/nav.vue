<template>
  <div class="navbar-fixed">
    <nav class="white">
      <div class="nav-wrapper container">
        <router-link to="/" class="brand-logo left"><img src="/static/img/logo.gif" alt="logo"></router-link>
        <ul class="right notIn" v-if="!$store.state.accessToken">
          <li><a href="https://signup.steemit.com" rel="noopener noreferrer" target="_blank">Sign up</a></li>
          <li><a data-target="loginPrompt" class="modal-trigger">Log in</a></li>
        </ul>
        <ul class="right shrink nav-options-wrapper" v-if="$store.state.accessToken">
          <div class="hide-on-med-and-down left">
            <li>
              <el-input prefix-icon="el-icon-search" spellcheck="true" @keydown.enter.native="initSearch" size="medium" type="text" placeholder="Search SteemGigs" v-model="searchTerm" />
            </li>
            <li>
              <router-link to="/message"><i class="icon ion-android-chat x2"></i></router-link>
            </li>
            <li>
              <router-link to="/dashboard"><i class="icon ion-speedometer x2"></i></router-link>
            </li>
            <li>
              <router-link to="/cart"><i class="icon ion-bag x2"></i></router-link>
            </li>
            <!-- Create option menu -->
            <li>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <el-button type="primary" class="primary" size="medium">Create</el-button>
                  </span>
                <el-dropdown-menu class="creation-dropdown" slot="dropdown">
                  <el-dropdown-item>
                    <router-link to="/create_gig">Gig</router-link>
                    <el-tooltip :content="tips.gig" placement="bottom">
                     <i class="el-icon-question create-tip"></i>
                    </el-tooltip>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/steemgigs_request">Custom Request</router-link>
                    <el-tooltip :content="tips.custom" placement="bottom">
                     <i class="el-icon-question create-tip"></i>
                    </el-tooltip>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/create_testimonial">Testimonial</router-link>
                    <el-tooltip :content="tips.testimonial" placement="bottom">
                      <i class="el-icon-question create-tip"></i>
                    </el-tooltip>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/untalented_editor">Untalented</router-link>
                    <el-tooltip :content="tips.untalented" placement="bottom">
                      <i class="el-icon-question create-tip"></i>
                    </el-tooltip>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/surpassing-google">SurpassingGoogle</router-link>
                    <el-tooltip :content="tips.surpassingGoogle" placement="bottom">
                      <i class="el-icon-question create-tip"></i>
                    </el-tooltip>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </div>
          <li class="profile-list">
            <el-dropdown>
              <span class="el-dropdown-link">
               <a class="profile-link"><img class="profile_pic" :src="profileImg" alt=""></a>
                 </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link class="waves-effect" :to="'/@' + $store.state.username"> {{ $store.state.username + ' (' + repp + ') ' }} </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link class="waves-effect" to="/wallet">Wallet - {{ wallet }}</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link class="waves-effect" to="/settings">Settings</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link class="waves-effect red-text" to="/invite">Invite friends</router-link>
                </el-dropdown-item>
                <el-dropdown-item><a class="waves-effect" href="https://discord.gg/wWrnSXK" target="_blank">Help</a></el-dropdown-item>
                <el-dropdown-item><a @click.prevent="logout()">Log Out</a></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li class="hide-on-large-only">
            <a href="#" data-target="mobile-demo" class="sidenav-trigger mx-0">
              <i class="icon ion-navicon x2"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <div id="loginPrompt" class="modal">
      <div class="modal-content grey-text text-darken-1 login-modal">
        <h4>Redirection to SteemConnect V2</h4>
        <hr class="grey lighten-2">
        <p class="grey-text text-darken-3">You will be redirected to SteemConnect v2 to authenticate to the Steem blockchain<br/>SteemConnect is developed and maintained by Steemit, Inc. and Busy.org.<br />Steemgigs.org will never access your private keys.</p>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
        <a :href="loginURL" class="modal-action modal-close indigo white-text btn">Proceed</a>
      </div>
    </div>
  </div>
</template>

<script>
import sc2 from '@/services/sc2'
import M from 'materialize-css'

export default {
  components: {

  },
  data () {
    return {
      user: '',
      metadata: '',
      searchTerm: '',
      isAuth: false,
      loginURL: sc2.getLoginURL(),
      profile: this.$store.state.profile,
      tips: {
        gig: 'Offer a service (related to your expertise, talents/un(dis)talents, experience etc) in exchange for Steem, SBD, Steem Power or for free.',
        untalented: 'Not an expert yet? No worries! On SteemGigs, you can hone your expertise while offering a service. Select this editor to do just so.',
        surpassingGoogle: 'Select this editor to contribute knowledge (based on your experience), specific to a niche, field, industry, expertise etc to our knowledge-bank.',
        testimonial: 'Share your overall SteemGigs experience with us. So, why not record your service progress & updates, successful deliveries, shout-outs, payments etc using this editor.',
        custom: 'If you can\'t find the exact gig that you seek, you may want to do a custom request. Try this editor.'
      }
    }
  },
  methods: {
    initSearch () {
      this.$store.commit('setSearchTerm', this.searchTerm)
      this.$router.push(`/search/${this.searchTerm}`)
      this.searchTerm = ''
    }
  },
  computed: {
    repp () {
      return this.profile.rep
    },
    profileImg () {
      return this.profile.profileImage
    },
    wallet () {
      return this.profile.balance
    }
  },
  mounted () {
    this.$eventBus.$on('profile-fetched', () => {
      this.profile = this.$store.state.profile
    })
    let elem = document.querySelector('.modal')
    M.Modal.init(elem, {
      dismissible: true
    })
  },
  beforeDestroy () {
    this.$eventBus.$off('profile-fetched')
  }
}
</script>

<style lang="scss" scoped>
  $blue:#6361D0;
  nav a.brand-logo,
  nav li a,
  nav a {
    color: $blue;
  }

  .login-modal {
    p {
      font-size: 1.2em
    }
  }

  nav {
    box-shadow: 0 0;
    border-bottom: 0px solid #e9e7e7;
    .nav-wrapper {
      &.container {
        min-width: calc(100% - 60px);
        a.brand-logo img {
          height: 1em;
          margin-top: 13px;
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
              background: #6361D0;
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
                width: 2.7em;
                height: 2.7em;
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
        a.brand-logo,
        li a,
        a {
          color: $blue;
          &:hover {
            background: transparent;
          }
        }
      }
    }
  }
  @media only screen and (min-width: 601px) {
    nav,
    nav .nav-wrapper i,
    nav a.sidenav-trigger,
    nav a.sidenav-trigger i {}
  }
    .profile-link {
    display: flex;
  }

  .nav-options-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .profile-list {
    display: flex;
  }

  .creation-dropdown li {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .create-tip {
    margin-left: 20px;
    font-size: 15px;
  }
</style>
