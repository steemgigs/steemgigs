<template>
<el-dialog :title="`Power ${type}` " custom-class="power-modal" :visible.sync="powerVisible" width="65%">
     <el-row :gutter="20">
         <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
             <el-form :model="power" label-position="top">
                <p>Enter an amount and then click the button below to be redirected to SteemConnect to complete your transaction.</p>
                <!-- Amount & Type -->
                 <el-form-item label="Amount">
                     <el-input-number :min="0.001" :precision="3" :step="0.001" v-model="power.amount" placeholder="Enter Amount" />
                 </el-form-item>
             </el-form>
         </el-col>
     </el-row>
    <span slot="footer" class="dialog-footer">
    <el-button @click="powerVisible = false">Cancel</el-button>
    <el-button type="primary" @click="submitForm('power')">Power {{ type }}</el-button>
    </span>
</el-dialog>
</template>
<script>
export default {
    name: 'power-modal',
    props: {
        powerVisible: Boolean,
        type: String
    },
    data () {
        return {
            power: {
                amount: 0
            }
                }
    },
    methods: {
        // Check that the form is valid and then route to relevant transfer based on type
        submitForm(formName) {
                    let url = ''
                    switch(this.type) {
                       case 'up':
                       url = `https://app.steemconnect.com/sign/transfer-to-vesting?amount=${this.power.amount.toFixed(3)}%20STEEM&to=${this.$store.state.username}`
                       break;
                       case 'down':
                       url = `https://app.steemconnect.com/sign/withdraw-vesting?vesting_shares=${this.power.amount.toFixed(3)}%20VESTS`
                       break;
                       }
                    window.open(url, '_blank');
      },
    }
}
</script>
<style lang="scss">
.power-modal {
    .el-dialog__body {
        padding: 0 20px;
    }
    .el-input-number {
        width: 100%;
    }
}
</style>


