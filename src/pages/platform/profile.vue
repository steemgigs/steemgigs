<template>
  <page :pageClasses="['profile__view', 'row']">
    <cat-nav />
    <el-main>
    <div class="col s12 m4 l3">
        <ProfileOverview v-loading='this.profile.username === undefined' :profile="profile" :isProfilePage='true' />
        <ProfileExtras :profile="profile" />
    </div>
    <!-- Tab Selection -->
    <div class="col s12 m8 l9 row">
      <ul class="tabs">
        <li class="tab col s4"><a :class="{active: currentView === 'active_gigs'}" @click="changeView('active_gigs')">Active SteemGigs</a></li>
        <li class="tab col s4"><a :class="{active: currentView === 'gig_request'}" @click="changeView('gig_request')">Custom Requests</a></li>
        <li class="tab col s4"><a :class="{active: currentView === 'gig_contribution'}" @click="changeView('gig_contribution')">Contributions</a></li>
      </ul>
      <!-- Tab 1 -->
      <div v-if="currentView === 'active_gigs'" class="activeGigs">
        <!-- Loading Placeholder -->
        <div v-if="!isLoading">
          <div v-for="index in loadingPlaceholderCount" :key="index" class="col s12 m6 l3">
          <loading-placeholder class="card-panel" />
        </div>
        </div>
        <!-- Tab Data -->
        <div v-else-if="steemgigs.length !== 0" class="col s12 m6 l4" v-for="(gig, index) in steemgigs" :key="index">
          <gig-card :gigData="gig" meantFor="profile" />
        </div>
        <!-- No Results Returned -->
       <div v-else class="col s12 center-align noShow">
          <h3>No SteemGigs to Show</h3>
          <h5>There are currently no active SteemGigs to display</h5>
        </div>
      </div>
       <!-- Tab 2 -->
      <div v-show="currentView === 'gig_request'">
         <!-- Loading Placeholder -->
        <div v-if="!isLoading">
          <div v-for="index in loadingPlaceholderCount" :key="index" class="col s12 m6 l3">
          <loading-placeholder class="card-panel" />
          </div>
        </div>
        <!-- Tab Data -->
        <div v-else-if="gigrequests.length !== 0" class="col s12 m6 l4" v-for="(gig, index) in gigrequests" :key="index">
          <gig-card :gigData="gig" meantFor="profile" />
        </div>
        <!-- No Results Returned -->
        <div v-else class="col s12 center-align noShow">
          <h3>No Gig Requests to Show</h3>
          <h5>There are currently no active gig requests to display</h5>
        </div>
        </div>
       <!-- Tab 3 -->
      <div v-show="currentView === 'gig_contribution'">
        <!-- Loading Placeholder -->
        <div v-if="!isLoading">
          <div v-for="index in loadingPlaceholderCount" :key="index" class="col s12 m6 l3">
          <loading-placeholder class="card-panel" />
          </div>
        </div>
        <!-- Tab Data -->
        <div v-else-if="contributions.length !== 0" class="col s12 m6 l4" v-for="(gig, index) in contributions" :key="index">
          <gig-card :gigData="gig" meantFor="profile" />
        </div>
        <!-- No Results Returned -->
        <div v-else class="col s12 center-align noShow">
          <h3>No Contributions to Show</h3>
          <h5>There are currently no active contributions to display</h5>
        </div>
        </div>
    </div>
    </el-main>
  </page>
</template>

<script>
import Api from '@/services/api'
import Page from '@/components/page'
import CatNav from '@/components/layout/catNav'
import GigCard from '@/components/snippets/gigCard'
import ProfileOverview from '@/components/profile/profile-overview'
import ProfileExtras from '@/components/profile/profile-extras'
import RotatingCard from '@/components/snippets/rotatingCard'
import LoadingPlaceholder from '@/components/widgets/gigLoading'

export default {
  components: {
    Page,
    CatNav,
    GigCard,
    RotatingCard,
    LoadingPlaceholder,
    ProfileOverview,
    ProfileExtras
  },
  data () {
    return {
      profile: {},
      profileFetched: false,
      usergigs: [],
      userRequests: [],
      isLoading: true,
      currentView: 'active_gigs',
      loadingPlaceholderCount: 3
    }
  },
  beforeCreate () {
    this.isLoading = true
    Api.fetchUserData(this.$route.params.username).then(response => {
      this.profile = response.data
      this.profileFetched = true
    }).catch(err => {
      console.log('error retrieving user info: \n error:', this.stringify(err))
    })
    Api.fetchUserGigs(this.$route.params.username).then(response => {
      this.usergigs = response.data
      this.loading = false
    }).catch(err => {
      console.log('error retrieving user gigs: \n error:', this.stringify(err))
    })
  },
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
    },
    contributions () {
      return this.usergigs.filter((gig) => {
        return gig.json_metadata.type === 'steemgigs_surpassinggoogle'
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
    })
  }
}
</script>

<style lang="scss" scoped>
  .tabs {
    width: 98.5%;
    float: left;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    background: 0;
    a {
      color: darkgray;
      font-weight: 600;
      font-size: 14px;
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
  .noShow {
    margin-top: 20px;
  }
</style>
