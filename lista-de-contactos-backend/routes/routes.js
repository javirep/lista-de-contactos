const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/User");
const contacts = require("../contacts");

/* POST route for Users Log in */
router.post('/login', async function (req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email })
    if (!user) {
      res.status(401).json({ "errorMessage": "This user doesn´t exist" })
    }
    else if (bcrypt.compareSync(password, user.password)) {
      console.log(req)
      req.session.currentUser = user;
      res.status(200).json({ user })
    }
    else {
      res.status(401).json({ "errorMessage": "Incorrect password" })
    }
  }
  catch (error) {
    console.log(error)
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
    console.log(error)
    res.status(500).json({ "errorMessage": "There is an internal error, please try again in a few minutes." })
  }
})

/* GET contacts */
router.get("/contacts", function (req, res, next) {
  res.status(200).json(contacts)
})

/* GET me */
router.get("/me", function (req, res, next) {
  if (req.session.currentUser) {
    res.status(200).json({ "isLoggedIn": true })
  }
  else {
    res.status(200).json({ "isLoggedIn": false })
  }
})



module.exports = router;
