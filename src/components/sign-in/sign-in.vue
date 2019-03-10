<template>
  <el-dialog class="signin-modal" :visible.sync="show" width="50%">
    <template slot="title"><h3>Sign in via SteemConnect</h3></template>
    <p>To access SteemGigs you must login with SteemConnect, continue using the button below.</p>
    <a :href="loginURL"><el-button type="primary" class="primary">Login via SteemConnect</el-button></a>
    <span class="need-steem" @click="launchSignUp">I don't have a Steem account</span>
  </el-dialog>
</template>

<script>
import sc2 from '@/services/sc2'
export default {
  name: 'sign-in',
  props: {
    show: Boolean
  },
  data () {
    return {
      loginURL: sc2.getLoginURL()
    }
  },
  methods: {
    launchSignUp () {
      this.$emit('launchSignUp')
    }
  }
}
</script>

<style lang="scss">
.signin-modal {
    text-align: center;
    .el-dialog__body {
      padding-bottom: 20px;
    }
    .need-steem {
      display: block;
      cursor: pointer;
      margin-top: 10px;
    }
}
</style>
