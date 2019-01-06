<template>
<div class="share-options">
    <social-sharing :url="currentURL" :title="title" :hashtags="tags" twitter-user="steemgigs" inline-template>
        <div>
            <span>Share this post</span>
            <network network="facebook">
                <i class="fa fa-fw fa-facebook"></i>
            </network>
            <network network="googleplus">
                <i class="fa fa-fw fa-google-plus"></i>
            </network>
            <network network="pinterest">
                <i class="fa fa-fw fa-pinterest"></i>
            </network>
            <network network="reddit">
                <i class="fa fa-fw fa-reddit"></i>
            </network>
            <network network="twitter">
                <i class="fa fa-fw fa-twitter"></i>
            </network>
            <network network="weibo">
                <i class="fa fa-weibo"></i>
            </network>
            <network network="whatsapp">
                <i class="fa fa-fw fa-whatsapp"></i>
            </network>
        </div>
    </social-sharing>
</div>
</template>

<script>

export default {
  name: 'share-options',
  data () {
    return {
      currentURL: 'https://steemgigs.org' + `${this.$route.fullPath}`
    }
  },
  props: {
    tags: String,
    title: String
  }
}

</script>
<style>
.share-options {
    display: flex;
    flex-direction: row;
    padding: 10px;
    justify-content: flex-end;
    color: #929396;
}

.share-options span {
    font-size: 14px;
    font-weight: 700;
}

.share-options i {
    font-size: 17px;
    cursor: pointer;
}

.share-options i:hover {
    color: #6361D0;
}
</style>
