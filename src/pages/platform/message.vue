<template>
<page :pageClasses="['placeholder__view', 'row']">
<el-main>
    <placeholder :header="placeholderHeader" />
</el-main>
</page>
</template>

<script>

import placeholder from '@/components/snippets/placeholder'

export default {
  name: 'messages',
  components: {
    placeholder
  },
  data () {
    return {
      placeholderHeader: 'Messages coming soon'
    }
  }
}

</script>

<style>

</style>
