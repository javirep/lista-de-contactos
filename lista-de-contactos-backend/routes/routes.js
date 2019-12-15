const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/User");
const contacts = require("../contacts");
const jwt = require("jsonwebtoken");
const { verifiedByToken } = require("../middlewares/middlewares")

/*
  POST route for Users Log in

  if the login is unvalid it provides an errorMessage that can be displayed in the frontEnd
  if the login is valid it provides an authorized token

*/
router.post('/login', async function (req, res, next) {

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email })
    if (!user) {
      res.json({ "errorMessage": "This user doesn´t exist" })
    }
    else if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;

      jwt.sign({ user }, "secretKey", (err, token) => {
        res.status(200).json({
          token,
          isLoggedIn: true
        })
      })
    }

    else {
      res.status(401).json({ "errorMessage": "Incorrect password" })
    }
  }
  catch (error) {
    console.log("error while login in: " + error)
    res.status(500).json({ "errorMessage": "There is an internal error, please try again in a few minutes." })
  }
});

/* */
router.post("/signup", async function (req, res, next) {
  const { email, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync(saltRounds)
    const encryptedPassword = bcrypt.hashSync(password, salt)
    const newUser = await User.create({ email, "password": encryptedPassword })
    res.status(200).json(newUser)
  }

  catch (error) {
    res.status(500).json({ "errorMessage": "There is an internal error, please try again in a few minutes." })
  }
})

/* GET contacts */
router.post("/contacts", verifiedByToken(), function (req, res, next) {

  res.status(200).json({
    isLoggedIn: true,
    contacts
  })
})

/* GET me */
router.get("/me", function (req, res, next) {

  if (req.session.currentUser) {
    console.log(true)
    res.status(200).json({ "isLoggedIn": true })
  }
  else {
    console.log(false)
    res.status(200).json({ "isLoggedIn": false })
  }
})



module.exports = router;
