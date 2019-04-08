<template>
   <page :pageClasses="['wallet__view', 'row']">
      <el-main>
        <h4>Balances for @{{this.username}}</h4>
         <!-- Balance List -->
         <el-row :gutter="20" v-if="balances">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
               <div class="balance-container" v-loading="balancesLoading">
                  <!-- Steem Balance -->
                  <div class="balance-row">
                     <el-col :xs="17" :sm="17" :md="18" :lg="18" :xl="18">
                        <div class="details">
                           <span>Steem</span>
                           <p>Tradeable tokens that may be transferred anywhere at anytime. Steem can be converted to STEEM POWER in a process called powering up. </p>
                        </div>
                     </el-col>
                     <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                        <span class="amount">{{ balances.steem_balance }}</span>
                     </el-col>
                     <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1">
                        <el-dropdown v-if="currentUser">
                          <span class="el-dropdown-link">
                            <i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                        <el-dropdown-menu slot="dropdown">
                          <div @click="launchTransfer('Steem')"><el-dropdown-item>Transfer</el-dropdown-item></div>
                          <div @click="launchPower('up')"><el-dropdown-item>Power Up</el-dropdown-item></div>
                          <a :href="'https://blocktrades.us?affiliate_id=' + blocktradesAffiliateId" target="_blank"><el-dropdown-item>Buy</el-dropdown-item></a>
                          <a :href="`https://blocktrades.us?affiliate_id=${this.blocktradesAffiliateId}`" target="_blank"><el-dropdown-item>Sell</el-dropdown-item></a>
                        </el-dropdown-menu>
                      </el-dropdown>
                     </el-col>
                  </div>
                  <!-- Steem Power Balance -->
                  <div class="balance-row">
                     <el-col :xs="17" :sm="17" :md="18" :lg="18" :xl="18">
                        <div class="details">
                           <span>Steem Power</span>
                           <p>Influence tokens which give you more control over post payouts and allow you to earn on curation rewards.</p>
                        </div>
                     </el-col>
                     <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                        <span class="amount">{{ steemPower }}</span>
                     </el-col>
                     <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1">
                        <el-dropdown v-if="currentUser">
                          <span class="el-dropdown-link">
                            <i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :disabled="true">Power Down (Coming Soon)</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                     </el-col>
                  </div>
                  <!-- SBD Balance -->
                  <div class="balance-row">
                     <el-col :xs="17" :sm="17" :md="18" :lg="18" :xl="18">
                        <div class="details">
                           <span>SBD</span>
                           <p>Tradeable tokens that may be transferred anywhere at anytime.</p>
                        </div>
                     </el-col>
                     <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                        <span class="amount">{{ balances.sbd_balance }}</span>
                     </el-col>
                     <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1">
                        <el-dropdown v-if="currentUser">
                          <span class="el-dropdown-link">
                            <i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                        <el-dropdown-menu slot="dropdown">
                          <div @click="launchTransfer('SBD')"><el-dropdown-item>Transfer</el-dropdown-item></div>
                          <a :href="`https://blocktrades.us?affiliate_id=${this.blocktradesAffiliateId}`" target="_blank"><el-dropdown-item>Buy</el-dropdown-item></a>
                          <a :href="`https://blocktrades.us?affiliate_id=${this.blocktradesAffiliateId}`" target="_blank"><el-dropdown-item>Sell</el-dropdown-item></a>
                        </el-dropdown-menu>
                      </el-dropdown>
                     </el-col>
                  </div>
                  <!-- Teardrops Balance -->
                  <div class="balance-row">
                     <el-col :xs="17" :sm="17" :md="18" :lg="18" :xl="18">
                        <div class="details">
                           <span>Teardrops</span>
                           <p>A steem-based token that you can use across steemgigs.org, ulogs.org and macrohard.pro. Teardrops can be transfered, used or kept to be powered up in the near future.</p>
                        </div>
                     </el-col>
                     <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                        <span class="amount">{{ balances.teardrop_balance }} TEARDROPS</span>
                     </el-col>
                     <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1">
                        <el-dropdown v-if="currentUser">
                          <span class="el-dropdown-link">
                            <i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                        <el-dropdown-menu slot="dropdown">
                          <div @click="launchTransfer('Teardrops')"><el-dropdown-item>Transfer</el-dropdown-item></div>
                          <a href="https://steem-engine.com/?p=market&t=TEARDROPS" target="_blank"><el-dropdown-item>Buy</el-dropdown-item></a>
                         <a href="https://steem-engine.com/?p=market&t=TEARDROPS" target="_blank"><el-dropdown-item>Sell</el-dropdown-item></a>
                         <el-dropdown-item :disabled="true">Power Up (Coming Soon)</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                     </el-col>
                  </div>
               </div>
            </el-col>
         </el-row>
         <!-- Transaction List-->
        <h4>Recent Transactions</h4>
         <el-row :gutter="20" class="transactions" v-loading="transactionsLoading">
            <!-- Transaction Item -->
            <el-col v-for="(transaction, index) in transactions" :key="index" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
               <transactionrow :transaction="transaction" :user="username"/>
            </el-col>
         </el-row>
      </el-main>
      <!-- Transfer Modal -->
      <transfermodal :showTransfer="showTransfer" :defaultType="transferType" />
      <!-- Transfer Modal -->
      <powermodal :powerVisible="powerVisible" :type="powerType" />
   </page>
