const path = require('path')
const bp = require('body-parser')
const morgan = require('morgan')
const express = require('express')

module.exports = app => {

	app.use(morgan('dev'))
	app.use(express.static(path.join(__dirname,'/../../client/src')))
	app.use(bp.json())

	app.set('jwt', 'thisIsASecret')

}