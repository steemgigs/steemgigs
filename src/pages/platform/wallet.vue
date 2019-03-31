<template>
<page :pageClasses="['wallet__view', 'row']">
<el-main>
  <!-- Balance List -->
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
  <!-- Transaction List-->
   <el-row :gutter="20">
     <!-- Transaction Item -->
     <el-col v-for="(transaction, index) in transactions" :key="index" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
       <transactionrow :transaction="transaction" :user="username"/>
    </el-col>
   </el-row>
</el-main>
</page>
</template>

<script>
import Api from '@/services/api'
import transactionrow from '@/components/wallet/transaction-item'
export default {
  name: 'wallet',
  components: {
    transactionrow
  },
  data () {
    return {
      username: '',
      balances: null,
      transactions: null
    }
  },
  mounted () {
    this.username = this.$route.params.username
    this.getBalances()
    this.getTransactions()
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
    },
    async getTransactions () {
      await Api.getTransactions(this.username)
      .then(result => {
        this.transactions = result.data
      })
      .catch(err => {
        // Send error toast notification upon error
        this.$notify.error({
          title: 'Error',
          message: `Sorry, unable to load transactions. Error Details - ${err}`
        })
      })
    }
    }
}

</script>

<style>

</style>
