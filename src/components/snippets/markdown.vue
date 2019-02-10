<template>
      <div v-html="adjustedPost"/>
</template>

<script>
import marked from 'marked'
export default {
  name: 'markdown-panel',
  props: {
    postbody: String
  },
  computed: {
    adjustedPost: function () {
      // Markdown parser settings
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: true,
        sanitize: false,
        smartLists: true,
        smartypants: true
      })
      return marked(this.postbody)
    }
  }
}
</script>
