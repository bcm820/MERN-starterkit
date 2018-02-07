const path = require('path')
const bp = require('body-parser')
const morgan = require('morgan')
const express = require('express')

module.exports = {

	activate(app) {
		app.use(morgan('dev'))
		app.use(express.static(path.join(__dirname,'../../client/build/')))
		app.use(bp.json())
	},

	jwtSecret: 'thisIsASecret'

}