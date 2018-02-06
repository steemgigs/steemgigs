<template>
  <ul class="subnav center center-align">
    <li class="main-li" v-for="(category, index) in categories" :key="index">
      <router-link :to="'/categories/' + slugify(category.name)">{{ capitalize(category.name) }}</router-link>
      <div class="dropdown white z-depth-1 drop">
        <ul>
          <li v-for="(subcategory, subIndex) in half1(category.subcategories)" :key="subIndex">
            <router-link :to="'/categories/' + slugify(category.name) + '/' + slugify(subcategory)">{{ capitalize(subcategory) }}</router-link>
          </li>
        </ul>
        <ul>
          <li v-for="(subcategory, subIndex) in half2(category.subcategories)" :key="subIndex">
            <router-link :to="'/categories/' + slugify(category.name) + '/' + slugify(subcategory)">{{ capitalize(subcategory) }}</router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      categoriesPlus: {
        name: 'Steem & Steemit',
        subcategories: [
          {
            name: 'Steem projects',
            description: ''
          },
          {
            name: 'Curation projects',
            description: ''
          },
          {
            name: 'Steem tutors',
            description: ''
          },
          {
            name: 'Steem Graphics',
            description: ''
          },
          {
            name: 'Steem Coders',
            description: ''
          },
          {
            name: 'Steem Veterans',
            description: ''
          },
          {
            name: 'Witness services',
            description: ''
          },
          {
            name: 'Steem Writers',
            description: ''
          }
        ]
      }
    }
  },
  methods: {
    half1 (arr) {
      return arr.slice(0, (Math.ceil(arr.length / 2)))
    },
    half2 (arr) {
      return arr.slice((Math.ceil(arr.length / 2)))
    }
  }
}
</script>

<style lang="scss" scoped>
.subnav {
  background: white;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #f8f8f8;
  top: 41px;
  position: fixed;
  width: 100%;
  z-index: 2;
  li.main-li {
    display: inline-block;
    position: relative;
    a {
      padding: 11.5px 0.5em;
      line-height: 40px;
      color: black;
      font-weight: 500;
      position: relative;
      box-sizing: border-box;
      transition: all ease-in-out .3s;
      &:hover::after {
        width: 100%;
      }
      &::after {
        content: ' ';
        height: 2px;
        width: 0%;
        background: black;
        display: inline-block;
        position: absolute;
        left: 0;
        bottom: 0;
        transition: all ease-in-out .3s;
      }
    }
    .dropdown {
      display: none;
    }
    &:hover .dropdown {
      width: auto;
      opacity: 1;
      visibility: visible;
      // display: block;
      // z-index: 1;
      // max-width: 30em;
      // width: fit-content;
      // text-align: left;
      // position: fixed;
      background: #fff;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      position: absolute;
      z-index: 1;
      top: 100%;
      left: 50%;
      right: auto;
      vertical-align: baseline;
      border: 1px #e5e5e5 solid;
      transform: translateX(-50%);
      // box-shadow: 0 1px 3px #dddddd;
      padding: 0 0;
      -webkit-transition: opacity .1s;
      transition: opacity .1s;
      -webkit-transition-delay: .2s;
      transition-delay: .2s;

      ul {
        padding: 0 10px;
        li {
          display: block;
          text-align: left;
          width: max-content;
        }
      }

      ul:first-of-type {
        // margin-right: 15px;
      }
    }

    &:last-child:hover .dropdown {
        right: 0;
        left: auto;
        transform: translateX(0);

    }
    &:first-child:hover .dropdown {
        right: auto;
        left: 0;
        transform: translateX(0);

    }
  }
}
</style>
