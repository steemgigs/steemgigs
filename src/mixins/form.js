var form = {

  data () {
    return {
      inputValue: '',
      inputVisible: false,
      userTags: []
    }
  },
  methods: {

    // Form Submission

    submitForm (formName) {
      this.$refs[formName].validate((valid, err) => {
        if (valid) {
          this.submit()
        } else {
          this.$notify.error({
            title: 'Error',
            message: 'Please check the form, there appears to be an issue with the information you provided'
          })
        }
      })
    },

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
