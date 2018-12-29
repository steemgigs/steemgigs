 <template>
  <div class="feedback">
    <div class="feedback-btn indigo" @click="feedbackActive = true" v-if="!feedbackActive"><span class="emoji">😃</span><span class="hide-on-med-and-down feedbackk"> Submit Feedback</span></div>
    <div v-if="feedbackActive" class="feedback-panel center-align pt-2" @mouseover="feedbackHoverText = ' '">
      <span class="close indigo white-text z-depth-2" @click="closeFeedback"><i class="ion-close"></i></span>
      <p v-if="mode === 'initial'" class="title">How would you rate your SteemGigs experience?</p>
      <div v-if="mode !== 'email'" class="reaction-panel">
        <span class="emojis" :class="{active: mode === 'edit'}">
          <span :class="{active: rating === -2}" @click="rate(-2)" @mouseover.stop="feedbackHoverText = 'An awful experience'"><i class="em em-angry"></i></span>
          <span :class="{active: rating === -1}" @click="rate(-1)" @mouseover.stop="feedbackHoverText = 'Not too good'"><i class="em em-white_frowning_face"></i></span>
          <span :class="{active: rating === 0}" @click="rate(0)" @mouseover.stop="feedbackHoverText = 'It\'s not bad'"><i class="em em-neutral_face"></i></span>
          <span :class="{active: rating === 1}" @click="rate(1)" @mouseover.stop="feedbackHoverText = 'I like it'"><i class="em em-slightly_smiling_face"></i></span>
          <span :class="{active: rating === 2}" @click="rate(2)" @mouseover.stop="feedbackHoverText = 'Steemgigs is awesome'"><i class="em em-grinning_face_with_star_eyes"></i></span>
        </span>
        <p v-if="mode === 'initial'" class="grey-text">{{feedbackHoverText}}&nbsp;</p>
      </div>
      <div v-if="mode === 'edit'">
        <div class="text-area">
          <textarea v-model="message" class="browser-default" placeholder="Tell us about your experience with steemgigs" id="" cols="30" rows="10"></textarea>
        </div>
        <div class="p-2 right-align"><button @click="mode = 'email'" :disabled="!Boolean(message)" class="btn px-2 grey send">Send</button></div>
      </div>
      <div v-if="mode == 'email'">
        <p class="title">Enter your email address if you would like to receive a follow up.</p>
        <div class="email-area">
          <input v-model="email" class="browser-default" placeholder="Enter Email">
        </div>
        <div class="p-2 right-align"><span style="cursor: pointer" @click="email = ''; send()" class="indigo-text mr-3">Skip</span><button @click="send" class="btn px-2 grey send"><i class="fa fa-spinner fa-pulse search-loader" v-if="sending" /> Send</button></div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/services/api'

export default {
  data () {
    return {
      feedbackHoverText: ' ',
      mode: 'initial',
      rating: 0,
      message: '',
      email: '',
      feedbackActive: false,
      sending: false
    }
  },
  methods: {
    rate (rating) {
      this.rating = rating
      this.mode = 'edit'
    },
    closeFeedback () {
      this.feedbackActive = false
      this.mode = 'initial'
      this.rating = 0
      this.message = ''
      this.email = ''
      this.sending = false
    },
    send () {
      this.sending = true
      let user = this.$store.state.username || ''
      console.log({user})
      Api.sendFeedback({rating: this.rating, message: this.message, email: this.email, username: user}).then((response) => {
        console.log('feedback', response.data)
        this.closeFeedback()
        this.$notify({
          group: 'foo',
          title: 'Feedback Sent',
          text: 'You will hear from us soon!',
          type: 'success'
        })
      }).catch((e) => {
        this.closeFeedback()
        console.log(e)
        this.$notify({
          group: 'foo',
          title: 'Error Sending Feedback',
          text: 'We are aware of this and are working hard to rectify. In this meantime, please ensure your internet connection is ok.',
          type: 'error'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .feedback {
    position: fixed;
    bottom: 0;
    z-index: 2000;
    right: 75px;
    .feedback-panel {
      .close {
        position: absolute;
        top: -12px;
        right: 20px;
        padding-top: 4px;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        text-align: center;
        cursor: pointer;
      }
      p.title {
        font-size: 1.25em;
        color: #5a5a5a;
        padding: 0 20px;
      }
      i.em {
        font-size: 1.5em;
        margin: 0.3em;
        transition: .2s all ease-in
      }
      .reaction-panel {
        padding: 1px 20px;
        span.emojis.active span:not(.active) i.em {
          filter: saturate(.2)
        }
        span.emojis:hover {
          span:not(:hover) i.em {
            filter: saturate(.2)
          }
          span:hover i.em {
            filter: saturate(1);
          }
        }
        span.emojis {
          span {
            cursor: pointer;
          }
        }
      }
      .text-area {
        background-color: #eee;
        padding: 15px;
        textarea {
          border: none;
          outline: none;
          height: 70px;
          resize: none;
          &:focus {
            border: none;
            outline: none;
          }
        }
      }
      .email-area {
        background-color: #eee;
        padding: 15px;
        input {
          border: none;
          outline: none;
          height: 40px;
          &:focus {
            border: none;
            outline: none;
            box-shadow: none;
          }
        }
      }
      .send {
        border: none;
        border-radius: 2px;
        text-transform: none;
      }
      box-shadow: 0 6px 100px 0 rgba(0,0,0,.35);
      background: white;
      position: relative;
      right: 55px;
      border-radius: 4px;
      width: 350px;
      backface-visibility: hidden;
    }
    .feedback-btn {
      color: white;
      padding: 10px 15px;
      box-shadow: 0 2px 12px rgba(0,0,0,.1);
      border-radius: 10px 10px 0 0;
      transition: all .2s ease-in;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        box-shadow: 0 0 35px 2px rgba(0,0,0,.24);
      }
    }
  }

</style>
