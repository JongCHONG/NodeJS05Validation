const express = require("express")
const app = express()
const { body, validationResult } = require('express-validator')

let users = require("../users.json")

//afficher tous les users
app.get('/', (req, res) => {
  res.json(users)
})

//afficher user demandé
app.get("/:slug", (req, res) => {
  const { slug } = req.params
  const user = users.find(element => element.slug === slug)

  res.json(user)
})

//création un nouveau user
app.post("/", 
  body('name')
    .exists().withMessage("name is required")
    .isLength({ min: 4 }).withMessage("name is too short"),
  body('password')
    .exists().withMessage("name is required")
    .isLength({ min: 8 }).withMessage("passeword is too short"),
  body('city')
    .optional()
    .isIn(["Paris", "Tokyo", "Los Angeles"]).withMessage("city value is not accepted"),
  body().custom(value => {
    const allowedKeys = ["slug", "name", "password", "city", "profile_picture"]
    
    // On recupere les clés du body dans un tableau de strings
    const bodyKeys = Object.keys(value)

    // Je cherche une clé dans mon body qui n'est pas dans le tableau allowedKeys
    const invalidKey = bodyKeys.find(key => !allowedKeys.includes(key))

    if (invalidKey) {
      return false
    } else {
      return true
    }
  }).withMessage("Invalid key"),
  body().custom(value => {
    const existingUser = users.find(element => element.slug === value.slug)

    if (existingUser) {
      return false
    } else {
      return true
    }
  }).withMessage("Existing User"),
  (req, res) => {
    const { errors } = validationResult(req)
    console.log(errors)
    
    if (errors.length > 0) {
      res.status(400).json({ errors })
    } else {
      const user = req.body
      users = [ ...users, user ]
      res.json(user)
    }
  }
)

module.exports = app