<template>
  <div class="testimonial-card center card">
    <div class="card-content">
      <img :src="userImage" class="userImage" alt="">
      <div class="content">
        <h3>{{subject}}</h3>
        <span class="username">{{username}}</span>
        <p>{{body}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    testimonial: Object
  },
  computed: {
    userImage () {
      return this.testimonial.json_metadata.authorPic
    },
    subject () {
      if (this.testimonial.title) {
        return this.testimonial.title.split('#STEEMGIGS ')[1]
      } else return ''
    },
    body () {
      return this.testimonial.body
    },
    username () {
      return '@' + this.testimonial.author
    }
  }
}
</script>

<style lang="scss" scoped>
  .testimonial-card {
    box-shadow: 0 3px 20px rgba($color: #000000, $alpha: .25);
    border-radius: 5px;
    img.userImage {
      height: 80px;
      width: 80px;
      border-radius: 50%;
      margin: auto;
    }
    h3 {
      font-size: 1.4rem;
      color: gray;
      margin: 7px auto;
    }
  }
</style>
