var form = {

  data () {
    return {
      inputValue: '',
      inputVisible: false,
      userTags: []
    }
  },
  methods: {

  // Form Reset

    resetForm (formName) {
      this.$refs[formName].resetFields()
    },

    // Tag Methods

    handleClose (userTag) {
      this.userTags.splice(this.userTags.indexOf(userTag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.userTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}

export default form
