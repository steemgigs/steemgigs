<template>
<div>
   <div class="profile-extras-card">
      <div class="moreProfileInfo">
         <div class="card-content">
           <h5 class="card-title">Skills</h5>
           <el-tag size="small" v-for="(skill, index) in profile.skillsAndHobbies" :key="index"> {{ skill }} </el-tag>
           <p v-if="profile.skillsAndHobbies.length === 0">
             Not Available
           </p>
           <h5 class="card-title">Learning</h5>
           <el-tag size="small" v-for="(learn, index) in profile.learning" :key="index"> {{ learn }} </el-tag>
           <p v-if="profile.learning.length === 0">
             Not Available
           </p>
           <h5 class="card-title">Help With</h5>
           <el-tag size="small" v-for="(help, index) in profile.helpWith" :key="index"> {{ help }} </el-tag>
           <p v-if="profile.helpWith.length === 0">
             Not Available
           </p>
           <h5 class="card-title">I made this</h5>
           <p>{{ profile.portfolio.description || 'Not Available' }}</p>
           <h5 class="card-title">Portfolio URL</h5>
            <p class="not-avail" v-if='profile.portfolio.url.length === 0'>Not Available</p>
            <a target='_blank' v-bind:href="profile.portfolio.url" v-html="profile.portfolio.url"></a>
            <h5 class="card-title">Links</h5>
            <p class="social-link" v-for="(social, key, index) in profile.social" :key="index">
               <span class="site-label">{{ key }}: </span><span class="site-link" v-html="(social.match(/^(http|https):/)) ? `<a target='_blank' href='${social}'>${social}</a>` : social || ' Link not provided'"/>
            </p>
            <h5 class="card-title">Social Reach</h5>
            <p> {{ profile.socialReach || 'N/A' }} </p>
            <h5 class="card-title">Languages</h5>
            <ul>
               <li v-for="(language, index) in profile.languages" :key="index">{{`${language} - Fluent`}}</li>
               <p class="not-avail" v-if='profile.languages.length === 0'>No Languages Provided</p>
            </ul>
         </div>
      </div>
   </div>
   <a v-if="!certifiedUloggerStatus" href="https://docs.google.com/forms/d/e/1FAIpQLSdYyvcbjfqAh38Exto9jMO1RoxL4YftpSqPnUsj3LL5hpQFzw/viewform" target="_blank">
      <el-button type="primary" class="primary certified-button">Get Certified</el-button>
   </a>
</div>
</template>

<script>

export default {
  name: 'profile-extras',
  props: {
    profile: Object
  }
}
</script>

<style lang="scss">
.profile-extras-card {
    border-radius: 10px;
    background: white;
    padding: 0 20px;
    box-shadow: 0 3px 13px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
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
  .certified-button {
    width: 100%;
    margin-top: 10px;
    }
    .el-tag {
      overflow-wrap: break-word;
      word-wrap: break-word;
      white-space: normal;
      height: auto;
    }
</style>
