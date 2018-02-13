<template>
  <div class="comment-box">
     <vue-editor :editorToolbar="[]" v-model="comment" placeholder="Type comment here, you can drag and drop images" ></vue-editor>
    <div class="row right-align">
      <div class="col s12 pt-2">
        <button @click.prevent="commentMode = false" class="btn indigo lighten-2 waves-effect">Cancel</button>
        <button class="btn indigo waves-effect" @click.prevent="nextSection">Post</button>
      </div>
    </div>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'

export default {
  components: {
    VueEditor
  },
  data () {
    return {
      commentMode: true,
      comment: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.comment-box {
  .ql-editor {
    min-height: 80px;
  }
}
</style>
