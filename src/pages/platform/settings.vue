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
  name: 'settings',
  components: {
    placeholder
  },
  data () {
    return {
      placeholderHeader: 'Settings coming soon'
    }
  }
}

</script>

<style>

</style>
