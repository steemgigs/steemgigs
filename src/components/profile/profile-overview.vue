<template>
<div class="profile-card">
    <div class="profilePic">
        <img :src="profileImage || placeholderImg" class="user-pict-img" :alt="profile.username" width="150" height="150">
   </div>
        <span class="username">
      {{ profile.username + ' (' + profile.rep + ') '}}
      <el-tooltip effect="dark" content="Certifed Ulogger" placement="bottom">
         <span v-if="profile.certifiedUloggerStatus">
         <img class="ulogger-img" src="/static/img/certified_ulog.png"/>
         </span>
        </el-tooltip>
        </span>
        <p class="expertise" v-line-clamp:20="clamp"> {{ profile.about }}</p>
        <span class="ratings">
   <i class="icon ion-ios-star amber-text" v-for="(star, index) in 5" :key="index"></i> 5.0 (No Reviews)
   </span>
   <div v-if="mode !== 'preview'">
        <p class="location"><i class="icon ion-android-pin"></i> From <span class="right" v-text="profile.location || 'Not set'"></span></p>
        <p class="member_since"> <i class="icon ion-android-person"></i> Member since <span class="right" v-text="memberSince"></span></p>
        <p class="member_since"> <i class="icon ion-ios-briefcase"></i> Last delivery <span class="right">N/A</span></p>
        <p>
            <i class="icon ion-android-plane"></i> Vacation mode
            <span class="right">
   <div class="switch" v-if="true">
   <label>
   <input :checked="profile.vacation" type="checkbox" disabled >
   <span class="lever"></span>
            </label>
    </div>
    </span>
    </p>
    <hr v-if="profile.certifiedUloggerStatus" class="my-4">
    <div class="button-row">
        <!-- Delegation Buttons only shown if a user is a certified ulogger -->
        <el-dropdown v-if="profile.certifiedUloggerStatus">
            <el-button type="secondary">Delegate<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
                <a :href="delgationURL + profile.username + '&vesting_shares=10%20SP'" target="_blank">
               <el-dropdown-item>10SP</el-dropdown-item>
            </a>
                <a :href="delgationURL + profile.username + '&vesting_shares=20%20SP'" target="_blank">
               <el-dropdown-item>20SP</el-dropdown-item>
            </a>
                <a :href="delgationURL + profile.username + '&vesting_shares=50%20SP'" target="_blank">
               <el-dropdown-item>50SP</el-dropdown-item>
            </a>
                <a :href="delgationURL + profile.username + '&vesting_shares=100%20SP'" target="_blank">
               <el-dropdown-item>100SP</el-dropdown-item>
            </a>
                <a :href="customDelegationURL + profile.username" target="_blank">
               <el-dropdown-item>Custom</el-dropdown-item>
            </a>
            </el-dropdown-menu>
        </el-dropdown>
        <router-link v-if="!isProfilePage" :to="'/@' + profile.username">
            <el-button class="secondary explore-profile" type="secondary">Explore Profile</el-button>
        </router-link>
        <router-link v-if="isProfilePage" :to="'wallet/@' + profile.username">
            <el-button class="secondary explore-profile" type="secondary">View Wallet</el-button>
        </router-link>
    </div>
    </div>
</div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'profile-overview',
  props: {
    profile: Object,
    isProfilePage: Boolean,
    mode: String
  },
  computed: {
    memberSince () {
      return moment(this.profile.created).format('MMMM YYYY')
    },
    profileImage () {
      return `https://steemitimages.com/u/${this.profile.username}/avatar`
    },
    clamp () {
      if (this.isProfilePage) {
        return 0
      } else {
        return 2
      }
    }
  }
}
</script>

<style lang="scss">
.profile-card {
    border-radius: 10px;
    background: white;
    padding: 20px;
    box-shadow: 0 3px 13px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    .user-pict-img {
        height: 75px;
        width: 75px;
        border-radius: 50%;
        margin: auto;
        display: block;
    }

    .ulogger-img {
        height: 20px;
        margin-left: 5px;
    }

    .expertise {
        margin: 10px;
        min-height: 45px;
        word-break: initial;
        text-align: center;
    }

    span {
        display: block;
        text-align: center;
        word-break: break-word;

        &.username {
            font-weight: 600;
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-top: 10px;
        }
    }

    .button-row {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;

        button {
            margin-bottom: 10px;
        }
        .explore-profile {
            display: block;
            margin: auto;
        }
    }
}
</style>
