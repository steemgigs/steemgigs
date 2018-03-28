const imageRegex = /https?:\/\/(?:[-a-zA-Z0-9._]*[-a-zA-Z0-9])(?::\d{2,5})?(?:[/?#](?:[^\s"'<>\][()]*[^\s"'<>\][().,])?(?:(?:\.(?:tiff?|jpe?g|gif|png|svg|ico)|ipfs\/[a-z\d]{40,})))/gi

export default {
  convertImageUrlToHTML (body) {
    return body.replace(imageRegex, img => {
      return `<img src="${img}">`
    })
  },
  getImagesFromBody (body) {
    let imageList = []
    body.replace(imageRegex, image => {
      if (imageList.filter(img => img.indexOf(image) !== -1).length === 0) {
        imageList.push(image)
      }
    })
    return imageList
  }
}
