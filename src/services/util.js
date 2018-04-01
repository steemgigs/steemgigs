const imageRegex = /https?:\/\/(?:[-a-zA-Z0-9._]*[-a-zA-Z0-9])(?::\d{2,5})?(?:[/?#](?:[^\s"'<>\][()]*[^\s"'<>\][().,])?(?:(?:\.(?:tiff?|jpe?g|gif|png|svg|ico)|ipfs\/[a-z\d]{40,})))/gi

const parseVideo = (url) => {
  url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/)
  let type = ''
  if (RegExp.$3.indexOf('youtu') > -1) {
    type = 'youtube'
  } else if (RegExp.$3.indexOf('vimeo') > -1) {
    type = 'vimeo'
  }

  return {
    type: type,
    id: RegExp.$6
  }
}

const createEmbedVideoUrl = (url) => {
  var videoObj = parseVideo(url)
  if (videoObj.type === 'youtube') {
    return `https://www.youtube.com/embed/${videoObj.id}?showinfo=0`
  } else if (videoObj.type === 'vimeo') {
    return `https://player.vimeo.com/video/${videoObj.id}`
  }
  return ''
}

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
  },
  getEmbedVideoUrl (videoUrl) {
    if (!videoUrl) return ''
    const embedVideoUrl = createEmbedVideoUrl(videoUrl)
    return embedVideoUrl
  }
}
