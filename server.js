/**
 * Server
 */
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.json())

if (!module.parent) {
  app.listen(process.env.PORT || 3030)
}

module.exports = app
