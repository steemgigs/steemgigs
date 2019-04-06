<template>
   <page :pageClasses="['wallet__view', 'row']">
      <el-main>
        <h3>Balances for @{{this.username}}</h3>
         <!-- Balance List -->
         <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
               <div class="balance-container">
                  <!-- Steem Balance -->
                  <div class="balance-row">
                     <el-col :xs="12" :sm="12" :md="18" :lg="18" :xl="18">
                        <div class="details">
                           <span>Steem</span>
                           <p>Tradeable tokens that may be transferred anywhere at anytime. Steem can be converted to STEEM POWER in a process called powering up. </p>
                        </div>
                     </el-col>
                     <el-col :xs="12" :sm="12" :md="5" :lg="5" :xl="5">
                        <span class="amount">{{ balances.steem_balance }}</span>
                     </el-col>
                     <el-col :xs="12" :sm="12" :md="1" :lg="1" :xl="1">
                        <el-dropdown>
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
                     <el-col :xs="12" :sm="12" :md="18" :lg="18" :xl="18">
                        <div class="details">
                           <span>Steem Power</span>
                           <p>Influence tokens which give you more control over post payouts and allow you to earn on curation rewards.</p>
                        </div>
                     </el-col>
                     <el-col :xs="12" :sm="12" :md="5" :lg="5" :xl="5">
                        <span class="amount">{{ steemPower }}</span>
                     </el-col>
                     <el-col :xs="12" :sm="12" :md="1" :lg="1" :xl="1">
                        <el-dropdown>
                          <span class="el-dropdown-link">
                            <i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                        <el-dropdown-menu slot="dropdown">
                          <div @click="launchPower('down')"><el-dropdown-item>Power Down</el-dropdown-item></div>
                        </el-dropdown-menu>
                      </el-dropdown>
                     </el-col>
                  </div>
                  <!-- SBD Balance -->
                  <div class="balance-row">
                     <el-col :xs="12" :sm="12" :md="18" :lg="18" :xl="18">
                        <div class="details">
                           <span>SBD</span>
                           <p>Tradeable tokens that may be transferred anywhere at anytime.</p>
                        </div>
                     </el-col>
                     <el-col :xs="12" :sm="12" :md="5" :lg="5" :xl="5">
                        <span class="amount">{{ balances.sbd_balance }}</span>
                     </el-col>
                     <el-col :xs="12" :sm="12" :md="1" :lg="1" :xl="1">
                        <el-dropdown>
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
                     <el-col :xs="12" :sm="12" :md="18" :lg="18" :xl="18">
                        <div class="details">
                           <span>Teardrops</span>
                           <p>A steem-based token that you can use across steemgigs.org, ulogs.org and macrohard.pro. Teardrops can be transfered, used or kept to be powered up in the near future.</p>
                        </div>
                     </el-col>
                     <el-col :xs="12" :sm="12" :md="5" :lg="5" :xl="5">
                        <span class="amount">{{ balances.teardrop_balance }} TEARDROPS</span>
                     </el-col>
                     <el-col :xs="12" :sm="12" :md="1" :lg="1" :xl="1">
                        <el-dropdown>
                          <span class="el-dropdown-link">
                            <i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                        <el-dropdown-menu slot="dropdown">
                          <div @click="launchTransfer('Teardrops')"><el-dropdown-item>Transfer</el-dropdown-item></div>
                          <a href="https://steem-engine.com/?p=market&t=TEARDROPS" target="_blank"><el-dropdown-item>Buy</el-dropdown-item></a>
                         <a href="https://steem-engine.com/?p=market&t=TEARDROPS" target="_blank"><el-dropdown-item>Sell</el-dropdown-item></a>
                        </el-dropdown-menu>
                      </el-dropdown>
                     </el-col>
                  </div>
               </div>
            </el-col>
         </el-row>
         <!-- Transaction List-->
        <h3>Recent Transactions</h3>
         <el-row :gutter="20">
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
      showTransfer: false,
      powerType: 'up',
      powerVisible: false,
      blocktradesAffiliateId: 'e2555430-2823-419e-9b4a-f614416df4ad'
    }
  },
  mounted () {
    this.username = this.$route.params.username
    this.$store.dispatch('setFullLoading', true)
     this.getBalances()
     this.getTransactions()
     .then(result => {
       this.$store.dispatch('setFullLoading', false)
       })
  },
  computed: {
    steemPower () {
      if (this.balances.delegated_steem_power !== 0) {
        return this.balances.steem_power + ` (${this.balances.delegated_steem_power.toFixed(3)}) SP`  
      } else {
        return this.balances.steem_power + 'SP'
      }
    }
  },
  methods: {
    async getBalances () {
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

h3 {
  margin-bottom: 20px;
}
.balance-container {
    background: white;
    margin-bottom: 20px;
    border-radius: 5px;
    padding: 15px;
.balance-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .details {
    span {
      font-weight: 500;
      color: #181566;
    }
    p {
      margin-top: 2.5px;
    }
  }
  .amount {
    text-align: right;
    display: block;
  }
}
}
</style>
