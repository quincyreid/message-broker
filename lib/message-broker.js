const express = require('express')
const validator = require('email-validator')
const router = express.Router()

router.post('/submissions', (req, res) => {
  let error = null

  if (Object.keys(req.body).length === 0) {
    error = 'No content was sent'
  }

  if (typeof req.body.name === 'undefined') {
    // Returns 400 is both the to and from are not completed.
    error = 'Need the recipient name'
  }

  if (validator.validate(req.body.mail) === false) {
    // Returns 400 if invalid email address is used
    error = 'Invalid email being used'
  }

  if (error) {
    res.status(400).send({error: error})
  }
})

module.exports = router
