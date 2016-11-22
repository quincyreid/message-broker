/**
 * Server
 */

let express = require('express')
let app = express()

if (!module.parent) {
  app.listen(process.env.PORT || 3030)
}

module.exports = app
