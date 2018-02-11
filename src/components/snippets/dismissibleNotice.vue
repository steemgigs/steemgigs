<template>
  <div v-if="visible" class="card-panel dismissible-notice indigo white-text">
    <i class="ion-close" @click="visible = false"></i>
    <slot />
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible: true
    }
  }
}
</script>
<style lang="scss" scoped>
  .dismissible-notice {
    box-shadow: 0 4px 17px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    position: relative;
    padding-right: 60px;
    line-height: 1.6;
    color: #848484;
    // max-width: 900px;
    margin: 20px 10px;
    font-size: 1rem;
    i.ion-close {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 15px;
      cursor: pointer;
      transition: transform .2s ease-in;
        &:hover {
          transform: translateY(-70%);
        }
    }
  }
</style>
