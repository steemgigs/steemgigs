const express = require('express')
const path = require('path')
app = express()

app.use(express.static(path.join(__dirname, 'dist')))
// app.get('*', (req, res) => {
//   res.send('./dist/index.html')
// })

const port = process.env.PORT || 5000
app.listen(port)
console.log('server started '+ port)