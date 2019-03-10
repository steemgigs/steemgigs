<template>
    <el-footer class="sg-footer">
        <el-row :gutter="25">
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <h3>SteemGigs</h3>
                <p>A revolutionary freelance services marketplace built on the steem blockchain, that 'removes all barriers to entry from dream-building' for entrepreneurs, by implementing an 'untalented & community' paradigm, where 'everyone has something to offer'. </p>
                <span>All rights reserved 2019</span>
                <div class="social-icons"></div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                <h4>Useful Links</h4>
                <ul>
                    <li v-for="(item, index) in usefulLinks" :key="index">
                        <router-link :to="item.link">{{ item.title }}</router-link>
                    </li>
                </ul>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <h4>Our Categories</h4>
                <ul class="our-categories">
                    <li v-for="(item, index) in categoryLinks" :key="index">
                        <router-link :to="item.link">{{ item.title }}</router-link>
                    </li>
                </ul>
            </el-col>
        </el-row>
    </el-footer>
</template>

<script>
export default {
  name: 'sg-footer',
  data () {
    return {
      usefulLinks: [{
        title: 'Frequently Asked Questions',
        link: '/faqs'
      },
      {
        title: 'Updates',
        link: '/updates'
      },
      {
        title: 'Events',
        link: '/events'
      },
      {
        title: 'Terms of Use',
        link: ''
      },
      {
        title: 'Privacy Policy',
        link: '/privacy'
      }
      ],
      categoryLinks: [{
        title: 'Fun & Lifestyle',
        link: '/categories/fun-lifestyle'
      },
      {
        title: 'Graphics & Design',
        link: '/categories/graphics-design'
      },
      {
        title: 'Digital Marketing',
        link: '/categories/digital-marketing'
      },
      {
        title: 'Writing & Translation',
        link: '/categories/writing-and-translation'
      },
      {
        title: 'Video & Animation',
        link: '/categories/videos-and-animation'
      },
      {
        title: 'Music & Audio',
        link: '/categories/music-audio'
      },
      {
        title: 'Programming & Tech',
        link: '/categories/programming-tech'
      },
      {
        title: 'Business',
        link: '/categories/business'
      }
      ]
    }
  }
}
</script>

<style lang="scss">
    .sg-footer {
        background-color: #6361d0;
        background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.09'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        height: auto !important;
        padding: 50px 100px;
        color: white;
        h3, h4, a {
            color: white;
        }
        .our-categories {
            columns: 2;
            -webkit-columns: 2;
            -moz-columns: 2;
        }
    }
</style>
