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
    sortMethod: String,
    optionsType: String
  },
  data () {
    return {}
  },
  methods: {
    // Emit an event when the sort method has changed within the component for parent to use in UI
    adjustSorted: function () {
      this.$emit('adjustedSort', {
        sortMethod: this.sortMethod
      })
    }
  },
  computed: {
    options: function () {
      let options = [{
        value: 'newest',
        label: 'Newest'
      }, {
        value: 'oldest',
        label: 'Oldest'
      }
      ]

      if (this.optionsType !== 'basic') {
        options.push({
          value: 'price_low',
          label: 'Lowest Priced'
        },
        {
          value: 'price_high',
          label: 'Highest Priced'
        })
      }
      return options
    }
  }
}

</script>
<style>

</style>
