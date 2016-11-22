/**
 * Server
 */
const bodyParser = require('body-parser')
const express = require('express')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const messageBroker = require('./lib/message-broker')
app.use('/', messageBroker)

if (!module.parent) {
  app.listen(process.env.PORT || 3030)
}

module.exports = app
