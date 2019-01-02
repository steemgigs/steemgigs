<template>
    <div class="col s12 placeholder">
        <h3> {{ header }}</h3>
        <h5>We're hard at work to bring you new features to SteemGigs, follow <a target="blank" href="https://steemit.com/@steemgigs">@steemgigs</a> to keep up to date with the latest news</h5>
    </div>
</template>

<script>
export default {
  name: 'placeholder',
  props: {
    header: String
  }
}
</script>
<style>
.placeholder {
    text-align: center;
}
</style>