</template>

<script>
import Api from '@/services/api'
import transactionrow from '@/components/wallet/transaction-item'
import transfermodal from '@/components/wallet/transfer-modal'
import powermodal from '@/components/wallet/power-modal'
import Page from '@/components/page'
export default {
  name: 'wallet',
  components: {
    transactionrow,
    transfermodal,
    powermodal,
    Page
  },
  data () {
    return {
      username: '',
      balances: null,
      transactions: null,
      transferType: null,
      balancesLoading: false,
      transactionsLoading: false,
      showTransfer: false,
      powerType: 'up',
      powerVisible: false,
      blocktradesAffiliateId: 'e2555430-2823-419e-9b4a-f614416df4ad'
    }
  },
  mounted () {
    this.username = this.$route.params.username
     this.getBalances()
     this.getTransactions()
  },
  computed: {
    steemPower () {
      if (this.balances.delegated_steem_power !== 0) {
        return this.balances.steem_power + ` (${this.balances.delegated_steem_power.toFixed(3)}) SP`  
      } else {
        return this.balances.steem_power + 'SP'
      }
    },
    currentUser () {
      if (this.username === this.$store.state.username) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    async getBalances () {
      this.balancesLoading = true
      await Api.getBalances(this.username)
      .then(result => {
        if (result.data.length === 0) {
        // Handle incorrect username, this should be validated in a different way, however if balances couldn't be found, push back to homepage
        this.$notify.error({
          title: 'Error',
          message: `Sorry, unable to load balances for that user, please check the username.`
        })
        this.$router.push('/')
        } else {
          this.balances = result.data
          this.balancesLoading = false
        }
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
      this.transactionsLoading = true
      await Api.getTransactions(this.username)
      .then(result => {
        this.transactions = result.data
        this.transactionsLoading = false
      })
      .catch(err => {
        // Send error toast notification upon error
        this.$notify.error({
          title: 'Error',
          message: `Sorry, unable to load transactions. Error Details - ${err}`
        })
      })
    },
    launchTransfer(type) {
      this.showTransfer = false
      this.transferType = type
      this.showTransfer = true
    },
    launchPower(type) {
      this.powerVisible = false
      this.powerType = type
      this.powerVisible = true
    }
    }
}

</script>

<style lang="scss" scoped> 

h4 {
  margin: 0 15px 15px 0;
}
.transactions {
  min-height: 100px;
}
.balance-container {
    background: white;
    margin-bottom: 20px;
    border-radius: 5px;
    padding: 10px 15px;
.balance-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top: 1.5px solid whitesmoke;
  padding: 12.5px 0;
  &:first-child {
    border: 0;
  }
  .details {
    span {
      font-weight: 500;
      color: #333333;
    }
    p {
      margin: 0 0 2.5px 0;
    }
  }
  .amount {
    text-align: right;
    display: block;
  }
}
}
</style>
