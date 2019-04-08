<template>
<el-dialog title="Transfer" custom-class="transfer-modal"  @close="emitClose" :visible.sync="showTransfer" width="65%">
     <el-row :gutter="20">
         <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
             <el-form :model="transfer" :rules="transferRules" ref="transfer" label-position="top">
                 <p>Enter the recipient, amount and a memo, then click the button below to be redirected to SteemConnect to complete your transaction.</p>
                 <!-- To -->
                 <el-form-item label="To" prop="to">
                     <el-input v-model="transfer.to" placeholder="Enter Recipient"/>
                </el-form-item>
                <!-- Amount & Type -->
                 <el-form-item v-if="defaultType" label="Amount" prop="amount">
                     <el-input v-model="transfer.amount" placeholder="Enter Amount">
                             <el-radio-group slot="append" v-model="transfer.type" size="small">
                                 <el-radio-button label="Steem"></el-radio-button>
                                 <el-radio-button label="SBD"></el-radio-button>
                                 <el-radio-button label="Teardrops"></el-radio-button>
                            </el-radio-group>
                     </el-input>
                 </el-form-item>
                <!-- Memo -->
                 <el-form-item label="Memo" prop="memo">
                     <el-input type="textarea" placeholder="Enter Memo" v-model="transfer.memo" />
                </el-form-item>
             </el-form>
         </el-col>
     </el-row>
    <span slot="footer" class="dialog-footer">
    <el-button @click="showTransfer = false">Cancel</el-button>
    <el-button type="primary" @click="submitForm('transfer')">Transfer</el-button>
    </span>
</el-dialog>
</template>
<script>
export default {
    name: 'transfer-modal',
    props: {
        showTransfer: Boolean,
        defaultType: String
    },
    data () {
        return {
            transfer: {
                to: '',
                amount: null,
                type: '',
                memo: ''
            },
            transferRules: {
                to: [{ required: true, message: 'Please enter a recipient', trigger: 'blur' }],
                amount: [{ required: true, message: 'Please enter a amount', trigger: 'blur' }],
                    }
                }
    },
    watch: {
        defaultType () {
            this.transfer.type = this.defaultType
        }
    },
    methods: {
        // Check that the form is valid and then route to relevant transfer based on type
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let url = ''
                    switch(this.transfer.type) {
                       case 'Steem':
                       url = `https://app.steemconnect.com/sign/transfer?from=${this.$store.state.username}&to=${this.transfer.to}&amount=${this.transfer.amount}%20STEEM`
                       break;
                       case 'SBD':
                       url = `https://app.steemconnect.com/sign/transfer?from=${this.$store.state.username}&to=${this.transfer.to}&amount=${this.transfer.amount}%20SBD`
                       break;
                       case 'Teardrops':
                       url = `https://app.steemconnect.com/sign/custom-json?required_auths=%5B%22${this.$store.state.username}%22%5D&required_posting_auths=%5B%5D&id=ssc-mainnet1&json=%7B%22contractName%22%3A%22tokens%22%2C%22contractAction%22%3A%22transfer%22%2C%22contractPayload%22%3A%7B%22symbol%22%3A%22TEARDROPS%22%2C%22to%22%3A%22${this.transfer.to}%22%2C%22quantity%22%3A%22${this.transfer.amount}%22%2C%22memo%22%3A%22${this.transfer.memo}%22%7D%7D`
                       break;
                       }
                    window.open(url, '_blank');
                    } else {
                        return false;
                    }
                });
      },
      emitClose() {
          this.$emit('closedModal', {
              name: 'transfer'
          })
      }
    }
}
</script>
<style lang="scss">
.transfer-modal {
    .el-dialog__body {
        padding: 0 20px;
    }
    .el-input-group__append {
        padding: 0 2.5px;
    }
}
</style>


