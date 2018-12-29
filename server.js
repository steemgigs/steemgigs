const express = require('express')
const path = require('path')
const secure = require('express-force-https')

app = express()

// app.use(secure)
app.use(express.static(path.join(__dirname, 'dist')))
app.use('/static', express.static(path.join(__dirname, 'dist')))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

const port = process.env.PORT || 5000
app.listen(port)
console.log('server started '+ port)
