<template>
  <div class="comment">
    <img src="https://avatars2.githubusercontent.com/u/7319749?s=400&v=4" class="author-image">
    <p>
      <span class="username">afeezawoyemi</span><span>&nbsp;(50)</span><span class="how-long">&nbsp;&nbsp; yesterday</span>
    </p>
    <p class="post">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, culpa incidunt. Illum, ipsam perspiciatis nam qui vitae natus ea aliquam sint sequi nobis quod odio reiciendis accusantium magni ducimus? Nisi.</p>
    <div class="menu mb-2">
      <a v-tooltip="{ content: 'upvote', classes: ['tooltip'] }" class="upvote-btn" :class="upvoted ? 'upvoted' : ''" v-if="!processing">
        <i class="ion-chevron-up"> </i>
      </a>&nbsp;
      <span class="payout">$0.00</span>&nbsp; | &nbsp; <a href="#" @click="commentMode = !commentMode" class="reply">Reply</a>
    </div>
    <comment-box v-if="commentMode" />
    <!-- <v-comment /> -->
  </div>
</template>
<script>
import CommentBox from '@/components/snippets/commentBox'
export default {
  name: 'v-comment',
  components: {
    CommentBox
  },
  data () {
    return {
      commentMode: false,
      comment: ''
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
  $blue: #4757b2;
.comment {
  position: relative;
  padding-left: 80px;
  margin: 10px auto;
  .username {
    font-weight: 700;
    color: darkslategray;
  }
  .how-long {
    color: gray;
    font-weight: 400;
  }
  .post {
    color: rgb(51, 51, 51);
  }
  img.author-image {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    background: indigo;
    position: absolute;
    left: 0;
    top: 5px;
  }
  a.upvote-btn {
    display: inline-block;
    padding: 0px 4px;
    border: 1px solid gray;
    border-radius: 50%;
    font-size: .8rem;
    &.upvoted {
      border-radius: 1px solid $blue;
      background-color: $blue;
      i {
        color: white;
      }
    }
    i {
      color: gray;
    }
  }
  .ql-editor {
    min-height: 80px;
  }
}
</style>
