<template>
  <ul class="subnav center center-align hide-on-med-and-down">
    <li class="main-li" v-for="(category, index) in categories" :key="index">
      <router-link :to="'/categories/' + slugify(category.name)">{{ capitalize(category.name) }}</router-link>
      <div class="dropdown white drop">
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
  box-shadow: 0 3px 13px rgba(0, 0, 0, 0.05);
  width: 100%;
  font-size: 14px;
  z-index: 2;
  margin-top: 0;
  margin-bottom: 0;
  border-top: 1px solid whitesmoke;
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
        background: #3f50c6;
        display: inline-block;
        position: absolute;
        left: 0;
        bottom: 0;
        transition: all ease-in-out .3s;
        box-shadow: 0 3px 13px rgba(0, 0, 0, 0.05);
      }
    }
    .dropdown {
      display: none;
    }
    &:hover .dropdown {
      width: auto;
      opacity: 1;
      visibility: visible;
      border-radius: 10px;
      margin-top: 1px;
      background: #fff;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      position: absolute;
      z-index: 20;
      top: 100%;
      left: 50%;
      right: auto;
      vertical-align: baseline;
      border: 1px #e5e5e5 solid;
      transform: translateX(-50%);
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

    .subcats ul {
      margin: 0;
    }
  }
}
</style>
