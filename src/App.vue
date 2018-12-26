<template>
  <div id="app">
    <nav-bar />
    <router-view/>
    <notifications group="foo" position="top left" />
    <div v-show="$store.state.accessToken" class="fixed-action-btn hide-on-large-only">
      <a class="btn-floating btn indigo">
        <i class="ion-plus-round"></i>
      </a>
      <ul>
        <li>
          <router-link to="/create_testimonial" tag="a" class="btn-floating blue"><i class="ion-happy"></i></router-link>
        </li>
        <li>
          <router-link to="/create_untalented" tag="a" class="btn-floating blue darken-1"><i class="ion-mic-c"></i></router-link>
        </li>
        <li>
          <router-link to="/steemgigs_request" tag="a" class="btn-floating blue darken-2"><i class="ion-help"></i></router-link>
        </li>
        <li>
          <router-link to="/create_gig" tag="a" class="btn-floating blue darken-3"><i class="ion-edit"></i></router-link>
        </li>
      </ul>
    </div>
    <feed-back></feed-back>
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
</template>

<script>
import NavBar from '@/components/layout/nav'
import FeedBack from '@/components/layout/feedback'
import M from 'materialize-css'
export default {
  name: 'App',
  components: {
    NavBar,
    FeedBack
  },
  data () {
    return {
      navInstance: ''
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
      color: #4b5ab9;
      margin-left: 4rem;
    }
    &.active {
      .collapsible-header {
        background-color: #4b5ab9;
        color: white;
        box-shadow: 0 6px 13px rgba(0, 0, 0, 0.2);
        overflow: scroll;
        .go-to {
          color:  white
        }
      }
    }
  }
  // .collapsible-header {
  //   display: initial;
  // }
  .go-to {
    align-self: flex-end
  }
</style>
