<template>
  <div class="new_steemgig__view row">
    <cat-nav v-if="$store.state.accessToken" />
  </div>
</template>

<script>
import CatNav from '@/components/layout/catNav'
export default {
  components: {
    CatNav
  }
}
</script>
