<template>
  <page :pageClasses="['bro__view', 'row']">
    <cat-nav />
    <!-- Get Started Grey -->
    <section class="about-bro">
      <el-row :gutter="15">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <h3>BroPro</h3>
          <p>BROPRO allows you to exchange teardrops token for more than 'just talent', these ones are un(dis)talented brothers (sisters included) who actually want to play a role in historical history, by helping you through the process of building your dreams.</p>
        </el-col>
      </el-row>
    </section>
    <el-main>
        <h4>BroPro Members</h4>
        <p>These members are already taking part in BroPro</p>
        <el-row :gutter="25">
             <el-col v-for="(bro, index) in broPro" :key="index" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
                 <div class="bro-card">
                    <a :href="`/@${bro.name}`" target="_blank"><img :src="`https://steemitimages.com/u/${bro.name}/avatar`" alt="" /></a>
                     <h4>{{ bro.name }} </h4>
                     <p>{{ bro.description }}</p>
                     <h6>Starting at {{ bro.price }}</h6>
                     <el-button @click="dialogVisible = true" class="secondary" type="secondary">Buy Now</el-button>
                 </div>
             </el-col>
        </el-row>
    </el-main>
    <el-dialog :visible.sync="dialogVisible" width="65%" :before-close="handleClose">
      <template slot="title"><h3>Buying Details</h3></template>
      <p class="dialog-message">To get this experience all you need to do is send teardrops to the user you wish to utilise with memo "bropro" via steem-engine.com. If you don't have the specified teardrops amount, you can use the button below to access the market to buy teardrops. If you have any questions or concerns, all our BroPro members are available on our Discord to help with your queries.</p>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">Cancel</el-button>
    <a href="https://steem-engine.com/?p=market&t=TEARDROPS" class="get-tokens" target="_blank"><el-button type="primary" class="primary" @click="dialogVisible = false">Go To Market</el-button></a>
  </span>
</el-dialog>
  </page>
</template>

<script>
import Page from '@/components/page'
import CatNav from '@/components/layout/catNav'
export default {
  name: 'BroPro',
  data () {
    return {
      dialogVisible: false,
      broPro: [{
          name: 'surpassinggoogle',
          description: 'I will provide a 30 min chat session (audio or video) about community/project development and general success.',
          price: '100 TEARDROPS'
      },
      {
          name: 'tobias-g',
          description: 'I provide a 30 min chat session (audio) to help you design your application UI and provide you guidance surrounding developing your steem front end.',
          price: '500 TEARDROPS'
      },
      {
          name: 'ankarlie',
          description: 'I will provide a 30 min chat session (audio or video) teaching you about viable crypto investments. We will cover trading, blockchain, free/paid investments, etc.',
          price: '60 TEARDROPS'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>

h3 {
  margin-top: 0;
}

h4 {
  margin: 0;
}

h6 {
  margin: 15px;
}

p {
  margin: 10px 0;
}

.get-tokens {
  margin-left: 10px;
}

.dialog-message {
  padding: 0 20px;
}

.bro-card {
     background: white;
      padding: 20px;
      box-shadow: 0 3px 13px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      text-align: center;
      margin-bottom: 25px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 330px;
      img {
          height: 50px;
          width: 50px;
          border-radius: 50%;
      }
}

.token-body {
  padding: 30px !important;
}

  .about-bro {
    background-color: #6361d0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.09'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    color: white;
    text-align: center;
    padding: 30px 0;
    p {
      display: block;
      margin: auto;
      max-width: 600px;
      margin-top: 15px;
    }
    h3 {
      color: white !important;
    }
    button {
      color: white;
      border: 1px solid white;
      background: 0;
    }
    button:hover {
      color: white;
      border: 1px solid white;
      background: 0;
      opacity: 0.8;
    }
  }
</style>
