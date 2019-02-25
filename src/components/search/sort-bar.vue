<template>
    <div class="sort-bar">
        <el-select v-model="sortMethod" placeholder="Select Order" @change="adjustSorted">
            <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value"></el-option>
  </el-select>
    </div>
</template>

<script>

export default {
  props: {
    sortMethod: String
  },
  data () {
    return {
      options: [{
        value: 'newest',
        label: 'Newest'
      }, {
        value: 'oldest',
        label: 'Oldest'
      }, {
        value: 'price_low',
        label: 'Lowest Priced'
      },
      {
        value: 'price_high',
        label: 'Highest Priced'
      }
      ]
    }
  },
  methods: {
    // Emit an event when the sort method has changed within the component for parent to use in UI
    adjustSorted: function () {
      this.$emit('adjustedSort', {
        sortMethod: this.sortMethod
      })
    }
  }
}

</script>
<style>

</style>
