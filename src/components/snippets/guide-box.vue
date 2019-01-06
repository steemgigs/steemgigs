<template>
<div class="guide-container">
    <h3> {{ header }} </h3>
    <h5> {{ subHeader }} </h5>
    <youtube :video-id="videoId" player-width="auto" player-height="auto"></youtube>
    <ul class="guide-items">
        <span class="guide-item" v-for="(item, index) in itemList" :key="index"> - {{ item }}</span>
    </ul>
</div>
</template>

<script>

export default {
  name: 'guide',
  props: {
    header: String,
    subHeader: String,
    itemList: Array,
    videoId: String
  }
}
</script>
<style>
.guide-container {
    background: white;
    padding: 30px;
    box-shadow: 0 3px 13px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.guide-item {
    display: block;
    margin-bottom: 15px;
    font-size: 14px;
}

.guide-item:last-child {
    margin-bottom: 0;
}

</style>
