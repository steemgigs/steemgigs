<template>
<page :pageClasses="['faqs__view', 'row']">
    <el-main>
        <el-row :gutter="20">
            <el-col :span="24">

                <h3>Frequently Asked Questions</h3>
                <h5>Use the below to find out more about SteemGigs</h5>

                <!-- General -->

                <el-collapse v-model="general" accordion>
                    <el-collapse-item title="What is SteemGigs?" name="1">
                        <div>SteemGigs is the first freelancing social network on a decentralized Steem Blockchain with the power of Fiverr, Upwork and Freelancer combined.
                            On SteemGigs, sellers are given the opportunity to choose different categories of services they can offer to the buyers and also set their various starting price points. Services offered by sellers are called Gigs.
                            </div>
                    </el-collapse-item>
                    <el-collapse-item title="How do I sign up to SteemGigs?" name="2">
                        <div>Signing up for SteemGigs is quite easy and free. Signing up is required for users that are not on Steemit or any Steem related app. Buying and selling is restricted to only registered users.</div>
                    </el-collapse-item>
                    <el-collapse-item title="How do I log into Steem?" name="3">
                        <div>In order to help aid the growth of the platform a small beneficiary of 10% is applied to all contests and entries made on the platform.</div>
                    </el-collapse-item>
                    <el-collapse-item title="How can I find a service?" name="4">
                        <div>You can find the required services either by browsing the SteemGigs catalog or by using the SteemGigs search engine to find a specific service or seller</div>
                    </el-collapse-item>
                    <el-collapse-item title="How do I place an order?" name="5">
                        <div>After browsing the SteemGigs catalog or using the SteemGigs search engine and you find a Gig you like, click it to reveal more information about it. Information such as the description of the service, samples of works and starting price will be displayed. You have the opportunity of asking questions and reaching an agreement with the seller by posting a reply to the profile description/post.</div>
                    </el-collapse-item>
                    <el-collapse-item title="What currencies can I use on SteemGigs?" name="6">
                        <div>SteemGigs runs on the Steem Blockchain thus making use of Steem/Steem Dollars/Steem Power as modes of payment for services rendered.</div>
                    </el-collapse-item>
                      <el-collapse-item title="Do you store my billing information?" name="6">
                        <div>Since payments are made and received directly from the Steemit wallet, there will be absolutely no need to provide billing information of any kind, thus, making payments much safer.</div>
                    </el-collapse-item>
                </el-collapse>
                <p>Didn't find what you we're looking for? Check out <a href="https://ulogs.org/@surpassinggoogle/the-grand-picture-the-detailed-faq-s-for-https-steemgigs-org-and-all-the-answers-please-bookmark-this" target="_blank">this</a> post to find out more about SteemGigs. Alternatively, you can join us on <a href="https://discordapp.com/invite/wWrnSXK" target="_blank">Discord</a> to find out more about SteemGigs.</p>
                 <p><sub><i>Last updated on 10th Feb 2019.</i></sub></p>
                 </el-col>
                 
        </el-row>
    </el-main>
</page>
</template>

<script>

export default {
  name: 'frequently-asked-questions',
  data () {
    return {
      general: '1'
    }
  }
}

</script>

<style>

.el-collapse-item__header {
    font-weight: 400 !important;
    padding-left: 20px !important;
    font-size: 15px !important;
    }

    .el-collapse-item__content {
      padding-left: 20px !important;
      font-size: 14px !important;
      font-weight: lighter !important;
    }

</style>
