<template>
  <el-dialog class="signin-modal" :visible.sync="show" width="65%" @closed="sendBasicEvent('closeSignIn')">
    <template slot="title"><h3>Sign in via SteemConnect</h3>
</template>
    <p>To access SteemGigs you must login with SteemConnect, continue using the button below.</p>
    <a :href="loginURL"><el-button type="primary" >Login via SteemConnect</el-button></a>
    <span class="need-steem" @click="sendBasicEvent('launchSignUp')">I don't have a Steem account</span>
  </el-dialog>
</template>

<script>
import sc2 from '@/services/sc2'
import modal from '@/mixins/modal.js'

export default {
  name: 'sign-in',
  mixins: [modal],
  props: {
    show: Boolean
  },
  data () {
    return {
      loginURL: sc2.getLoginURL()
    }
  }
}
</script>

<style lang="scss">
  .signin-modal {
    text-align: center;
    .el-dialog {
      padding: 30px;
      .need-steem {
        display: block;
        cursor: pointer;
        margin-top: 10px;
      }
      .need-steem:hover {
        text-decoration: underline;
      }
    }
  }
</style>
