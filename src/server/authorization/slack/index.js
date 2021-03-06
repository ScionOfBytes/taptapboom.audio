'use strict'

const express = require('express')
const request = require('request-promise')

const Logger = require('src/util/logger')
const Slack = require('src/slack')

const router = express.Router({mergeParams: true})

router.get('/callback', (req, res) => {
  return (async function () {

    const code = req.query.code
    await Slack.authorize(code)

    res.redirect('/api/auth')
  })()
    .catch(err => {

      Logger.error(err)
      res.status(400)
        .send(err.message)
    })
})

module.exports = router
