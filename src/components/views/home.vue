<template>
  <div class="home__view">
    <ul class="subnav center center-align">
      <li><router-link to="/">Video &amp; Animation</router-link></li>
      <li><router-link to="/">Graphics &amp; Design</router-link></li>
      <li><router-link to="/">Digital Marketing</router-link></li>
      <li><router-link to="/">Writing &amp; Translation</router-link></li>
      <li><router-link to="/">Music &amp; Audio</router-link></li>
      <li><router-link to="/">Programming &amp; Tech</router-link></li>
      <li><router-link to="/">Bussiness</router-link></li>
      <li><router-link to="/">Untalented</router-link></li>
    </ul>
    <h1>This is the HomePage</h1>
    <p>You&rsquo;re in</p>
  </div>
</template>

<style lang="scss" scoped>
.subnav {
  background: white;
  border-bottom: 1px solid #e9e7e7;
  li {
    display: inline-block;
    a {
      padding: 11.5px 0.5em;
      line-height: 40px;
      color: black;
      font-weight: 500;
      position: relative;
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
  }
}
</style>
