const express = require("express")
const app = express()
const { body, validationResult } = require('express-validator')

let users = require("../users.json")

app.get('/', (req, res) => {
  res.json(users)
})


module.exports = app