<template>
    <el-container>
  <div id="app" v-loading.fullscreen.lock="fullLoading">
    <nav-bar @launchSignUp="showSignUp = true" @launchSignIn="showSignIn = true"/>
      <ElementLoading :active="this.$store.state.isLoading" spinner="spinner" color="#FF1480" :is-full-screen="true" />
   <router-view />
    <signin :show="showSignIn" @launchSignUp="showSignUp = true, showSignIn = false" @closeSignIn="showSignIn = false" />
    <signup :show="showSignUp"  @closeSignUp="showSignUp = false"/>
    <ul class="sidenav collapsible" id="mobile-demo">
      <li v-for="(category, index) in categories" :key="index">
        <div class="collapsible-header"><div>{{capitalize(category.name)}}</div><div @click="closeNav(`/categories/${slugify(category.name)}`)" class="go-to"> Go To</div></div>
        <ul class="collapsible-body blue-grey lighten-5">
          <li v-for="(subcategory, subIndex) in category.subcategories" :key="subIndex"><span @click="closeNav(`/categories/${slugify(category.name)}/${slugify(subcategory.name)}`)" class="ml-5 grey-text text-darken-2"> {{capitalize(subcategory.name)}} </span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</el-container>
</template>

<script>
import NavBar from '@/components/layout/nav'
import M from 'materialize-css'
import ElementLoading from 'vue-element-loading'
import signup from '@/components/sign-up/sign-up.vue'
import signin from '@/components/sign-in/sign-in.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    NavBar,
    ElementLoading,
    signup,
    signin
  },
  data () {
    return {
      navInstance: '',
      showSignUp: false,
      showSignIn: false
    }
  },
  mounted () {
    let elem = document.querySelector('.fixed-action-btn')
    M.FloatingActionButton.init(elem, {
      direction: 'top',
      hoverEnabled: false
    })
    let sidenav = document.querySelector('.sidenav')
    this.navInstance = M.Sidenav.init(sidenav, {menuWidth: 200})
    let collapsible = document.querySelector('.collapsible')
    M.Collapsible.init(collapsible)
  },
  computed: {
    ...mapGetters([
      'fullLoading'
    ])
  },
  methods: {
    closeNav (to) {
      this.$router.push(to)
      this.navInstance.close()
    }
  }
}
</script>

<style lang="scss">

  ul.sidenav > li
  {
    .go-to {
      color: #6361D0;
      margin-left: 4rem;
    }
    &.active {
      .collapsible-header {
        background-color: #6361D0;
        color: white;
        box-shadow: 0 6px 13px rgba(0, 0, 0, 0.2);
        overflow: scroll;
        .go-to {
          color:  white
        }
      }
    }
  }
  .go-to {
    align-self: flex-end
  }
</style>
