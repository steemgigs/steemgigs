<template>
  <div class="gigLoader">
    <content-placeholders>
      <content-placeholders-img />
      <content-placeholders-heading :img="true" />
      <content-placeholders-text :lines="3" />
    </content-placeholders>
  </div>
</template>

<script>
import VueContentPlaceholders from 'vue-content-placeholders'
export default {
  components: {
    VueContentPlaceholders
  }
}
</script>
