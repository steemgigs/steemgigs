<template>
  <div class="rotating-card" :class="flipped ? 'flipped' : ''">
    <div class="card-panel face">
      <span class="editProfile waves-effect" v-if="$store.state.username === profileData.account">
        <i @click="editMode = true" class="icon ion-android-create"></i>
      </span>
      <div class="profilePic">
        <img :src="profile.profile_image" class="user-pict-img" :alt="profileData.account" width="150" height="150">
      </div>
      <span class="username" v-text="profile.name"></span>
      <span class="expertise">Experienced Web Developer</span>
      <span class="ratings">
        <i class="icon ion-ios-star amber-text" v-for="(star, index) in 5" :key="index"></i> 5.0 (2 reviews)
      </span>
      <p class="location"><i class="icon ion-android-pin"></i> From <span class="right" v-text="profile.location"></span></p>
      <p class="member_since"> <i class="icon ion-android-person"></i> Member since <span class="right" v-text="since"></span></p>
      <p class="member_since"> <i class="icon ion-ios-briefcase"></i> Last delivery <span class="right" v-text="ago"></span></p>
      <p>
        <i class="icon ion-android-plane"></i>
        Vacation mode
        <span class="right">
          <div class="switch" v-if="true">
            <label>
              <input checked type="checkbox" disabled v-model="updateProfile.vacation_mode" >
              <span class="lever"></span>
            </label>
          </div>
        </span>
      </p>
    </div>
    <div class="back card-panel indigo lighten-1 white-text">
        <i @click="closeEdit" class="icon ion-close"></i>
        <label class="profilePic" for="profile_image">
          <input type="file" accept="image/png,image/jpeg" class="hide" id="profile_image">
          <img :src="profile.profile_image" class="user-pict-img" :alt="profileData.account" width="150" height="150">
        </label>
        <div class="input-field">
          <input type="text" placeholder="About me" v-model="profileUpdate.about" id="desc">
        </div>
        <div class="input-field">
          <input type="text" @keyup.enter="addToSpeakArray" placeholder="I speak (Languages)" v-model="i_speak" id="desc">
          <i @click="addToSpeakArray" class="ion-plus add-lang-icon right"></i>
        </div>
        <ul class="language-list">
          <li v-for="(spoken, i) in languages_i_speak" :key="i" v-text="spoken" />
        </ul>
        <p>
          I'm on vacation <i class="icon ion-android-plane"></i>
          <span class="right">
            <div class="switch" v-if="true">
              <label>
                <input type="checkbox" v-model="profileUpdate.vacation_mode" >
                <span class="lever"></span>
              </label>
            </div>
          </span>
        </p>
        <div class="input-field">
          <select class="validate browser-default my-select" v-model="profileUpdate.country">
            <option selected value="" disabled>I am from</option>
            <option v-for="(country, index) in countries" :key="index" :value="country">{{ country }}</option>
          </select>
        </div>
        <button @click.prevent="updateProfile" class="btn-floating grey  right lighten-3"><i class="ion-checkmark-round indigo-text"></i></button>
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
      min-height: 120px;
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
        ul.language-list li {
          list-style-type: initial;
          color: #d1d1d1;
          margin-left: 21px;
          font-size: .93rem;
        }
        input[type=text] {
          color: white;
        }
        i.add-lang-icon, i.ion-close {
          transform: translateY(-35px);
          cursor: pointer;
        }
        transform: rotateY(-180deg);
        backface-visibility: hidden;
        transition: transform .6s ease-in;
        .btn-floating i {
          font-size: 1rem
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
