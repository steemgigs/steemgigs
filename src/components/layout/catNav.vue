<template>
  <ul class="subnav center center-align">
    <li>
      <router-link to="/categories/video-animation?source=category_tree">
        Video &amp; Animation
      </router-link>
      <ul class="white z-depth-1 drop">
        <li><router-link to="/categories/video-animation/whiteboard-explainer-videos?source=category_tree">Whiteboard &amp; Animated Explainers</router-link></li>
        <li><router-link to="/categories/video-animation/custom-video-intros?source=category_tree">Intros &amp; Animated Logos</router-link></li>
<!-- Promotional Videos
Editing &amp; Post Production
Lyric &amp; Music Videos
Spokesperson Videos
Animated Characters &amp; Modeling
Short Video Ads
NEW
Live Action Explainers
NEW
Other -->
      </ul>
    </li>
    <li><router-link to="/">Graphics &amp; Design</router-link></li>
    <li><router-link to="/">Digital Marketing</router-link></li>
    <li><router-link to="/">Writing &amp; Translation</router-link></li>
    <li><router-link to="/">Music &amp; Audio</router-link></li>
    <li><router-link to="/">Programming &amp; Tech</router-link></li>
    <li><router-link to="/">Bussiness</router-link></li>
    <li><router-link to="/">Untalented</router-link></li>
  </ul>
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
    ul.drop {
      display: none;
    }
    &:hover ul {
      display: block;
      position: absolute;
    }
  }
}
</style>
