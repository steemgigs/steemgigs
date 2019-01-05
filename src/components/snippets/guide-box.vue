<template>
<div class="guide-container">
    <h3> {{ header }} </h3>
    <h5> {{ subHeader }} </h5>
    <iframe class="help-video" width="auto" src="https://www.youtube.com/embed/xeLYLA6C2AE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <ul class="guide-items">
        <span class="guide-item" v-for="(item, index) in itemList" :key="index"> {{ item }}</span>
    </ul>
</div>
</template>

<script>
export default {
  name: 'guide',
  props: {
    header: String,
    subHeader: String,
    itemList: Array
  }
}
</script>
<style>
.guide-container {
    background: white;
    padding: 20px;
    box-shadow: 0 3px 13px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.guide-item {
    margin: 15px 30px;
    display: block;
    font-size: 13px;
    display: list-item;
}

</style>
