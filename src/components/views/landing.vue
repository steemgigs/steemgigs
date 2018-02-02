<template>
  <div class="landing white">
    <div class="main center-align grey-text z-depth-3 text-lighten-4">
      <img class="bg" src="static/img/black-expert.jpeg" alt="">
      <h1>Everyone has something to offer</h1>
      <p>Freelance services for the lean entrepreneur</p>
      <div class="input-container">
        <input type="text" class="browser-default my-input">
        <a href="#join" class="btn-large white-text light-blue darken-4">Search</a>
      </div>
      <p class="link">Hi Beautiful, <a href="#">Check out our categories</a></p>
    </div>
    <section class="center cat-showcase">
      <h2 class="mb-1">Explore SteemGigs</h2>
      <p class="mb-5 grey-text">Our existing categories are sure to inspire you</p>
      <div class="row pt-5">
        <div v-for="(category, index) in categories" :key="index" class="col m4 l3">
          <div class="category">
            <i :class="category.icon" class="icon cat-icon"></i>
            <h6 class="cat-title">{{category.title}}</h6>
            <span class="cat-description">{{category.description}}</span>
          </div>
        </div>
      </div>
    </section>
    <section class="sm-banner">
      <div class="row">
        <div class="col m8 grey-text text-lighten-2">
          <h3>We made Steem Gigs for you</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, provident vel! Accusantium nesciunt obcaecati, beatae consectetur fuga est dolorum aut, culpa rem iure sint dicta facilis sequi quod mollitia perspiciatis?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        </div>
        <div class="col m4">
          <img class="responsive-img z-depth-5" src="/static/img/agreement.jpeg" alt="">
        </div>
      </div>
    </section>
    <section class="reviews blue-grey lighten-5 py-5">
      <div class="container">
        <div class="row">
          <div class="col m5 white">
            <p class="title">Steem Gigs is awesome</p>
          </div>
          <div class="col m7"></div>
        </div>
      </div>

    </section> 
    <footer class="white page-footer z-depth-2">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="indigo-text">SteemGigs</h5>
                <p class="">Here, everyone has something to offer</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="indigo-text">Quick Links</h5>
                <ul>
                  <li><a class="" href="#!">Link 1</a></li>
                  <li><a class="" href="#!">Link 2</a></li>
                  <li><a class="" href="#!">Link 3</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container indigo-text">
            &copy; {{new Date().getFullYear()}} STEEMGIGS
            </div>
          </div>
        </footer>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'
export default {
  components: {
    Carousel,
    Slide
  },
  data () {
    return {
      categories: [{
        title: 'Nature & Tourism',
        icon: 'ion-compass',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil explicabo excepturi vitae'
      },
      {
        title: 'Graphics & Design',
        icon: 'ion-paintbrush',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil explicabo excepturi vitae'
      },
      {
        title: 'Digital Marketing',
        icon: 'ion-arrow-graph-up-left',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil explicabo excepturi vitae'
      },
      {
        title: 'Writing and translation',
        icon: 'ion-edit',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil explicabo excepturi vitae'
      },
      {
        title: 'Videos and animation',
        icon: 'ion-videocamera',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil explicabo excepturi vitae'
      },
      {
        title: 'Music & Audio',
        icon: 'ion-ios-musical-note',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil explicabo excepturi vitae'
      },
      {
        title: 'Programming & tech',
        icon: 'ion-android-laptop',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil explicabo excepturi vitae'
      },
      {
        title: 'Business',
        icon: 'ion-stats-bars',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil explicabo excepturi vitae'
      }]
    }
  }
}
</script>
<style lang="scss">
  .landing {
    a {
      color: #01579b;
    }
    p {
      font-size: 1.2rem;
      &.link {
        margin-top: 5rem
      }
    }
    h2 {
      font-size: 2.5rem
    }
    .main {
      position: relative;
      padding-top: 3rem;
      min-height: 100vh;
      img.bg{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          filter: brightness(78%);
      }
      * {
        position: relative;
        z-index: 1;
      }
      input.my-input {
        padding: 16px 5px;
        min-width: 300px;
      }
    }
    .cat-showcase {
      padding: 50px 7rem;
      .category {
        min-height: 205px;
        cursor: pointer;
        .cat-title {
          transition: transform .2s ease-in;
        }
        &:hover {
          .cat-title {
            transform: translateY(-5px);
          }
          .cat-description {
            height: 100%;
            opacity: 1;
            transform: translateY(0);
          }
        }
        i.cat-icon {
          font-size: 3.5rem;
          color: rgba(1, 87, 155, .83);
        }
        h6.cat-title {
          font-size: 1.5rem
        }
        span.cat-description {
          color: #949494;
          height: 0;
          opacity: 0;
          transform: translateY(10px);
          transition: all .5s ease-in-out;
        }
      }
    }
    .sm-banner {
      background: linear-gradient(to bottom right,#4757b2,#393953);
      padding: 50px;
      h3 {
        font-size: 2.5rem;
        color: white
      }
    }
    .page-footer {
      a, p {
        color: #3f51b5;
      }
    }
  }
</style>
