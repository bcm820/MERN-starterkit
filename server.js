'use strict'

const express = require('express')
const app = express()

require('./server/config/config')(app)
require('./server/config/mongoose')

const auth = require('./server/routes/auth')
app.use('/api', auth)

app.get('/*', (req, res) => {
	res.sendFile(path.resolve(__dirname, './client/src/index.html'))
})

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}...`)
})