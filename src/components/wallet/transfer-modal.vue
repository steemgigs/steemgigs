<template>
<el-dialog title="Transfer" custom-class="transfer-modal" :visible.sync="showTransfer" width="65%">
     <el-row :gutter="20">
         <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
             <el-form :model="transfer" :rules="transferRules" ref="transfer" label-position="top">
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et mauris pharetra, tincidunt nulla at, ullamcorper purus. Nullam vel varius neque. </p>
                 <!-- To -->
                 <el-form-item label="To" prop="to">
                     <el-input v-model="transfer.to" placeholder="Enter Recipient"/>
                </el-form-item>
                <!-- Amount & Type -->
                 <el-form-item label="Amount" prop="amount">
                     <el-input v-model="transfer.amount" placeholder="Enter Amount">
                             <el-radio-group slot="append" v-model="transfer.type" size="small">
                                 <el-radio-button label="Steem"></el-radio-button>
                                 <el-radio-button label="SBD"></el-radio-button>
                                 <el-radio-button label="Teadrops"></el-radio-button>
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
                type: this.defaultType,
                memo: ''
            },
            transferRules: {
                to: [{ required: true, message: 'Please enter a recipient', trigger: 'blur' }],
                amount: [{ required: true, message: 'Please enter a amount', trigger: 'blur' }],
                    }
                }
    },
    methods: {
        // Check that the form is valid and then route to relevant transfer based on type
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                    } else {
                        return false;
                    }
                });
      },
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
