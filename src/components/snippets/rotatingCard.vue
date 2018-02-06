<template>
  <div class="rotating-card" :class="flipped ? 'flipped' : ''">
    <div class="card-panel face">
      <slot name="face"></slot>
    </div>
    <div class="back card-panel indigo lighten-1 white-text">
        <i @click="$emit('closeCard')" class="icon ion-close"></i>
      <slot name="back"></slot>
    </div>
  </div>
</template>

<script>

export default {
  props: ['flipped']
}
</script>

<style lang="scss" scoped>
  .rotating-card{
    position: relative;
    min-height: 70px;
    .face{
      position: absolute;
      width: 100%;
      height: 100%;
      margin: 0;
      z-index: 1;
      transform-style: preserve-3d;
      backface-visibility: hidden;
      transition: transform .6s ease-in;
    }
    .back{
      transform: rotateY(-180deg);
      backface-visibility: hidden;
      transition: transform .6s ease-in;
      i.ion-close {
          transform: translateY(-35px);
          cursor: pointer;
      }
    }
    &.flipped {
      .face{
        transform: rotateY(180deg);
      }
      .back{
        transform: rotateY(0);
      }
    }
  }
</style>
