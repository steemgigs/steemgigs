<template>
<page :pageClasses="['wallet__view', 'row']">
<el-main>


  {{ balances}}
  <el-row :gutter="20">
    <!-- Steem Balance -->
    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
    </el-col>
    <!-- SBD Balance -->
    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
    </el-col>
    <!-- Teardrops Balance -->
    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
    </el-col>
  </el-row>
</el-main>
</page>
</template>

<script>
import Api from '@/services/api'
export default {
  name: 'wallet',
  data () {
    return {
      username: 'tobias-g',
      balances: null
    }
  },
  mounted () {
    this.getBalances()
  },
  methods: {
    async getBalances () {
      await Api.getBalances(this.username)
      .then(result => {
        this.balances = result.data
      })
      .catch(err => {
        // Send error toast notification upon error
        this.$notify.error({
          title: 'Error',
          message: `Sorry, unable to load balances. Error Details - ${err}`
        })
      })
    }
    }
}

</script>

<style>

</style>
