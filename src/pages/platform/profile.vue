<template>
  <page :pageClasses="['profile__view', 'row']">
    <cat-nav />
    <div class="col s12 m4 l3">
        <div v-if="!profileFetched" class="card-panel">
          <content-placeholders>
            <content-placeholders-img />
            <content-placeholders-text :lines="10" />
          </content-placeholders>
        </div>
      <profile-card v-if="profileFetched" :profilepage="true" :profile="profile"></profile-card>
    </div>
    <div class="col s12 m8 l9 row">
      <ul class="tabs">
        <li class="tab col s3"><a class="waves-effect" :class="{active: currentView === 'active_gigs'}" @click="changeView('active_gigs')">ACTIVE STEEMGIGS</a></li>
        <li class="tab col s3"><a class="waves-effect" :class="{active: currentView === 'gig_request'}" @click="changeView('gig_request')">CUSTOM REQUESTS</a></li>
      </ul>
      <div v-if="currentView === 'active_gigs'" class="activeGigs">
        <div v-if="loading">
          <div class="col s12 m6 l4">
            <loading-placeholder class="card-panel" />
          </div>
          <div class="col s12 m6 l4">
            <loading-placeholder class="card-panel" />
          </div>
          <div class="col s12 m6 l4">
            <loading-placeholder class="card-panel" />
          </div>
        </div>
        <div class="col s12 m6 l4" v-for="(gig, index) in steemgigs" :key="index">
          <gig-card :gigData="gig" meantFor="profile" />
        </div>
      </div>
      <div v-if="currentView === 'gig_request'">
        <div v-if="loading">
          <div class="col s12 m6 l4">
            <loading-placeholder class="card-panel" />
          </div>
          <div class="col s12 m6 l4">
            <loading-placeholder class="card-panel" />
          </div>
          <div class="col s12 m6 l4">
            <loading-placeholder class="card-panel" />
          </div>
        </div>
        <div class="col s12 m6 l4" v-for="(gig, index) in gigrequests" :key="index">
          <gig-card :gigData="gig" meantFor="profile" />
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import Api from '@/services/api'
import Page from '@/components/page'
import CatNav from '@/components/layout/catNav'
import GigCard from '@/components/snippets/gigCard'
import ProfileCard from '@/components/layout/profileCard'
import RotatingCard from '@/components/snippets/rotatingCard'
import LoadingPlaceholder from '@/components/widgets/gigLoading'
// import steem from 'steem'

export default {
  components: {
    Page,
    CatNav,
    GigCard,
    RotatingCard,
    ProfileCard,
    LoadingPlaceholder
  },
  data () {
    return {
      profile: {
      },
      profileFetched: false,
      usergigs: [],
      userRequests: [],
      currentView: 'active_gigs',
      loading: true
    }
  },
  beforeCreate () {
    Api.fetchUserData(this.$route.params.username).then(response => {
      console.log('from profile', response)
      this.profile = response.data
      this.profileFetched = true
    }).catch(err => {
      console.log('error retrieving user info: \n error:', this.stringify(err))
    })
    Api.fetchUserGigs(this.$route.params.username).then(response => {
      this.usergigs = response.data
      this.loading = false
      console.log(response)
    }).catch(err => {
      console.log('error retrieving user gigs: \n error:', this.stringify(err))
    })
    // steem.api.lookupAccountNames(this.$route.params.username, (err, result) => {
    //   console.log('via steemjs::', err, result)
    // })
  },
<<<<<<< HEAD
  beforeMount () {
    this.profileUsername = this.$route.params.username
  },
=======
>>>>>>> 3d25a01cf7c8c81930e671642094ae0110ca005a
  computed: {
    steemgigs () {
      return this.usergigs.filter((gig) => {
        return gig.json_metadata.type === 'steemgigs_post'
      })
    },
    gigrequests () {
      return this.usergigs.filter((gig) => {
        return gig.json_metadata.type === 'steemgigs_request'
      })
    }
  },
  methods: {
    changeView (view) {
      this.currentView = view
    }
  },
  mounted () {
    this.profileUsername = this.$route.params.username
    this.$eventBus.$on('profile-updated', payload => {
      payload.rep = this.profile.rep
      this.profile = payload
      this.$store.commit('SET_PROFILE', payload)
      console.log('updating.....', payload)
    })
  },
  deforeDestroy () {
    this.$eventBus.$off('profile-updated')
  }
}
</script>

<style lang="scss" scoped>
  .tabs {
    width: 98.5%;
    float: left;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    a {
      color: rgb(63, 78, 188);
      font-weight: 600;
      font-size: 1.1em;
      cursor: pointer;
      transition: all ease-in-out .3s;
      &:hover {
        color: rgb(63, 80, 198);
      }
      &.active {
        border-bottom: 2px rgb(63, 78, 188);
        color: rgb(63, 80, 198);
        position: relative;
        &:after {
          content: ' ';
          width: 100%;
          position: absolute;
          bottom: 0;
          height: 2px;
          left: 0;
          background: rgb(63, 78, 188);
        }
      }
    }
  }
  .inactiveGigs {
    .card {
      opacity: 0.6;
    }
  }
</style>
