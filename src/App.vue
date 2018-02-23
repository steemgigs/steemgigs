<template>
  <div id="app">
    <nav-bar />
    <router-view/>
    <notifications group="foo" position="top left" />
    <div class="fixed-action-btn hide-on-large-only">
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
    <!-- <ul>
      <li class="main-li" v-for="(category, index) in categories" :key="index">
        <router-link :to="'/categories/' + slugify(category.name)">{{ capitalize(category.name) }}</router-link>
        <div class="dropdown white z-depth-1 drop">
          <ul>
            <li v-for="(subcategory, subIndex) in half1(category.subcategories)" :key="subIndex">
              <router-link :to="'/categories/' + slugify(category.name) + '/' + slugify(subcategory.name)">{{ capitalize(subcategory.name) }}</router-link>
            </li>
          </ul>
          <ul>
            <li v-for="(subcategory, subIndex) in half2(category.subcategories)" :key="subIndex">
              <router-link :to="'/categories/' + slugify(category.name) + '/' + slugify(subcategory.name)">{{ capitalize(subcategory.name) }}</router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul> -->
    <!-- <ul>
      <li><a href="#!">First Sidebar Link</a></li>
      <li><a href="#!">Second Sidebar Link</a></li>
      <li class="no-padding">
        <ul class="collapsible collapsible-accordion">
          <li>
            <a class="collapsible-header">Dropdown<i class="material-icons">arrow_drop_down</i></a>
            <div class="collapsible-body">
              <ul>
                <li><a href="#!">First</a></li>
                <li><a href="#!">Second</a></li>
                <li><a href="#!">Third</a></li>
                <li><a href="#!">Fourth</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </li>
    </ul> -->
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
import M from 'materialize-css'
export default {
  name: 'App',
  components: {
    NavBar
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
