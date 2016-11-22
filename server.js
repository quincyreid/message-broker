/**
 * Server
 */
let bodyParser = require('body-parser')
let express = require('express')
let app = express()

app.use(bodyParser.json())

if (!module.parent) {
  app.listen(process.env.PORT || 3030)
}

module.exports = app
