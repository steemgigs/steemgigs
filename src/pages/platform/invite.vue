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
  name: 'invite',
  components: {
    placeholder
  },
  data () {
    return {
      placeholderHeader: 'Invite coming soon'
    }
  }
}

</script>

<style>

</style>
