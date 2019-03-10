<template>
  <el-dialog class="sign-up-modal" :visible.sync="show" width="50%">
    <template slot="title"><h3>Get your Steem Account today</h3>
</template>
    <p>Signing up to Steem unlocks your chance to use hundreds of awesome Steem apps as well as SteemGigs.</p>
    <el-row :gutter="25">
            <el-col class="sign-up-item" v-for="(item, index) in signUpOptions" :key="index" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <img :src="item.image" alt="Sign Up Image">
              <p>{{ item.text }}</p>
              <el-button :type="item.buttonType" :class="item.buttonType" @click="handleNext(item.type)"> {{ item.buttonText }}</el-button>
              <p>{{ item.waitTime }}</p>
            </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: 'sign-up',
  props: {
    show: Boolean
  },
  data () {
    return {
      signUpOptions: [{
        image: '/static/img/sign-up/clock.svg',
        text: 'Sign up via Steemit.com for free, but takes longer to verify you account',
        waitTime: '3 - 10 Day Waiting Time ',
        buttonText: 'Sign Up For Free',
        buttonType: 'secondary',
        type: 1
      },
      {
        image: '/static/img/sign-up/finish.svg',
        text: 'Sign up directly from SteemGigs, costs $2, but you get instant access.',
        waitTime: 'Instant Access',
        buttonText: 'Get Instant Access',
        buttonType: 'primary',
        type: 2
      }
      ]
    }
  },
  methods: {
    handleNext (type) {
      switch (type) {
        case 1:
          window.open('https://signup.steemit.com/', '_blank')
          break
        case 2:
          alert('launchNinja')
          break
      }
    }
  }
}
</script>

<style lang="scss">
  .sign-up-modal {
    text-align: center;
    .el-dialog {
      padding: 20px;
        .sign-up-item {
          padding: 10px;
        }
        img {
          width: 100%;
          max-width: 200px;
          height: 145px;
        }
      }
    }
</style>
