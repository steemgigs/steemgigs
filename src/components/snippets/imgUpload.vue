<template>
  <div class="dropform" :style="dropformstyle">
    <i class="closecon ion-close" @click.prevent="closeUploader" />
    <p v-if="isSaving" class="center center-align">
      <i class="fa fa-spinner fa-pulse"></i> <br>
      <span>Uploading your image</span>
    </p>
    <form enctype="multipart/form-data" v-if="isInitial || uploadError || isSuccess" novalidate>
      <div>
        <input type="file" :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event); fileCount = $event.target.files.length" accept="image/*" class="input-file">
        <p v-if="isInitial">
          Drag your file here to begin<br> or click to browse
        </p>
        <p v-if="isFailed" class="red-text">
          An Error Occoured<br>Please reupload
        </p>
        <!-- <i class="icon ion-upload" /> -->
      </div>
    </form>
    <div class="uploaded-image" :style="{ 'background-image': 'url(' + imgUrl + ')' }" v-if="isSuccess">
      <!-- <i class="icon ion-eye" /> -->
    </div>
  </div>
</template>

<script>
import Api from '@/services/api'
const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos',
      imgUrl: '',
      localUrl: ''
    }
  },
  methods: {
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    },
    save (formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING
      console.log('formData', formData)
      Api.imageUpload(formData)
        .then(x => {
          console.log('img-upload', x.data)
          this.imgUrl = x.data
          this.uploadedFiles = [].concat(x)
          this.currentStatus = STATUS_SUCCESS
          this.$eventBus.$emit('img-uploaded', {
            index: this.id,
            url: x.data
          })
        })
        .catch(err => {
          console.log(err)
          this.uploadError = err.response
          this.currentStatus = STATUS_FAILED
        })
    },
    filesChange (eventt) {
      let fieldName = eventt.target.name
      let fileList = eventt.target.files
      this.localUrl = eventt.target.value

      // handle file changes
      console.log({eventt})
      const formData = new FormData()

      if (!fileList.length) return

      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name)
        })

      // save it
      this.save(formData)
    },
    closeUploader () {
      this.$eventBus.$emit('delete-image-url', this.id)
    }
  },
  computed: {
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    },
    dropformstyle () {
      if (!this.isSuccess) {
        return {outline: '2px dashed grey'}
      } else {
        return {}
      }
    }
  },
  mounted () {
    this.reset()
  }
}
</script>

<style lang="scss" scoped>
.input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }
.dropform {
  box-shadow: 0 1px 1px;
  outline-offset: -10px;
  background: #f9f9f9;
  color: dimgray;
  padding: 10px 10px;
  height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
  i.ion-upload {
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #a4a0a091;
    opacity: 0;
    transition: opacity .2s ease-in-out;

  }
  i.closecon {
    background: #ee6464;
    padding: 1px 6px;
    border-radius: 50%;
    color: white;
    position: absolute;
    top: -10px;
    right: 5px;
    transition: all .2s ease-in;
    &:hover {
      transform: translateY(-3px);
      background: red;
    }
  }
  &:hover {
    i.ion-upload {
      opacity: 1;
    }
    background: lightblue; /* when mouse over to the drop zone, change color */
  }
  p {
    text-align: center;
    padding: 50px 29px;
    font-size: .9rem;
  }
  .uploaded-image {
    height: 100%;
    top: 0;
    left: 0;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    i.icon {
      opacity: 0;
      transition: all .2s ease-in;
      font-size: 2rem;
      &:hover {
        color: lightblue;
      }
    }
    &:hover {
      i.icon {
        opacity: 1;
      }
    }
  }
}

</style>
