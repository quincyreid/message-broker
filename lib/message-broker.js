const express = require('express')
const validator = require('email-validator')
const amqp = require('amqplib/callback_api')
const router = express.Router()

/**
 * Adds post for a form submission. Once a message is received
 * It is enqueued. Then the message is dequeued and sent by email
 *
 */
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
  } else {
    amqp.connect(process.env.CLOUDAMQP_URL, (err, conn) => {
      let name = req.body.name
      let birthdate = req.body.birthdate
      let timezone = req.body.timezone
      let mail = req.body.mail
      let phone = req.body.phone
      let message = [name, birthdate, timezone, mail, phone]

      if (err) {
        console.error(err.message)
      }
      conn.createChannel((err, ch) => {
        if (err) {
          console.error(err.message)
        }
        ch.assertQueue('registration', {durable: false})
        // Note: on Node 6 Buffer.from(msg) should be used
        ch.sendToQueue('registration', new Buffer(message))
        ch.assertQueue('registration', {durable: false})
        ch.consume('registration', (msg) => {
          console.log(' [x] Received', msg.content.toString())
        }, {noAck: true})
      })
      setTimeout(() => {
        conn.close()
        process.exit(0)
      }, 500)
    })
  }
})

module.exports = router
