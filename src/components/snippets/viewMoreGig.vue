<template>
  <div class="card gig" tag="div">
    <div class="card-content">
      <button class="btn-large indigo btn-floating waves-effect waves-light"><i class="icon ion-android-add"></i></button>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
$blue: #4757b2;
.card.gig {
  cursor: pointer;
  .card-image {
    position: relative;
    min-height: 10em;
  }
  .card-content {
    padding: 3em 1em 1em;
    position: relative;
    min-height: 11em;
    .sellerPic {
      border-radius: 50%;
      border: 1px solid #4757b2;
      width: 2.1em;
      height: 2.1em;
      margin-top: 0px;
      margin-left: 0em;
      display: inline-block;
      position: absolute;
      top: 1em;
    }
    .sellerName {
      position: absolute;
      left: 3.5em;
      color: black;
      margin-top: 0.2em;
      transition: all ease-in .3s;
      top: 1em;
      &:hover {
        text-decoration: underline;
      }
    }
    .task {
      font-weight: 600;
    }
    .price {
      margin-top: 0.5em;
      font-weight: 500;
    }
  }
  .card-action {
    padding: 1em;
    a:not(.btn):not(.btn-large):not(.btn-large):not(.btn-floating) {
      color: $blue;
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
</style>
