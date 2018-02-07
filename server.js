'use strict'

const express = require('express')
const app = express()

require('./server/config/middleware').activate(app)
require('./server/config/mongoose')

const router = express.Router()
require('./server/routes/public')(router)
require('./server/routes/private')(router)
app.use('/api', router)

// const path = require('path')
// app.get('/*', (req, res) => {
// 	res.sendFile(path.resolve(__dirname, './client/src/index.html'))
// })

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}...`)
})