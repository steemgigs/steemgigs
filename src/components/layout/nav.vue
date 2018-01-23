<template>
  <div class="navbar-fixed">
    <nav class="white">
      <div class="nav-wrapper container">
        <router-link to="/" class="brand-logo left">STEEMGIGS<sub>alpha</sub></router-link>
        <ul class="right">
          <li><a href="https://steemit.com/pick_account" rel="noopener noreferrer" target="_blank">Sign up</a></li>
          <li><a :href="loginURL" >Log in</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import steemconnect from 'steemconnect/lib/steemconnect'
export default {
  data () {
    return {
      isAuth: false,
      loginURL: steemconnect.getLoginURL()
    }
  },
  mounted () {
    steemconnect.init({
      app: 'steemgig',
      callbackURL: 'http://localhost:8080/'
    })
    console.log('loginURL:', this.loginURL)
    steemconnect.isAuthenticated((err, result) => {
      if (!err && result.isAuthenticated) {
        this.isAuth = true
        var username = result.username
        console.log(username, ' is logged in')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
$blue:#4757b2;

.navbar-fixed {
  margin-bottom: -1.5em;
}

nav a.brand-logo, nav li a, nav a {
  color: $blue;
}

nav {
  box-shadow: 0 0;
  border-bottom: 0px solid #e9e7e7;
  .nav-wrapper {
    &.container {
      min-width: 80%;

      a.brand-logo {
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 1px;

        sub {
          margin-left: 2px;
          color: #99aab5;
          font-size: 59%;
          bottom: 0;
        }
      }

      ul {
        li {
          a {
            font-weight: bold;
            line-height: 52px;
            transition: all ease-in-out .3s;
            position: relative;
            &:hover::after {
              width: 100%;
            }
            &::after {
              content: ' ';
              height: 2px;
              width: 0%;
              background: #4757b2;
              display: inline-block;
              position: absolute;
              left: 0;
              bottom: 0;
              transition: all ease-in-out .3s;
            }
          }
        }
      }

      a.brand-logo, li a, a {
        color: $blue;
        &:hover {
          background: transparent;
        }
      }
    }
  }
}

@media only screen and (min-width: 601px) {
  nav, nav .nav-wrapper i, nav a.sidenav-trigger, nav a.sidenav-trigger i {
    height: 56px;
    line-height: 56px;
  }
}
</style>
