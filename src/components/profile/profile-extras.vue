<template>
<div class="profile-extras-card">
              <div class="moreProfileInfo">
            <div class="card-content">
              <span class="card-title">Links</span>
              <p class="social-link" v-for="(social, key, index) in profile.social" :key="index">
                <span class="site-label">{{ key }}:</span><span class="site-link" v-html="(social.match(/^(http|https):/)) ? `<a target='_blank' href='${social}'>${social}</a>` : social || 'Link not provided'"/>
                </p>
              <span class="card-title">Languages</span>
              <ul>
                <li v-for="(language, index) in profile.languages" :key="index">{{`${language} - Fluent`}}</li>
                <li class="not-avail" v-if='profile.languages.length === 0'>No Languages Provided</li>
              </ul>
            </div>
            </div>
</div>
</template>

<script>

export default {
  name: 'profile-extras',
  props: {
    profile: Object
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
.profile-extras-card {
    border-radius: 10px;
    background: white;
    padding: 20px;
    box-shadow: 0 3px 13px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    .card-title {
      font-size: 1.2em;
      font-weight: 600;
      text-align: left;
      &:first-child {
        font-size: 1.2em;
        margin-top: -0.5em;
        margin-bottom: 0em;
      }
      &:not(:first-child) {
        margin-top: 1em;
      }
    }
    ul {
      margin-top: 0;
    }
    .site-label {
      font-weight: bold;
      text-transform: capitalize;
    }

    .social-link {
      display: block;
      word-break: break-word;
    }

    .not-avail {
      font-size: 14px;
    }
  }
</style>
